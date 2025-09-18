// src/routes/expenses.js
import express from "express";
import multer from "multer";
import Expense from "../models/Expense.js";
import { env } from "../config/env.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";
import { s3Put, s3SignedGet } from "../loaders/s3.js";

const router = express.Router();

// memory storage, 10MB per file (tune as needed)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 10 },
});

const isOwner = (req, exp) => exp.employeeId === req.user.id;

// --- Create expense (optional files) ---
router.post("/", requireAuth, upload.array("files", 10), async (req, res) => {
  try {
    const { amount, date, category, description, currency } = req.body;

    const ts = Date.now();
    const baseKey = `expenses/${req.user.id}/${ts}`;

    const attachments = [];
    for (const f of req.files || []) {
      const safe = f.originalname.replace(/[^\w.\-]/g, "_");
      const key = `${baseKey}/${safe}`;
      const { etag } = await s3Put({ Key: key, Body: f.buffer, ContentType: f.mimetype });

      attachments.push({
        provider: env.STORAGE_VENDOR,
        bucket: env.S3_BUCKET,
        key,
        etag,
        size: f.size,
        contentType: f.mimetype,
        originalName: f.originalname,
      });
    }

    const doc = await Expense.create({
      employeeId: req.user.id,
      employeeName: req.user.name,
      employeeEmail: req.user.email,
      amount: Number(amount),
      date: date ? new Date(date) : new Date(),
      category: category || "OTHER",
      description: description || "",
      currency: currency || "INR",
      attachments,
      status: "DRAFT",
    });

    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to create expense", details: String(err.message || err) });
  }
});

// --- Update DRAFT ---
router.patch("/:id", requireAuth, async (req, res) => {
  try {
    const exp = await Expense.findById(req.params.id);
    if (!exp) return res.status(404).json({ error: "Not found" });
    if (!isOwner(req, exp)) return res.status(403).json({ error: "Forbidden" });
    if (exp.status !== "DRAFT") return res.status(400).json({ error: "Only DRAFT can be edited" });

    const allow = ["amount", "date", "category", "description", "currency"];
    for (const k of allow) if (k in req.body) exp[k] = k === "amount" ? Number(req.body[k]) : req.body[k];
    await exp.save();
    res.json(exp);
  } catch (err) {
    res.status(400).json({ error: "Update failed", details: String(err.message || err) });
  }
});

// --- Add attachments to existing DRAFT ---
router.post("/:id/attachments", requireAuth, upload.array("files", 10), async (req, res) => {
  const exp = await Expense.findById(req.params.id);
  if (!exp) return res.status(404).json({ error: "Not found" });
  if (!isOwner(req, exp)) return res.status(403).json({ error: "Forbidden" });
  if (exp.status !== "DRAFT") return res.status(400).json({ error: "Only DRAFT can be edited" });

  const ts = Date.now();
  const baseKey = `expenses/${req.user.id}/${ts}`;

  for (const f of req.files || []) {
    const safe = f.originalname.replace(/[^\w.\-]/g, "_");
    const key = `${baseKey}/${safe}`;
    const { etag } = await s3Put({ Key: key, Body: f.buffer, ContentType: f.mimetype });

    exp.attachments.push({
      provider: env.STORAGE_VENDOR,
      bucket: env.S3_BUCKET,
      key,
      etag,
      size: f.size,
      contentType: f.mimetype,
      originalName: f.originalname,
    });
  }

  await exp.save();
  res.json(exp);
});

// --- Submit ---
router.post("/:id/submit", requireAuth, async (req, res) => {
  const exp = await Expense.findById(req.params.id);
  if (!exp) return res.status(404).json({ error: "Not found" });
  if (!isOwner(req, exp)) return res.status(403).json({ error: "Forbidden" });
  if (exp.status !== "DRAFT") return res.status(400).json({ error: "Only DRAFT can be submitted" });

  exp.status = "SUBMITTED";
  exp.submittedAt = new Date();
  await exp.save();
  res.json(exp);
});

// --- Manager queue ---
router.get("/pending", requireAuth, requireRole(["manager", "admin"]), async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const docs = await Expense.find({ status: "SUBMITTED" })
    .sort({ submittedAt: -1 })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));
  res.json(docs);
});

// --- Approve / Reject ---
router.post("/:id/approve", requireAuth, requireRole(["manager", "admin"]), async (req, res) => {
  const exp = await Expense.findById(req.params.id);
  if (!exp) return res.status(404).json({ error: "Not found" });
  if (exp.status !== "SUBMITTED") return res.status(400).json({ error: "Only SUBMITTED can be approved" });

  exp.status = "APPROVED";
  exp.managerId = req.user.id;
  exp.managerName = req.user.name;
  exp.managerComment = req.body.comment || "";
  exp.approvedAt = new Date();
  await exp.save();
  res.json(exp);
});

router.post("/:id/reject", requireAuth, requireRole(["manager", "admin"]), async (req, res) => {
  const exp = await Expense.findById(req.params.id);
  if (!exp) return res.status(404).json({ error: "Not found" });
  if (exp.status !== "SUBMITTED") return res.status(400).json({ error: "Only SUBMITTED can be rejected" });

  exp.status = "REJECTED";
  exp.managerId = req.user.id;
  exp.managerName = req.user.name;
  exp.managerComment = req.body.comment || "";
  exp.rejectedAt = new Date();
  await exp.save();
  res.json(exp);
});

// --- My expenses ---
router.get("/my", requireAuth, async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const q = { employeeId: req.user.id, ...(status ? { status } : {}) };
  const docs = await Expense.find(q)
    .sort({ createdAt: -1 })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));
  res.json(docs);
});

// --- Signed download URL for one attachment ---
router.get("/:id/attachments/:attId/url", requireAuth, async (req, res) => {
  const exp = await Expense.findById(req.params.id);
  if (!exp) return res.status(404).json({ error: "Not found" });
  const canView = isOwner(req, exp) || ["manager", "admin"].includes(req.user.role);
  if (!canView) return res.status(403).json({ error: "Forbidden" });

  const att = exp.attachments.id(req.params.attId);
  if (!att) return res.status(404).json({ error: "Attachment not found" });

  const url = await s3SignedGet(att.key, 300);
  res.json({ url, expiresIn: 300 });
});

export default router;
