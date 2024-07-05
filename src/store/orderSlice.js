import { createSlice } from "@reduxjs/toolkit";

const loadInitialState = () => {
  const savedOrders = localStorage.getItem("orders");
  console.log("Saved Orders from localStorage:", savedOrders); // Debugging line
  if (savedOrders) {
    try {
      const parsedOrders = JSON.parse(savedOrders);
      console.log("Parsed Orders:", parsedOrders); // Debugging line
      // Ensure parsedOrders is an array
      if (Array.isArray(parsedOrders)) {
        return parsedOrders;
      } else {
        console.error("Parsed orders is not an array:", parsedOrders);
        localStorage.removeItem("orders"); // Remove invalid data
      }
    } catch (e) {
      console.error("Error parsing orders from localStorage", e);
      localStorage.removeItem("orders"); // Remove invalid data
    }
  }
  return [];
};

const initialState = {
  orders: loadInitialState(),
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addNewOrder(state, action) {
      state.orders.push(action.payload);
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
    getAllOrders(state, action) {
      state.orders = action.payload;
    },
    removeOrderItem(state, action) {
      state.orders = state.orders.filter((item) => item.id !== action.payload);
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
    clearOrder(state) {
      localStorage.removeItem("orders");
      state.orders = [];
    },
  },
});

export const { addNewOrder, getAllOrders, removeOrderItem, clearOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
