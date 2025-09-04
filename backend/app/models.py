from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum
import uuid


class ContactStatus(str, Enum):
    NEW = "new"
    CONTACTED = "contacted"
    QUALIFIED = "qualified"
    CLOSED = "closed"


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str
    industry: Optional[str] = None
    company: Optional[str] = None


class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    message: str
    industry: Optional[str] = None
    company: Optional[str] = None
    status: ContactStatus = ContactStatus.NEW
    source: str = "website"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    notes: List[Dict[str, Any]] = []


class Industry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    description: str
    icon: str
    image: str
    features: List[str]
    market_size: Optional[str] = None
    growth: Optional[str] = None
    challenges: List[str] = []
    solutions: List[str] = []
    is_active: bool = True
    order: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)


class Certification(BaseModel):
    id: str
    title: str
    subtitle: Optional[str] = None
    body: Optional[str] = None
    certificateNo: Optional[str] = None
    validTill: Optional[str] = None
    badge: Optional[str] = None
    note: Optional[str] = None


class SolutionPartner(BaseModel):
    name: str
    scope: List[str] = []
    tier: Optional[str] = None
    since: Optional[int] = None
    certificateId: Optional[str] = None
    link: Optional[str] = None
    logo: Optional[str] = None
    highlights: List[str] = []
    validNote: Optional[str] = None


class CompanyInfo(BaseModel):
    name: str = "Consulta Technologies Pvt. Ltd."
    tagline: Optional[str] = None
    description: Optional[str] = None
    address: Dict[str, Any] = {}
    contact: Dict[str, Any] = {}
    stats: Dict[str, Any] = {}
    technologies: List[Dict[str, Any]] = []
    values: List[Dict[str, str]] = []
    capabilities: List[Dict[str, Any]] = []
    certifications: List[str | Dict[str, Any]] = []
    solution_partner: Optional[SolutionPartner] = None


