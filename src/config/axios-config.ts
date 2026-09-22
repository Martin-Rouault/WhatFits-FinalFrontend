import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";
const csrfUrl = import.meta.env.VITE_CSRF_ENDPOINT || "http://localhost:8000/sanctum/csrf-cookie";

/**
 * 1. Instance CSRF
 */
export const getCsrfCookie = () =>
  axios.get(csrfUrl, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
  });

/**
 * 1. Instance API
 */
export const api = axios.create({
  baseURL: `${baseUrl}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

/**
 * 1. Instance API
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 419) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);