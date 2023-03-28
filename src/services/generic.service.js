import axios from '@/services/axios'

export const request = async ({ url, method, data = {} }) => {
  const response = await axios[method](url, data)
  return response
}
