import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const contactData = await request.json();

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL || 'http://localhost:3000';

    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Contact Form Submission</title>
        <style>
          body {
            background-color: #f9f9f9;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          .header {
            background-color: #000000;
            color: #F8EE00;
            text-align: center;
            padding: 20px 15px;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            letter-spacing: 1px;
          }
          .content {
            padding: 25px 30px;
          }
          .content p {
            margin: 8px 0;
            font-size: 15px;
            line-height: 1.6;
          }
          .highlight {
            background-color: #F8EE00;
            padding: 15px;
            border-radius: 8px;
            font-size: 15px;
            color: #000000;
            font-weight: 500;
          }
          .footer {
            background-color: #000000;
            color: #F8EE00;
            text-align: center;
            padding: 15px;
            font-size: 13px;
          }
          .footer a {
            color: #F8EE00;
            text-decoration: none;
            font-weight: bold;
          }
          @media only screen and (max-width: 600px) {
            .container {
              margin: 20px;
            }
            .content {
              padding: 20px;
            }
            .header h1 {
              font-size: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="content">
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${contactData.subject}</p>
            <p><strong>Message:</strong></p>
            <div class="highlight">
              ${contactData.message}
            </div>
            <p style="margin-top:20px;">
              👉 <a href="${appUrl}/admin/dashboard" target="_blank" style="color:#000; background:#F8EE00; padding:10px 15px; border-radius:6px; text-decoration:none; font-weight:bold;">View in Admin Dashboard</a>
            </p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `📩 New Contact Form Submission - ${contactData.subject}`,
      html: htmlTemplate,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
