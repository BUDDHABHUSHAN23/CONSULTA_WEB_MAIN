import axios from "axios";

// Resolve backend base URL (Vite env → window override → sensible local default)
function resolveBackendUrl() {
  const envUrl = (import.meta.env.VITE_BACKEND_URL || "").trim();
  if (envUrl) return envUrl.replace(/\/$/, "");

  if (typeof window !== "undefined") {
    const { hostname, port } = window.location;
    const isDevPort = ["3000", "3001", "5173"].includes(port);
    const isPrivateNet = /^10\.|^172\.(1[6-9]|2\d|3[0-1])\.|^192\.168\./.test(hostname);
    const isLocal = ["localhost", "127.0.0.1"].includes(hostname) || isPrivateNet || isDevPort;
    if (isLocal) {
      console.warn("VITE_BACKEND_URL not set; using fallback http://localhost:8000");
      return "http://localhost:8000";
    }
  }

  return "http://localhost:8000";
}

const BACKEND_URL = resolveBackendUrl();
const API_BASE = `${BACKEND_URL}/api`;

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ---- APIs ----
export const contactAPI = {
  create: async (contactData) => (await apiClient.post("/contacts", contactData)).data,
  getAll:  async (skip = 0, limit = 100) => (await apiClient.get(`/contacts?skip=${skip}&limit=${limit}`)).data,
};

export const industriesAPI = {
  getAll:  async () => (await apiClient.get("/industries")).data,
  getBySlug: async (slug) => (await apiClient.get(`/industries/${slug}`)).data,
};

export const companyAPI = {
  getInfo: async () => (await apiClient.get("/company")).data,
};

export const testimonialsAPI = {
  getAll: async () => (await apiClient.get("/testimonials")).data,
};

export const successStoriesAPI = {
  getAll: async () => (await apiClient.get("/success-stories")).data,
};

export const chatbotAPI = {
  sendMessage: async (message, sessionId = null) =>
    (await apiClient.post("/chatbot/message", { message, session_id: sessionId })).data,
};

export const testConnection = async () => (await apiClient.get("/")).data;

const api = {
  contact: contactAPI,
  industries: industriesAPI,
  company: companyAPI,
  testimonials: testimonialsAPI,
  successStories: successStoriesAPI,
  chatbot: chatbotAPI,
  testConnection,
};

export default api;
