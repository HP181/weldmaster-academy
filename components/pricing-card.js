import React from 'react'
import { Button } from './ui/button'
import { Check } from 'lucide-react'

const PricingCard = ({ title, price, description, features, popular = false, cta = "Get Started" }) => {
  return (
    <div className={`relative rounded-xl overflow-hidden transform transition-transform duration-300 ${
      popular 
        ? 'shadow-xl border-2 border-yellow-400 scale-105 z-10' 
        : 'shadow-lg border border-gray-200 hover:scale-105'
    }`}>
      
      {popular && (
        <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 py-1 px-4 rounded-bl-lg font-medium text-sm">
          Most Popular
        </div>
      )}

      <div className="p-6 flex flex-col h-full">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-4">{description}</p>

        <div className="mb-6 flex items-baseline gap-1">
          <span className="text-3xl font-bold">${price}</span>
          {price > 0 && <span className="text-gray-500 text-sm">/month</span>}
        </div>

        <Button
          className={`w-full mb-6 font-semibold ${
            popular 
              ? 'bg-yellow-400 hover:bg-yellow-400/90 text-gray-900' 
              : 'bg-yellow-200 hover:bg-yellow-200/90 text-gray-900'
          }`}
        >
          {cta}
        </Button>

        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <div className="rounded-full bg-yellow-400/20 p-1 mt-0.5 flex-shrink-0">
                <Check size={14} className="text-yellow-400" />
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
