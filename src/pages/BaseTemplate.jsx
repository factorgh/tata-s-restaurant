import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaChartSimple } from "react-icons/fa6";
import { FaSlideshare } from "react-icons/fa";
import { TbPackages } from "react-icons/tb";
import { IoIosSettings, IoMdPeople } from "react-icons/io";
import { FaCalendarCheck } from "react-icons/fa6";
// import { IoSettings } from "react-icons/io5";
import { AnimatePresence } from "framer-motion";
import { MdLogout, MdNotificationAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import { auth } from "../config/firebaseConfig";
import { signOut } from "firebase/auth";
import DateRangePicker from "../components/DateRangePicker";

import toast from "react-hot-toast";

const BaseTemplate = () => {
  const [greeting, setGreeting] = useState("");
  const [user, setUser] = useState();
  const [dateRange, setDateRange] = useState([]);
  const navigate = useNavigate();
  const getLocation = useLocation();
  const currLocation = getLocation.pathname;

  useEffect(() => {
    const getGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour < 11) {
        return "Good Morning";
      } else if (currentHour < 18) {
        return "Good Afternoon";
      } else {
        return "Good Evening";
      }
    };

    setGreeting(getGreeting());
  }, []);

  useEffect(function () {
    const userDetails = JSON.parse(localStorage.getItem("user"));
    setUser(userDetails);
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      navigate("/");
      toast.success("Logged out successfully");
    });
  };

  const isAdmin = user?.user["providerData"][0]["email"];
  const adminLogin = isAdmin && isAdmin.slice(0, 5);
  console.log(adminLogin);

  const activeLink =
    "w-[200px] flex gap-2  bg-slate-600 items-start  rounded-md text-white p-3 font-semibold  ";
  const normalLink =
    " w-full flex gap-2 hover:bg-slate-600 items-start p-2 rounded-md hover:text-white py-3 font-semibold ";
  return (
    <div className="flex  h-screen w-screen overflow-hidden ">
      {/* SideBar */}
      <div className=" flex-[20%]  px-1 bg-slate-100">
        {/* Logo */}
        <div className="flex justify-start items-center  w-full">
          <img className="w-20 h-30" src={logo} alt="tata's logo" />
        </div>
        {/* Features */}
        <ul className="p-5 h-full  flex flex-col  gap-2  ">
          <Link to="dashboard">
            <li
              className={`${
                currLocation === "/dashboard" ? activeLink : normalLink
              }`}
            >
              <FaChartSimple color="orange " size={25} />
              <span> Dashboard</span>
            </li>
          </Link>
          <Link to="orders">
            <li
              className={`${
                currLocation === "/orders" ? activeLink : normalLink
              }`}
            >
              <FaSlideshare color="orange " size={25} />
              <span> Orders</span>
            </li>
          </Link>
          <Link to="items">
            <li
              className={`${
                currLocation === "/items" ? activeLink : normalLink
              }`}
            >
              <TbPackages color="orange " size={25} />
              <span>Items</span>
            </li>
          </Link>
          <Link to="customers">
            <li
              className={`${
                currLocation === "/customers" ? activeLink : normalLink
              }`}
            >
              <IoMdPeople color="orange " size={25} />
              <span>Customers</span>
            </li>
          </Link>
          <Link to="reservations">
            <li
              className={`${
                currLocation === "/reservations" ? activeLink : normalLink
              }`}
            >
              <FaCalendarCheck color="orange " size={25} />
              <span>Reservations</span>
            </li>
          </Link>
          <Link to="inventory">
            <li
              className={`${
                currLocation === "/inventory" ? activeLink : normalLink
              }`}
            >
              <IoIosSettings color="orange " size={25} />
              <span>Inventory</span>
            </li>
          </Link>
        </ul>
      </div>
      {/* MainContent */}
      <div className=" w-full h-full   ">
        <AnimatePresence>
          <div>
            <header className="h-[80px] bg-orange-100 flex items-center justify-between px-10 w-full">
              <h3 className="text-xl font-semibold p-3 text-slate-600">
                {greeting}
              </h3>
              <div className="flex gap-5 items-center">
                <DateRangePicker setDateRange={setDateRange} />
                <div className="w-[30px] h-[30px] bg-orange-500 flex items-center">
                  <MdNotificationAdd size={20} />
                </div>
                <p onClick={handleLogout}>
                  <MdLogout className="cursor-pointer" />
                </p>
              </div>
            </header>
          </div>
          <div className=" w-full h-full">
            <Outlet context={[dateRange]} />
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BaseTemplate;
