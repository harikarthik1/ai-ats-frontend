import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ token: string; id: number; email: string; name: string }>('/api/auth/login', { email, password }),
  register: (email: string, password: string) =>
    api.post<{ message: string }>('/api/auth/register', { email, password }),
};

export const resumeApi = {
  upload: (file: File, onProgress: (pct: number) => void) => {
    const fd = new FormData();
    fd.append('file', file);
    return api.post<{ resumeId: number; message: string }>('/api/resume/upload', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (e) => {
        if (e.total) onProgress(Math.round((e.loaded * 100) / e.total));
      },
    });
  },
};

export const analysisApi = {
  analyze: (resumeId: number) =>
    api.post<{
      analysisId: number;
      score: number;
      skills: string[];
      recommendations: string[];
    }>('/api/analysis/analyze', { resumeId }),
  history: () => api.get('/api/analysis/my-history'),
  deleteOne: (id: number) => api.delete(`/api/analysis/${id}`),
};

export default api;
