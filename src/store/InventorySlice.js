import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inventories: [],
};

const inventorySlice = createSlice({
  name: "inventories",
  initialState,
  reducers: {
    addNewInvenotry(state, action) {
      ///Check if inventory already exist
      const existingInventory = state.inventories.find(
        (inventory) => inventory.name === action.payload.name
      );

      if (existingInventory) {
        existingInventory.quantity += action.payload.quantity;
      } else {
        state.inventories.push(action.payload);
      }
    },
    removeInventory(state, action) {
      // Check if inventory already exists
      const existingInventory = state.inventories.find(
        (inventory) => inventory.name === action.payload.name
      );

      if (existingInventory) {
        existingInventory.quantity -= action.payload.quantity;

        // If quantity goes to zero or less, remove the item from the inventory
        if (existingInventory.quantity <= 0) {
          state.inventories = state.inventories.filter(
            (inventory) => inventory.name !== action.payload.name
          );
        }
      }
    },
    getAllInventory(state, action) {
      state.inventories = action.payload;
    },
  },
});

export const { addNewInventory, getAllInventory, removeInventory } =
  inventorySlice.actions;
export default inventorySlice.reducer;
