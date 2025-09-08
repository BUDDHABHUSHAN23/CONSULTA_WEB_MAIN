from pydantic import BaseModel, Field, EmailStr , HttpUrl , field_validator
from typing import List, Optional, Dict, Any , Literal
from datetime import datetime
from enum import Enum
import uuid
from urllib.parse import urlparse


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


class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    position: str
    company: str
    message: str
    image: Optional[str] = None
    rating: int = Field(5, ge=1, le=5)
    industry: Optional[str] = None
    is_active: bool = True
    order: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)


class SuccessStory(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    client: str
    industry: str
    challenge: str
    solution: str
    results: List[str]
    timeline: str
    year: int
    image: Optional[str] = None
    is_active: bool = True
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


# ---- Announcements ----
AnnouncementVariant = Literal["info", "warn", "promo"]

class AnnouncementIn(BaseModel):
    title: Optional[str] = Field(None, max_length=120)
    message: str = Field(..., max_length=500)
    variant: AnnouncementVariant = "info"
    cta_text: Optional[str] = None
    cta_href: Optional[str] = None          # <-- string, not HttpUrl
    starts_at: Optional[datetime] = None
    ends_at: Optional[datetime] = None
    enabled: bool = True
    priority: int = 100
    dismissible: bool = True
    version: int = 1  # bump to force re-show

    @field_validator("cta_href", mode="before")
    @classmethod
    def allow_relative_or_absolute(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return None
        v = str(v).strip()
        if not v:
            return None
        # common paste mistake: "/https://..."
        if v.startswith("/http://") or v.startswith("/https://"):
            v = v.lstrip("/")  # normalize to proper absolute url
        if v.startswith("/"):
            return v  # site-relative OK
        u = urlparse(v)
        if u.scheme in ("http", "https") and u.netloc:
            return v  # absolute OK
        raise ValueError("cta_href must be an absolute http(s) URL or a site path starting with '/'")

class AnnouncementOut(AnnouncementIn):
    id: str
    updated_at: datetime
    created_at: datetime


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




# --- helpers ----

def _is_http_url_or_blank(v: Optional[str]) -> Optional[str]:
    if v is None:
        return None
    v = str(v).strip()
    if not v:
        return None
    u = urlparse(v)
    if u.scheme in ("http", "https") and u.netloc:
        return v
    raise ValueError("Must be an absolute http(s) URL")

class LinkItem(BaseModel):
    label: Optional[str] = None
    url: str

    @field_validator("url")
    @classmethod
    def _check_url(cls, v: str) -> str:
        return _is_http_url_or_blank(v)  # will raise if bad

class StoreItem(BaseModel):
    name: str
    url: Optional[str] = None
    region: Optional[str] = None

    @field_validator("url")
    @classmethod
    def _check_url(cls, v: Optional[str]) -> Optional[str]:
        return _is_http_url_or_blank(v)

class RelatedItem(BaseModel):
    slug: str
    title: Optional[str] = None
    tagline: Optional[str] = None
    logo: Optional[str] = None

    @field_validator("logo")
    @classmethod
    def _check_logo(cls, v: Optional[str]) -> Optional[str]:
        return _is_http_url_or_blank(v)

# ---- Products ----
class ProductIn(BaseModel):
    # existing
    title: str
    slug: str
    tagline: Optional[str] = None
    description: Optional[str] = None
    logo: Optional[str] = None
    website: Optional[str] = None
    features: List[str] = Field(default_factory=list)
    categories: List[str] = Field(default_factory=list)
    enabled: bool = True
    order: int = 0

    # NEW — to power your ProductDetail + Products pages
    integrations: List[str] = Field(default_factory=list)
    compatibility: List[str] = Field(default_factory=list)

    docs: List[LinkItem] = Field(default_factory=list)
    resources: List[LinkItem] = Field(default_factory=list)

    insights: List[str] = Field(default_factory=list)         # internal bullets
    internal_notes: Optional[str] = None                      # internal long text

    specs: Dict[str, Any] = Field(default_factory=dict)       # key-value quick facts
    industries: List[str] = Field(default_factory=list)
    use_cases: List[str] = Field(default_factory=list)

    stores: List[StoreItem] = Field(default_factory=list)
    pricing: Optional[str] = None
    license_note: Optional[str] = None

    related: List[RelatedItem] = Field(default_factory=list)

    badge: Optional[str] = None          # e.g. "NEW", "POPULAR"
    popularity: Optional[int] = None     # for sorting if you like

    @field_validator("logo", "website")
    @classmethod
    def _check_http_urls(cls, v: Optional[str]) -> Optional[str]:
        return _is_http_url_or_blank(v)

class ProductOut(ProductIn):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
