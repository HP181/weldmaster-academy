"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"

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

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

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

  const onSubmit = async (data) => {
    console.log("[v0] Submitting form data:", data)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      console.log("[v0] Response status:", response.status)
      const result = await response.json()
      console.log("[v0] API response:", result)

      if (!response.ok) {
        // Handle validation errors from backend
        if (result.errors) {
          Object.keys(result.errors).forEach((field) => {
            form.setError(field, { message: result.errors[field] })
          })
          toast("Validation failed, Please check the form for errors")
          throw new Error("Validation failed")
        }
        throw new Error(result.error || "Failed to submit form")
      }

      setShowSuccessDialog(true)
      form.reset()
    } catch (error) {
      console.error("[v0] Form submission error:", error)
      toast(`Error : ${error.message} || Something went wrong. Please try again.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>
            Fill out the form below to send us a message.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-6">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="contact-name">
                      Full Name *
                    </FieldLabel>
                    <Input
                      {...field}
                      id="contact-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="John Doe"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="contact-email">
                      Email *
                    </FieldLabel>
                    <Input
                      {...field}
                      id="contact-email"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="you@example.com"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="contact-phone">
                      Phone Number
                    </FieldLabel>
                    <Input
                      {...field}
                      id="contact-phone"
                      type="tel"
                      aria-invalid={fieldState.invalid}
                      placeholder="+1 (123) 456-7890"
                    />
                    <FieldDescription>
                      Optional, but helpful for phone consultations
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              
              <Controller
                name="subject"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="contact-subject">
                      Subject *
                    </FieldLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger id="contact-subject" aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Program Information">Program Information</SelectItem>
                        <SelectItem value="Enrollment Questions">Enrollment Questions</SelectItem>
                        <SelectItem value="Financial Aid">Financial Aid</SelectItem>
                        <SelectItem value="Facility Tour">Facility Tour</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              
              <Controller
                name="message"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="contact-message">
                      Message *
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="contact-message"
                        placeholder="Tell us about your questions or interests..."
                        rows={5}
                        aria-invalid={fieldState.invalid}
                      />
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            form="contact-form"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message Sent!</DialogTitle>
            <DialogDescription>
              Thank you for contacting us. One of our experts will get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setShowSuccessDialog(false)}>
              Got it!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}