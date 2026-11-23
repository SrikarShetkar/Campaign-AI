import axios from 'axios';

// Enterprise Axios API Service — connects to FastAPI backend on port 8000
// Falls back gracefully to mock data if backend is offline
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 60000, // 60s timeout — multi-agent pipeline takes ~5-15s
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.warn('[CampaignMind] API unavailable; using illustrative demo data.');
    }
    return Promise.reject(error);
  }
);

export default api;
