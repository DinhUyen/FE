import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://185.213.27.86:5000/api/v1/',
    headers: {'content-type': 'application/json', 'Authorization':`${localStorage.getItem('token')}`}
  });
  export default axiosClient;