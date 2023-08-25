import axiosClient from './axios-client'

export const propertyApi = {
  delete(id: string): Promise<any> {
    return axiosClient.delete(`/api/listings/${id}`)
  }
}
