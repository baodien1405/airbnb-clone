import { getCurrentUser, getListings } from '@/app/actions'
import { ClientOnly } from '@/components/client-only'
import { EmptyState } from '@/components/empty-state'
import { PropertyListClient } from '@/components/properties'

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorize" subtitle="Please login" />
      </ClientOnly>
    )
  }

  const properties = await getListings({ userId: currentUser.id })

  if (properties.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No properties found" subtitle="Looks like you have no properties" />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <PropertyListClient currentUser={currentUser} properties={properties} />
    </ClientOnly>
  )
}

export default PropertiesPage
