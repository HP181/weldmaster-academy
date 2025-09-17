import React from 'react'
import { Button } from './ui/button'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'

const FeatureCard = ({ title, description, icon: Icon, image, reverse }) => {
  return (
    <div className={`flex flex-col md:flex-row gap-6 md:gap-12 items-center ${reverse ? 'md:flex-row-reverse' : ''}`}>
      <div className="space-y-4 md:flex-1">
        <div className="w-12 h-12 rounded-lg bg-[#ffc107]/20 flex items-center justify-center">
          <Icon className="text-[#ffc107]" size={24} />
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-[#6c6c6c]">{description}</p>
        <Button variant="link" className="p-0 font-medium text-[#ffc107] flex items-center gap-1 hover:gap-2 transition-all">
          Learn more <ChevronRight size={16} />
        </Button>
      </div>

      <div className="md:flex-1 relative">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#ffc107] to-[#ff9800] opacity-30 rounded-lg blur-md group-hover:opacity-60 transition duration-300"></div>
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={image} 
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
