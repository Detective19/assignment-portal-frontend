import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://assignment-portal-backend-a8gg.onrender.com"
});

API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;

});

export default API;
