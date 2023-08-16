import { RegisterPayload } from '@/types'
import axiosClient from './axios-client'

export const authApi = {
  register(payload: RegisterPayload) {
    return axiosClient.post('/api/register', payload)
  }
}
