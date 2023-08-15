import axiosClient from './axios-client'

export const authApi = {
  login(payload: any) {
    return axiosClient.post('/login', payload)
  }
}
