'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'

export default function Pricing() {
  const plans = [
    {
      name: 'Beginner Plan',
      price: '$499',
      duration: 'per course',
      features: [
        'Access to Beginner Welding Programs',
        'Hands-on Training',
        'Course Materials Included',
        'Certificate of Completion',
      ],
      cta: 'Enroll Now',
      highlight: false,
    },
    {
      name: 'Professional Plan',
      price: '$899',
      duration: 'per course',
      features: [
        'Access to Intermediate & Advanced Programs',
        'Extended Practice Hours',
        '1-on-1 Mentorship',
        'AWS Certification Prep',
        'Priority Support',
      ],
      cta: 'Get Started',
      highlight: true,
    },
    {
      name: 'Certification Prep',
      price: '$699',
      duration: 'per course',
      features: [
        'AWS Exam-Focused Training',
        'Mock Tests & Evaluations',
        'Dedicated Instructor Guidance',
        'Flexible Scheduling',
      ],
      cta: 'Prepare Now',
      highlight: false,
    },
  ]

  return (
    <main>
      <Navbar />

      {/* Page Banner */}
      <section className="bg-[#FFCC00] text-white py-24 !px-10">
        <div className="container mx-auto text-center">
          <h1 className="relative inline-block mb-4 text-4xl font-bold">
            Pricing Plans
            <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-24 h-1 bg-gradient-to-r from-[#FFCC00] to-[#FF9900]"></span>
          </h1>
          <div className="flex justify-center items-center gap-2 text-white/70">
            <Link href="/" className="text-white hover:text-[#FFD633]">
              Home
            </Link>
            <span>/</span>
            <span>Pricing</span>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Flexible Plans for Every Welder</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you’re starting out or preparing for certification, choose a plan that fits your welding journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`rounded-xl shadow-lg overflow-hidden transition-transform hover:-translate-y-2 hover:shadow-xl ${
                  plan.highlight ? 'border-2 border-[#FF9900]' : 'border border-gray-200'
                }`}
              >
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-4xl font-extrabold text-[#FF9900] mb-2">{plan.price}</p>
                  <p className="text-gray-500 mb-6">{plan.duration}</p>

                  <ul className="space-y-3 mb-6 text-left">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="h-5 w-5 text-[#FF9900] mr-3" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full py-3 text-lg font-semibold ${
                      plan.highlight
                        ? 'bg-[#FF9900] hover:bg-[#e68a00] text-white'
                        : 'bg-gray-800 hover:bg-gray-900 text-white'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
