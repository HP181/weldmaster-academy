// app/api/admin/dashboard/route.js

import { NextResponse } from "next/server"
import connectDB from "@/Db/Connection"
import Contact from "@/Models/Contact"

export async function GET() {
  try {
    await connectDB()
    
    // Get all contacts, sorted by creation date (newest first)
    const contacts = await Contact.find({})
      .sort({ createdAt: -1 })
      .lean() // Convert Mongoose documents to plain JavaScript objects
    
    // Count total documents
    const totalContacts = contacts.length
    
    // Count contacts by subject
    const subjectCounts = contacts.reduce((acc, contact) => {
      acc[contact.subject] = (acc[contact.subject] || 0) + 1
      return acc
    }, {})
    
    // Get recent contacts (last 7 days)
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    
    const recentContacts = contacts.filter(contact => 
      new Date(contact.createdAt) >= oneWeekAgo
    )
    
    return NextResponse.json({
      contacts,
      stats: {
        totalContacts,
        recentContacts: recentContacts.length,
        subjectCounts
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    )
  }
}
