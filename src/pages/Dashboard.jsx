import { MdMoreVert, MdPeople } from "react-icons/md";
import DashboardItem from "../components/DashboardItem";
import { FiBarChart } from "react-icons/fi";

import { HiOutlineShoppingBag } from "react-icons/hi2";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

import { TableWithStripedRows } from "../components/Table";
import { motion } from "framer-motion";

import { Card } from "antd";
import { useEffect, useState } from "react";
import { getAllItems, getAllOrders, getAllCustomers } from "../services/api";
import RecentOrders from "../components/RecentOrdersTable";

import { currencyFormatter } from "../utils/formatter";
// import { TableWithStripedRows as RecentOrders } from "../components/RecentOrdersTable";

const Dashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [items, setTotalItems] = useState(0);
  const [customers, setCustomers] = useState(0);
  // const [orders, setOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Multiple reduce interator to get totalRevenue  since the data is nested

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getAllOrders();
        console.log("<--------items------>", data);

        const revenue = data.reduce((sum, details) => {
          return (
            sum +
            details.items.reduce((itemSum, order) => {
              return itemSum + order.totalAmount;
            }, 0)
          );
        }, 0);

        setTotalOrders(data.length);
        setTotalRevenue(revenue);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    fetchOrders();
  }, []);

  useEffect(() => {
    async function fetchItems() {
      try {
        const data = await getAllItems();
        console.log("<--------items------>", data);

        setTotalItems(data.length);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    fetchItems();
  }, []);
  useEffect(() => {
    async function fetchCustomers() {
      try {
        const data = await getAllCustomers();
        console.log("<--------items------>", data);

        setCustomers(data.length);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    fetchCustomers();
  }, []);

  // console.log("<----allOrders-------> ", orders);
  console.log("<-----totalRev------>", totalRevenue);
  const reservations = [];
  return (
    <div className="w-full h-full ">
      {/* Main content dashboard */}
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex mt-8 items-start gap-5 mb-5 mx-8 "
      >
        <DashboardItem
          icon={<FiBarChart color="white" size={30} />}
          title={totalOrders.length < 1 ? "Order" : "Orders"}
          totalCount={totalOrders}
          bgColor="bg-orange-100"
        />
        <DashboardItem
          icon={<HiOutlineShoppingBag color="white" size={30} />}
          title="Inventory"
          totalCount={items}
          bgColor="bg-purple-200"
        />
        <DashboardItem
          icon={<MdPeople color="white" size={30} />}
          title="Customers"
          totalCount={customers}
          bgColor="bg-slate-100"
        />
        <DashboardItem
          icon={<MdOutlineAccountBalanceWallet color="white" size={30} />}
          title=" Revenue"
          totalCount={currencyFormatter(totalRevenue)}
          bgColor="bg-blue-300"
        />
      </motion.div>

      {/* Second secetion */}
      <motion.div
        initial={{ opacity: 0, y: 300 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "tween" }}
        className="flex  gap-5 h-[100%] px-10 mt-5  overflow-scroll  "
      >
        <div className="flex flex-col gap-5  flex-[60%] overflow-scroll rounded-md h-[70%]">
          <div className="flex-1 rounded-md shadow-sm h-[400px] border border-slate-200 ">
            <div className="flex justify-between items-center h-[40px] pt-3 mx-5  ">
              <p className=" font-semibold text-xl">Recent Orders </p>
            </div>
            {/* End of order header */}
            <div className=" h-[300px] mt-5 mx-5  border border-slate-200 rounded-md mb-10">
              <RecentOrders />
            </div>
          </div>
          <div className="flex-1 h-[300px] rounded-md  border border-slate-200">
            <div className="flex justify-between items-center h-[40px] pt-3 mx-5  ">
              <p className=" font-semibold text-xl">Reservations </p>
              <div className="border border-slate-200 w-[30px] h-[30px] flex items-center justify-center rounded-md">
                <MdMoreVert />
              </div>
            </div>
            {/* End of order header */}
            <div className=" h-[200px] mt-5 mx-5  border border-slate-200 rounded-md mb-10">
              {reservations.length > 0 ? (
                <TableWithStripedRows />
              ) : (
                <Card
                  className="h-full w-full"
                  title=" No reservations avaialable"
                  bordered={false}
                ></Card>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* End of second section */}
    </div>
  );
};

export default Dashboard;
