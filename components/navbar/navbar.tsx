'use client'

import { Container } from '@/components/container'
import { Logo } from './logo'
import { Search } from './search'
import { UserMenu } from './user-menu'
import { SafeUser } from '@/types'
import { CategoryList } from './category-list'

interface NavbarProps {
  currentUser?: SafeUser | null
}

export const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>

      <CategoryList />
    </div>
  )
}
