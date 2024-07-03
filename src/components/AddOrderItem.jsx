import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import { MdAdd } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addNewOrder } from "../store/orderSlice";
import { db } from "../config/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import axios from "axios";
import toast from "react-hot-toast";
import { format } from "date-fns";

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  let res;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (val) => {
    ///Calculate the total amount
    const totalAmount = val.price * val.quantity;

    ///Check if code is valid,then apply discount
    if (val.code) {
      res = await axios
        .post("http://localhost:5000/api/discount/apply-discount", {
          code: val.code,
          totalAmount,
        })
        .catch(function (error) {
          if (error.name === "AxiosError") {
            toast.error("Invalid code");
            setOpen(false);
          }
        });

      console.log(res);
    }

    ///Send data to firebase
    const newOrderItem = {
      name: val.name,
      price: val.price,
      code: val.code,
      quantity: val.quantity,
      totalAmount: val.code ? res.data.discountedAmount : totalAmount,
      customer: val.customer,
      phoneNumber: val.phoneNumber,
      createdAt: format(new Date(), " h:mm:ss a"),
      date: format(new Date(), "MMMM do, yyyy "),
    };

    const ordersRef = await addDoc(collection(db, "orders"), newOrderItem);

    //Check if document has been stored, destructure customers data out
    if (ordersRef) {
      await addDoc(collection(db, "customers"), {
        name: val.customer,
        phoneNumber: val.phoneNumber,
        createdAt: format(new Date(), "MMMM do, yyyy "),
      });
    }

    ///Update redux store
    dispatch(addNewOrder(val));

    reset();
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        sx={{ width: "200px" }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Add Order
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Complete Order</DialogTitle>
        <DialogContent>
          <form
            className="w-full h-full flex flex-col  gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="">Item Name </label>
            <input
              type="text"
              className="border border-slate-300 rounded-md p-2"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-300">Item name is required</span>
            )}
            <label htmlFor="">Price </label>
            <input
              type="text"
              className="border border-slate-300 rounded-md p-2"
              {...register("price", { required: true })}
            />
            {errors.price && (
              <span className="text-red-300">Price is required</span>
            )}
            <label htmlFor="">Quantity</label>
            <input
              type="text"
              className="border border-slate-300 rounded-md p-2 "
              {...register("quantity", { required: true })}
            />
            {errors.quantity && (
              <span className="text-red-300">Quantity is required</span>
            )}
            <label htmlFor="">Enter Code</label>
            <input
              type="text"
              className="border border-slate-300 rounded-md p-2"
              {...register("code")}
            />
            <label htmlFor="">Customer</label>
            <input
              type="text"
              className="border border-slate-300 rounded-md p-2"
              {...register("customer")}
            />
            <label htmlFor="">Phone number</label>
            <input
              type="text"
              className="border border-slate-300 rounded-md p-2"
              {...register("phoneNumber")}
            />

            <button className="w-[200px] text-white bg-orange-300 p-2 rounded-md shadow-md text-sm ">
              <span className="flex items-center justify-center font-semibold p-1 gap-2">
                <MdAdd size={20} />
                Add Now
              </span>
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
