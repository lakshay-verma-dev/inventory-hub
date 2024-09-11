import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Array to store cart items
  totalQuantity: 0, // Total quantity of all items in the cart
  totalPrice: 0, // Total price of all items in the cart
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        // Update existing item
        existingItem.quantity += 1;
        existingItem.totalPrice =
          existingItem.quantity * Number(existingItem.price);
      } else {
        // Add new item
        state.items.push({
          ...action.payload,
          quantity: 1,
          totalPrice: Number(action.payload.price),
        });
      }
      // Update cart totals
      state.totalQuantity += 1;
      state.totalPrice += Number(action.payload.price);
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex !== -1) {
        // Update totals
        state.totalQuantity -= state.items[itemIndex].quantity;
        state.totalPrice -= state.items[itemIndex].totalPrice;
        // Remove item
        state.items.splice(itemIndex, 1);
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        // Adjust totals based on new quantity
        state.totalQuantity += quantity - item.quantity;
        state.totalPrice += (quantity - item.quantity) * Number(item.price);
        // Update item
        item.quantity = quantity;
        item.totalPrice = quantity * Number(item.price);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectTotalPrice = (state) => state.cart.totalPrice;
export const selectCartCount = (state) => state.cart.totalQuantity;

export default cartSlice.reducer;
