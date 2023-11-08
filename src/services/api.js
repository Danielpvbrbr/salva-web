import axios from "axios";

let api = axios.create({
  // baseURL: 'http://177.153.59.218:5000/',

  // baseURL: 'https://salva.devserver.ga/salva', 
  baseURL: 'https://s7200s.vps-kinghost.net',
});

export default api;
