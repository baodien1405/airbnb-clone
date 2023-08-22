'use client'

import { Listing, Reservation } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { MouseEvent, useCallback, useMemo } from 'react'
import { format } from 'date-fns'

import { useCountryList } from '@/hooks'
import { SafeUser } from '@/types'
import Image from 'next/image'
import { HeartButton } from '../heart-button'
import { Button } from '../button'

interface ListingCardProps {
  data: Listing
  reservation?: Reservation
  disabled?: boolean
  actionLabel?: string
  actionId?: string
  currentUser?: SafeUser | null
  onAction?: (id: string) => void
}

export const ListingCard = ({
  data,
  reservation,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
  onAction
}: ListingCardProps) => {
  const router = useRouter()
  const { getByValue } = useCountryList()

  const location = getByValue(data.locationValue)

  const handleCancel = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (disabled) return

      onAction?.(actionId)
    },
    [onAction, disabled, actionId]
  )

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice

    return data.price
  }, [reservation, data.price])

  const reservationDate = useMemo(() => {
    if (!reservation) return null

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])

  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="Listing"
            src={data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />

          <div className="absolute top-3 right-3">
            <HeartButton currentUser={currentUser} listingId={data.id} />
          </div>
        </div>

        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>

        <div className="font-light text-neutral-500">{reservationDate || data.category}</div>

        <div className="flex items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>

        {onAction && actionLabel && (
          <Button label={actionLabel} disabled={disabled} small onClick={handleCancel} />
        )}
      </div>
    </div>
  )
}
