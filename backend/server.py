from fastapi import FastAPI, APIRouter, HTTPException, status
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime
from enum import Enum


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Enums
class ContactStatus(str, Enum):
    NEW = "new"
    CONTACTED = "contacted"
    QUALIFIED = "qualified"
    CLOSED = "closed"

class MessageSender(str, Enum):
    USER = "user"
    BOT = "bot"

# Core Models
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    message: str = Field(..., min_length=10, max_length=1000)
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

class ChatMessage(BaseModel):
    text: str
    sender: MessageSender
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ChatbotRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=500)
    session_id: Optional[str] = None

class ChatbotResponse(BaseModel):
    message: str
    session_id: str

class CompanyInfo(BaseModel):
    name: str = "Consulta Technologies Pvt. Ltd."
    tagline: str = "We are an Experienced & Affordable Automation Company!"
    description: str
    vision: str
    mission: str
    address: Dict[str, Any]
    contact: Dict[str, str]
    stats: Dict[str, Any]
    certifications: List[str]
    technologies: List[Dict[str, Any]]
    values: List[Dict[str, str]]
    capabilities: List[Dict[str, Any]]

# Legacy model for backward compatibility
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Chatbot Intelligence
class ChatbotService:
    def __init__(self):
        self.responses = {
            'greeting': [
                "Hello! Welcome to Consulta Technologies. How can I assist you with automation solutions today?",
                "Hi there! I'm here to help you with any questions about our industrial automation services.",
                "Greetings! How may I help you transform your operations with our automation expertise?"
            ],
            'services': [
                "We provide comprehensive automation solutions across 8 major industries: Power, Cement, Material Handling, Steel, Water, Chemical/Pharmaceutical, Food & Beverages, and Oil & Gas. Which industry interests you?",
                "Our services include SCADA systems, PLC programming, DCS implementation, process optimization, and IoT integration. What specific solution are you looking for?"
            ],
            'contact': [
                "You can reach us at +91 22 27560593 or email info@consulta.in. Our office is in Navi Mumbai. Would you like to schedule a consultation?",
                "We're located at International Technology Park, Belapur, Navi Mumbai. Call us at +91 22 27560593 for immediate assistance."
            ],
            'experience': [
                "Consulta Technologies has 15+ years of experience with 500+ successful projects across various industries and a team of 50+ expert engineers.",
                "Since 2008, we've been delivering automation solutions with a 99% client satisfaction rate and expertise across multiple industrial sectors."
            ]
        }
        
        self.industry_responses = {
            'power': "Our Power industry solutions include Smart Grid Systems, Renewable Energy Integration, Power Distribution Automation, and Energy Management Systems with advanced SCADA platforms.",
            'cement': "For Cement industry, we provide Kiln Optimization, Raw Material Blending Automation, Production Line Control, and Quality Management Systems.",
            'steel': "Steel industry automation includes Blast Furnace Control, Rolling Mill Automation, Quality Testing Systems, and Safety Interlock Systems.",
            'water': "Water sector solutions cover Treatment Plant Automation, Distribution Network Management, Quality Monitoring, and SCADA-based Control Systems.",
            'chemical': "Chemical & Pharmaceutical automation includes Process Control Systems, Batch Manufacturing, Compliance Monitoring, and Safety Systems.",
            'food': "Food & Beverage solutions feature Production Line Control, Packaging Automation, Quality Assurance, and Cold Chain Management.",
            'oil': "Oil & Gas automation covers Pipeline Monitoring, Refinery Control Systems, Safety Instrumented Systems, and Distribution Automation.",
            'material': "Material Handling includes Conveyor Control Systems, Warehouse Automation, Robotic Integration, and Inventory Management."
        }

    def generate_response(self, message: str) -> str:
        message_lower = message.lower()
        
        # Greeting detection
        if any(word in message_lower for word in ['hello', 'hi', 'hey', 'greetings']):
            return self._get_random_response('greeting')
        
        # Service inquiries
        if any(word in message_lower for word in ['service', 'solution', 'what do you', 'automation']):
            return self._get_random_response('services')
        
        # Contact information
        if any(word in message_lower for word in ['contact', 'phone', 'email', 'address', 'location']):
            return self._get_random_response('contact')
        
        # Experience questions
        if any(word in message_lower for word in ['experience', 'years', 'projects', 'clients']):
            return self._get_random_response('experience')
        
        # Industry-specific queries
        for industry, response in self.industry_responses.items():
            if industry in message_lower:
                return response
        
        # Technology queries
        if any(word in message_lower for word in ['scada', 'plc', 'dcs', 'hmi', 'technology']):
            return "We work with leading automation technologies including Rockwell Automation, Siemens, Schneider Electric, and Honeywell platforms. Our expertise covers SCADA, PLC programming, DCS systems, and HMI development."
        
        # Pricing queries
        if any(word in message_lower for word in ['price', 'cost', 'quote', 'pricing']):
            return "Our automation solutions are competitively priced based on project scope and requirements. For a detailed quote, please share your specific needs or contact our team at +91 22 27560593."
        
        # Default responses
        default_responses = [
            "Thank you for your inquiry! Could you please provide more details about your automation requirements?",
            "I'd be happy to help with that. For detailed technical discussions, I recommend connecting with our expert team at +91 22 27560593.",
            "That's a great question about automation! Could you specify which industry or application you're interested in?",
            "For comprehensive assistance with your automation needs, please contact our technical team who can provide detailed solutions."
        ]
        
        import random
        return random.choice(default_responses)
    
    def _get_random_response(self, category: str) -> str:
        import random
        return random.choice(self.responses[category])

