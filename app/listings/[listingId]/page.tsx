import { getCurrentUser, getListingById } from '@/app/actions'
import { ClientOnly } from '@/components/client-only'
import { EmptyState } from '@/components/empty-state'
import { ListingClient } from '@/components/listings'

interface ListingPageProps {
  params: { listingId: string }
}

export const ListingPage = async ({ params }: ListingPageProps) => {
  const listing = await getListingById(params.listingId)
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
      <ListingClient listing={listing} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default ListingPage