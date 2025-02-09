import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api"; // Backend URL

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`; // Correct: Use the token string directly
  }
  return req;
});

// Helper function for POST requests
const post = async (url, data) => {
  try {
    const response = await API.post(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

// Helper function for GET requests
const get = async (url) => {
  try {
    const response = await API.get(url);
    return response;
  } catch (error) {
    throw error;
  }
};

// Helper function for PUT requests
const put = async (url, data) => {
  try {
    const response = await API.put(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

// Helper function for DELETE requests
const del = async (url) => {
  // Use "del" instead of "delete" to avoid conflicts with the "delete" keyword
  try {
    const response = await API.delete(url);
    return response;
  } catch (error) {
    throw error;
  }
};

export default {
  post,
  get,
  put,
  delete: del, // Export "delete" as "del"
};
