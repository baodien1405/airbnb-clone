'use client'

import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'

import { useLoginModalStore } from '@/store'
import { Heading } from '@/components/heading'
import { Input } from '@/components/inputs'
import { Button } from '@/components/button'
import { Modal } from './modal'
import { useRouter } from 'next/navigation'

export const LoginModal = () => {
  const router = useRouter()
  const loginModalStore = useLoginModalStore()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (payload: FieldValues) => {
    signIn('credentials', {
      ...payload,
      redirect: false
    }).then((callback) => {
      if (callback?.ok) {
        toast.success('Logged in')
        router.refresh()
        loginModalStore.onClose()
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input id="email" type="email" label="Email" required register={register} errors={errors} />
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
          <div>{`Don't have an account yet?`}</div>
          <div
            className="text-neutral-800 cursor-pointer hover:underline"
            onClick={loginModalStore.onClose}
          >
            Sign up
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={false}
      isOpen={loginModalStore.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModalStore.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
