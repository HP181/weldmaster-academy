'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react'
import { toast } from "sonner"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"

// Define validation schema
const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .trim(),
  email: z
    .string()
    .email("Please provide a valid email address")
    .trim(),
  phone: z
    .string()
    .regex(/^(\+\d{1,3}[- ]?)?\d{10,14}$/, "Please provide a valid phone number")
    .optional()
    .or(z.literal("")),
  subject: z
    .enum(["Program Information", "Enrollment Questions", "Financial Aid", "Facility Tour", "Other"], {
      errorMap: () => ({ message: "Please select a valid subject" })
    }),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long")
    .trim(),
})

export default function Contact() {
  const [isMobile, setIsMobile] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  // Initialize form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: undefined,
      message: "",
    },
  })

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()

    const styleEl = document.createElement('style')
    styleEl.innerHTML = `
      .fade-in { opacity: 0; transform: translateY(20px); transition: all 0.6s ease; }
      .fade-in.active { opacity: 1; transform: translateY(0); }
      .slide-in-left { opacity: 0; transform: translateX(-50px); transition: all 0.6s ease; }
      .slide-in-left.active { opacity: 1; transform: translateX(0); }
      .slide-in-right { opacity: 0; transform: translateX(50px); transition: all 0.6s ease; }
      .slide-in-right.active { opacity: 1; transform: translateX(0); }
    `
    document.head.appendChild(styleEl)

    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right')
      elements.forEach(el => {
        const top = el.getBoundingClientRect().top
        if (top < window.innerHeight - 150) el.classList.add('active')
      })
    }

    setTimeout(handleScroll, 300)
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      document.head.removeChild(styleEl)
    }
  }, [])

  const onSubmit = async (data) => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        // Handle validation errors from backend
        if (result.errors) {
          Object.keys(result.errors).forEach((field) => {
            form.setError(field, { message: result.errors[field] })
          })
          toast("Please check your form entries, There were some validation errors.")
          throw new Error("Validation failed")
        }
        throw new Error(result.error || "Failed to submit form")
      }

      // Success
      setShowSuccessDialog(true)
      form.reset()
      // toast("Message sent successfully!, We'll get back to you soon.")
    } catch (error) {
      toast(` ${error.message ? error.message : "Something went wrong. Please try again." }`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="bg-white">
      {/* Banner */}
      <section className="bg-[#F8EE00] text-black py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="inline-block text-4xl font-bold relative mb-4">
            Contact Us
            <span className="absolute -bottom-2 left-1/2 w-24 h-1 bg-black -translate-x-1/2"></span>
          </h1>
          <div className="flex justify-center items-center gap-2 text-black/70">
            <Link href="/" className="hover:text-black">Home</Link>
            <span>/</span>
            <span>Contact</span>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background circles */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#F8EE00]/10 rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#F8EE00]/10 rounded-full"></div>

        <div className="relative container mx-auto px-4 z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-black">Get In Touch</h2>
            <p className="text-gray-700">Have questions about our programs or want to learn more about WeldMaster Academy? We&apos;re here to help you start your welding journey.</p>
          </div>

          <div className={`grid gap-12 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {/* Info */}
            <div className="slide-in-left space-y-6">
              <h2 className="text-2xl font-bold text-black">We&apos;d Love To Hear From You</h2>
              <p className="text-gray-700">Whether you have questions about our welding programs, need assistance with enrollment, or want to schedule a facility tour, our team is ready to assist you.</p>

              {/* Info blocks */}
              {[
                {
                  icon: <MapPin className="text-black" size={24} />,
                  title: 'Our Location',
                  text: '123 Welding Street, Industrial Park\nToronto, ON M4P 1A6, Canada'
                },
                {
                  icon: <Phone className="text-black" size={24} />,
                  title: 'Phone Number',
                  text: 'Main Office: +1 (555) 123-4567\nAdmissions: +1 (555) 123-4568'
                },
                {
                  icon: <Mail className="text-black" size={24} />,
                  title: 'Email Address',
                  text: 'General Inquiries: info@weldmasteracademy.com\nAdmissions: admissions@weldmasteracademy.com'
                },
                {
                  icon: <Clock className="text-black" size={24} />,
                  title: 'Office Hours',
                  text: 'Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 1:00 PM\nSunday: Closed'
                }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-[#F8EE00]/20 rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-black">{item.title}</h3>
                    <p className="whitespace-pre-line text-gray-700">{item.text}</p>
                  </div>
                </div>
              ))}

              {/* Socials */}
              <div>
                <h3 className="text-lg font-semibold mb-2 text-black">Connect With Us</h3>
                <div className="flex gap-4">
                  {['facebook','twitter','instagram','linkedin','youtube'].map(platform => (
                    <a key={platform} href="#" className="w-12 h-12 bg-[#F8EE00]/20 rounded-full flex items-center justify-center text-black transition transform hover:bg-[#F8EE00] hover:-translate-y-1" aria-label={platform}>
                      <i className={`fab fa-${platform}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="slide-in-right">
              <Card className="shadow-xl rounded-none border border-gray-200">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6 text-black">Send Us A Message</h3>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                      <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="contact-name" className="block font-semibold text-black">
                              Your Name*
                            </FieldLabel>
                            <Input
                              {...field}
                              id="contact-name"
                              placeholder="John Doe"
                              aria-invalid={fieldState.invalid}
                              className="rounded-none border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} className="text-red-500 text-sm mt-1" />
                            )}
                          </Field>
                        )}
                      />

                      <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="contact-email" className="block font-semibold text-black">
                              Email Address*
                            </FieldLabel>
                            <Input
                              {...field}
                              id="contact-email"
                              type="email"
                              placeholder="your@email.com"
                              aria-invalid={fieldState.invalid}
                              className="rounded-none border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} className="text-red-500 text-sm mt-1" />
                            )}
                          </Field>
                        )}
                      />

                      <Controller
                        name="phone"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="contact-phone" className="block font-semibold text-black">
                              Phone Number
                            </FieldLabel>
                            <Input
                              {...field}
                              id="contact-phone"
                              type="tel"
                              placeholder="+1 (555) 123-4567"
                              aria-invalid={fieldState.invalid}
                              className="rounded-none border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} className="text-red-500 text-sm mt-1" />
                            )}
                          </Field>
                        )}
                      />

                      <Controller
                        name="subject"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="contact-subject" className="block font-semibold text-black">
                              Subject*
                            </FieldLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger
                                id="contact-subject"
                                aria-invalid={fieldState.invalid}
                                className="rounded-none border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
                              >
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                              <SelectContent className="rounded-none">
                                <SelectItem value="Program Information">Program Information</SelectItem>
                                <SelectItem value="Enrollment Questions">Enrollment Questions</SelectItem>
                                <SelectItem value="Financial Aid">Financial Aid</SelectItem>
                                <SelectItem value="Facility Tour">Facility Tour</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} className="text-red-500 text-sm mt-1" />
                            )}
                          </Field>
                        )}
                      />
                    </div>

                    <Controller
                      name="message"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="contact-message" className="block font-semibold text-black">
                            Your Message*
                          </FieldLabel>
                          <Textarea
                            {...field}
                            id="contact-message"
                            placeholder="How can we help you?"
                            rows={5}
                            aria-invalid={fieldState.invalid}
                            className="rounded-none border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} className="text-red-500 text-sm mt-1" />
                          )}
                        </Field>
                      )}
                    />

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-black hover:bg-black/90 text-[#F8EE00] font-bold py-3 rounded-lg hover:-translate-y-0.5 transition cursor-pointer"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 bg-[#F8EE00] rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="text-black" size={32} />
            </div>
            <DialogTitle className="text-center text-xl font-bold">Message Sent!</DialogTitle>
            <DialogDescription className="text-center">
              Thank you for contacting WeldMaster Academy. One of our team members will get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button 
              onClick={() => setShowSuccessDialog(false)}
              className="bg-black hover:bg-black/90 text-[#F8EE00] font-bold px-8"
            >
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}