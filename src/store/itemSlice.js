import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addNewItem(state, action) {
      state.items.push(action.payload);
    },
    getAllItems(state, action) {
      state.items = action.payload;
    },
  },
});

export const { addNewItem, getAllItems } = itemSlice.actions;
export default itemSlice.reducer;
