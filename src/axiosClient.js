import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://185.213.27.86:5000/api/v1/',
    headers: {"Content-Type": "application/json", 'Authorization':`${localStorage.getItem('token')}`}
  });

  // const requestInterceptor = config => {
  //   config.headers['Content-Type'] = 'application/json';
  //   return config;
  // }
  
  axiosClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = token
    }

    return config;
  })
  export default axiosClient;

  