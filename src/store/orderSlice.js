import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addNewOrder(state, action) {
      state.orders.push(action.payload);
    },
    getAllOrders(state, action) {
      state.orders = action.payload;
    },
    removeOrderItem(state, action) {
      state.orders = state.orders.filter((item) => item.id !== action.payload);
    },
    clearOrder(state) {
      state.orders = [];
    },
  },
});

export const { addNewOrder, getAllOrders, removeOrderItem, clearOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
