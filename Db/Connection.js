import mongoose from "mongoose"

const connectDB = async () => {
  // If connection is already established, use it
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection
  }

  try {
    await mongoose.connect(process.env.MONGO_URI)
    return mongoose.connection
  } catch (error) {
    console.error("[v0] MongoDB connection error:", error)
    throw new Error("Failed to connect to MongoDB")
  }
}

export default connectDB
