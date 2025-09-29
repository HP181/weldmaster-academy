import React from 'react'
import { Button } from './ui/button'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'

const FeatureCard = ({ title, description, icon: Icon, image, reverse }) => {
  return (
    <div className={`flex flex-col md:flex-row gap-6 md:gap-12 items-center ${reverse ? 'md:flex-row-reverse' : ''}`}>
      <div className="space-y-4 md:flex-1">
        <div className="w-12 h-12 rounded-lg bg-[#F8EE00]/20 flex items-center justify-center">
          <Icon className="text-[#F8EE00]" size={24} />
        </div>
        <h3 className="text-2xl font-bold text-black">{title}</h3>
        <p className="text-gray-700">{description}</p>
        <Button 
          variant="link" 
          className="p-0 font-medium text-black flex items-center gap-1 hover:gap-2 transition-all hover:text-black/80"
        >
          Learn more <ChevronRight size={16} />
        </Button>
      </div>

      <div className="md:flex-1 relative">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#F8EE00] to-[#F8EE00] opacity-40 rounded-lg blur-md group-hover:opacity-70 transition duration-300"></div>
          <div className="relative overflow-hidden rounded-lg border-2 border-black">
            <Image
              src={image}
              width={1000}
              height={1000}
              alt={title} 
              className="w-full aspect-video object-cover transform group-hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatureCard