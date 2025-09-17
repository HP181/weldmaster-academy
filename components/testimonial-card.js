import React from 'react'

const TestimonialCard = ({ name, role, quote, image }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md relative hover:-translate-y-2 transition-transform h-full">
      <div className="absolute top-6 left-6 text-[3.75rem] text-[#ffc107]/20">"</div>
      <p className="text-[#6c6c6c] mb-6 relative z-10">{quote}</p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-[#6c6c6c]">{role}</p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard