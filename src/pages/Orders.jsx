import OrderTable from "../components/OrderTable";
import FilterItem from "../components/FilterItem";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getAllOrders } from "../services/api";

import { Button } from "antd";
import { useNavigate, useOutletContext } from "react-router-dom";

const formatDate = (dateObject) => {
  if (!dateObject || !dateObject.$d) {
    return ""; // Handle case where dateObject or $d is undefined
  }

  const options = { month: "long", day: "numeric", year: "numeric" };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedDate = formatter.format(dateObject.$d); // Assuming $d holds the Date object
  return formattedDate.replace(/(\d{1,2})(st|nd|rd|th)/, "$1<sup>$2</sup>"); // Adds superscript to numbers
};
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [dateRange] = useOutletContext();
  const startDate = formatDate(dateRange[0]);
  const endDate = formatDate(dateRange[1]);

  console.log("<-----date in orders page-------------->", dateRange);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrders() {
      try {
        let res;
        if (dateRange && startDate && endDate) {
          console.log(new Date(startDate), endDate);
          // Fetch orders based on the formatted date range
          res = await getAllOrders(new Date(startDate), new Date(endDate));
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
  }, [dateRange, endDate, startDate]);

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
