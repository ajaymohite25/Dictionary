import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://authapp1234.herokuapp.com",
});

export default axiosInstance;
