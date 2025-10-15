'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Pricing() {

  const router = useRouter();

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

      {/* Page Banner */}
      <section className="bg-[#F8EE00] text-black py-24 px-4 md:px-10">
        <div className="container mx-auto text-center">
          <h1 className="relative inline-block mb-4 text-4xl font-bold">
            Pricing Plans
            <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-24 h-1 bg-black"></span>
          </h1>
          <div className="flex justify-center items-center gap-2 text-black/70">
            <Link href="/" className="hover:text-black">
              Home
            </Link>
            <span>/</span>
            <span>Pricing</span>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto flex flex-col items-center px-">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-black">Flexible Plans for Every Welder</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              At Skillworks, every student and client is unique. Schedule an initial consultation call to discusswith our expert to discuss your goal, identify your needs, and explore the program or solution that fit you best.
            </p>
          </div>

          <Button className="w-auto md:w-sm bg-black text-[#F8EE00] hover:bg-black/90 rounded-lg hover:-translate-y-0.5 transition cursor-pointer" onClick={() => router.push('/contact')}>
            Contact Here
          </Button>

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`rounded-none shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  plan.highlight ? 'border-2 border-[#F8EE00]' : 'border border-gray-200'
                }`}
              >
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-2 text-black">{plan.name}</h3>
                  <p className={`text-4xl font-extrabold mb-2 ${plan.highlight ? 'text-black' : 'text-black'}`}>{plan.price}</p>
                  <p className="text-gray-600 mb-6">{plan.duration}</p>

                  <ul className="space-y-3 mb-6 text-left">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className={`h-5 w-5 mr-3 ${plan.highlight ? 'text-[#F8EE00]' : 'text-[#F8EE00]'}`} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full py-3 text-lg font-semibold transition-colors duration-300 rounded-none hover:cursor-pointer ${
                      plan.highlight
                        ? 'bg-black hover:bg-black/90 text-[#F8EE00]'
                        : 'bg-[#F8EE00] hover:bg-[#F8EE00]/90 text-black'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div> */}
        </div>
      </section>

    </main>
  )
}