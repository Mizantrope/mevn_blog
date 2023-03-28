import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
})

instance.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('token') || null
  return config
})

export default instance
