import axios from "axios";

const API_BASE = "http://localhost:5000";

export const fetchPackets = async () => {
  const response = await axios.get(`${API_BASE}/api/packets`);
  return response.data;
};
