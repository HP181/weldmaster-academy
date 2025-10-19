// app/api/admin/dashboard/route.js
import { NextResponse } from "next/server";
import { auth  } from "@clerk/nextjs/server";
import connectDB from "@/Db/Connection";
import Contact from "@/Models/Contact";

export async function GET(req) {
  try {
    // Check if the user is authenticated
    const { isAuthenticated } = await auth()
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Connect to DB
    await connectDB();

    // Get all contacts, sorted by newest first
    const contacts = await Contact.find({})
      .sort({ createdAt: -1 })
      .lean();

    // Count total contacts
    const totalContacts = contacts.length;

    // Count contacts by subject
    const subjectCounts = contacts.reduce((acc, contact) => {
      acc[contact.subject] = (acc[contact.subject] || 0) + 1;
      return acc;
    }, {});

    // Get recent contacts (last 7 days)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const recentContacts = contacts.filter(
      (contact) => new Date(contact.createdAt) >= oneWeekAgo
    );

    return NextResponse.json({
      contacts,
      stats: {
        totalContacts,
        recentContacts: recentContacts.length,
        subjectCounts,
      },
    });
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
