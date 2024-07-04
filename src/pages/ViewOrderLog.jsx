import axios from "axios";
import toast from "react-hot-toast";
import { format } from "date-fns";
import logo from "../assets/logo.png";
import Button from "@mui/joy/Button";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { addNewOrder } from "../store/orderSlice";
import { MdAdd } from "react-icons/md";
import OrderItem from "../components/OrderItem";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { collection, getDocs, query, where } from "firebase/firestore"; // Importing Firestore query methods correctly
import { db } from "../config/firebaseConfig";
import FadeModalDialog from "../components/ConfirmOrder";
import { currencyFormatter } from "../utils/formatter";

function ViewOrderLog() {
  const orders = useSelector((state) => state.orders.orders);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({
    name: "",
    price: 0,
    category: "snacks",
  });
  const [inputValue, setInputValue] = useState(""); // State for the name input value
  const dispatch = useDispatch();
  const getCartTotal = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchItemDetails = async (itemName) => {
    try {
      const q = query(collection(db, "items"), where("name", "==", itemName));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const itemData = doc.data();
          setSelectedItem({
            name: itemData.name,
            price: itemData.price,
            category: itemData.category,
          });
        });
      } else {
        console.log("No matching documents");
      }
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "items"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setItems(data);
    };
    fetchItems();
  }, []);

  const onSubmit = async (val) => {
    if (
      !val.quantity ||
      !selectedItem.name ||
      !selectedItem.category ||
      !selectedItem.price
    )
      return;
    const totalAmount = selectedItem.price * val.quantity;
    const isDish = selectedItem.category === "dish";
    let res;

    if (val.code && isDish) {
      try {
        res = await axios.post(
          "https://discount-code-validator.onrender.com/api/discount/apply-discount",
          {
            code: val.code,
            totalAmount,
          }
        );
      } catch (error) {
        if (error.name === "AxiosError") {
          toast.error("Invalid code");
        }
      }
    }

    const newOrderItem = {
      id: uuidv4(),
      name: selectedItem.name,
      price: selectedItem.price,
      code: val.code,
      quantity: val.quantity,
      totalAmount: val.code ? res.data.discountedAmount : totalAmount,
      category: selectedItem.category,
      createdAt: format(new Date(), "h:mm:ss a"),
      date: format(new Date(), "MMMM do, yyyy"),
    };

    dispatch(addNewOrder(newOrderItem));
    reset();
    setSelectedItem({ name: "", price: 0, category: "snacks" });
    setInputValue(""); // Reset input value
  };

  const handleChange = async (event) => {
    const queryText = event.target.value.toLowerCase();
    setInputValue(event.target.value); // Update input value

    if (queryText.length > 0) {
      const q = query(collection(db, "items"), where("name", ">=", queryText));
      const querySnapshot = await getDocs(q);
      const filtered = querySnapshot.docs.map((doc) => doc.data());
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  };

  const handleSelect = async (item) => {
    await fetchItemDetails(item.name);
    setFilteredItems([]);
    setInputValue(item.name); // Update input value with selected item's name
  };

  return (
    <div className="w-screen flex h-screen">
      <div className="flex-[50%] flex flex-col bg-white justify-center items-center h-full">
        <img src={logo} alt="tata's" className="w-[200px] h-[150px]" />
        <form
          className="w-[500px] h-full flex flex-col gap-3 p-3 justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex items-center justify-center mb-3">
            <p className="text-orange-400 font-semibold">Enter a new Order</p>
          </div>
          <label htmlFor="">Item Name </label>
          <input
            onChange={handleChange}
            value={inputValue} // Bind input value to state
            type="text"
            className="border border-slate-300 rounded-md p-2"
          />
          {filteredItems.length > 0 && (
            <ul className="border border-slate-300 rounded-md p-2 max-h-30 overflow-scroll">
              {filteredItems.map((item) => (
                <li
                  key={item.name}
                  onClick={() => handleSelect(item)}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
          <label htmlFor="">Category</label>
          <input
            value={selectedItem.category}
            disabled
            type="text"
            className="border border-slate-300 rounded-md p-2"
          />
          <label htmlFor="">Price </label>
          <input
            value={selectedItem.price}
            disabled
            type="number"
            className="border border-slate-300 rounded-md p-2"
          />
          <label htmlFor="">Quantity</label>
          <input
            type="number"
            className="border border-slate-300 rounded-md p-2"
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
          <div className="flex items-center justify-center">
            <button className="w-[200px] text-white bg-orange-300 p-2 rounded-md shadow-md text-sm">
              <span className="flex items-center justify-center font-semibold p-1 gap-2">
                <MdAdd size={20} />
                Add Now
              </span>
            </button>
          </div>
        </form>
      </div>
      <div className="flex-[50%] h-full pt-10 bg-slate-100 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <p className="font-mono text-slate-800 mx-10 text-xl mt-10">
            CONFIRM ORDER CATALOG
          </p>
          {orders.length > 0 && (
            <p className="font-mono text-slate-800 mx-10 text-md mt-10 border border-slate-500 rounded-md p-2">
              {currencyFormatter(getCartTotal)}
            </p>
          )}
        </div>
        <ul className="w-full h-[60%] flex flex-col gap-2 p-5 overflow-scroll">
          {orders.map((order) => (
            <OrderItem key={order.createdAt} order={order} />
          ))}
        </ul>
        <div className="w-200px flex items-center justify-center mb-10">
          {orders.length > 0 ? (
            <FadeModalDialog />
          ) : (
            <Button disabled variant="outlined">
              Confirm Order
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewOrderLog;
