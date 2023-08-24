'use client'

import { useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { reservationApi } from '@/api-client'

import { SafeUser } from '@/types'
import { Reservation } from '@prisma/client'
import { Container } from '../container'
import { Heading } from '../heading'
import { ListingCard } from '../listings'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface ReservationClientProps {
  currentUser?: SafeUser | null
  reservations: Reservation[]
}

export const ReservationListClient = ({ currentUser, reservations }: ReservationClientProps) => {
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
    [router, mutate]
  )

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />

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
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}
