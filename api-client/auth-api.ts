import { RegisterPayload } from '@/types'
import axiosClient from './axios-client'

export const authApi = {
  register(payload: RegisterPayload): Promise<any> {
    return axiosClient.post('/api/register', payload)
  }
}
