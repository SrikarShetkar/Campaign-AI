import axios from 'axios';

// Enterprise Axios API Service — connects to FastAPI backend on port 8000
// Falls back gracefully to mock data if backend is offline
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 60000, // 60s timeout — multi-agent pipeline takes ~5-15s
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('campaignmind_auth_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.warn('[CampaignMind] Backend offline — using mock data fallback.');
    }
    return Promise.reject(error);
  }
);

export default api;
