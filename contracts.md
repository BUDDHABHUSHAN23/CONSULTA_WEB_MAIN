# Backend Implementation Contracts

## API Endpoints Overview

### 1. Contact Management
- **POST /api/contacts** - Submit contact form
- **GET /api/contacts** - Get all contacts (admin)
- **GET /api/contacts/:id** - Get specific contact
- **PUT /api/contacts/:id** - Update contact status

### 2. Industries Management
- **GET /api/industries** - Get all industries with details
- **GET /api/industries/:slug** - Get specific industry by slug
- **POST /api/industries** - Add new industry (admin)
- **PUT /api/industries/:id** - Update industry (admin)

### 3. Company Information
- **GET /api/company** - Get company details, stats, certifications
- **PUT /api/company** - Update company information (admin)

### 4. Testimonials
- **GET /api/testimonials** - Get all testimonials
- **POST /api/testimonials** - Add new testimonial (admin)
- **PUT /api/testimonials/:id** - Update testimonial (admin)
- **DELETE /api/testimonials/:id** - Delete testimonial (admin)

### 5. Success Stories
- **GET /api/success-stories** - Get all success stories
- **GET /api/success-stories/:id** - Get specific success story
- **POST /api/success-stories** - Add new success story (admin)

### 6. Chatbot
- **POST /api/chatbot/message** - Process chatbot message
- **GET /api/chatbot/conversations** - Get conversation history (admin)

### 7. Analytics & Insights
- **GET /api/analytics/stats** - Get website statistics
- **POST /api/analytics/track** - Track user interactions

## Database Models

### Contact Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, validated),
  phone: String (required),
  message: String (required),
  industry: String (optional),
  company: String (optional),
  status: String (enum: ['new', 'contacted', 'qualified', 'closed']),
  source: String (default: 'website'),
  createdAt: Date,
  updatedAt: Date,
  notes: [{ 
    text: String, 
    addedBy: String, 
    addedAt: Date 
  }]
}
```

### Industry Model
```javascript
{
  _id: ObjectId,
  title: String (required),
  slug: String (required, unique),
  description: String (required),
  icon: String,
  image: String,
  features: [String],
  marketSize: String,
  growth: String,
  challenges: [String],
  solutions: [String],
  isActive: Boolean (default: true),
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Company Model
```javascript
{
  _id: ObjectId,
  name: String,
  tagline: String,
  description: String,
  vision: String,
  mission: String,
  address: {
    building: String,
    area: String,
    location: String,
    city: String,
    state: String,
    pincode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  contact: {
    phone: String,
    email: String,
    hours: String
  },
  stats: {
    yearsExperience: Number,
    projectsCompleted: Number,
    expertEngineers: Number,
    clientSatisfaction: Number
  },
  certifications: [String],
  technologies: [{
    category: String,
    technologies: [String]
  }],
  values: [{
    title: String,
    description: String
  }],
  capabilities: [{
    category: String,
    description: String,
    features: [String]
  }]
}
```

### Testimonial Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  position: String (required),
  company: String (required),
  message: String (required),
  image: String,
  rating: Number (1-5),
  industry: String,
  isActive: Boolean (default: true),
  order: Number,
  createdAt: Date
}
```

### Success Story Model
```javascript
{
  _id: ObjectId,
  title: String (required),
  client: String (required),
  industry: String (required),
  challenge: String (required),
  solution: String (required),
  results: [String],
  timeline: String,
  year: Number,
  image: String,
  isActive: Boolean (default: true),
  createdAt: Date
}
```

### Chatbot Conversation Model
```javascript
{
  _id: ObjectId,
  sessionId: String (required),
  messages: [{
    text: String,
    sender: String (enum: ['user', 'bot']),
    timestamp: Date,
    intent: String (optional)
  }],
  userInfo: {
    ip: String,
    userAgent: String,
    location: String (optional)
  },
  isActive: Boolean (default: true),
  createdAt: Date,
  lastActivity: Date
}
```

## Mock Data to Replace

### Frontend Mock Files:
1. **src/data/mock.js** - Industries, company info, stats, testimonials
2. **src/data/enhancedContent.js** - Company details, capabilities, tech stack, success stories

### Mock Data Migration Plan:
1. **Industries**: Convert mock.js industries array to database records
2. **Company Info**: Convert companyInfo object to Company model
3. **Stats**: Integrate stats into Company model
4. **Testimonials**: Convert testimonials array to Testimonial model
5. **Success Stories**: Convert successStories array to SuccessStory model
6. **Technologies**: Convert technologyStack to Company.technologies

## Frontend Integration Strategy

### 1. API Service Layer
- Create `src/services/api.js` for all API calls
- Implement error handling and loading states
- Add request interceptors for authentication

### 2. State Management
- Use React hooks for local state
- Implement loading/error states for all API calls
- Add optimistic updates where appropriate

### 3. Component Updates
- Replace import statements from mock files
- Add useEffect hooks for data fetching
- Implement proper error boundaries

### 4. Form Handling
- Contact form submission to POST /api/contacts
- Toast notifications for success/error states
- Form validation and sanitization

### 5. Chatbot Integration
- Connect to POST /api/chatbot/message
- Implement session management
- Add typing indicators and response delays

## Backend Implementation Phases

### Phase 1: Core Setup
- Database models and schemas
- Basic CRUD operations
- Input validation and sanitization

### Phase 2: Business Logic
- Contact form processing with email notifications
- Chatbot intelligent response system
- Data aggregation for analytics

### Phase 3: Admin Features
- Authentication system for admin routes
- Content management endpoints
- Analytics dashboard data

### Phase 4: Integration & Testing
- Frontend API integration
- End-to-end testing
- Performance optimization

## Security Considerations
- Input validation and sanitization
- Rate limiting for contact forms and chatbot
- CORS configuration
- Environment variable protection
- SQL injection prevention (NoSQL injection)

## Performance Optimizations
- Database indexing for frequently queried fields
- Response caching for static data
- Pagination for large datasets
- Image optimization for testimonials/success stories