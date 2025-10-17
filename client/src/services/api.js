import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Dashboard API
export const dashboardAPI = {
  getMetrics: () => api.get('/dashboard/metrics'),
  getCharts: () => api.get('/dashboard/charts'),
  getActivities: () => api.get('/dashboard/activities'),
};

// Users API
export const usersAPI = {
  getUsers: () => api.get('/users'),
  getUser: (id) => api.get(`/users/${id}`),
  getUserStats: () => api.get('/users/stats/overview'),
};

// Analytics API
export const analyticsAPI = {
  getPageViews: () => api.get('/analytics/pageviews'),
  getRevenue: () => api.get('/analytics/revenue'),
  getConversions: () => api.get('/analytics/conversions'),
  getSummary: () => api.get('/analytics/summary'),
};

// Health check
export const healthCheck = () => api.get('/health');

export default api;