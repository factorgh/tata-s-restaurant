import OrderTable from "../components/OrderTable";
import FilterItem from "../components/FilterItem";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getAllOrders } from "../services/api";

import { Button } from "antd";
import { useNavigate, useOutletContext } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [dateRange] = useOutletContext();
  console.log("<-----date in orders page-------------->", dateRange);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrders() {
      try {
        let res;
        if (dateRange && dateRange.startDate && dateRange.endDate) {
          // Format startDate and endDate strings to JavaScript Date objects
          const startDate = new Date(dateRange.startDate);
          const endDate = new Date(dateRange.endDate);
          console.log(startDate, endDate);
          // Fetch orders based on the formatted date range
          res = await getAllOrders(startDate, endDate);
        } else {
          // Fetch all orders (default behavior)
          res = await getAllOrders();
        }
        setOrders(res);
      } catch (error) {
        console.error("Error fetching orders:", error);
        // Handle error state or logging
      }
    }

    fetchOrders();
  }, [dateRange]);

  return (
    <div className="flex flex-col gap-5 w-full h-full p-5">
      {/* Filter section */}
      <div className="flex justify-between items-center ">
        <FilterItem />
        <div className="flex gap-5">
          <Button type="primary" onClick={() => navigate("/add-order")}>
            {" "}
            Add New Order
          </Button>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 300 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "tween" }}
      >
        <OrderTable orders={orders} />
      </motion.div>
    </div>
  );
};

export default Orders;
