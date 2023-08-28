import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import { Navbar } from '@/components/navbar'
import { LoginModal, RegisterModal, RentModal, SearchModal } from '@/components/modals'
import { AppProvider } from '@/providers'
import { getCurrentUser } from './actions'

import './globals.css'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb Clone',
  description: 'This is a Airbnb platform with Next 13'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={nunito.className} suppressHydrationWarning={true}>
        <AppProvider>
          <SearchModal />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
          <div className="pb-20 pt-28">{children}</div>
        </AppProvider>
      </body>
    </html>
  )
}
