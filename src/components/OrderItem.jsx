/* eslint-disable react/prop-types */
import { IoMdTrash } from "react-icons/io";
import { useDispatch } from "react-redux";
import { removeOrderItem } from "../store/orderSlice";

const OrderItem = ({ order }) => {
  const dispatch = useDispatch();

  const handleDelOrder = (id) => {
    dispatch(removeOrderItem(id));
  };

  return (
    <li className="flex justify-between w-full h-10 shadow-md p-3 bg-orange-300 text-white rounded-md">
      <p>{order.name}</p>
      <p>{order.price}</p>
      <p>{order.quantity}</p>
      <p>{order.totalAmount}</p>
      <button onClick={() => handleDelOrder(order.id)}>
        <IoMdTrash />
      </button>
    </li>
  );
};

export default OrderItem;
