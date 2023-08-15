import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import { Navbar } from '@/components/navbar'
import { RegisterModal } from '@/components/modals'
import { AppProvider } from '@/providers'

import './globals.css'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb Clone',
  description: 'This is a Airbnb platform with Next 13'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={nunito.className} suppressHydrationWarning={true}>
        <AppProvider>
          <RegisterModal />
          <Navbar />
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
