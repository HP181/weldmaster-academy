import mongoose from "mongoose"

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email address"],
    },
    phone: {
      type: String,
      required: false,
      trim: true,
      match: [/^(\+\d{1,3}[- ]?)?\d{10,14}$/, "Please provide a valid phone number"],
    },
    subject: {
      type: String,
      enum: {
        values: ["Program Information", "Enrollment Questions", "Financial Aid", "Facility Tour", "Other"],
        message: "Please select a valid subject",
      },
      required: [true, "Subject is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [10, "Message must be at least 10 characters long"],
    },
    status: {
      type: String,
      enum: ["New", "Responded", "Archived"],
      default: "New"
    },
    respondedAt: {
      type: Date,
      default: null
    },
    adminNotes: {
      type: String,
      default: ""
    }
  },
  { timestamps: true },
)

export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema)