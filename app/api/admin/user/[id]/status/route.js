import { NextResponse } from "next/server"
import connectDB from "@/Db/Connection"
import Contact from "@/Models/Contact"
import { auth } from "@clerk/nextjs/server";

export async function POST(request, { params }) {
  try {

    const { isAuthenticated } = await auth();
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }


    const param = await params;
    const { id } = param;
    const { status, respondedAt } = await request.json()

    // Validate status
    if (!status || !["New", "Responded", "Archived"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      )
    }

    await connectDB()

    // Check if the contact exists
    const contact = await Contact.findById(id)

    if (!contact) {
      return NextResponse.json(
        { error: "Contact not found" },
        { status: 404 }
      )
    }

    // Update the contact status
    contact.status = status

    // Set respondedAt based on status
    if (status === "Responded") {
      contact.respondedAt = respondedAt || new Date()
    } else {
      contact.respondedAt = null
    }

    await contact.save()

    return NextResponse.json({
      message: "Status updated successfully",
      contact
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    )
  }
}
