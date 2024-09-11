const express = require("express");
const router = express.Router();
// const connectDB = require("../config/db");
const {
  uploadBook,
  getAllBooks,
  updateBook,
  deleteBook,
  getSingleBook,
  paymentSession
} = require("../controllers/bookControllers");
// const multer = require("multer");

const connectDB = require("../config/db");

async function performDatabaseOperations() {
  try {
    const { bookCollections, paymentCollections } = await connectDB();

    router.post("/upload-book", async (req, res) => {
      uploadBook(req, res, bookCollections);
    });

    router.get("/all-books", async (req, res) => {
      getAllBooks(req, res, bookCollections);
    });
    router.patch("/book/:id", async (req, res) => {
      updateBook(req, res, bookCollections);
    });

    router.delete("/delete-book/:id", async (req, res) => {
      deleteBook(req, res, bookCollections);
    });

    router.get("/book/:id", async (req, res) => {
      getSingleBook(req, res, bookCollections);
    });
    router.post("/Payment-checkout", async (req, res) => {
      paymentSession(req, res);
    });

    // You can perform more operations as needed
  } catch (error) {
    console.error("Error performing database operations:", error);
  }
}

performDatabaseOperations();


module.exports = router;
