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
        const { note } = await request.json()

        if (!note && note !== "") {
            return NextResponse.json(
                { error: "Note is required" },
                { status: 400 }
            )
        }

        await connectDB()

        // First, check if the contact exists
        const contact = await Contact.findById(id)

        if (!contact) {
            return NextResponse.json(
                { error: "Contact not found" },
                { status: 404 }
            )
        }

        // Update the contact with admin notes
        contact.adminNotes = note

        await contact.save()

        return NextResponse.json({
            message: "Note updated successfully",
            contact
        })
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update note" },
            { status: 500 }
        )
    }
}
