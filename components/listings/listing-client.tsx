'use client'

import { Listing, User } from '@prisma/client'
import { Container } from '../container'
import { SafeUser } from '@/types'
import { useMemo } from 'react'
import { categoryList } from '../navbar/category-list'
import { ListingHead } from './listing-head'
import { ListingInfo } from './listing-info'

interface ListingClientProps {
  listing: Listing & { user: User | SafeUser }
  currentUser?: SafeUser | null
}

export const ListingClient = ({ listing, currentUser }: ListingClientProps) => {
  const category = useMemo(() => {
    return categoryList.find((item) => item.label === listing.category)
  }, [listing.category])

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

          <div className="grid grid-col-1 md:grid-col-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
              category={category}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}
