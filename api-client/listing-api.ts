import { Listing } from '@prisma/client'
import axiosClient from './axios-client'

export const listingApi = {
  create(payload: Listing): Promise<Listing> {
    return axiosClient.post('/api/listings', payload)
  }
}
