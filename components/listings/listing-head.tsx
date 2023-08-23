'use client'

import Image from 'next/image'

import { useCountryList } from '@/hooks'
import { SafeUser } from '@/types'
import { Heading } from '../heading'
import { HeartButton } from '../heart-button'

interface ListingHeadProps {
  title: string
  imageSrc: string
  locationValue: string
  id: string
  currentUser?: SafeUser | null
}

export const ListingHead = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser
}: ListingHeadProps) => {
  const { getByValue } = useCountryList()

  const location = getByValue(locationValue)

  return (
    <>
      <Heading title={title} subtitle={`${location?.region}, ${location?.label}`} />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image src={imageSrc} alt="Image" fill className="object-cover w-full" />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  )
}
