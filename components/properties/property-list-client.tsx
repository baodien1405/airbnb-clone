'use client'

import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'

import { SafeUser } from '@/types'
import { Listing } from '@prisma/client'
import { propertyApi } from '@/api-client'
import { Container } from '../container'
import { Heading } from '../heading'
import { ListingCard } from '../listings'

interface PropertyListClientProps {
  currentUser?: SafeUser
  properties: Listing[]
}

export const PropertyListClient = ({ currentUser, properties }: PropertyListClientProps) => {
  const router = useRouter()

  const { mutate, isLoading } = useMutation({
    mutationFn: (id: string) => propertyApi.delete(id)
  })

  const handleDeleteProperty = useCallback(
    (id: string) => {
      mutate(id, {
        onSuccess: () => {
          toast.success('Property deleted')
          router.refresh()
        },
        onError: (error: any) => {
          toast.error('Something went wrong.')
        }
      })
    },
    [mutate, router]
  )

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />

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
        {properties.map((property) => (
          <ListingCard
            key={property.id}
            data={property}
            actionId={property.id}
            disabled={isLoading}
            actionLabel="Delete property"
            currentUser={currentUser}
            onAction={handleDeleteProperty}
          />
        ))}
      </div>
    </Container>
  )
}
