/* eslint-disable react/prop-types */
import chicken from "../assets/baked-quails-pan-dark-surface (1).jpg";

const TodayOrderItem = ({ order }) => {
  return (
    <li className=" flex h-[100px]  p-3 w-full  justify-between">
      {/* Image container */}
      <div className="w-[80px] h-[80px] mx-3 rounded-md">
        <img
          src={chicken}
          alt="baked-quails-pan-dark "
          className="rounded-md"
        />
      </div>

      {/* Content section */}
      <div className="flex flex-col gap-2 ">
        <p className="text-md font-semibold">{order.name}</p>
        <p className="text-slate-400 text-sm">10:30 AM</p>
      </div>

      {/* Amount section */}
      <p className="font-semibold p-3">{order.totalAmount}</p>
    </li>
  );
};

export default TodayOrderItem;
