'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
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
} from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function Contact() {
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    
    // Define all colors and styles directly in the component
    const styles = {
        colors: {
            background: '#fffdf7',
            foreground: '#1a1a1a',
            primary: '#ffc107',
            primaryLight: '#fff8e1',
            primaryDark: '#ffb300',
            gray: {
                50: '#f8f9fa',
                200: '#e9ecef',
                600: '#6c757d'
            },
            white: '#ffffff'
        },
        shadows: {
            sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        },
        transitions: {
            standard: 'all 0.3s ease'
        },
        gradients: {
            primary: 'linear-gradient(to right, #ffc107, #ffb300)'
        },
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormSubmitted(true)
    }

    useEffect(() => {
        // Handle responsive layout detection
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        
        handleResize()

        // Add animation styles
        const styleElement = document.createElement('style')
        styleElement.innerHTML = `
            .fade-in { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
            .fade-in.active { opacity: 1; transform: translateY(0); }
            .slide-in-left { opacity: 0; transform: translateX(-50px); transition: opacity 0.6s ease, transform 0.6s ease; }
            .slide-in-left.active { opacity: 1; transform: translateX(0); }
            .slide-in-right { opacity: 0; transform: translateX(50px); transition: opacity 0.6s ease, transform 0.6s ease; }
            .slide-in-right.active { opacity: 1; transform: translateX(0); }
        `
        document.head.appendChild(styleElement)

        const handleScroll = () => {
            const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right')
            elements.forEach(el => {
                const elementTop = el.getBoundingClientRect().top
                const elementVisible = 150
                if (elementTop < window.innerHeight - elementVisible) {
                    el.classList.add('active')
                }
            })
        }

        setTimeout(() => handleScroll(), 300)

        window.addEventListener('resize', handleResize)
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('scroll', handleScroll)
            document.head.removeChild(styleElement)
        }
    }, [])

    return (
        <main>
            <Navbar />

            {/* Page Banner */}
            <section style={{
                backgroundColor: '#ffb300',
                padding: '80px 0',
                textAlign: 'center',
                color: '#ffffff'
            }}>
                <div style={styles.container}>
                    <h1 style={{
                        position: 'relative',
                        display: 'inline-block',
                        marginBottom: '1rem',
                        fontSize: '2.5rem',
                        fontWeight: 'bold'
                    }}>
                        Contact Us
                        <span style={{
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            bottom: '-0.5rem',
                            width: '6rem',
                            height: '0.25rem',
                            background: styles.gradients.primary
                        }}></span>
                    </h1>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'rgba(255, 255, 255, 0.7)'
                    }}>
                        <Link href="/" style={{ color: styles.colors.white, textDecoration: 'none', transition: styles.transitions.standard }}>Home</Link>
                        <span>/</span>
                        <span>Contact</span>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 0' }}>
                {/* Background decorations */}
                <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', backgroundColor: styles.colors.primaryLight, borderRadius: '50%', zIndex: 0 }}></div>
                <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '300px', height: '300px', backgroundColor: styles.colors.primaryLight, borderRadius: '50%', zIndex: 0 }}></div>

                <div style={{ ...styles.container, position: 'relative', zIndex: 10 }}>
                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Get In Touch</h2>
                        <p style={{ color: styles.colors.gray[600] }}>Have questions about our programs or want to learn more about WeldMaster Academy? We're here to help you start your welding journey.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '3rem' }}>
                        <div className="slide-in-left">
                            {/* Contact Info */}
                            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>We'd Love To Hear From You</h2>
                            <p style={{ marginBottom: '2rem', color: styles.colors.gray[600] }}>Whether you have questions about our welding programs, need assistance with enrollment, or want to schedule a facility tour, our team is ready to assist you.</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '2.5rem' }}>
                                {/* Location */}
                                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <div style={{ width: '3.5rem', height: '3.5rem', backgroundColor: styles.colors.primaryLight, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem', flexShrink: 0 }}>
                                        <MapPin style={{ color: styles.colors.primary }} size={24} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Our Location</h3>
                                        <p style={{ color: styles.colors.gray[600] }}>123 Welding Street, Industrial Park<br />Toronto, ON M4P 1A6, Canada</p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <div style={{ width: '3.5rem', height: '3.5rem', backgroundColor: styles.colors.primaryLight, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem', flexShrink: 0 }}>
                                        <Phone style={{ color: styles.colors.primary }} size={24} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Phone Number</h3>
                                        <p style={{ color: styles.colors.gray[600] }}>
                                            Main Office: <a href="tel:+15551234567" style={{ color: styles.colors.primaryDark, textDecoration: 'none', transition: styles.transitions.standard }}>+1 (555) 123-4567</a><br />
                                            Admissions: <a href="tel:+15551234568" style={{ color: styles.colors.primaryDark, textDecoration: 'none', transition: styles.transitions.standard }}>+1 (555) 123-4568</a>
                                        </p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <div style={{ width: '3.5rem', height: '3.5rem', backgroundColor: styles.colors.primaryLight, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem', flexShrink: 0 }}>
                                        <Mail style={{ color: styles.colors.primary }} size={24} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Email Address</h3>
                                        <p style={{ color: styles.colors.gray[600] }}>
                                            General Inquiries: <a href="mailto:info@weldmasteracademy.com" style={{ color: styles.colors.primaryDark, textDecoration: 'none', transition: styles.transitions.standard }}>info@weldmasteracademy.com</a><br />
                                            Admissions: <a href="mailto:admissions@weldmasteracademy.com" style={{ color: styles.colors.primaryDark, textDecoration: 'none', transition: styles.transitions.standard }}>admissions@weldmasteracademy.com</a>
                                        </p>
                                    </div>
                                </div>

                                {/* Hours */}
                                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <div style={{ width: '3.5rem', height: '3.5rem', backgroundColor: styles.colors.primaryLight, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem', flexShrink: 0 }}>
                                        <Clock style={{ color: styles.colors.primary }} size={24} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Office Hours</h3>
                                        <p style={{ color: styles.colors.gray[600] }}>
                                            Monday - Friday: 8:00 AM - 6:00 PM<br />
                                            Saturday: 9:00 AM - 1:00 PM<br />
                                            Sunday: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Socials */}
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Connect With Us</h3>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'].map((platform) => (
                                    <a
                                        key={platform}
                                        href="#"
                                        style={{
                                            width: '3rem',
                                            height: '3rem',
                                            backgroundColor: styles.colors.primaryLight,
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: styles.transitions.standard,
                                            color: styles.colors.foreground
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = styles.colors.primary;
                                            e.currentTarget.style.color = styles.colors.white;
                                            e.currentTarget.style.transform = 'translateY(-4px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = styles.colors.primaryLight;
                                            e.currentTarget.style.color = styles.colors.foreground;
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                        aria-label={platform}
                                    >
                                        {platform === 'facebook' && <i className="fab fa-facebook-f"></i>}
                                        {platform === 'twitter' && <i className="fab fa-twitter"></i>}
                                        {platform === 'instagram' && <i className="fab fa-instagram"></i>}
                                        {platform === 'linkedin' && <i className="fab fa-linkedin-in"></i>}
                                        {platform === 'youtube' && <i className="fab fa-youtube"></i>}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="slide-in-right">
                            <Card style={{ border: 'none', boxShadow: styles.shadows.xl }}>
                                <CardContent style={{ padding: '2rem' }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Send Us A Message</h3>
                                    <form onSubmit={handleSubmit}>
                                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                            <div>
                                                <label htmlFor="name" style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Your Name*</label>
                                                <Input id="name" placeholder="John Doe" required style={{ border: `1px solid ${styles.colors.gray[200]}`, borderRadius: '0.375rem', padding: '0.5rem 0.75rem', width: '100%', outline: 'none', transition: styles.transitions.standard }} />
                                            </div>
                                            <div>
                                                <label htmlFor="email" style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Email Address*</label>
                                                <Input id="email" type="email" placeholder="your@email.com" required style={{ border: `1px solid ${styles.colors.gray[200]}`, borderRadius: '0.375rem', padding: '0.5rem 0.75rem', width: '100%', outline: 'none', transition: styles.transitions.standard }} />
                                            </div>
                                            <div>
                                                <label htmlFor="phone" style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Phone Number</label>
                                                <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" style={{ border: `1px solid ${styles.colors.gray[200]}`, borderRadius: '0.375rem', padding: '0.5rem 0.75rem', width: '100%', outline: 'none', transition: styles.transitions.standard }} />
                                            </div>
                                            <div>
                                                <label htmlFor="subject" style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Subject*</label>
                                                <Select required>
                                                    <SelectTrigger style={{ border: `1px solid ${styles.colors.gray[200]}`, borderRadius: '0.375rem', padding: '0.5rem 0.75rem', width: '100%', outline: 'none', transition: styles.transitions.standard }}>
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
                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <label htmlFor="message" style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Your Message*</label>
                                            <Textarea id="message" placeholder="How can we help you?" required rows={5} style={{ border: `1px solid ${styles.colors.gray[200]}`, borderRadius: '0.375rem', padding: '0.5rem 0.75rem', width: '100%', outline: 'none', transition: styles.transitions.standard, resize: 'none' }} />
                                        </div>
                                        <Button type="submit" style={{ width: '100%', backgroundColor: styles.colors.primary, color: styles.colors.foreground, fontWeight: 'bold', padding: '0.75rem 1.5rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', transition: styles.transitions.standard }}>Send Message</Button>
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
