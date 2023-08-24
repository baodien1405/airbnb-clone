'use client'

import { differenceInDays, eachDayOfInterval } from 'date-fns'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Range } from 'react-date-range'
import { toast } from 'react-hot-toast'
import { Listing, Reservation, User } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'

import { Container } from '../container'
import { SafeUser } from '@/types'
import { categoryList } from '../navbar/category-list'
import { ListingHead } from './listing-head'
import { ListingInfo } from './listing-info'
import { ListingReservation } from './listing-reservation'
import { reservationApi } from '@/api-client'
import { useLoginModalStore } from '@/store'
import { useRouter } from 'next/navigation'

interface ListingClientProps {
  listing: Listing & { user: User | SafeUser }
  reservations?: Reservation[]
  currentUser?: SafeUser | null
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}

export const ListingClient = ({ listing, currentUser, reservations = [] }: ListingClientProps) => {
  const loginModalStore = useLoginModalStore()
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)
  const router = useRouter()

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate)

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange.startDate, dateRange.endDate, listing.price])

  const disableDates = useMemo(() => {
    let dates: Date[] = []

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      })

      dates = [...dates, ...range]
    })

    return dates
  }, [reservations])

  const category = useMemo(() => {
    return categoryList.find((item) => item.label === listing.category)
  }, [listing.category])

  const { mutate, isLoading } = useMutation({
    mutationFn: (body: Omit<Reservation, 'id' | 'userId' | 'createAt'>) =>
      reservationApi.create(body)
  })

  const handleCreateReservation = useCallback(() => {
    if (!currentUser) return loginModalStore.onOpen()

    const payload = {
      listingId: listing?.id,
      startDate: dateRange.startDate as Date,
      endDate: dateRange.endDate as Date,
      totalPrice
    }

    mutate(payload, {
      onSuccess: () => {
        toast.success('Listing reserved!')
        setDateRange(initialDateRange)
        router.push('/trips')
      },
      onError: (error: any) => {
        toast.error('Something went wrong.')
      }
    })
  }, [
    dateRange.endDate,
    dateRange.startDate,
    listing.id,
    mutate,
    totalPrice,
    currentUser,
    loginModalStore,
    router
  ])

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            id={listing.id}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            title={listing.title}
            currentUser={currentUser}
          />

          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
              category={category}
            />

            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                dateRange={dateRange}
                disabled={isLoading}
                disableDates={disableDates}
                onChangeDate={(value) => setDateRange(value)}
                onSubmit={handleCreateReservation}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
