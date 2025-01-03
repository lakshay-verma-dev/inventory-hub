import { v4 as uuidv4 } from "uuid"; // For generating unique string IDs
import Book from "../models/book.models.js";
import uploadImageToCloudinary from "../utils/cloudnary.js";

const uploadBook = async (req, res) => {
  try {
    const { title, author, price, description, category } = req.body;
    const file = req.file;

    if (!title || !author || !price || !description || !category || !file) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const existingBook = await Book.findOne({ title });
    if (existingBook)
      return res.status(400).json({ error: "Book already exists" });

    let imageURL;
    try {
      const cloudinaryResponse = await uploadImageToCloudinary(
        file.buffer,
        file.mimetype
      );
      imageURL = cloudinaryResponse.secure_url;

      if (!imageURL) {
        return res
          .status(500)
          .json({ error: "Failed to upload image to Cloudinary" });
      }
    } catch (uploadError) {
      console.error("Error uploading image to Cloudinary:", uploadError);
      return res.status(500).json({ error: "Failed to upload image" });
    }

    // Create new book document

    // const user = await User.create({ firstName, lastName, email, password });
    const newBook = await Book.create({
      id: uuidv4(),
      title,
      author,
      price: parseFloat(price), // Ensure price is stored as a number
      description,
      imageURL,
      category,
    });

    res
      .status(201)
      .json({ message: "Book uploaded successfully", book: newBook });
  } catch (error) {
    console.error("Error uploading book:", error);
    res.status(500).json({ error: "Failed to upload book" });
  }
};
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    if (!books) {
      return res.status(404).json({ error: "No books found" });
    }
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updateBookData = req.body;
    if (!updateBookData) {
      return res.status(400).json({ error: "No data to update" });
    } ///

    if (req.file) {
      const cloudinaryResponse = await uploadImageToCloudinary(
        req.file.buffer,
        req.file.mimetype
      );
      updateBookData.imageURL = cloudinaryResponse.secure_url;
    }

    const updatedBook = await Book.findOneAndUpdate({ id }, updateBookData, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res
      .status(200)
      .json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: "Failed to update book" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findOneAndDelete({ id });

    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Failed to delete book" });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findOne({ id });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ error: "Failed to fetch book" });
  }
};

export { uploadBook, getAllBooks, updateBook, deleteBook, getSingleBook };
