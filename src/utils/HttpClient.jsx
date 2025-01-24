import axios from "axios";

const HttpClient = axios.create({
  baseURL: "http://localhost:5555", // Ensure this is the correct backend URL
  withCredentials: true, // Allow sending credentials (cookies)
});

export default HttpClient;
