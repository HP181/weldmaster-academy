'use client';

import React from 'react'
import { Button } from '@/components/ui/button'
import HeroSection from '@/components/hero-section'
import FeatureCard from '@/components/feature-card'
import TestimonialSection from './testimonials/page'
import { 
  Flame, 
  BookOpen, 
  Award, 
  Users, 
  Sparkles, 
  ShieldCheck,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-24 bg-[#fffdf7]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-[#ffc107]/20 text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Learn Welding from Industry Experts
            </h2>
            <p className="text-[#6c6c6c]">
              Our comprehensive welding programs combine hands-on experience with expert instruction to prepare you for a successful career in welding.
            </p>
          </div>
          
          <div className="space-y-24">
            <FeatureCard 
              title="State-of-the-Art Facilities"
              description="Train with the latest welding equipment in our modern facilities designed to simulate real-world working environments. Our workshops feature industry-standard tools and safety equipment to ensure you're learning with the best."
              icon={Flame}
              image="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
              className="hover-up"
            />
            
            <FeatureCard 
              title="Comprehensive Curriculum"
              description="From basic techniques to advanced specializations, our curriculum covers all aspects of welding. Learn MIG, TIG, Stick, and Flux-Cored welding methods with progressive modules designed to build your skills systematically."
              icon={BookOpen}
              image="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
              reverse
              className="hover-up"
            />
            
            <FeatureCard 
              title="Industry Certifications"
              description="Prepare for nationally recognized welding certifications that employers demand. Our specialized prep courses have a 95% pass rate for AWS, ASME, and other major certifications, giving your career the credentials it needs."
              icon={Award}
              image="https://images.unsplash.com/photo-1605512000489-4c923df5709d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80"
              className="hover-up"
            />
          </div>
        </div>
      </section>
      
      {/* Courses Preview Section */}
      <section className="py-24 bg-[#f8f8f8]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <span className="inline-block py-1 px-3 rounded-full bg-[#ffc107]/20 text-sm font-medium mb-4">
                Our Courses
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gradient">
                Popular Welding Programs
              </h2>
            </div>
            <Button variant="link" asChild className="text-[#ffc107] flex items-center gap-1">
              <Link href="/features">
                View all courses <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "MIG Welding Fundamentals",
                image: "https://images.unsplash.com/photo-1626668893629-e7fde9bd05fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1372&q=80",
                duration: "6 weeks",
                level: "Beginner"
              },
              {
                title: "TIG Welding Mastery",
                image: "https://images.unsplash.com/photo-1616362258063-108a9c3fa48a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80",
                duration: "8 weeks",
                level: "Intermediate",
                featured: true
              },
              {
                title: "Advanced Pipe Welding",
                image: "https://images.unsplash.com/photo-1518241353330-927397a24b75?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
                duration: "10 weeks",
                level: "Advanced"
              }
            ].map((course, index) => (
              <div key={index} className="group relative bg-[#ffffff] rounded-xl overflow-hidden shadow-lg hover-up">
                {course.featured && (
                  <div className="absolute top-4 right-4 z-10 bg-[#ffc107] text-[#1a1a1a] py-1 px-3 rounded-full text-xs font-medium">
                    Best Seller
                  </div>
                )}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-4 z-10 flex space-x-2">
                    <span className="bg-black/60 text-white text-xs py-1 px-2 rounded-full backdrop-blur-sm">
                      {course.duration}
                    </span>
                    <span className="bg-black/60 text-white text-xs py-1 px-2 rounded-full backdrop-blur-sm">
                      {course.level}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">{course.title}</h3>
                  <div className="space-y-2 mb-4">
                    {[
                      "Hands-on projects",
                      "Live demonstrations",
                      "Industry certification prep",
                      "Job placement assistance"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="text-[#ffc107]" size={16} />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full shadow-yellow">
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <TestimonialSection />

      {/* Stats Section */}
      <section className="py-24 bg-gradient-yellow text-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "5,000+", label: "Students Trained", icon: Users },
              { value: "98%", label: "Job Placement", icon: Sparkles },
              { value: "25+", label: "Industry Partners", icon: ShieldCheck },
              { value: "15+", label: "Years Experience", icon: Award }
            ].map((stat, index) => (
              <div key={index} className="p-6 backdrop-blur-sm bg-white/10 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 animate-spark">
                  <stat.icon className="text-white" size={24} />
                </div>
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-[#fffdf7] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#ffc107]/10 blur-3xl"></div>
          <div className="absolute bottom-0 -left-24 w-72 h-72 rounded-full bg-[#ff9800]/10 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-[#ffffff] rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 -mt-12 -mr-12">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#ffc107" fillOpacity="0.1" d="M45.2,-59.1C58.4,-51.3,68.9,-37.6,73.6,-22.1C78.4,-6.6,77.4,10.7,70.8,25.2C64.1,39.7,51.8,51.5,37.5,58.5C23.3,65.5,7.2,67.8,-8.6,66.3C-24.4,64.9,-40,59.6,-50.7,49.1C-61.5,38.6,-67.3,22.9,-70.5,5.8C-73.7,-11.3,-74.2,-29.9,-65.6,-42.6C-57,-55.3,-39.4,-62.1,-23.4,-68.2C-7.5,-74.2,6.9,-79.5,21.6,-76.9C36.3,-74.4,51.3,-64.1,45.2,-59.1Z" transform="translate(100 100)" />
              </svg>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                  Ready to Spark Your Welding Career?
                </h2>
                <p className="text-[#6c6c6c] mb-6">
                  Join thousands of successful graduates who have transformed their passion for welding into rewarding careers. Start your journey today with our expert-led programs.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="shadow-yellow">
                    Start Learning
                  </Button>
                  <Button variant="outline" className="border-[#ffc107] text-[#1a1a1a] hover:bg-[#ffc107]/10">
                    Schedule Tour
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#ffc107] to-[#ff9800] rounded-xl blur opacity-30"></div>
                <div className="relative bg-[#ffffff] rounded-xl overflow-hidden p-6">
                  <h3 className="text-xl font-bold mb-4">Request Information</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">First Name</label>
                        <input className="w-full px-3 py-2 border border-[#e6e6e6] rounded-md" placeholder="John" required />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Last Name</label>
                        <input className="w-full px-3 py-2 border border-[#e6e6e6] rounded-md" placeholder="Doe" required />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Email</label>
                      <input type="email" className="w-full px-3 py-2 border border-[#e6e6e6] rounded-md" placeholder="you@example.com" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Phone</label>
                      <input type="tel" className="w-full px-3 py-2 border border-[#e6e6e6] rounded-md" placeholder="(123) 456-7890" />
                    </div>
                    <Button type="submit" className="w-full shadow-yellow">
                      Get More Info
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}