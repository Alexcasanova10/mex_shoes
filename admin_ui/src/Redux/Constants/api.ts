import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:9000", 
  baseURL: "https://mex-shoes.vercel.app", 

});

export default api;
