import { request } from './generic.service'

const createPost = data => request({ url: 'post', method: 'post', data })

export { createPost }
