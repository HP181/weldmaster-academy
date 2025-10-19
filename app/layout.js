import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/sonner"
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WeldMaster - Premier Welding Education',
  description: 'Learn welding from industry experts with hands-on training and certification preparation.',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
