import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "../store/orderSlice";
import itemReducer from "../store/itemSlice";
import inventoryReducer from "../store/InventorySlice";

const store = configureStore({
  reducer: {
    orders: orderReducer,
    items: itemReducer,
    inventories: inventoryReducer,
  },
});

export default store;
