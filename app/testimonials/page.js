'use client';

import React, { useState, useEffect } from 'react'
import TestimonialCard from '@/components/testimonial-card'

const TestimonialSection = () => {
  const [isMobile, setIsMobile] = useState(true)
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    handleResize()
    
    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  // Add styles for hover-up animation
  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      .hover-up {
        transition: transform 0.3s ease;
      }
      .hover-up:hover {
        transform: translateY(-8px);
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])
  
  const testimonials = [
    {
      name: "Michael Johnson",
      role: "Certified Welder at Boeing",
      image: "https://placehold.co/100/ffc107/ffffff?text=MJ",
      quote: "WeldMaster Academy completely transformed my career path. The hands-on training and industry certification preparation gave me the confidence and skills I needed to land my dream job. The instructors truly care about your success."
    },
    {
      name: "Sarah Williams",
      role: "Owner, Custom Fabrication Shop",
      image: "https://placehold.co/100/ffc107/ffffff?text=SW",
      quote: "After taking the advanced TIG welding course, I was able to start my own custom fabrication business. The attention to detail and quality of instruction at WeldMaster Academy is unmatched. Worth every penny of the investment!"
    },
    {
      name: "David Rodriguez",
      role: "Pipeline Welder",
      image: "https://placehold.co/100/ffc107/ffffff?text=DR",
      quote: "The pipeline welding certification program prepared me for the real world in ways I never expected. The instructors have actual field experience and teach you tricks of the trade you won't find elsewhere. I'm earning double what I made before."
    },
    {
      name: "Emily Chen",
      role: "Aerospace Welding Specialist",
      image: "https://placehold.co/100/ffc107/ffffff?text=EC",
      quote: "I was hesitant to switch careers at 35, but the team at WeldMaster gave me the support I needed. Their aerospace welding program is incredibly thorough, and the job placement assistance was invaluable. Now I work for a major defense contractor."
    }
  ]
  
  // Style definitions
  const styles = {
    section: {
      padding: '5rem 0',
      backgroundColor: '#f8f9fa'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    header: {
      textAlign: 'center',
      maxWidth: '800px',
      margin: '0 auto 3rem auto'
    },
    tagline: {
      display: 'inline-block',
      padding: '0.25rem 0.75rem',
      backgroundColor: 'rgba(255, 193, 7, 0.1)',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#ffc107',
      marginBottom: '1rem'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#1a1a1a'
    },
    subtitle: {
      color: '#6c757d'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '1.5rem'
    }
  }
  
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.tagline}>Testimonials</span>
          <h2 style={styles.title}>What Our Students Say</h2>
          <p style={styles.subtitle}>
            Don't just take our word for it. Here's what our graduates have to say about their experience learning with WeldMaster Academy.
          </p>
        </div>
        
        <div style={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              quote={testimonial.quote}
              image={testimonial.image}
            />
          ))}
        </div>
        
        <div style={{
          textAlign: 'center',
          marginTop: '3rem'
        }}>
          <button style={{
            backgroundColor: '#ffc107',
            color: '#1a1a1a',
            border: 'none',
            borderRadius: '0.375rem',
            padding: '0.75rem 1.5rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ffb300';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ffc107';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            Read More Success Stories
          </button>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection