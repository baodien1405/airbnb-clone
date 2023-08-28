import { getCurrentUser, getListingById, getReservations } from '@/app/actions'
import { ClientOnly } from '@/components/client-only'
import { EmptyState } from '@/components/empty-state'
import { ListingClient } from '@/components/listings'

interface ListingPageProps {
  params: { listingId: string }
}

const ListingDetailPage = async ({ params }: ListingPageProps) => {
  const listing = await getListingById(params.listingId)
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser()

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ListingClient listing={listing} reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default ListingDetailPage
