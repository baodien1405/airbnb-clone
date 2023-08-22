'use client'

import { FieldValues, useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { Listing } from '@prisma/client'

import { useRentModalStore } from '@/store'
import { Modal } from './modal'
import { Heading } from '../heading'
import { categoryList } from '../navbar/category-list'
import { CategoryInput, Counter, CountrySelect, ImageUpload, Input } from '../inputs'
import { listingApi } from '@/api-client'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

export const RentModal = () => {
  const router = useRouter()
  const rentModalStore = useRentModalStore()

  const [step, setStep] = useState(STEPS.CATEGORY)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: ''
    }
  })

  const category = watch('category')
  const location = watch('location')
  const guestCount = watch('guestCount')
  const roomCount = watch('roomCount')
  const bathroomCount = watch('bathroomCount')
  const imageSrc = watch('imageSrc')

  const listingMutation = useMutation({
    mutationFn: (body: Listing) => listingApi.create(body)
  })

  const Map = useMemo(
    () =>
      dynamic(() => import('../map'), {
        ssr: false
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  )

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return 'Create'

    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined

    return 'Back'
  }, [step])

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true
    })
  }

  const handleBack = () => {
    setStep((value) => value - 1)
  }

  const handleNext = () => {
    setStep((value) => value + 1)
  }

  const handleRentSubmit = (formValues: FieldValues) => {
    if (step !== STEPS.PRICE) {
      return handleNext()
    }

    listingMutation.mutate(formValues as Listing, {
      onSuccess: () => {
        toast.success('Listing created!')
        reset()
        router.refresh()
        setStep(STEPS.CATEGORY)
        rentModalStore.onClose()
      },
      onError: (error: any) => {
        toast.error(error)
      }
    })
  }

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Which of these best describes your place?" subtitle="Pick a category" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categoryList.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              label={item.label}
              icon={item.icon}
              selected={item.label === category}
              onClick={(category) => setCustomValue('category', category)}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Where is your place located?" subtitle="Help guests find you!" />
        <CountrySelect value={location} onChange={(value) => setCustomValue('location', value)} />
        <Map center={location?.latlng} />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Share some basics about your place" subtitle="What amenities do you have" />
        <Counter
          value={guestCount}
          onChange={(value) => setCustomValue('guestCount', value)}
          title="Guests"
          subtitle="How many guests do you allow?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue('roomCount', value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue('bathroomCount', value)}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
        />
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload value={imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet words best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={listingMutation.isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={listingMutation.isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Now, set your price" subtitle="How much do you charge per night?" />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={listingMutation.isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={rentModalStore.isOpen}
      title="Airbnb your home"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : handleBack}
      body={bodyContent}
      disabled={listingMutation.isLoading}
      onClose={rentModalStore.onClose}
      onSubmit={handleSubmit(handleRentSubmit)}
    />
  )
}
