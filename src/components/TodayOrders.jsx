import { MdMoreVert } from "react-icons/md";
import TodayOrderItem from "./TodayOrderItem";
import { useSelector } from "react-redux";

const TodayOrders = () => {
  const orders = useSelector((state) => state.orders.orders);
  return (
    <div className="flex flex-col gap-3 border border-slate-300 rounded-md h-full">
      <div className="flex justify-between items-center h-[40px] pt-3 mx-5  ">
        <p className=" font-semibold text-xl">Today Orders </p>
        <div className="border border-slate-200 w-[30px] h-[30px] flex items-center justify-center rounded-md">
          <MdMoreVert />
        </div>
      </div>
      {/* All orders  */}
      <div className="w-full h-full overflow-scroll">
        <ul className="flex flex-col  p-3">
          <TodayOrderItem order={orders} />
          <hr className=" h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
        </ul>
      </div>
    </div>
  );
};

export default TodayOrders;
