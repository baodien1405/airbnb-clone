import axiosClient from './axios-client'
import { SafeUser } from '@/types'

export const favoriteApi = {
  update(id: string): Promise<SafeUser> {
    return axiosClient.post(`/api/favorites/${id}`)
  },
  delete(id: string): Promise<SafeUser> {
    return axiosClient.delete(`/api/favorites/${id}`)
  }
}
