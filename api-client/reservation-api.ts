import { Listing, Reservation } from '@prisma/client'
import axiosClient from './axios-client'

export const reservationApi = {
  create(payload: Omit<Reservation, 'id' | 'userId' | 'createAt'>): Promise<Listing> {
    return axiosClient.post('/api/reservations', payload)
  },
  delete(id: string): Promise<Reservation> {
    return axiosClient.delete(`/api/reservations/${id}`)
  }
}
