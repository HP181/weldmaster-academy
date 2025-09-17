'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Check, Clock, User, ChevronDown } from 'lucide-react'

export default function Programs() {
  const [activeTab, setActiveTab] = useState('overview')
  const [activeAccordion, setActiveAccordion] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  
  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id)
  }

  const programsData = [
    {
      id: 'mig',
      title: 'MIG Welding Mastery',
      category: 'beginner',
      duration: '12 Weeks',
      level: 'Beginner',
      image: '/images/mig-welding.jpg',
      description: 'Master the art of Metal Inert Gas welding with our comprehensive program covering everything from basic to advanced techniques.'
    },
    {
      id: 'tig',
      title: 'TIG Welding Specialist',
      category: 'intermediate',
      duration: '16 Weeks',
      level: 'Intermediate',
      image: '/images/tig-welding.jpg',
      description: 'Develop precision and control with our Tungsten Inert Gas welding program, perfect for those looking to work with aluminum and stainless steel.'
    },
    {
      id: 'stick',
      title: 'Stick Welding Fundamentals',
      category: 'beginner',
      duration: '10 Weeks',
      level: 'Beginner',
      image: '/images/stick-welding.jpg',
      description: 'Learn the oldest and most versatile welding process, perfect for outdoor projects and heavy industrial applications.'
    },
    {
      id: 'pipe',
      title: 'Advanced Pipe Welding',
      category: 'advanced',
      duration: '20 Weeks',
      level: 'Advanced',
      image: '/images/pipe-welding.jpg',
      description: 'Take your skills to the next level with our advanced pipe welding program, designed for experienced welders looking to specialize.'
    },
    {
      id: 'flux-core',
      title: 'Flux Core Welding',
      category: 'intermediate',
      duration: '14 Weeks',
      level: 'Intermediate',
      image: '/images/flux-core-welding.jpg',
      description: 'Master the technique of flux core arc welding, perfect for outdoor applications and working with thick materials in windy conditions.'
    },
    {
      id: 'certification',
      title: 'AWS Certification Preparation',
      category: 'certification',
      duration: '8 Weeks',
      level: 'Certification',
      image: '/images/certification-program.jpg',
      description: 'Prepare for American Welding Society certification exams with our specialized program designed to help you pass on your first attempt.'
    }
  ]

  const filteredPrograms = () => {
    if (activeFilter === 'all') return programsData
    return programsData.filter(program => program.category === activeFilter)
  }

  useEffect(() => {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right')
    const handleScroll = () => {
      animatedElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top
        const elementVisible = 150
        if (elementTop < window.innerHeight - elementVisible) {
          el.classList.add('active')
        }
      })
    }
    setTimeout(handleScroll, 300)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main>
      <Navbar />

      {/* Page Banner */}
      <section className="bg-[#FFCC00] text-white py-24">
        <div className="container mx-auto text-center">
          <h1 className="relative inline-block mb-4 text-4xl font-bold">
            Our Welding Programs
            <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-24 h-1 bg-gradient-to-r from-[#FFCC00] to-[#FF9900]"></span>
          </h1>
          <div className="flex justify-center items-center gap-2 text-white/70">
            <Link href="/" className="text-white hover:text-[#FFD633]">Home</Link>
            <span>/</span>
            <span>Programs</span>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-[#f9f9f9] px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Comprehensive Welding Education</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Choose from our wide range of welding programs designed for all skill levels, from beginners to experienced professionals.</p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['all','beginner','intermediate','advanced','certification'].map(filter => (
              <Button 
                key={filter}
                variant={activeFilter === filter ? 'default' : 'outline'} 
                className={activeFilter === filter 
                  ? 'bg-[#FFCC00] hover:bg-[#FFB800] text-white' 
                  : 'hover:bg-[#FFCC00] hover:text-white text-gray-800'} 
                onClick={() => setActiveFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            ))}
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms().map((program) => (
              <Card 
                key={program.id}
                className="rounded-xl overflow-hidden border-none shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl fade-in"
              >
                <div className="h-52 overflow-hidden">
                  <Image 
                    src={program.image} 
                    alt={program.title} 
                    width={400} 
                    height={200}
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{program.title}</h3>
                  <p className="text-gray-600 mb-6">{program.description}</p>
                  <div className="flex justify-between items-center border-t border-gray-100 pt-4 mb-6">
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-2 text-[#FFCC00]" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <User className="h-4 w-4 mr-2 text-[#FFCC00]" />
                      <span>{program.level}</span>
                    </div>
                  </div>
                  <Button asChild className="w-full bg-[#FFCC00] hover:bg-[#FFB800] text-white">
                    <Link href={`#${program.id}`}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Program Details */}
      <section id="mig-welding" className="bg-gray-50 py-16">
        <div className="container mx-auto">
          {/* ... Tabs and Accordion code remains unchanged ... */}

          <div className="space-y-6 mt-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Upcoming Start Dates</h3>
                <ul className="space-y-3">
                  {['January 15, 2026','March 10, 2026','May 5, 2026'].map((date,index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-[#FFCC00] mr-3 mt-1 flex-shrink-0" />
                      <span>{date}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
