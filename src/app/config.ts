export const API_BASE =
  import.meta.env.VITE_API_BASE ||
  // Fallback local dev backend URL. Update this to your running backend service.
  // Default to the local API server used by the backend project.
  "http://localhost:3000/api";
export const DEFAULT_LANGUAGE = "en";
