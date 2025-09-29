import Image from 'next/image'
import React from 'react'

const TestimonialCard = ({ name, role, quote, image }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md relative hover:-translate-y-2 transition-transform duration-300 h-full">
      {/* Decorative quote mark */}
      <div className="absolute top-6 left-6 text-7xl text-yellow-400/20 select-none pointer-events-none">&quot;</div>
      
      {/* Quote text */}
      <p className="text-gray-500 mb-6 relative z-10">{quote}</p>
      
      {/* Author info */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <Image 
            src={image} 
            width={1000} 
            height={1000} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{name}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard
