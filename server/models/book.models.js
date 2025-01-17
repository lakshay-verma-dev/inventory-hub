import { model, Schema } from "mongoose";

const bookSchema = new Schema(
  {
    user: {
      type: String,
      required:true,
    },
    id: {
      type: String,
      required: true,
      unique: true
    }, // UUID field
    title: {
      unique: true,
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    imageURL: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);
const Book = model("Book", bookSchema);
export default Book;
