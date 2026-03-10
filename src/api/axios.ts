import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig } from "axios";
import { API_BASE } from "@/app/config";

interface ConfigWithRetry {
  _retry?: boolean;
  headers?: Record<string, string>;
  [key: string]: unknown;
}

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // for refresh token cookie
});

// Attach token in memory
api.interceptors.request.use((cfg) => {
  if (accessToken) {
    cfg.headers.Authorization = `Bearer ${accessToken}`;
  }
  return cfg;
});

// Response interceptor to handle 401 via refresh endpoint
let isRefreshing = false;
let refreshQueue: Array<(token: string | null) => void> = [];

async function refreshToken() {
  try {
    const res = await axios.post(`${API_BASE}/auth/refresh`, null, {
      withCredentials: true,
    });
    const token = res.data?.accessToken;
    setAccessToken(token);
    return token;
  } catch {
    setAccessToken(null);
    return null;
  }
}

api.interceptors.response.use(
  (r) => r,
  async (error: AxiosError | AxiosError<unknown>) => {
    const original = error.config as unknown as ConfigWithRetry | undefined;
    if (error.response?.status === 401 && original && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshQueue.push((token) => {
            if (token && original && original.headers)
              original.headers["Authorization"] = `Bearer ${token}`;
            if (original) resolve(api(original as AxiosRequestConfig));
          });
        });
      }
      if (original) original._retry = true;
      isRefreshing = true;
      const token = await refreshToken();
      isRefreshing = false;
      refreshQueue.forEach((cb) => cb(token));
      refreshQueue = [];
      if (token && original && original.headers) {
        original.headers["Authorization"] = `Bearer ${token}`;
        return api(original as AxiosRequestConfig);
      }
      // logout handled by caller
    }
    return Promise.reject(error);
  },
);

export default api;
