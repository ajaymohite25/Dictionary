import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dictionary123.herokuapp.com", //BACKEND NODEJS SERVER API
});

export default axiosInstance;
