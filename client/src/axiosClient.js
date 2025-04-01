import axios from "axios";

const axiosClient = axios.create({
 baseURL:`${import.meta.env.VITE_API_BASE_URL}/api`
})

// Add token from local storage to each request
axiosClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("Token"); // Retrieve token from local storage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  

export default axiosClient