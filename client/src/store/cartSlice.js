import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
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
        existingItem.quantity += 1;
        existingItem.totalPrice =
          existingItem.quantity * Number(existingItem.price);
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          totalPrice: Number(action.payload.price),
        });
      }
      state.totalQuantity += 1;
      state.totalPrice += Number(action.payload.price);
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex !== -1) {
        state.totalQuantity -= state.items[itemIndex].quantity;
        state.totalPrice -= state.items[itemIndex].totalPrice;
        state.items.splice(itemIndex, 1);
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        const newQuantity = Math.max(1, Number(quantity));
        state.totalQuantity += newQuantity - item.quantity;
        state.totalPrice += (newQuantity - item.quantity) * Number(item.price);
        item.quantity = newQuantity;
        item.totalPrice = newQuantity * Number(item.price);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    setCartItems: (state, action) => {
      state.items = action.payload;
      state.totalQuantity = action.payload.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = action.payload.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setCartItems,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectTotalPrice = (state) => state.cart.totalPrice;
export const selectCartCount = (state) => state.cart.totalQuantity;

export default cartSlice.reducer;
