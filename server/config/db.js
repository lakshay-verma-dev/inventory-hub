const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = "mongodb+srv://book-store:FneamjHH8BpqOTK4@cluster0.zm0eg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    const db = client.db("BookInventory");

    // Return multiple collections
    return {
      bookCollections: db.collection("Books"),
      paymentCollections: db.collection("payment"),
      // Add more collections if needed
    };
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
module.exports = connectDB;
