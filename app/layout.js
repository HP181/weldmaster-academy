import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/sonner"
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  // 🔹 Basic SEO
  title: 'SkillWorks Welding Institute | Welding Courses & Certification in Canada',
  description:
    'SkillWorks Welding Institute (WeldMaster Program) offers hands-on welding training, safety courses, and certification preparation. Learn MIG, TIG, and Arc welding from certified instructors in Canada.',

  // 🔹 Canonical URL
  alternates: {
    canonical: 'https://www.skillworksweld.ca/',
  },

  // 🔹 Keywords for SEO
  keywords: [
    'welding courses Canada',
    'welding certification',
    'SkillWorks Welding Institute',
    'learn welding',
    'welding school Canada',
    'MIG welding training',
    'TIG welding training',
    'Arc welding courses',
    'industrial welding program',
    'WeldMaster program',
  ],

  // 🔹 Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    title: 'SkillWorks Welding Institute | Welding Courses & Certification in Canada',
    description:
      'Join SkillWorks Welding Institute to master MIG, TIG, and Arc welding. Get certified with expert-led, hands-on training across Canada.',
    url: 'https://www.skillworksweld.ca/',
    siteName: 'SkillWorks Welding Institute',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: 'https://www.skillworksweld.ca/public/welding.png', // Replace with your OG image path
        width: 1200,
        height: 630,
        alt: 'SkillWorks Welding Institute - Learn Welding in Canada',
      },
    ],
  },

  // 🔹 Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'SkillWorks Welding Institute | Learn Welding in Canada',
    description:
      'Master welding with certified instructors at SkillWorks Welding Institute. Hands-on training, industry certifications, and real-world experience.',
    creator: '@SkillWorksWeld', // Replace with your actual Twitter handle if available
    images: ['https://www.skillworksweld.ca/public/welding.png'],
  },

  // 🔹 Favicon and icons
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
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
