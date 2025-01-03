import mongoose from "mongoose";

const connectDb = (url) => {
  try {
    mongoose.connect(url);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1)
    
  }
}  

export default connectDb;