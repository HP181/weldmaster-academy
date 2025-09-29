'use client';

import React, { useState, useEffect } from 'react'
import TestimonialCard from '@/components/testimonial-card'

const TestimonialSection = () => {
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
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

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-yellow-400/20 text-yellow-400 text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            What Our Students Say
          </h2>
          <p className="text-gray-500">
            Don&apos;t just take our word for it. Here&apos;s what our graduates have to say about their experience learning with WeldMaster Academy.
          </p>
        </div>

        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-2 lg:grid-cols-4'}`}>
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

        <div className="text-center mt-12">
          <button className="bg-yellow-400 text-gray-900 font-semibold py-3 px-6 rounded-md shadow hover:bg-yellow-500 hover:-translate-y-1 hover:shadow-lg transition transform duration-300">
            Read More Success Stories
          </button>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
