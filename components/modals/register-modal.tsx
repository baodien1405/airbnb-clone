'use client'

import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'

import { useRegisterModalStore } from '@/store'
import { Heading } from '@/components/heading'
import { Input } from '@/components/inputs'
import { Button } from '@/components/button'
import { Modal } from './modal'
import { RegisterPayload } from '@/types'
import { authApi } from '@/api-client'
import { signIn } from 'next-auth/react'

export const RegisterModal = () => {
  const registerModalStore = useRegisterModalStore()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const registerMutation = useMutation({
    mutationFn: (body: RegisterPayload) => authApi.register(body)
  })

  const onSubmit = (payload: FieldValues) => {
    registerMutation.mutate(payload as RegisterPayload, {
      onSuccess: (data) => {
        toast.success('Register successfully')
        registerModalStore.onClose()
      },
      onError: (error: any) => {
        toast.error(error)
      }
    })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input id="email" type="email" label="Email" required register={register} errors={errors} />
      <Input id="name" type="name" label="Name" required register={register} errors={errors} />
      <Input
        id="password"
        type="password"
        label="Password"
        required
        register={register}
        errors={errors}
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex items-center justify-center gap-2">
          <div>Already have an account?</div>
          <div
            className="text-neutral-800 cursor-pointer hover:underline"
            onClick={registerModalStore.onClose}
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={false}
      isOpen={registerModalStore.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModalStore.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
