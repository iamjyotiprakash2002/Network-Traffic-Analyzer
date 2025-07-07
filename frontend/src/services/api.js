import axios from "axios";

const API_BASE = "http://localhost:5000";
//const API_BASE = "https://your-render-app-url.onrender.com";


export const fetchPackets = async () => {
  const response = await axios.get(`${API_BASE}/api/packets`);
  return response.data;
};