chatbot_service = ChatbotService()

# API Routes
@api_router.get("/")
async def root():
    return {"message": "Consulta Technologies API", "version": "1.0", "status": "active"}

# Contact Management
@api_router.post("/contacts", response_model=Contact)
async def create_contact(contact_data: ContactCreate):
    try:
        contact = Contact(**contact_data.dict())
        contact_dict = contact.dict()
        
        # Insert into database
        result = await db.contacts.insert_one(contact_dict)
        if not result.inserted_id:
            raise HTTPException(status_code=500, detail="Failed to create contact")
        
        # Log contact creation
        logger.info(f"New contact created: {contact.name} - {contact.email}")
        
        return contact
    except Exception as e:
        logger.error(f"Error creating contact: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/contacts", response_model=List[Contact])
async def get_contacts(skip: int = 0, limit: int = 100):
    try:
        contacts = await db.contacts.find().skip(skip).limit(limit).sort("created_at", -1).to_list(limit)
        return [Contact(**contact) for contact in contacts]
    except Exception as e:
        logger.error(f"Error fetching contacts: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Industries Management
@api_router.get("/industries", response_model=List[Industry])
async def get_industries():
    try:
        # First check if industries exist in database
        industries_count = await db.industries.count_documents({})
        
        if industries_count == 0:
            # Initialize with mock data if database is empty
            await initialize_industries_data()
        
        industries = await db.industries.find({"is_active": True}).sort("order", 1).to_list(100)
        return [Industry(**industry) for industry in industries]
    except Exception as e:
        logger.error(f"Error fetching industries: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/industries/{slug}", response_model=Industry)
async def get_industry_by_slug(slug: str):
    try:
        industry = await db.industries.find_one({"slug": slug, "is_active": True})
        if not industry:
            raise HTTPException(status_code=404, detail="Industry not found")
        return Industry(**industry)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching industry {slug}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Company Information
@api_router.get("/company", response_model=CompanyInfo)
async def get_company_info():
    try:
        # Check if company info exists in database
        company_data = await db.company.find_one({})
        
        if not company_data:
            # Initialize with default data
            await initialize_company_data()
            company_data = await db.company.find_one({})
        
        return CompanyInfo(**company_data)
    except Exception as e:
        logger.error(f"Error fetching company info: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Testimonials
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    try:
        # Check if testimonials exist
        testimonials_count = await db.testimonials.count_documents({})
        
        if testimonials_count == 0:
            await initialize_testimonials_data()
        
        testimonials = await db.testimonials.find({"is_active": True}).sort("order", 1).to_list(100)
        return [Testimonial(**testimonial) for testimonial in testimonials]
    except Exception as e:
        logger.error(f"Error fetching testimonials: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Success Stories
@api_router.get("/success-stories", response_model=List[SuccessStory])
async def get_success_stories():
    try:
        # Check if success stories exist
        stories_count = await db.success_stories.count_documents({})
        
        if stories_count == 0:
            await initialize_success_stories_data()
        
        stories = await db.success_stories.find({"is_active": True}).sort("year", -1).to_list(100)
        return [SuccessStory(**story) for story in stories]
    except Exception as e:
        logger.error(f"Error fetching success stories: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Chatbot
@api_router.post("/chatbot/message", response_model=ChatbotResponse)
async def chatbot_message(request: ChatbotRequest):
    try:
        # Generate session ID if not provided
        session_id = request.session_id or str(uuid.uuid4())
        
        # Generate bot response
        bot_response = chatbot_service.generate_response(request.message)
        
        # Save conversation to database
        conversation_data = {
            "session_id": session_id,
            "messages": [
                {
                    "text": request.message,
                    "sender": "user",
                    "timestamp": datetime.utcnow()
                },
                {
                    "text": bot_response,
                    "sender": "bot", 
                    "timestamp": datetime.utcnow()
                }
            ],
            "created_at": datetime.utcnow(),
            "last_activity": datetime.utcnow()
        }
        
        # Check if conversation exists
        existing_conversation = await db.chatbot_conversations.find_one({"session_id": session_id})
        
        if existing_conversation:
            # Update existing conversation
            await db.chatbot_conversations.update_one(
                {"session_id": session_id},
                {
                    "$push": {
                        "messages": {
                            "$each": conversation_data["messages"]
                        }
                    },
                    "$set": {"last_activity": datetime.utcnow()}
                }
            )
        else:
            # Create new conversation
            await db.chatbot_conversations.insert_one(conversation_data)
        
        return ChatbotResponse(message=bot_response, session_id=session_id)
        
    except Exception as e:
        logger.error(f"Error processing chatbot message: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Legacy endpoints for backward compatibility
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Data Initialization Functions
async def initialize_industries_data():
    """Initialize industries collection with mock data"""
    industries_data = [
        {
            "id": "1",
            "title": "Power",
            "slug": "power",
            "description": "The power industry is the generation, transmission, distribution and sale of electric power to general public.",
            "icon": "⚡",
            "image": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop",
            "features": [
                "Smart Grid Solutions",
                "Renewable Energy Integration", 
                "Power Distribution Automation",
                "Energy Management Systems"
            ],
            "market_size": "₹2.5 Trillion Indian Power Market",
            "growth": "7.2% Annual Growth Rate",
            "challenges": [
                "Grid stability and renewable integration",
                "Aging infrastructure modernization",
                "Smart grid implementation",
                "Energy efficiency optimization"
            ],
            "solutions": [
                "Advanced grid management systems",
                "Renewable energy integration platforms",
                "Smart metering and billing automation",
                "Predictive maintenance for power equipment"
            ],
            "order": 1
        },
        {
            "id": "2", 
            "title": "Cement",
            "slug": "cement",
            "description": "Cement is a binder, a substance used in construction that sets and hardens and can bind other materials together.",
            "icon": "🏗️",
            "image": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
            "features": [
                "Production Line Automation",
                "Quality Control Systems",
                "Kiln Process Optimization", 
                "Raw Material Handling"
            ],
            "market_size": "550 Million Tonnes Annual Production",
            "growth": "5.5% Annual Growth Rate",
            "challenges": [
                "Energy consumption optimization",
                "Environmental compliance",
                "Quality consistency",
                "Equipment reliability"
            ],
            "solutions": [
                "Kiln optimization systems",
                "Raw material blending automation",
                "Emission monitoring and control",
                "Preventive maintenance systems"
            ],
            "order": 2
        },
        {
            "id": "3",
            "title": "Material Handling",
            "slug": "material-handling", 
            "description": "Material handling is the movement, storage, control and protection of material during their manufacturing, distribution, consumption and disposal.",
            "icon": "📦",
            "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop",
            "features": [
                "Conveyor Systems",
                "Robotic Sorting",
                "Warehouse Automation",
                "Inventory Management"
            ],
            "order": 3
        },
        {
            "id": "4",
            "title": "Steel",
            "slug": "steel",
            "description": "It is a business of processing iron ore into steel, which in its simplest form is an iron-carbon alloy and turning that metal into partially finished products.",
            "icon": "🏭",
            "image": "https://images.unsplash.com/photo-1565611769519-e4c1e5f68549?w=400&h=300&fit=crop",
            "features": [
                "Blast Furnace Control",
                "Rolling Mill Automation", 
                "Quality Testing Systems",
                "Scrap Processing"
            ],
            "market_size": "₹12 Lakh Crore Industry Size",
            "growth": "6.2% Annual Growth Rate",
            "order": 4
        },
        {
            "id": "5",
            "title": "Water",
            "slug": "water",
            "description": "It provides drinking water and waste water services to residential, commercial and industrial sectors of the economy.",
            "icon": "💧",
            "image": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
            "features": [
                "Water Treatment Plants",
                "Distribution Networks",
                "Quality Monitoring", 
                "Wastewater Management"
            ],
            "order": 5
        },
        {
            "id": "6", 
            "title": "Chemical / Pharmaceutical",
            "slug": "chemical-pharmaceutical",
            "description": "These industries are basic industries and it is vital to the economy of the nation. It also provides household chemical and medicine for the national pharmaceutical service.",
            "icon": "🧪",
            "image": "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop",
            "features": [
                "Process Control Systems",
                "Batch Manufacturing",
                "Compliance Monitoring",
                "Safety Systems"
            ],
            "order": 6
        },
        {
            "id": "7",
            "title": "Food & Beverages", 
            "slug": "food-beverages",
            "description": "Food and beverage industry produce a consistent quality product with low operating costs.",
            "icon": "🍽️",
            "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
            "features": [
                "Production Line Control",
                "Packaging Automation",
                "Quality Assurance",
                "Cold Chain Management"
            ],
            "order": 7
        },
        {
            "id": "8",
            "title": "Oil & Gas",
            "slug": "oil-gas",
            "description": "An oil & gas industry is a business entity that engages in the exploration, production, refinement and distribution of oil and gas products.",
            "icon": "🛢️", 
            "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            "features": [
                "Pipeline Monitoring",
                "Refinery Automation",
                "Safety Systems",
                "Distribution Networks"
            ],
            "order": 8
        }
    ]
    
    # Add timestamps to all industries
    for industry in industries_data:
        industry["is_active"] = True
        industry["created_at"] = datetime.utcnow()
    
    await db.industries.insert_many(industries_data)
    logger.info(f"Initialized {len(industries_data)} industries")

async def initialize_company_data():
    """Initialize company information"""
    company_data = {
        "name": "Consulta Technologies Pvt. Ltd.",
        "tagline": "We are an Experienced & Affordable Automation Company!",
        "description": "Leading provider of industrial automation solutions with expertise across multiple industries.",
        "vision": "To be the global leader in providing innovative automation solutions that drive industrial transformation and sustainable growth.",
        "mission": "Empowering industries through state-of-the-art automation technologies, expert consulting, and comprehensive support services that enhance productivity, safety, and efficiency.",
        "address": {
            "building": "Tower 5, K-Block",
            "area": "International Technology Park", 
            "location": "Belapur Railway Station Building",
            "city": "Navi Mumbai",
            "state": "Maharashtra",
            "pincode": "400 614",
            "coordinates": {
                "lat": 19.0176147,
                "lng": 73.0365315
            }
        },
        "contact": {
            "phone": "+91 22 27560593",
            "email": "info@consulta.in",
            "hours": "Mon to Sat :: 10.00 AM - 06.00 PM"
        },
        "stats": {
            "years_experience": 15,
            "projects_completed": 500,
            "expert_engineers": 50,
            "client_satisfaction": 99
        },
        "certifications": [
            "ISO 9001:2015 - Quality Management Systems",
            "ISO 14001:2015 - Environmental Management",
            "ISO 45001:2018 - Occupational Health & Safety",
            "IEC 61508 - Functional Safety",
            "Rockwell Automation Gold Partner",
            "Schneider Electric Alliance Partner"
        ],
        "technologies": [
            {
                "category": "PLC/DCS Platforms",
                "technologies": [
                    "Rockwell Automation (Allen-Bradley)",
                    "Schneider Electric (Modicon)",
                    "Siemens (S7 Series)",
                    "GE (PACSystems)",
                    "Honeywell (Experion PKS)"
                ]
            },
            {
                "category": "SCADA/HMI Systems",
                "technologies": [
                    "Wonderware InTouch",
                    "GE iFIX",
                    "Siemens WinCC",
                    "Rockwell FactoryTalk View"
                ]
            }
        ],
        "values": [
            {
                "title": "Innovation",
                "description": "Continuously pushing the boundaries of automation technology"
            },
            {
                "title": "Quality", 
                "description": "Delivering excellence in every project and service"
            },
            {
                "title": "Reliability",
                "description": "Providing dependable solutions with 99% uptime guarantee"
            }
        ],
        "capabilities": [
            {
                "category": "System Integration",
                "description": "Complete automation system design, integration, and commissioning services for seamless operations.",
                "features": [
                    "SCADA & HMI Development",
                    "PLC Programming & Configuration",
                    "DCS Implementation",
                    "MES & ERP Integration"
                ]
            }
        ]
    }
    
    await db.company.insert_one(company_data)
    logger.info("Initialized company data")

async def initialize_testimonials_data():
    """Initialize testimonials"""
    testimonials_data = [
        {
            "id": "1",
            "name": "Rajesh Kumar",
            "position": "Plant Manager", 
            "company": "Steel Industries Ltd.",
            "message": "Consulta's automation solutions have significantly improved our production efficiency and reduced operational costs.",
            "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            "rating": 5,
            "industry": "Steel",
            "order": 1
        },
        {
            "id": "2",
            "name": "Priya Sharma", 
            "position": "Operations Director",
            "company": "Chemical Works Pvt.",
            "message": "Their expertise in chemical process automation is unmatched. Excellent service and support.",
            "image": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
            "rating": 5,
            "industry": "Chemical",
            "order": 2
        },
        {
            "id": "3",
            "name": "Michael Rodriguez",
            "position": "Chief Engineer", 
            "company": "Power Solutions Inc.",
            "message": "Professional team with deep technical knowledge. They delivered our project on time and within budget.",
            "image": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
            "rating": 5,
            "industry": "Power",
            "order": 3
        }
    ]
    
    for testimonial in testimonials_data:
        testimonial["is_active"] = True
        testimonial["created_at"] = datetime.utcnow()
    
    await db.testimonials.insert_many(testimonials_data)
    logger.info(f"Initialized {len(testimonials_data)} testimonials")

async def initialize_success_stories_data():
    """Initialize success stories"""
    success_stories_data = [
        {
            "id": "1",
            "title": "Steel Plant Modernization",
            "client": "Leading Steel Manufacturer",
            "industry": "Steel",
            "challenge": "Outdated blast furnace control system causing production inefficiencies",
            "solution": "Complete DCS upgrade with advanced process control algorithms",
            "results": [
                "15% increase in production efficiency",
                "₹50 Crore annual cost savings",
                "Zero safety incidents since implementation",
                "Reduced energy consumption by 12%"
            ],
            "timeline": "8 months",
            "year": 2023
        },
        {
            "id": "2",
            "title": "Power Grid Automation", 
            "client": "State Electricity Board",
            "industry": "Power",
            "challenge": "Manual grid operations leading to frequent outages",
            "solution": "Automated SCADA system with real-time monitoring",
            "results": [
                "90% reduction in unplanned outages",
                "Improved grid reliability to 99.8%",
                "30% faster fault detection and resolution",
                "Enhanced renewable energy integration"
            ],
            "timeline": "12 months",
            "year": 2022
        },
        {
            "id": "3",
            "title": "Cement Plant Optimization",
            "client": "Major Cement Producer",
            "industry": "Cement", 
            "challenge": "High energy costs and inconsistent product quality",
            "solution": "Kiln automation with AI-based optimization",
            "results": [
                "8% reduction in specific energy consumption",
                "Improved product quality consistency by 95%",
                "₹25 Crore annual energy savings",
                "Reduced CO2 emissions by 10%"
            ],
            "timeline": "6 months",
            "year": 2023
        }
    ]
    
    for story in success_stories_data:
        story["is_active"] = True
        story["created_at"] = datetime.utcnow()
    
    await db.success_stories.insert_many(success_stories_data)
    logger.info(f"Initialized {len(success_stories_data)} success stories")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
