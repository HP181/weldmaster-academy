'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Target, Eye, Heart } from 'lucide-react'

export default function About() {
  const [imageError, setImageError] = useState(false)

  // Scroll animations
  useEffect(() => {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right')
    const handleScroll = () => {
      animatedElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top
        if (elementTop < window.innerHeight - 150) {
          el.classList.add('active')
        }
      })
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="relative">
      <Navbar />

      {/* Page Banner */}
      <section className="bg-[#ff8f00] text-white py-20 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="relative inline-block text-4xl font-bold mb-4">
            About Us
            <span className="absolute left-1/2 -bottom-2 w-24 h-1 bg-gradient-to-r from-[#ffc107] to-[#ffb300] -translate-x-1/2"></span>
          </h1>
          <div className="flex justify-center items-center gap-2 text-white/70">
            <Link href="/" className="hover:text-[#ffc107] transition">Home</Link>
            <span>/</span>
            <span>About Us</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid gap-12 md:grid-cols-2 items-center">
          {/* Image */}
          <div className="slide-in-left relative group">
            <div className="absolute -top-5 -left-5 w-24 h-24 border-t-4 border-l-4 border-[#ffc107] z-[-1]"></div>
            <div className="absolute -bottom-5 -right-5 w-24 h-24 border-b-4 border-r-4 border-[#ffc107] z-[-1]"></div>
            <div className="rounded-xl overflow-hidden shadow-xl transition-transform duration-300 group-hover:scale-105">
              <Image
                src={imageError ? "https://placehold.co/600x400/ffc107/ffffff?text=WeldMaster+Academy" : "/images/about-image.jpg"}
                alt="WeldMaster Academy"
                width={600}
                height={400}
                onError={() => setImageError(true)}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div className="slide-in-right space-y-6">
            <h2 className="text-3xl font-bold text-[#ff8f00]">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              WeldMaster Academy was founded in 2010 by a team of professional welders and educators...
            </p>
            <p className="text-gray-700 leading-relaxed">
              What started as a small workshop with just 5 students has grown into one of North America&apos;s premier welding schools...
            </p>

            <div className="grid gap-4 sm:grid-cols-3 mt-8">
              {[
                { title: '15k+', description: 'Students Trained' },
                { title: '98%', description: 'Job Placement' },
                { title: '20+', description: 'Industry Partners' }
              ].map((stat, i) => (
                <Card key={i} className="text-center shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-[#ffc107] mb-2">{stat.title}</h3>
                    <p className="text-gray-600">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl font-bold text-[#ff8f00] mb-2">Our Mission & Values</h2>
          <p className="text-gray-600">Guided by our commitment to excellence in welding education.</p>
        </div>

        <div className="max-w-6xl mx-auto px-4 grid gap-8 sm:grid-cols-3">
          {[
            {
              title: 'Our Mission',
              description: 'To provide world-class welding education...',
              icon: Target
            },
            {
              title: 'Our Vision',
              description: 'To be recognized as the leading welding education institution...',
              icon: Eye
            },
            {
              title: 'Our Values',
              description: 'Excellence in education, hands-on learning, innovation, safety...',
              icon: Heart
            }
          ].map((item, i) => (
            <Card key={i} className="fade-in p-8 text-center shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#fff8e1] text-[#ffc107] flex items-center justify-center">
                <item.icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center bg-gradient-to-r from-[#ffc107] to-[#ffb300] text-white">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl font-bold">Ready to Start Your Welding Journey?</h2>
          <p className="text-lg max-w-xl mx-auto">
            Join the WeldMaster family and learn from the best in the industry...
          </p>
          <Button className="bg-white text-[#ff8f00] font-bold px-8 py-3 rounded-md hover:bg-white/90 hover:-translate-y-1 transition">
            <Link href="/enroll" className="text-inherit">Enroll Now</Link>
          </Button>
        </div>
      </section>

      <Footer />

      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-[#ffc107] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#ffb300] hover:-translate-y-1 transition z-40"
        aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </main>
  )
}
