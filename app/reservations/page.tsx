import { getCurrentUser, getReservations } from '@/app/actions'
import { ClientOnly } from '@/components/client-only'
import { EmptyState } from '@/components/empty-state'
import { ReservationListClient } from '@/components/reservations'

const Reservations = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorize" subtitle="Please login" />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({ authorId: currentUser.id })

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle="Looks like you have no reservations on your properties"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ReservationListClient currentUser={currentUser} reservations={reservations} />
    </ClientOnly>
  )
}

export default Reservations
