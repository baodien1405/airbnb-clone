'use client'

import { useCallback, useMemo, useState } from 'react'
import { Range } from 'react-date-range'
import dynamic from 'next/dynamic'
import qs from 'query-string'
import { formatISO } from 'date-fns'
import { useSearchParams, useRouter } from 'next/navigation'

import { useSearchModalStore } from '@/store'
import { Modal } from './modal'
import { Calendar, Counter, CountrySelect, CountrySelectValue } from '../inputs'
import { Heading } from '../heading'

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2
}

export const SearchModal = () => {
  const searchModalStore = useSearchModalStore()
  const params = useSearchParams()
  const router = useRouter()

  const [location, setLocation] = useState<CountrySelectValue>()
  const [step, setStep] = useState(STEPS.LOCATION)
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  })

  const Map = dynamic(() => import('../map'), {
    ssr: false
  })

  const handleBack = useCallback(() => {
    setStep((value) => value - 1)
  }, [])

  const handleNext = useCallback(() => {
    setStep((value) => value + 1)
  }, [])

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) return 'Search'

    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) return undefined

    return 'Back'
  }, [step])

  const handleSearch = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return handleNext()
    }

    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount
    }

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate)
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate)
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery
      },
      { skipNull: true }
    )

    setStep(STEPS.LOCATION)
    searchModalStore.onClose()
    router.push(url)
  }, [
    step,
    bathroomCount,
    dateRange.endDate,
    dateRange.startDate,
    guestCount,
    handleNext,
    location?.value,
    params,
    roomCount,
    router,
    searchModalStore
  ])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Where do we wanna go?" subtitle="Find the perfect location!" />

      <CountrySelect value={location} onChange={(value) => setLocation(value)} />

      <hr />

      <Map center={location?.latlng} />
    </div>
  )

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="When do you plan to go?" subtitle="Make sure everyone is free!" />

        <Calendar value={dateRange} onChange={(value) => setDateRange(value.selection)} />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place!" />

        <Counter
          onChange={(value) => setGuestCount(value)}
          value={guestCount}
          title="Guests"
          subtitle="How many guests are coming?"
        />

        <hr />

        <Counter
          onChange={(value) => setRoomCount(value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you need?"
        />

        <hr />

        <Counter
          onChange={(value) => setBathroomCount(value)}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms do you need?"
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={searchModalStore.isOpen}
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
      secondaryAction={step === STEPS.LOCATION ? undefined : handleBack}
      onClose={searchModalStore.onClose}
      onSubmit={handleSearch}
    />
  )
}
