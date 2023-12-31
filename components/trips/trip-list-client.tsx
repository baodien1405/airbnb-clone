'use client'

import { useCallback } from 'react'
import { SafeUser } from '@/types'
import { Reservation } from '@prisma/client'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

import { Container } from '../container'
import { Heading } from '../heading'
import { ListingCard } from '../listings'
import { reservationApi } from '@/api-client'

interface TripListClientProps {
  currentUser: SafeUser
  reservations: Reservation[]
}

export const TripListClient = ({ currentUser, reservations }: TripListClientProps) => {
  const router = useRouter()

  const { mutate, isLoading } = useMutation({
    mutationFn: (id: string) => reservationApi.delete(id)
  })

  const handleCancelReservation = useCallback(
    (id: string) => {
      mutate(id, {
        onSuccess: () => {
          toast.success('Reservation cancelled')
          router.refresh()
        },
        onError: (error: any) => {
          toast.error('Something went wrong.')
        }
      })
    },
    [mutate, router]
  )

  return (
    <Container>
      <Heading title="Trips" subtitle="Where you've been and where you're going" />
      <div
        className="
          mt-10
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={handleCancelReservation}
            disabled={isLoading}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}
