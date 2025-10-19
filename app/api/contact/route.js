// app/api/contact/route.js
import { NextResponse } from "next/server";
import connectDB from "@/Db/Connection";
import Contact from "@/Models/Contact";

export async function POST(request) {
    try {
        // Parse request data
        const data = await request.json();
        
        // Connect to database
        await connectDB();
        
        // Create and save contact to database
        const newContact = new Contact(data);
        const validationError = newContact.validateSync();
        
        if (validationError) {
            const errors = {};
            Object.keys(validationError.errors).forEach(field => {
                errors[field] = validationError.errors[field].message;
            });
            
            return NextResponse.json({ errors }, { status: 400 });
        }
        
        // Save to database
        await newContact.save();
        
        // Trigger email notification in background
        fetch("https://www.skillworksweld.ca/api/send-email", {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: newContact.name,
                email: newContact.email,
                phone: newContact.phone,
                subject: newContact.subject,
                message: newContact.message
            })
        }).catch(err => {
            // Log error but don't fail the request
            console.error("Error triggering email notification:", err);
        });
        
        return NextResponse.json({ 
            message: "Contact form submitted successfully.",
            contact: newContact
        }, { status: 201 });
    } catch (error) {
        console.error("Error submitting contact form:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}