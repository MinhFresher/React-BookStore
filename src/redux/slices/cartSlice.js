import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(sessionStorage.getItem("cart")) || [], // Load cart from sessionStorage
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.items.find((item) => item.maSach === action.payload.maSach);
      if (itemExists) {
        itemExists.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      sessionStorage.setItem("cart", JSON.stringify(state.items)); 
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.maSach !== action.payload);
      sessionStorage.setItem("cart", JSON.stringify(state.items)); 
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.maSach === action.payload);
      if (item) {
        item.quantity += 1;
      }
      sessionStorage.setItem("cart", JSON.stringify(state.items));
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.maSach === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      sessionStorage.setItem("cart", JSON.stringify(state.items));
    },
    setCartItems: (state, action) => {
      state.items = action.payload.map(item => ({
        ...item,
        quantity: item.soLuong,
      }));
      sessionStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
