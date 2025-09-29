'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Phone, Mail } from 'lucide-react'

export default function Enroll() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState('mig')
  const [isMobile, setIsMobile] = useState(true)
  const [faqOpen, setFaqOpen] = useState({})
  const fadeElements = useRef([])

  const handleSubmit = (e) => { e.preventDefault(); setFormSubmitted(true) }
  const handleCloseModal = () => setFormSubmitted(false)
  const toggleFaq = (index) => setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }))

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)

    fadeElements.current = Array.from(document.querySelectorAll('.fade-in'))

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          fadeElements.current.forEach(el => {
            const rect = el.getBoundingClientRect()
            if (rect.top < window.innerHeight - 150) el.classList.add('active')
          })
          ticking = false
        })
        ticking = true
      }
    }

    setTimeout(handleScroll, 300)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const FaqItem = ({ question, answer, index }) => {
    const isOpen = faqOpen[index] || false
    return (
      <div className="fade-in bg-white rounded-none shadow-md overflow-hidden mb-4 transition-all duration-300 border-l-4 border-[#F8EE00]">
        <div
          className="flex justify-between items-center cursor-pointer p-5"
          onClick={() => toggleFaq(index)}
        >
          <h3 className="text-lg font-semibold text-black">{question}</h3>
          <button
            className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            aria-label={isOpen ? 'Collapse' : 'Expand'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="p-5 border-t border-gray-200 text-gray-700">{answer}</div>
        </div>
      </div>
    )
  }

  const programs = [
    { id: 'mig', title: 'MIG Welding', duration: '12 Weeks', icon: '🛠' },
    { id: 'tig', title: 'TIG Welding', duration: '16 Weeks', icon: '⚡' },
    { id: 'stick', title: 'Stick Welding', duration: '10 Weeks', icon: '🔨' },
    { id: 'pipe', title: 'Pipe Welding', duration: '20 Weeks', icon: '⭕' }
  ]

  const upcomingClasses = [
    { date: 'January 15, 2026', availability: 'Available' },
    { date: 'March 3, 2026', availability: 'Available' },
    { date: 'May 12, 2026', availability: 'Limited' },
    { date: 'July 7, 2026', availability: 'Limited' },
    { date: 'September 8, 2026', availability: 'Available' },
    { date: 'November 2, 2026', availability: 'Available' }
  ]

  return (
    <main>

      {/* Banner */}
      <section className="bg-[#F8EE00] text-black py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="relative inline-block text-4xl font-bold mb-4">
            Enroll Now
            <span className="absolute left-1/2 -bottom-2 w-24 h-1 bg-black -translate-x-1/2"></span>
          </h1>
          <div className="flex justify-center items-center gap-2 text-black/70">
            <Link href="/" className="hover:text-black">Home</Link>
            <span>/</span>
            <span>Enroll Now</span>
          </div>
        </div>
      </section>

      {/* Enrollment Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#F8EE00]/10 rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#F8EE00]/10 rounded-full"></div>

        <div className="relative container mx-auto px-4 z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Start Your Welding Journey Today</h2>
            <p className="text-gray-700">Fill out the form below to enroll in one of our comprehensive welding programs and take the first step towards a rewarding career.</p>
          </div>

          <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
            {/* Form */}
            <div className="col-span-2">
              <Card className="fade-in shadow-xl rounded-none">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6 text-black">Enrollment Form</h3>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Program Selection */}
                    <div>
                      <label className="block font-semibold mb-3 text-black">Select Your Program</label>
                      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                        {programs.map(program => (
                          <div
                            key={program.id}
                            className={`cursor-pointer rounded-none p-5 border transition ${
                              selectedProgram === program.id
                                ? 'border-[#F8EE00] bg-[#F8EE00]/10'
                                : 'border-gray-200'
                            }`}
                            onClick={() => setSelectedProgram(program.id)}
                          >
                            <input type="radio" name="program" value={program.id} checked={selectedProgram === program.id} onChange={() => setSelectedProgram(program.id)} className="hidden" />
                            <div className="flex flex-col items-center text-center">
                              <div className="w-14 h-14 rounded-full bg-[#F8EE00]/20 flex items-center justify-center text-2xl mb-3">{program.icon}</div>
                              <h4 className="font-semibold mb-1 text-black">{program.title}</h4>
                              <p className="text-gray-600 text-sm">{program.duration}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Personal Info */}
                    <div>
                      <h4 className="font-semibold mb-3 text-black">Personal Information</h4>
                      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                        {['firstName', 'lastName', 'email', 'phone'].map((field, idx) => {
                          const placeholder = field === 'email' ? 'your@email.com' : field === 'phone' ? '+1 (555) 123-4567' : field === 'firstName' ? 'John' : 'Doe'
                          const type = field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'
                          return (
                            <div key={idx}>
                              <label className="block mb-1 font-medium text-black">{field.charAt(0).toUpperCase() + field.slice(1)}*</label>
                              <Input 
                                id={field} 
                                type={type} 
                                placeholder={placeholder} 
                                required 
                                className="border-gray-300 rounded-none focus:border-black focus:ring-1 focus:ring-black"
                              />
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-black hover:bg-black/90 text-[#F8EE00] font-bold py-3 rounded-lg hover:-translate-y-0.5 transition cursor-pointer">Submit Application</Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6">
              {/* Upcoming Classes */}
              <Card className="fade-in shadow-lg rounded-none">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 text-black">Upcoming Classes</h3>
                  <div className="flex flex-col gap-3">
                    {upcomingClasses.map((cls, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-[#F8EE00]/10 p-4 rounded-none">
                        <div>
                          <h4 className="font-semibold text-black">{cls.date}</h4>
                          <p className="text-gray-600 text-sm">Day & Evening Classes</p>
                        </div>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-none ${
                          cls.availability === 'Available' ? 'bg-green-100 text-green-700' : 'bg-[#F8EE00] text-black'
                        }`}>{cls.availability}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Need Help */}
              <Card className="fade-in shadow-lg rounded-none">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 text-black">Need Help?</h3>
                  <p className="mb-4 text-gray-700">Our admissions team is here to answer any questions about programs, financial aid, or enrollment.</p>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-black" />
                      <div>
                        <h4 className="font-semibold text-black">Call Us</h4>
                        <a href="tel:+15551234567" className="text-black hover:text-black/70 text-sm transition">+1 (555) 123-4567</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-black" />
                      <div>
                        <h4 className="font-semibold text-black">Email Us</h4>
                        <a href="mailto:admissions@weldmasteracademy.com" className="text-black hover:text-black/70 text-sm transition">admissions@weldmasteracademy.com</a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-700">Find answers to common questions about enrollment and programs.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <FaqItem 
              index={0} 
              question="What are the payment options available?" 
              answer={
                <div>
                  <p>We offer several payment options:</p>
                  <ul className="list-disc pl-5 mt-2 mb-2 space-y-1">
                    <li>Full payment with 5% discount</li>
                    <li>Monthly plans (0% interest)</li>
                    <li>Private student loans</li>
                    <li>Workforce development grants</li>
                    <li>GI Bill benefits for veterans</li>
                  </ul>
                </div>
              }
            />
            <FaqItem 
              index={1} 
              question="What is the refund policy?" 
              answer={
                <div>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>100% refund if cancelled ≥14 days before start</li>
                    <li>75% refund if cancelled 7–13 days before start</li>
                    <li>50% refund if cancelled 1–6 days before start</li>
                    <li>Pro-rated refund during first week</li>
                    <li>No refund after first week</li>
                  </ul>
                </div>
              }
            />
            <FaqItem 
              index={2} 
              question="Is job placement assistance provided?" 
              answer={
                <div>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Resume building & interview prep</li>
                    <li>Access to 200+ industry partners</li>
                    <li>Exclusive job fairs</li>
                    <li>Job matching based on skills</li>
                    <li>Ongoing career support post-graduation</li>
                  </ul>
                </div>
              }
            />
          </div>
        </div>
      </section>


      {/* Success Modal */}
      {formSubmitted && (
        <div 
          className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
          onClick={handleCloseModal}
          aria-modal="true"
        >
          <Card onClick={(e) => e.stopPropagation()} className="p-10 max-w-md text-center rounded-none">
            <h3 className="text-2xl font-bold mb-4 text-black">Thank You!</h3>
            <p className="mb-6 text-gray-700">Your application has been successfully submitted. We will contact you soon.</p>
            <Button onClick={handleCloseModal} className="bg-black hover:bg-black/90 text-[#F8EE00] font-bold py-2 px-6 rounded-none">Close</Button>
          </Card>
        </div>
      )}

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-[#F8EE00] hover:bg-[#F8EE00]/90 text-black p-3 rounded-none shadow-lg transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </main>
  )
}