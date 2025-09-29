'use client';

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select'
import { 
  Form,
  FormControl, 
  FormField, 
  FormLabel, 
  FormDescription
} from './ui/form'
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "./ui/alert-dialog"
import { Check } from 'lucide-react'

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        interest: '',
        message: ''
      })
    }, 1500)
  }

  return (
    <>
      <Form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField>
            <FormLabel className="text-black font-medium">First Name</FormLabel>
            <FormControl>
              <Input 
                placeholder="Your first name" 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required 
                className="border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
              />
            </FormControl>
          </FormField>
          <FormField>
            <FormLabel className="text-black font-medium">Last Name</FormLabel>
            <FormControl>
              <Input 
                placeholder="Your last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required 
                className="border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
              />
            </FormControl>
          </FormField>
        </div>

        <FormField>
          <FormLabel className="text-black font-medium">Email</FormLabel>
          <FormControl>
            <Input 
              type="email"
              placeholder="your.email@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
            />
          </FormControl>
        </FormField>

        <FormField>
          <FormLabel className="text-black font-medium">Phone</FormLabel>
          <FormControl>
            <Input 
              type="tel"
              placeholder="(416) 555-0123"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
            />
          </FormControl>
          <FormDescription className="text-gray-600">Optional</FormDescription>
        </FormField>

        <FormField>
          <FormLabel className="text-black font-medium">I&apos;m interested in</FormLabel>
          <Select value={formData.interest} onValueChange={(value) => setFormData(prev => ({ ...prev, interest: value }))}>
            <FormControl>
              <SelectTrigger className="border-gray-300 focus:border-black focus:ring-1 focus:ring-black">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="border-gray-300">
              <SelectItem value="beginner">Beginner Courses</SelectItem>
              <SelectItem value="advanced">Advanced Training</SelectItem>
              <SelectItem value="certification">Certification Programs</SelectItem>
              <SelectItem value="custom">Custom Training</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <FormField>
          <FormLabel className="text-black font-medium">Message</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Tell us about your welding goals or questions..."
              rows={5}
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
            />
          </FormControl>
        </FormField>

        <Button 
          type="submit" 
          className="w-full bg-black hover:bg-black/80 text-[#F8EE00] font-bold py-3 rounded-none transition-all hover:scale-[1.01]"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </Form>

      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent className="rounded-md border-[#F8EE00]">
          <AlertDialogHeader>
            <div className="mx-auto w-12 h-12 rounded-full bg-[#F8EE00] flex items-center justify-center mb-4">
              <Check className="text-black" size={24} />
            </div>
            <AlertDialogTitle className="text-center text-black font-bold text-xl">Message Sent!</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-gray-700">
              Thank you for contacting us. One of our welding experts will get back to you within 24 hours.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              className="bg-black hover:bg-black/80 text-[#F8EE00] font-bold px-5 py-2 rounded-none transition-all hover:scale-105"
              onClick={() => setShowSuccess(false)}
            >
              Got it!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default ContactForm