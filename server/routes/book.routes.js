import { Router } from "express";
const bookRoutes = Router();
import {
  uploadBook,
  getAllBooks,
  updateBook,
  deleteBook,
  getSingleBook,
  getUserBooks,
} from "../controllers/book.controllers.js";
import multer from "multer";


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

bookRoutes.post("/upload-book" , upload.single("image"), uploadBook);
bookRoutes.get("/all-books", getAllBooks);
bookRoutes.post("/get-user-book", getUserBooks);
bookRoutes.patch("/update-book/:id", upload.single("image"), updateBook);
bookRoutes.delete("/delete-book/:id", deleteBook);
bookRoutes.get("/single-book/:id", getSingleBook);

export default bookRoutes;
