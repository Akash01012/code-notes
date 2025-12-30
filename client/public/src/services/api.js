import axios from "axios";

const api = axios.create({
  baseURL: __API_URL__+ "/api"
});

export default api;
