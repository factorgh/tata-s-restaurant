import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addNewItem(state, action) {
      ///Check if inventory already exist
      const existingItem = state.items.find(
        (item) => item.name === action.payload.name
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    getAllItems(state, action) {
      state.items = action.payload;
    },
  },
});

export const { addNewItem, getAllItems } = itemSlice.actions;
export default itemSlice.reducer;
