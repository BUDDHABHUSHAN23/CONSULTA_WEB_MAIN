from fastapi import APIRouter, HTTPException
from typing import List
from .db import db
from .models import Contact, ContactCreate, Industry, CompanyInfo
from datetime import datetime

router = APIRouter(prefix="/api")


@router.post("/contacts", response_model=Contact)
async def create_contact(contact_data: ContactCreate):
    c = Contact(**contact_data.model_dump())
    res = await db.contacts.insert_one(c.model_dump())
    if not res.inserted_id:
        raise HTTPException(status_code=500, detail="Failed to create contact")
    return c


@router.get("/contacts", response_model=List[Contact])
async def get_contacts(skip: int = 0, limit: int = 100):
    items = await db.contacts.find().skip(skip).limit(limit).sort("created_at", -1).to_list(limit)
    return [Contact(**i) for i in items]


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


