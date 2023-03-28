import { request } from './generic.service'

const register = data => request({ url: 'auth/register', method: 'post', data })
const login = data => request({ url: 'auth/login', method: 'post', data })
const me = () => request({ url: 'auth/me', method: 'get' })

export { register, login, me }
