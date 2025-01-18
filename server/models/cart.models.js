import { Schema, model } from "mongoose";

const cartItemSchema = new Schema(
  {
    email: { type: String, required: true }, // Add email field
    items: [
      {
        productName: { type: String, required: true },
        productPrice: { type: Number, required: true },
        quantity: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        imageUrl: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Cart = model("Cart", cartItemSchema);

export default Cart;
