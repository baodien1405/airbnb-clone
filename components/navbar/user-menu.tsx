'use client'

import { AiOutlineMenu } from 'react-icons/ai'
import { useCallback, useState } from 'react'
import { signOut } from 'next-auth/react'

import { Avatar } from '@/components/avatar'
import { MenuItem } from './menu-item'
import { useRegisterModalStore, useLoginModalStore, useRentModalStore } from '@/store'
import { SafeUser } from '@/types'
import { useRouter } from 'next/navigation'

interface UserMenuProps {
  currentUser?: SafeUser | null
}

export const UserMenu = ({ currentUser }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const registerModalStore = useRegisterModalStore()
  const loginModalStore = useLoginModalStore()
  const rentModalStore = useRentModalStore()
  const router = useRouter()

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const handleRent = useCallback(() => {
    if (!currentUser) return loginModalStore.onOpen()

    rentModalStore.onOpen()
  }, [currentUser, loginModalStore, rentModalStore])

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={handleRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>

        <div
          onClick={toggleMenu}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem label="My trips" onClick={() => router.push('/trips')} />
                <MenuItem label="My favorites" onClick={() => router.push('/favorites')} />
                <MenuItem label="My reservations" onClick={() => router.push('/reservations')} />
                <MenuItem label="My properties" onClick={() => router.push('/properties')} />
                <MenuItem label="Airbnb my home" onClick={handleRent} />
                <hr />
                <MenuItem label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={loginModalStore.onOpen} />
                <MenuItem label="Sign up" onClick={registerModalStore.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
