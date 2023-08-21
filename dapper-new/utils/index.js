import axios from "axios";

// Set config defaults when creating the instance
const axiosInstance = axios.create({
  baseURL: "https://api.thedapperapp.com.au/api/",
});

//   Alter defaults after instance has been created
//   instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default axiosInstance;
