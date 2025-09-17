import React from 'react'
import { Button } from './ui/button'
import { Check } from 'lucide-react'

const PricingCard = ({ title, price, description, features, popular = false, cta = "Get Started" }) => {
  return (
    <div className={`relative rounded-xl overflow-hidden ${popular ? 'shadow-xl border-2 border-[#ffc107] scale-105 z-10' : 'shadow-lg border border-[#e6e6e6]'}`}>
      {popular && (
        <div className="absolute top-0 right-0 bg-[#ffc107] text-[#1a1a1a] py-1 px-4 rounded-bl-lg font-medium text-sm">
          Most Popular
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-[#6c6c6c] text-sm mb-4">{description}</p>
        <div className="mb-6">
          <span className="text-3xl font-bold">${price}</span>
          {price > 0 && <span className="text-[#6c6c6c]"> /month</span>}
        </div>
        <Button className={`w-full mb-6 ${popular ? 'bg-[#ffc107] hover:bg-[#ffc107]/90 text-[#1a1a1a]' : 'bg-[#ffecb3] hover:bg-[#ffecb3]/90 text-[#1a1a1a]'}`}>
          {cta}
        </Button>
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <div className="rounded-full bg-[#ffc107]/20 p-1 mt-0.5">
                <Check size={14} className="text-[#ffc107]" />
              </div>
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PricingCard