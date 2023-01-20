import axios from "axios";

let api = axios.create({
  baseURL: 'http://149.56.166.222:5000/',
  // baseURL: 'https://salva.devserver.ga/salva', 
  //  baseURL: 'http://localhost:5000',
});

export default api;
