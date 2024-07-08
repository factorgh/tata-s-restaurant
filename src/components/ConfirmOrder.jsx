import * as React from "react";

// import { db } from "../config/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { clearOrder } from "../store/orderSlice";
import { useDispatch } from "react-redux";
import { currencyFormatter } from "../utils/formatter";
import { handleSale } from "../services/api";

import { Modal, Button } from "antd";
import moment from "moment";
import { useFirebase } from "../context/firebaseContext";
import { CircularProgress } from "@mui/material";

export default function FadeModalDialog() {
  const { db } = useFirebase();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const orders = useSelector((state) => state.orders.orders);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [discounted, setIsDiscounted] = React.useState(false);
  console.log(discounted);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const getCartTotal = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );
  const onSubmit = async (val) => {
    setIsLoading(true);
    if (val.code) {
      setIsDiscounted(true);
    }
    const formattedDate = moment(new Date()).format("YYYY-MM-DD");

    console.log(val);
    const orderItem = {
      items: orders,
      customer: {
        name: val.customer,
        phoneNumber: val.phoneNumber,
        createdAt: formattedDate,
      },
      payment: val.payment,
      discounted: discounted ? "Discounted" : "Not discounted",

      date: new Date(),
    };
    const ordersRef = await addDoc(collection(db, "orders"), orderItem);

    //Check if document has been stored, destructure customers data out
    if (ordersRef) {
      await addDoc(collection(db, "customers"), orderItem.customer);
      handleSale(orderItem);
    }

    reset();
    dispatch(clearOrder());
    setIsLoading(false);
    navigate("/orders");
  };

  ////Paystack payment
  const handlePaystack = async () => {
    setIsLoading(true);
    try {
      const orderItem = {
        items: orders,
        customer: {
          name: "Paystack Payment", // You can adjust this as needed
          phoneNumber: "", // You can adjust this as needed
          createdAt: new Date(),
        },
        payment: "Paystack", // You can adjust this as needed
        discounted: discounted ? "Discounted" : "Not discounted",
        date: new Date(),
      };

      await submitOrder(orderItem); // Call a separate function to handle order submission
      window.location.href = "https://paystack.shop/pay/vt_h4j1yeo1"; // Redirect to Paystack payment page
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(
        "Error submitting order or redirecting to Paystack:",
        error
      );
      // Handle error state or logging
    }
  };

  const submitOrder = async (orderItem) => {
    const ordersRef = await addDoc(collection(db, "orders"), orderItem);
    if (ordersRef) {
      await addDoc(collection(db, "customers"), orderItem.customer);
      handleSale(orderItem); // Assuming handleSale function is defined elsewhere
      reset(); // Assuming reset function is defined elsewhere to clear form fields
      dispatch(clearOrder()); // Dispatch clearOrder action from Redux to clear the order state
      navigate("/orders"); // Navigate to the "/orders" route after submission
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Confirm Order
      </Button>
      <Modal open={isModalOpen} onCancel={handleCancel}>
        <div className="flex justify-between items-center w-full mb-10 ">
          <p className="font-mono text-orange-400 mx-10 text-xl mt-10 ">
            {" "}
            COMPLETE ORDER
          </p>
          {orders.length > 0 && (
            <p className="font-mono text-slate-800 mx-10 text-md mt-10 border border-slate-500 rounded-md p-2">
              {currencyFormatter(getCartTotal)}{" "}
            </p>
          )}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" w-[500px] flex  flex-col  gap-2 p-3 px-20 mb-10"
        >
          <div className="flex items-center gap-2 flex-1 ">
            <label htmlFor="">Customer</label>
            <input
              type="text"
              className="border border-slate-300 rounded-md p-2 "
              {...register("customer", { required: true })}
            />
          </div>
          {errors.customer && (
            <span className="text-red-300">Customer is required</span>
          )}
          <div className="flex  gap-2 flex-1 items-center">
            <label htmlFor="">Phone number</label>
            <input
              type="text"
              className="border border-slate-300 rounded-md p-2 "
              {...register("phoneNumber", { required: true })}
            />
          </div>
          {errors.phoneNumber && (
            <span className="text-red-300">Phone number is required</span>
          )}
          <div className="mb-5">
            <div className="flex w-full p-2 gap-2 items-center">
              <select
                {...register("payment")}
                className="w-[200px]  p-2 text-slate-500 text-sm"
              >
                <option value="cash">Cash</option>
                <option value="e-cash">E-payment</option>
              </select>
            </div>
            {errors.payment && (
              <span className="text-red-300">Payment method is required</span>
            )}
            <div className="flex items-center justify-between  mt-10 w-full">
              <button className="bg-orange-300 rounded-md p-2 text-white font-semibold">
                {isLoading ? (
                  <CircularProgress size={15} color="white" />
                ) : (
                  "Confirm Order"
                )}
              </button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handlePaystack}
              >
                {isLoading ? (
                  <CircularProgress size={15} color="white" />
                ) : (
                  "Continue with paystack"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
