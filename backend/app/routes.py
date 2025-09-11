from fastapi import APIRouter, HTTPException, BackgroundTasks, Depends, Header , Query  , Body
from fastapi.responses import JSONResponse
from typing import List, Optional
from datetime import datetime
import os
from pydantic import ValidationError

from bson import ObjectId

from .db import db
from .models import (
    Contact, ContactCreate, Industry, CompanyInfo,
    Testimonial, SuccessStory, AnnouncementIn, AnnouncementOut,
    ProductIn, ProductOut
)

from .services.mailer import (
    send_contact_notification,   # <-- use this instead of raw send_email
    check_mailer,
    send_test_email,
)

ADMIN_API_TOKEN = os.getenv("ADMIN_API_TOKEN", "")

router = APIRouter(prefix="/api")



# ---------------- annoucment ---------------

def _admin_guard(x_admin_token: Optional[str] = Header(None)):
    """
    Minimal admin protection using a header token.
    Set ADMIN_API_TOKEN in .env and send it from your admin tool:
      X-Admin-Token: <token>
    """
    expected = os.getenv("ADMIN_API_TOKEN")
    if not expected or x_admin_token != expected:
        raise HTTPException(status_code=401, detail="Unauthorized")

# ---------------- Health check --------------

@router.get("/health")
async def health():
    return {"status": "ok"}

@router.get("/health/mailer")
async def mailer_health():
    return await check_mailer()

@router.post("/health/mailer/test", dependencies=[Depends(_admin_guard)])
async def mailer_test(to: list[str] = Body(default=[])):
    # optional: pass explicit recipients; otherwise env NOTIFY_TO (or SMTP_USER) is used
    return await send_test_email(to=to or None)
# ---------------- Contacts ----------------

@router.post("/contacts", response_model=Contact)
async def create_contact(contact_data: ContactCreate, bt: BackgroundTasks):
    c = Contact(**contact_data.model_dump())

    res = await db.contacts.insert_one(c.model_dump())
    if not res.inserted_id:
        raise HTTPException(status_code=500, detail="Failed to create contact")

    # fire-and-forget email using the helper (handles subject, HTML, text, Reply-To, CC/BCC from env)
    payload = {
        "name": c.name,
        "email": c.email,
        "phone": c.phone,
        "company": c.company,
        "industry": c.industry,
        "message": c.message,
    }
    bt.add_task(send_contact_notification, payload)

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
    out = []
    for d in docs:
        try:
            out.append(_to_out(d))
        except ValidationError:
            # log and skip the bad row
            pass
    return out

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


# ---------------- Products ----------------

def _to_product(doc) -> ProductOut:
    # allow both Mongo _id and logical id field
    data = {**doc}
    data["id"] = str(doc.get("_id", doc.get("id")))
    return ProductOut(**data)

@router.get("/products", response_model=List[ProductOut])
async def list_products(
    q: Optional[str] = Query(None, description="Text search on title/tagline/categories"),
    category: Optional[str] = Query(None, description="Filter by single category"),
    limit: int = Query(200, ge=1, le=500),
    skip: int = Query(0, ge=0),
    sort: Optional[str] = Query(None, description="order|title|created|popularity"),
    order: int = Query(1, description="1 asc, -1 desc"),
):
    """
    Lightweight search that matches your FE filtering.
    """
    mongo_query = {"enabled": True}

    if q:
        # Basic OR match; if you have text indexes you can switch to $text
        q_rx = {"$regex": q, "$options": "i"}
        mongo_query["$or"] = [
            {"title": q_rx},
            {"tagline": q_rx},
            {"categories": q_rx},
        ]

    if category and category.strip().lower() not in ("all", ""):
        mongo_query["categories"] = category

    # sort mapping to mongodb keys
    sort_map = {
        "order": ("order", 1),
        "title": ("title", 1),
        "created": ("created_at", -1),
        "popularity": ("popularity", -1),
    }
    if sort in sort_map:
        key, default_dir = sort_map[sort]
        dir_ = order if order in (1, -1) else default_dir
        cur = db.products.find(mongo_query).sort(key, dir_).skip(skip).limit(limit)
    else:
        cur = db.products.find(mongo_query).sort("order", 1).skip(skip).limit(limit)

    docs = await cur.to_list(length=limit)
    return [_to_product(d) for d in docs]

@router.get("/products/{slug}", response_model=ProductOut)
async def get_product(slug: str):
    doc = await db.products.find_one({"slug": slug, "enabled": True})
    if not doc:
        raise HTTPException(404, "Product not found")
    return _to_product(doc)

@router.post("/admin/products", response_model=ProductOut)
async def create_product(payload: ProductIn, _=Depends(_admin_guard)):
    now = _now()
    doc = payload.model_dump(mode="json")
    doc.update({"created_at": now, "updated_at": now})
    res = await db.products.insert_one(doc)
    saved = await db.products.find_one({"_id": res.inserted_id})
    return _to_product(saved)

# -------------- Industry Sections (for FE scroll-UI) ---------------

@router.get("/industries/sections")
async def get_industry_sections():
    sections = [
        {
            "id": "cement",
            "title": "Cement",
            "subtitle": "Kiln, stacker/reclaimer, packing",
            "bullets": [
                "PCS 7/CEMAT templates and interlocks",
                "Energy KPIs for mills and fans",
                "Baghouse, coolers, and blending automation",
            ],
            "image": "/logos/ultratech.png",
        },
        {
            "id": "power",
            "title": "Power",
            "subtitle": "Boiler-TG, BOP, water systems",
            "bullets": [
                "DCS/SCADA upgrades with hot cutover",
                "Historian and alarm rationalization",
                "OPC UA gateways for OEM islands",
            ],
            "image": "/logos/tatapower.jpg",
        },
        {
            "id": "steel",
            "title": "Steel",
            "subtitle": "SMS, CRM, utilities",
            "bullets": [
                "Drive coordination and inter-area handshakes",
                "Roll tracking, coil and heat genealogy",
                "Energy and water balance dashboards",
            ],
            "image": "/logos/jswcement.png",
        },
        {
            "id": "water",
            "title": "Water & Wastewater",
            "subtitle": "Treatment, lift stations, reservoirs",
            "bullets": [
                "Redundant PLC/SCADA, remote telemetry",
                "Event-based reporting and incident replays",
                "GIS-friendly tags and meta data",
            ],
            "image": "/logos/mcgm.png",
        },
        {
            "id": "pharma",
            "title": "Pharma & Life sciences",
            "subtitle": "HVAC, WFI/clean utilities",
            "bullets": [
                "Audit trails, electronic signatures",
                "Batch with ISA-88 structures",
                "Validated reporting and CFR Part 11",
            ],
            "image": "/logos/jnj.png",
        },
    ]
    return JSONResponse(content={"items": sections})

@router.put("/admin/products/{pid}", response_model=ProductOut)
async def update_product(pid: str, payload: ProductIn, _=Depends(_admin_guard)):
    oid = ObjectId(pid)
    exist = await db.products.find_one({"_id": oid})
    if not exist:
        raise HTTPException(404, "Not found")
    updates = payload.model_dump(mode="json")
    updates["updated_at"] = _now()
    await db.products.update_one({"_id": oid}, {"$set": updates})
    saved = await db.products.find_one({"_id": oid})
    return _to_product(saved)