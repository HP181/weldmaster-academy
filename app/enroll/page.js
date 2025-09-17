'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
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

  const styles = {
    colors: {
      welding: { 50: '#fff8e1', 100: '#ffecb3', 200: '#ffe082', 300: '#ffd54f', 400: '#ffca28', 500: '#ffc107', 600: '#ffb300', 700: '#ffa000', 800: '#ff8f00', 900: '#ff6f00' },
      white: '#ffffff',
      black: '#000000',
      gray: { 50: '#f8f9fa', 100: '#f1f3f5', 200: '#e9ecef', 300: '#dee2e6', 400: '#ced4da', 500: '#adb5bd', 600: '#6c757d', 700: '#495057', 800: '#343a40', 900: '#212529' },
      green: { 100: '#d4edda', 700: '#28a745' },
      amber: { 100: '#fff3cd', 700: '#ffc107' }
    },
    shadows: { sm: '0 1px 2px 0 rgba(0,0,0,0.05)', md: '0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06)', lg: '0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05)', xl: '0 20px 25px -5px rgba(0,0,0,0.1),0 10px 10px -5px rgba(0,0,0,0.04)' },
    transitions: { standard: 'all 0.3s ease' },
    gradients: { primary: 'linear-gradient(to right, #ffc107, #ffb300)' },
    container: { maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }
  }

  const handleSubmit = (e) => { e.preventDefault(); setFormSubmitted(true) }
  const handleCloseModal = () => setFormSubmitted(false)
  const toggleFaq = (index) => setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }))

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)

    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right')
    fadeElements.current = Array.from(elements)

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
      <div style={{ backgroundColor: styles.colors.white, borderRadius:'0.75rem', boxShadow:styles.shadows.md, overflow:'hidden', marginBottom:'1rem', transition: styles.transitions.standard }} className="fade-in">
        <div onClick={() => toggleFaq(index)} style={{ padding:'1.25rem', display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer'}}>
          <h3 style={{ fontSize:'1.125rem', fontWeight:'600' }}>{question}</h3>
          <button style={{ color: styles.colors.welding[500], transition:'transform 0.3s ease', transform: isOpen?'rotate(180deg)':'rotate(0)', background:'none', border:'none', cursor:'pointer'}} aria-label={isOpen?'Collapse':'Expand'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        <div style={{ overflow:'hidden', transition:'all 0.3s ease', maxHeight:isOpen?'500px':'0', opacity:isOpen?'1':'0'}}>
          <div style={{ padding:'1.25rem', borderTop:`1px solid ${styles.colors.gray[200]}`, color: styles.colors.gray[600]}}>
            {answer}
          </div>
        </div>
      </div>
    )
  }

  const programs = [
    { id: 'mig', title: 'MIG Welding', duration: '12 Weeks', icon: 'fas fa-tools' },
    { id: 'tig', title: 'TIG Welding', duration: '16 Weeks', icon: 'fas fa-bolt' },
    { id: 'stick', title: 'Stick Welding', duration: '10 Weeks', icon: 'fas fa-hammer' },
    { id: 'pipe', title: 'Pipe Welding', duration: '20 Weeks', icon: 'fas fa-circle-notch' }
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
      <Navbar />

      {/* Page Banner */}
      <section style={{ backgroundColor: styles.colors.welding[800], padding: '80px 0', textAlign: 'center', color: styles.colors.white }}>
        <div style={styles.container}>
          <h1 style={{ position: 'relative', display: 'inline-block', marginBottom: '1rem', fontSize: '2.5rem', fontWeight: 'bold' }}>
            Enroll Now
            <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: '-0.5rem', width: '6rem', height: '0.25rem', background: styles.gradients.primary }}></span>
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', color: 'rgba(255, 255, 255, 0.7)' }}>
            <Link href="/" style={{ color: styles.colors.white, textDecoration: 'none', transition: styles.transitions.standard }}
              onMouseEnter={(e) => e.currentTarget.style.color = styles.colors.welding[500]}
              onMouseLeave={(e) => e.currentTarget.style.color = styles.colors.white}>Home</Link>
            <span>/</span>
            <span>Enroll Now</span>
          </div>
        </div>
      </section>

      {/* Enrollment Section */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '5rem 0' }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', backgroundColor: styles.colors.welding[50], borderRadius: '50%', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '300px', height: '300px', backgroundColor: styles.colors.welding[50], borderRadius: '50%', zIndex: 0 }}></div>
        
        <div style={{ ...styles.container, position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: styles.colors.welding[800] }}>Start Your Welding Journey Today</h2>
            <p style={{ color: styles.colors.gray[600] }}>Fill out the form below to enroll in one of our comprehensive welding programs and take the first step towards a rewarding career.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: '2rem' }}>
            {/* Enrollment Form */}
            <div>
              <Card className="fade-in" style={{ border: 'none', boxShadow: styles.shadows.xl }}>
                <CardContent style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Enrollment Form</h3>
                  <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      {/* Program Selection */}
                      <div>
                        <label style={{ fontSize: '1.125rem', fontWeight: '600', display: 'block', marginBottom: '1rem' }}>Select Your Program</label>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '1rem' }}>
                          {programs.map(program => (
                            <div key={program.id} style={{
                              border: `1px solid ${selectedProgram === program.id ? styles.colors.welding[500] : styles.colors.gray[200]}`,
                              borderRadius: '0.75rem', padding: '1.25rem', cursor: 'pointer',
                              transition: styles.transitions.standard, backgroundColor: selectedProgram === program.id ? styles.colors.welding[50] : 'transparent'
                            }} onClick={() => setSelectedProgram(program.id)}>
                              <input type="radio" name="program" value={program.id} checked={selectedProgram === program.id} onChange={() => setSelectedProgram(program.id)} style={{ display: 'none' }} />
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', backgroundColor: styles.colors.welding[100], display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', color: styles.colors.welding[600], fontSize: '1.25rem' }}>
                                  <i className={program.icon}></i>
                                </div>
                                <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.25rem' }}>{program.title}</h4>
                                <p style={{ color: styles.colors.gray[500], fontSize: '0.875rem' }}>{program.duration}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Personal Information */}
                      <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Personal Information</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '1.5rem' }}>
                          {['firstName', 'lastName', 'email', 'phone'].map((field, index) => {
                            const placeholder = field === 'email' ? 'your@email.com' : field === 'phone' ? '+1 (555) 123-4567' : field === 'firstName' ? 'John' : 'Doe'
                            const type = field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'
                            return (
                              <div key={index}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }} htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}*</label>
                                <Input id={field} type={type} placeholder={placeholder} required style={{ border: `1px solid ${styles.colors.gray[200]}`, borderRadius: '0.375rem', padding: '0.5rem 0.75rem', width: '100%' }} />
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      <Button type="submit" style={{ width: '100%', backgroundColor: styles.colors.welding[500], color: styles.colors.welding[900], fontWeight: 'bold', padding: '0.75rem 1.5rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', transition: styles.transitions.standard, marginTop: '1rem' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.colors.welding[400]}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.colors.welding[500]}>
                        Submit Application
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="fade-in">
              {/* Upcoming Classes */}
              <Card style={{ border: 'none', boxShadow: styles.shadows.lg }}>
                <CardContent style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Upcoming Classes</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {upcomingClasses.map((cls, i) => (
                      <div key={i} style={{ backgroundColor: styles.colors.welding[50], padding: '1rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <h4 style={{ fontWeight: '600' }}>{cls.date}</h4>
                          <p style={{ fontSize: '0.875rem', color: styles.colors.gray[600] }}>Day & Evening Classes</p>
                        </div>
                        <span style={{ padding: '0.25rem 0.75rem', backgroundColor: cls.availability === 'Available' ? styles.colors.green[100] : styles.colors.amber[100], color: cls.availability === 'Available' ? styles.colors.green[700] : styles.colors.amber[700], borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600' }}>{cls.availability}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Need Help */}
              <Card style={{ border: 'none', boxShadow: styles.shadows.lg }}>
                <CardContent style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Need Help?</h3>
                  <p style={{ marginBottom: '1rem', color: styles.colors.gray[600] }}>Our admissions team is here to answer any questions about our programs, financial aid options, or the enrollment process.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Phone style={{ color: styles.colors.welding[500], marginRight: '0.75rem', width: '20px', height: '20px' }} />
                      <div>
                        <h4 style={{ fontWeight: '600' }}>Call Us</h4>
                        <p style={{ fontSize: '0.875rem', color: styles.colors.gray[600] }}>
                          <a href="tel:+15551234567" style={{ color: styles.colors.welding[600], textDecoration: 'none', transition: styles.transitions.standard }}
                            onMouseEnter={(e) => e.currentTarget.style.color = styles.colors.welding[700]}
                            onMouseLeave={(e) => e.currentTarget.style.color = styles.colors.welding[600]}>+1 (555) 123-4567</a>
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Mail style={{ color: styles.colors.welding[500], marginRight: '0.75rem', width: '20px', height: '20px' }} />
                      <div>
                        <h4 style={{ fontWeight: '600' }}>Email Us</h4>
                        <p style={{ fontSize: '0.875rem', color: styles.colors.gray[600] }}>
                          <a href="mailto:admissions@weldmasteracademy.com" style={{ color: styles.colors.welding[600], textDecoration: 'none', transition: styles.transitions.standard }}
                            onMouseEnter={(e) => e.currentTarget.style.color = styles.colors.welding[700]}
                            onMouseLeave={(e) => e.currentTarget.style.color = styles.colors.welding[600]}>admissions@weldmasteracademy.com</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '5rem 0', backgroundColor: styles.colors.gray[50] }}>
        <div style={styles.container}>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: styles.colors.welding[800] }}>Frequently Asked Questions</h2>
            <p style={{ color: styles.colors.gray[600] }}>Find answers to common questions about our enrollment process and programs.</p>
          </div>

          <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
            <FaqItem 
              question="What are the payment options available?" 
              answer={
                <div>
                  <p>We offer several payment options to make our programs accessible:</p>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                    <li>Full payment with a 5% discount</li>
                    <li>Monthly payment plans (0% interest)</li>
                    <li>Private student loans through our partner financial institutions</li>
                    <li>Workforce development grants for those who qualify</li>
                    <li>GI Bill benefits for veterans</li>
                  </ul>
                  <p style={{ marginTop: '0.5rem' }}>Our financial aid office will work with you to find the best option for your situation.</p>
                </div>
              } 
              index={0}
            />
            <FaqItem 
              question="What is the refund policy?" 
              answer={
                <div>
                  <p>Our refund policy is as follows:</p>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                    <li>100% refund if cancelled at least 14 days before the start date</li>
                    <li>75% refund if cancelled 7-13 days before the start date</li>
                    <li>50% refund if cancelled 1-6 days before the start date</li>
                    <li>Pro-rated refund if withdrawn during the first week of classes</li>
                    <li>No refund after the first week of classes</li>
                  </ul>
                  <p style={{ marginTop: '0.5rem' }}>Application fees are non-refundable. For full details, please review our enrollment agreement.</p>
                </div>
              } 
              index={1}
            />
            <FaqItem 
              question="Is job placement assistance provided?" 
              answer={
                <div>
                  <p>Yes, we provide comprehensive job placement assistance to all graduates. Our services include:</p>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                    <li>Resume building and interview preparation</li>
                    <li>Access to our network of over 200 industry partners</li>
                    <li>Exclusive job fairs for WeldMaster Academy students and alumni</li>
                    <li>Job matching based on your skills and preferences</li>
                    <li>Ongoing career support even after graduation</li>
                  </ul>
                  <p style={{ marginTop: '0.5rem' }}>Our job placement rate is 98% within six months of graduation.</p>
                </div>
              } 
              index={2}
            />
          </div>
        </div>
      </section>

      <Footer />

      {/* Success Modal */}
      {formSubmitted && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <Card style={{ maxWidth: '28rem', margin: '0 auto', border: 'none' }}>
            <CardContent style={{ padding: '2rem', textAlign: 'center', position: 'relative' }}>
              <button onClick={handleCloseModal} style={{ position: 'absolute', top: '1rem', right: '1rem', color: styles.colors.gray[500], background: 'none', border: 'none', cursor: 'pointer', transition: styles.transitions.standard }}
                onMouseEnter={(e) => e.currentTarget.style.color = styles.colors.welding[500]}
                onMouseLeave={(e) => e.currentTarget.style.color = styles.colors.gray[500]}
                aria-label="Close modal">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div style={{ width: '5rem', height: '5rem', backgroundColor: styles.colors.welding[50], color: styles.colors.welding[500], borderRadius: '50%', margin: '0 auto 1.5rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: styles.colors.welding[500], marginBottom: '1rem' }}>Application Submitted!</h3>
              <p style={{ marginBottom: '1.5rem', color: styles.colors.gray[600] }}>Thank you for your interest in WeldMaster Academy. Your application has been successfully submitted. Our admissions team will contact you within 2 business days to discuss next steps.</p>

              <Button onClick={handleCloseModal} style={{ backgroundColor: styles.colors.welding[500], color: styles.colors.welding[900], fontWeight: 'bold', padding: '0.5rem 1.5rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', transition: styles.transitions.standard }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.colors.welding[400]}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.colors.welding[500]}>Close</Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Back to Top Button */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ position: 'fixed', bottom: '2rem', right: '2rem', width: '3rem', height: '3rem', backgroundColor: styles.colors.welding[500], color: styles.colors.white, borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: styles.shadows.lg, cursor: 'pointer', border: 'none', transition: styles.transitions.standard, zIndex: 40 }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = styles.colors.welding[600]; e.currentTarget.style.transform = 'translateY(-4px)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = styles.colors.welding[500]; e.currentTarget.style.transform = 'translateY(0)'; }}
        aria-label="Back to top">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </main>
  )
}
