'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()

    const styleEl = document.createElement('style')
    styleEl.innerHTML = `
      .fade-in { opacity: 0; transform: translateY(20px); transition: all 0.6s ease; }
      .fade-in.active { opacity: 1; transform: translateY(0); }
      .slide-in-left { opacity: 0; transform: translateX(-50px); transition: all 0.6s ease; }
      .slide-in-left.active { opacity: 1; transform: translateX(0); }
      .slide-in-right { opacity: 0; transform: translateX(50px); transition: all 0.6s ease; }
      .slide-in-right.active { opacity: 1; transform: translateX(0); }
    `
    document.head.appendChild(styleEl)

    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right')
      elements.forEach(el => {
        const top = el.getBoundingClientRect().top
        if (top < window.innerHeight - 150) el.classList.add('active')
      })
    }

    setTimeout(handleScroll, 300)
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      document.head.removeChild(styleEl)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  return (
    <main className="bg-white">

      {/* Banner */}
      <section className="bg-amber-500 text-white py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="inline-block text-4xl font-bold relative mb-4">
            Contact Us
            <span className="absolute -bottom-2 left-1/2 w-24 h-1 bg-gradient-to-r from-amber-300 to-amber-700 -translate-x-1/2"></span>
          </h1>
          <div className="flex justify-center items-center gap-2 text-white/70">
            <Link href="/" className="hover:text-amber-300">Home</Link>
            <span>/</span>
            <span>Contact</span>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background circles */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-100 rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-100 rounded-full"></div>

        <div className="relative container mx-auto px-4 z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-amber-800">Get In Touch</h2>
            <p className="text-gray-600">Have questions about our programs or want to learn more about WeldMaster Academy? We&apos;re here to help you start your welding journey.</p>
          </div>

          <div className={`grid gap-12 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {/* Info */}
            <div className="slide-in-left space-y-6">
              <h2 className="text-2xl font-bold">We&apos;d Love To Hear From You</h2>
              <p className="text-gray-600">Whether you have questions about our welding programs, need assistance with enrollment, or want to schedule a facility tour, our team is ready to assist you.</p>

              {/* Info blocks */}
              {[
                {
                  icon: <MapPin className="text-amber-500" size={24} />,
                  title: 'Our Location',
                  text: '123 Welding Street, Industrial Park\nToronto, ON M4P 1A6, Canada'
                },
                {
                  icon: <Phone className="text-amber-500" size={24} />,
                  title: 'Phone Number',
                  text: 'Main Office: +1 (555) 123-4567\nAdmissions: +1 (555) 123-4568'
                },
                {
                  icon: <Mail className="text-amber-500" size={24} />,
                  title: 'Email Address',
                  text: 'General Inquiries: info@weldmasteracademy.com\nAdmissions: admissions@weldmasteracademy.com'
                },
                {
                  icon: <Clock className="text-amber-500" size={24} />,
                  title: 'Office Hours',
                  text: 'Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 1:00 PM\nSunday: Closed'
                }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="whitespace-pre-line text-gray-600">{item.text}</p>
                  </div>
                </div>
              ))}

              {/* Socials */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Connect With Us</h3>
                <div className="flex gap-4">
                  {['facebook','twitter','instagram','linkedin','youtube'].map(platform => (
                    <a key={platform} href="#" className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-gray-900 transition transform hover:bg-amber-500 hover:text-white hover:-translate-y-1" aria-label={platform}>
                      <i className={`fab fa-${platform}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="slide-in-right">
              <Card className="shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6">Send Us A Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                      <div>
                        <label className="block font-semibold mb-1">Your Name*</label>
                        <Input placeholder="John Doe" required />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Email Address*</label>
                        <Input type="email" placeholder="your@email.com" required />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Phone Number</label>
                        <Input type="tel" placeholder="+1 (555) 123-4567" />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Subject*</label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="program">Program Information</SelectItem>
                            <SelectItem value="enrollment">Enrollment Questions</SelectItem>
                            <SelectItem value="financial">Financial Aid</SelectItem>
                            <SelectItem value="tour">Facility Tour</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Your Message*</label>
                      <Textarea placeholder="How can we help you?" required rows={5} />
                    </div>

                    <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-amber-900 font-bold py-3 rounded-md transition">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
