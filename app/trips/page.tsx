import { getCurrentUser, getReservations } from '@/app/actions'
import { ClientOnly } from '@/components/client-only'
import { EmptyState } from '@/components/empty-state'
import { TripListClient } from '@/components/trips'

const TripsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    )
  }
  const reservations = await getReservations({ userId: currentUser.id })

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No trips found" subtitle="Looks like you haven't reserved any trips." />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <TripListClient currentUser={currentUser} reservations={reservations} />
    </ClientOnly>
  )
}

export default TripsPage
