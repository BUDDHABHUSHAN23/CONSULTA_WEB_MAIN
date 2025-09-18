// src/models/Expense.js
import mongoose from "mongoose";

const AttachmentSchema = new mongoose.Schema(
  {
    provider: { type: String, default: "r2" }, // storage backend
    bucket: String,
    key: String,               // S3 key: expenses/<user>/<ts>/<filename>
    etag: String,
    size: Number,
    contentType: String,
    originalName: String,
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const ExpenseSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true },
    employeeName: { type: String, required: true },
    employeeEmail: { type: String, required: true },

    date: { type: Date, required: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "INR" },
    category: {
      type: String,
      enum: ["TRAVEL", "FOOD", "ACCOMMODATION", "SUPPLIES", "OTHER"],
      default: "OTHER",
    },
    description: { type: String, default: "" },

    attachments: { type: [AttachmentSchema], default: [] },

    status: {
      type: String,
      enum: ["DRAFT", "SUBMITTED", "APPROVED", "REJECTED", "PAID"],
      default: "DRAFT",
      index: true,
    },

    submittedAt: Date,
    managerId: String,
    managerName: String,
    managerComment: String,
    approvedAt: Date,
    rejectedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Expense", ExpenseSchema);
