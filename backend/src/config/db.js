const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let memoryServer;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      console.error("MongoDB connection failed:", error.message);
      process.exit(1);
    }

    console.warn("Primary MongoDB unavailable. Starting in-memory MongoDB for development.");
    memoryServer = await MongoMemoryServer.create();
    await mongoose.connect(memoryServer.getUri());
    console.log("In-memory MongoDB connected");
  }
};

module.exports = connectDB;
