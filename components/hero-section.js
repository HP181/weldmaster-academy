'use client';
import React from 'react'
import { Button } from './ui/button'
import { ArrowRight, Award, BookOpen, Users } from 'lucide-react'
import Image from 'next/image'

const HeroSection = () => {

  return (
    <div className="relative bg-gradient-to-b from-yellow-100 to-white min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
      
      {/* Background shapes */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-yellow-400/10 blur-3xl"></div>
      <div className="absolute top-1/3 -left-24 w-72 h-72 rounded-full bg-orange-300/10 blur-3xl"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="space-y-8 max-w-lg">
            <span className="inline-block py-1 px-3 rounded-full bg-yellow-200 text-sm font-medium mb-4">
              Premier Welding Education
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">
              Master the Art of Welding with Experts
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              From beginners to professionals, our comprehensive programs provide hands-on training, certification preparation, and career advancement in all welding techniques.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="shadow-lg hover:translate-y-[-4px] transition-transform bg-yellow-400 text-black">
                Explore Courses
              </Button>
              <Button variant="outline" className="hover:translate-y-[-4px] transition-transform">
                Free Workshop <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { icon: Award, label: 'Certified' },
                { icon: BookOpen, label: '20+ Courses' },
                { icon: Users, label: '5000+ Students' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-yellow-200/30 flex items-center justify-center mb-2">
                    <item.icon className="text-yellow-400" />
                  </div>
                  <span className="font-bold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Video Card */}
          <div className="relative md:flex-1 transition-transform hover:-translate-y-2">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl blur opacity-30 animate-pulse"></div>
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
              
              {/* Video placeholder */}
              <div className="aspect-video w-full bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800/80">
                  <div className="w-20 h-20 rounded-full bg-orange-400/90 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
                <Image
                  src="https://images.unsplash.com/photo-1625047509252-ab38fb7a8e4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  width={1000}
                  height={1000}
                  alt="Welding Demo"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-orange-200/30 text-orange-400 text-xs font-medium py-1 px-2 rounded">FEATURED</span>
                  <div className="flex space-x-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">MIG Welding Masterclass</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Learn the fundamentals of MIG welding from industry experts and gain hands-on experience with real projects.
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs text-gray-600">Starting at</span>
                    <p className="text-lg font-bold">$299</p>
                  </div>
                  <Button className="hover:-translate-y-1 transition-transform">Enroll Now</Button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 70C840 80 960 100 1080 110C1200 120 1320 120 1380 120H1440V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V120Z" fill="white"/>
        </svg>
      </div>

    </div>
  )
}

export default HeroSection
