from fastapi import APIRouter, HTTPException, BackgroundTasks, Depends, Header
from typing import List, Optional
from datetime import datetime
import os

from bson import ObjectId

from .db import db
from .models import (
    Contact, ContactCreate, Industry, CompanyInfo,
    Testimonial, SuccessStory, AnnouncementIn, AnnouncementOut
)
from .services.mailer import send_email, contact_html, NOTIFY_TO

router = APIRouter(prefix="/api")

@router.get("/health")
async def health():
    return {"status": "ok"}

# ---------------- Contacts ----------------

@router.post("/contacts", response_model=Contact)
async def create_contact(contact_data: ContactCreate, bt: BackgroundTasks):
    c = Contact(**contact_data.model_dump())
    res = await db.contacts.insert_one(c.model_dump())
    if not res.inserted_id:
        raise HTTPException(status_code=500, detail="Failed to create contact")

    # fire-and-forget email (only if NOTIFY_TO configured)
    if NOTIFY_TO:
        html = contact_html(c.model_dump())
        subject = f"[Consulta] New website enquiry — {c.name}"
        bt.add_task(send_email, subject, NOTIFY_TO, html, f"New enquiry from {c.name}")

    return c


@router.get("/contacts", response_model=List[Contact])
async def get_contacts(skip: int = 0, limit: int = 100):
    items = await db.contacts.find().skip(skip).limit(limit).sort("created_at", -1).to_list(limit)
    return [Contact(**i) for i in items]


# ---------------- Industries / Company / Content ----------------

@router.get("/industries", response_model=List[Industry])
async def get_industries():
    items = await db.industries.find({"is_active": True}).sort("order", 1).to_list(200)
    return [Industry(**i) for i in items]


@router.get("/industries/{slug}", response_model=Industry)
async def get_industry_by_slug(slug: str):
    item = await db.industries.find_one({"slug": slug, "is_active": True})
    if not item:
        raise HTTPException(status_code=404, detail="Industry not found")
    return Industry(**item)


def _company_defaults() -> dict:
    return {
        "name": "Consulta Technologies Pvt. Ltd.",
        "tagline": "We are an Experienced & Affordable Automation Company!",
        "description": "Leading provider of industrial automation solutions with expertise across multiple industries.",
        "address": {
            "building": "Tower 5, K-Block",
            "area": "International Technology Park",
            "location": "Belapur Railway Station Building",
            "city": "Navi Mumbai",
            "state": "Maharashtra",
            "pincode": "400 614",
        },
        "contact": {
            "phone": "+91 22 27560593",
            "email": "info@consulta.in",
            "hours": "Mon to Sat : 10.00 AM - 06.00 PM",
        },
        "stats": {
            "years_experience": 15,
            "projects_completed": 500,
            "expert_engineers": 50,
            "client_satisfaction": 99,
        },
        "technologies": [
            {"category": "PLC/DCS Platforms", "technologies": ["Siemens", "Rockwell", "Schneider", "GE", "Honeywell"]},
            {"category": "SCADA/HMI Systems", "technologies": ["WinCC", "FactoryTalk View", "Wonderware", "iFIX"]},
        ],
        "values": [
            {"title": "Innovation", "description": "Continuously improving automation delivery"},
            {"title": "Quality", "description": "Excellence in every project"},
            {"title": "Reliability", "description": "Dependable systems and support"},
        ],
        "capabilities": [
            {
                "category": "System Integration",
                "description": "Complete automation system design, integration, and commissioning services.",
                "features": [
                    "SCADA & HMI Development",
                    "PLC Programming & Configuration",
                    "DCS Implementation",
                    "MES & ERP Integration",
                ],
            },
            {
                "category": "Process Optimization",
                "description": "Analytics and optimization to reduce cost and increase efficiency.",
                "features": [
                    "Performance Monitoring",
                    "Predictive Maintenance",
                    "Quality Control Automation",
                    "Planning & Scheduling",
                ],
            },
        ],
        "certifications": [
            "ISO 9001:2015 - Quality Management Systems",
            "ISO 14001:2015 - Environmental Management",
            "ISO 45001:2018 - Occupational Health & Safety",
        ],
    }


