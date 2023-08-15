'use client'

import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useRegisterModalStore } from '@/store'
import { Modal } from './modal'
import { RegisterPayload } from '@/types'
import { Heading } from '../heading'

export const RegisterModal = () => {
  const registerModalStore = useRegisterModalStore()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterPayload>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const handleRegisterFormSubmit = (payload: RegisterPayload) => {}

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account" />
    </div>
  )

  return (
    <Modal
      disabled={false}
      isOpen={registerModalStore.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModalStore.onClose}
      onSubmit={handleSubmit(handleRegisterFormSubmit)}
      body={bodyContent}
    />
  )
}
