'use client'

import { useCallback } from 'react'
import { SafeUser } from '@/types'
import { Reservation } from '@prisma/client'

import { Container } from '../container'
import { Heading } from '../heading'
import { ListingCard } from '../listings'

interface TripListClientProps {
  currentUser: SafeUser
  reservations: Reservation[]
}

export const TripListClient = ({ currentUser, reservations }: TripListClientProps) => {
  const handleCancelReservation = useCallback(() => {}, [])

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
            disabled={false}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}
