import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
console.log("API: " + apiUrl);

const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;