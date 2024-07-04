// import { db } from "../config/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import PaystackHandler from "../components/PaystackHandler";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useFirebase } from "../context/firebaseContext";

const CheckoutPage = () => {
  const { db } = useFirebase();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleConfirmOrder = async () => {
    const ordersRef = await addDoc(collection(db, "orders"));

    //Check if document has been stored, destructure customers data out
    if (ordersRef) {
      await addDoc(collection(db, "customers"), {});
    }
    reset();
  };
  return (
    <div className="w-screen h-screen p-5 flex flex-col">
      <p>Check out Order</p>
      <div className="">
        <form
          onSubmit={handleSubmit(handleConfirmOrder)}
          className=" w-full flex  flex-col  gap-2 p-3 px-20 mb-10"
        >
          <div className="flex flex-col gap-2 flex-1 ">
            <label htmlFor="">Customer</label>
            <input
              type="text"
              className="border border-slate-300 rounded-md p-2 "
              {...register("customer")}
            />
          </div>
          {errors.price && (
            <span className="text-red-300">Price is required</span>
          )}
          <div className="flex flex-col gap-2 flex-1 ">
            <label htmlFor="">Phone number</label>
            <input
              type="text"
              className="border border-slate-300 rounded-md p-2 "
              {...register("phoneNumber")}
            />
          </div>
          {errors.price && (
            <span className="text-red-300">Price is required</span>
          )}
          <div>
            <div className="flex w-full p-2 gap-2 items-center">
              <select
                name=""
                id=""
                className="w-[200px]  p-2 text-slate-500 text-sm"
              >
                <option value="cash">Cash</option>
                <option value="e-cash">E-payment</option>
              </select>
              <PaystackHandler />
            </div>
            <Button
              size="30"
              type="primary"
              className="mb-5"
              onClick={() => navigate("/orders")}
            >
              Confirm Order
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