@router.get("/company", response_model=CompanyInfo)
async def get_company_info():
    doc = await db.company.find_one({})
    if not doc:
        defaults = _company_defaults()
        await db.company.insert_one(defaults)
        return CompanyInfo(**defaults)
    # patch missing keys with defaults to ensure FE shape
    defaults = _company_defaults()
    merged = {**defaults, **doc}
    merged["address"] = {**defaults.get("address", {}), **doc.get("address", {})}
    merged["contact"] = {**defaults.get("contact", {}), **doc.get("contact", {})}
    merged["stats"] = {**defaults.get("stats", {}), **doc.get("stats", {})}
    return CompanyInfo(**merged)


@router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    items = await db.testimonials.find({"is_active": True}).sort("order", 1).to_list(200)
    return [Testimonial(**i) for i in items]


@router.get("/success-stories", response_model=List[SuccessStory])
async def get_success_stories():
    items = await db.success_stories.find({"is_active": True}).sort("year", -1).to_list(200)
    return [SuccessStory(**i) for i in items]


# ---------------- Announcements ----------------

def _admin_guard(x_admin_token: Optional[str] = Header(None)):
    """
    Minimal admin protection using a header token.
    Set ADMIN_API_TOKEN in .env and send it from your admin tool:
      X-Admin-Token: <token>
    """
    expected = os.getenv("ADMIN_API_TOKEN")
    if not expected or x_admin_token != expected:
        raise HTTPException(status_code=401, detail="Unauthorized")

def _now():
    return datetime.utcnow()

def _to_out(doc) -> AnnouncementOut:
    return AnnouncementOut(
        id=str(doc["_id"]),
        title=doc.get("title"),
        message=doc["message"],
        variant=doc.get("variant","info"),
        cta_text=doc.get("cta_text"),
        cta_href=doc.get("cta_href"),
        starts_at=doc.get("starts_at"),
        ends_at=doc.get("ends_at"),
        enabled=doc.get("enabled", True),
        priority=doc.get("priority", 100),
        dismissible=doc.get("dismissible", True),
        version=doc.get("version", 1),
        created_at=doc["created_at"],
        updated_at=doc["updated_at"],
    )

@router.get("/announcements/public", response_model=List[AnnouncementOut])
async def list_public_announcements(limit: int = 3):
    t = _now()
    q = {
        "enabled": True,
        "$and": [
            {"$or": [{"starts_at": None}, {"starts_at": {"$lte": t}}]},
            {"$or": [{"ends_at": None}, {"ends_at": {"$gt": t}}]},
        ],
    }
    cur = db.announcements.find(q).sort([("priority", 1), ("updated_at", -1)]).limit(limit)
    docs = await cur.to_list(limit)
    return [_to_out(d) for d in docs]

@router.post("/admin/announcements", response_model=AnnouncementOut)
async def create_announcement(payload: AnnouncementIn, _=Depends(_admin_guard)):
    now = _now()
    # 👇 serialize to JSON-safe primitives (str for HttpUrl, etc.)
    doc = payload.model_dump(mode="json")
    doc.update({"created_at": now, "updated_at": now})
    res = await db.announcements.insert_one(doc)
    saved = await db.announcements.find_one({"_id": res.inserted_id})
    return _to_out(saved)

@router.put("/admin/announcements/{aid}", response_model=AnnouncementOut)
async def update_announcement(aid: str, payload: AnnouncementIn, _=Depends(_admin_guard)):
    oid = ObjectId(aid)
    exist = await db.announcements.find_one({"_id": oid})
    if not exist:
        raise HTTPException(404, "Not found")
    # 👇 serialize to JSON-safe primitives
    updates = payload.model_dump(mode="json")
    # auto-bump version if text changed and no bump provided
    if updates.get("version", exist.get("version", 1)) <= exist.get("version", 1) and (
        updates.get("message") != exist.get("message") or updates.get("title") != exist.get("title")
    ):
        updates["version"] = exist.get("version", 1) + 1
    updates["updated_at"] = _now()
    await db.announcements.update_one({"_id": oid}, {"$set": updates})
    saved = await db.announcements.find_one({"_id": oid})
    return _to_out(saved)