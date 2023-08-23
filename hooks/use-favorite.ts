import { useMutation } from '@tanstack/react-query'
import { MouseEvent, useCallback, useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import { useLoginModalStore } from '@/store'
import { SafeUser } from '@/types'
import { favoriteApi } from '@/api-client'

interface IUseFavorite {
  listingId: string
  currentUser?: SafeUser | null
}

export const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter()
  const loginModalStore = useLoginModalStore()

  const hasFavorited = useMemo(
    () => (currentUser?.favoriteIds || []).includes(listingId),
    [currentUser, listingId]
  )

  const { mutate } = useMutation({
    mutationFn: (id: string) => (hasFavorited ? favoriteApi.delete(id) : favoriteApi.update(id))
  })

  const toggleFavorite = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (!currentUser) return loginModalStore.onOpen()

      mutate(listingId, {
        onSuccess: () => {
          router.refresh()
          toast.success('Success')
        },
        onError: (error: any) => {
          toast.error('Something went wrong.')
        }
      })
    },
    [currentUser, listingId, loginModalStore, mutate, router]
  )

  return {
    hasFavorited,
    toggleFavorite
  }
}
