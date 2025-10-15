'use client';
import React from 'react'
import { Button } from './ui/button'
import { ArrowRight, GraduationCap, Wrench } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

const HeroSection = () => {
const router = useRouter()
  return (
    <div className="relative bg-gradient-to-b from-[#F8EE00]/10 to-white min-h-screen flex flex-col justify-center pt-20 overflow-hidden">

      {/* Background shapes */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#F8EE00]/20 blur-3xl"></div>
      <div className="absolute top-1/3 -left-24 w-72 h-72 rounded-full bg-[#F8EE00]/15 blur-3xl"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="space-y-8 max-w-lg">
            <span className="inline-block py-1 px-3 rounded-full bg-[#F8EE00]/30 text-sm font-medium mb-4 text-black">
              FROM SPARK TO SUCCESS
            </span>
            <h1 className="text-xl md:text-2xl font-bold text-black">
              YOUR PARTNER IN TRADES INNOVATION & <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-black/80">CAREER</span> DEVELOPMENT
            </h1>
            <p className="text-lg text-gray-700 max-w-md">
              We go beyond welding education , from professional training to industrial solutions. Skillworks welding helps you turn sparks into long term success in trades and manufacturing.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-black text-[#F8EE00] font-bold px-6 py-3 rounded-none shadow-lg transition-all transform hover:-translate-y-1 hover:shadow-2xl hover:bg-black/90 hover:cursor-pointer" onClick={() => router.push('/programs')}>
                Explore Courses
              </Button>

              <Button variant="outline" className="border-black text-black hover:bg-[#F8EE00]/10 hover:border-black hover:text-black hover:translate-y-[-4px] transition-transform rounded-none hover:cursor-pointer" onClick={() => router.push('/contact')}>
                Partner With US <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>

           <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { icon: Wrench, label: 'Career Ready Skills' },
                { icon: GraduationCap, label: 'Expert Led Programs' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#F8EE00]/30 flex items-center justify-center mb-2">
                    <item.icon className="text-black" />
                  </div>
                  <span className="font-bold text-black text-center">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Video Card */}
          <div className="relative md:flex-1 transition-transform hover:-translate-y-2">
            <div className="absolute -inset-0.5 bg-[#F8EE00] rounded-2xl blur opacity-30 animate-pulse"></div>
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-black/10">

              {/* Video placeholder */}
              <div className="aspect-video w-full bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                  <div className="w-20 h-20 rounded-full bg-[#F8EE00] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M8 5V19L19 12L8 5Z" fill="black" />
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
                  <span className="bg-[#F8EE00]/20 text-black text-xs font-medium py-1 px-2 rounded">FEATURED</span>
                  <div className="flex space-x-1 text-[#F8EE00]">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-black">MIG Welding Essentials</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Learn MIG welding essential class to gain hands-on experience of in-demand welding process.
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs text-gray-600">Starting at</span>
                    <p className="text-lg font-bold text-black">$1699</p>
                    <span className="text-base font-bold text-red-500">10% off for limited time</span>
                  </div>
                  <Button className="bg-black text-[#F8EE00] hover:bg-black/90 hover:-translate-y-1 transition-transform rounded-none hover:cursor-pointer">Enroll Now</Button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 70C840 80 960 100 1080 110C1200 120 1320 120 1380 120H1440V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V120Z" fill="white" />
        </svg>
      </div>

    </div>
  )
}

export default HeroSection