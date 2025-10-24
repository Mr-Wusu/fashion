import mongoose from "mongoose";

export default async function connectToDB() {
  try {
    // Check if connection string exists
    if (!process.env.MONGODB_CONNECTION_STRING) {
      throw new Error(
        "MONGODB_CONNECTION_STRING is not defined in environment variables"
      );
    }

    // Connect to MongoDB
    const connection = await mongoose.connect(
      process.env.MONGODB_CONNECTION_STRING
    );

    console.log("✅ MongoDB connected successfully");
    return connection;
  } catch (error) {
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes("bad auth")) {
        console.error("❌ Authentication failed. Please check:");
        console.error("   1. Username and password are correct");
        console.error("   2. Special characters in password are URL-encoded");
        console.error("   3. Database user exists in MongoDB Atlas");
        console.error("   4. User has proper permissions");
      } else if (error.message.includes("ENOTFOUND")) {
        console.error(
          "❌ Could not find MongoDB server. Check your connection string."
        );
      } else if (error.message.includes("connect")) {
        console.error("❌ Network error. Check:");
        console.error("   1. Your internet connection");
        console.error("   2. IP whitelist in MongoDB Atlas");
      }
    }

    throw new Error(`MongoDB connection failed: ${error}`);
  }
}

// Optional: Handle connection events
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from MongoDB");
});
