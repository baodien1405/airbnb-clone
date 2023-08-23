'use client'

import dynamic from 'next/dynamic'
import { User } from '@prisma/client'
import { IconType } from 'react-icons'

import { SafeUser } from '@/types'
import { Avatar } from '../avatar'
import { useCountryList } from '@/hooks'
import { ListingCategory } from './listing-category'

const Map = dynamic(() => import('../map'), {
  ssr: false
})

interface ListingInfoProps {
  user: User | SafeUser
  description: string
  guestCount: number
  roomCount: number
  bathroomCount: number
  category?: {
    icon: IconType
    label: string
    description: string
  }
  locationValue: string
}

export const ListingInfo = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue
}: ListingInfoProps) => {
  const { getByValue } = useCountryList()

  const coordinates = getByValue(locationValue)?.latlng

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>

        <div className="flex items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>

      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}

      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>

      <hr />
      <Map center={coordinates} />
    </div>
  )
}
