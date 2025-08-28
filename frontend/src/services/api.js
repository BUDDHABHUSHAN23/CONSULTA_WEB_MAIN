import axios from 'axios';

// Resolve backend base URL with safe fallbacks
function resolveBackendUrl() {
  const envUrl = process.env.REACT_APP_BACKEND_URL;
  if (envUrl && /^https?:\/\//i.test(envUrl)) {
    return envUrl.replace(/\/$/, '');
  }

  if (typeof window !== 'undefined') {
    const { hostname, port } = window.location;
    const isDevPort = port === '3000' || port === '3001' || port === '5173';
    const isPrivateNet = /^10\.|^172\.(1[6-9]|2\d|3[0-1])\.|^192\.168\./.test(hostname);
    const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || isPrivateNet || isDevPort;
    if (isLocal) {
      console.warn('REACT_APP_BACKEND_URL not set; using fallback http://localhost:8000');
      return 'http://localhost:8000';
    }
  }

  // Final defensive fallback to avoid Invalid URL errors in dev
  return 'http://localhost:8000';
}

const BACKEND_URL = resolveBackendUrl();
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    if (error.message && /Invalid URL/i.test(error.message)) {
      console.error('Base URL used:', API_BASE);
    }
    return Promise.reject(error);
  }
);

// API Service Functions

// Contact Management
export const contactAPI = {
  // Submit contact form
  create: async (contactData) => {
    try {
      const response = await apiClient.post('/contacts', contactData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to submit contact form');
    }
  },

  // Get all contacts (admin)
  getAll: async (skip = 0, limit = 100) => {
    try {
      const response = await apiClient.get(`/contacts?skip=${skip}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch contacts');
    }
  }
};

// Industries Management
export const industriesAPI = {
  // Get all industries
  getAll: async () => {
    try {
      const response = await apiClient.get('/industries');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch industries');
    }
  },

  // Get specific industry by slug
  getBySlug: async (slug) => {
    try {
      const response = await apiClient.get(`/industries/${slug}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch industry details');
    }
  }
};

// Company Information
export const companyAPI = {
  // Get company information
  getInfo: async () => {
    try {
      const response = await apiClient.get('/company');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch company information');
    }
  }
};

// Testimonials
export const testimonialsAPI = {
  // Get all testimonials
  getAll: async () => {
    try {
      const response = await apiClient.get('/testimonials');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch testimonials');
    }
  }
};

// Success Stories
export const successStoriesAPI = {
  // Get all success stories
  getAll: async () => {
    try {
      const response = await apiClient.get('/success-stories');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch success stories');
    }
  }
};

// Chatbot
export const chatbotAPI = {
  // Send message to chatbot
  sendMessage: async (message, sessionId = null) => {
    try {
      const response = await apiClient.post('/chatbot/message', {
        message,
        session_id: sessionId
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to process chatbot message');
    }
  }
};

// Test API connection
export const testConnection = async () => {
  try {
    const response = await apiClient.get('/');
    return response.data;
  } catch (error) {
    throw new Error('Failed to connect to backend API');
  }
};

// Export all APIs as default object
const api = {
  contact: contactAPI,
  industries: industriesAPI,
  company: companyAPI,
  testimonials: testimonialsAPI,
  successStories: successStoriesAPI,
  chatbot: chatbotAPI,
  testConnection
};

export default api;