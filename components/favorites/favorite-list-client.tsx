import { Listing } from '@prisma/client'

import { SafeUser } from '@/types'
import { Container } from '../container'
import { Heading } from '../heading'
import { ListingCard } from '../listings'

interface FavoriteListClientProps {
  currentUser?: SafeUser | null
  favorites: Listing[]
}

export const FavoriteListClient = ({ currentUser, favorites }: FavoriteListClientProps) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of places you favorited!" />

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
        {favorites.map((favorites) => (
          <ListingCard currentUser={currentUser} key={favorites.id} data={favorites} />
        ))}
      </div>
    </Container>
  )
}
