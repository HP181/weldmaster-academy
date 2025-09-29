import React from 'react'
import { Button } from './ui/button'
import { Check } from 'lucide-react'

const PricingCard = ({ title, price, description, features, popular = false, cta = "Get Started" }) => {
  return (
    <div className={`relative rounded-none overflow-hidden transform transition-transform duration-300 ${
      popular 
        ? 'shadow-xl border-2 border-[#F8EE00] scale-105 z-10' 
        : 'shadow-lg border border-gray-200 hover:scale-105'
    }`}>
      
      {popular && (
        <div className="absolute top-0 right-0 bg-[#F8EE00] text-black py-1 px-4 rounded-bl-lg font-bold text-sm">
          Most Popular
        </div>
      )}

      <div className="p-6 flex flex-col h-full">
        <h3 className="text-xl font-bold mb-2 text-black">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>

        <div className="mb-6 flex items-baseline gap-1">
          <span className="text-3xl font-bold text-black">${price}</span>
          {price > 0 && <span className="text-gray-600 text-sm">/month</span>}
        </div>

        <Button
          className={`w-full mb-6 font-semibold rounded-none transition-all ${
            popular 
              ? 'bg-black hover:bg-black/90 text-[#F8EE00] hover:scale-[1.02]' 
              : 'bg-[#F8EE00] hover:bg-[#F8EE00]/90 text-black hover:scale-[1.02]'
          }`}
        >
          {cta}
        </Button>

        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <div className="rounded-full bg-[#F8EE00]/20 p-1 mt-0.5 flex-shrink-0">
                <Check size={14} className="text-black" />
              </div>
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PricingCard