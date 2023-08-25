import { getCurrentUser, getFavoriteListings } from '@/app/actions'
import { ClientOnly } from '@/components/client-only'
import { EmptyState } from '@/components/empty-state'
import { FavoriteListClient } from '@/components/favorites'

const FavoritesPage = async () => {
  const favorites = await getFavoriteListings()
  const currentUser = await getCurrentUser()

  if (favorites.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <FavoriteListClient currentUser={currentUser} favorites={favorites} />
    </ClientOnly>
  )
}

export default FavoritesPage
