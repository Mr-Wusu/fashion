import { createSlice } from "@reduxjs/toolkit";

interface Cloth {
  _id: string;
  unitPrice: number;
  unit: number;
  name: string;
  description: string;
  imageUrl: string;
}

const initialState: Cloth[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increaseUnit(state, action) {
      const { _id, alt, imageUrl, description, price } = action.payload;
      const existingItem = state.find((item) => item._id === _id);

      if (existingItem) {
        existingItem.unit += 1;
      } else {
        const cartItem: Cloth = {
          _id,
          name: alt,
          imageUrl,
          description,
          unitPrice: price,
          unit: 1,
        };
        state.push(cartItem);
      }
      console.log(state, action.payload);
    },
    decreaseUnit(state, action) {
      const { _id } = action.payload;
      const existingItem = state.find((item) => item._id === _id);
      if (existingItem) {
        existingItem.unit -= 1;
      }

      console.log("This is an attempt at decreasing", state);
    },
    removeItem(state, action) {
      const { _id } = action.payload;
      return state.filter((item) => item._id !== _id);
    },
  },
});

export const { increaseUnit, decreaseUnit, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
