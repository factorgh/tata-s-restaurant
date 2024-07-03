import chicken from "../assets/baked-quails-pan-dark-surface (1).jpg";

const CategoryItem = () => {
  return (
    <div className="w-[270px] h-[200px] flex flex-col  border items-center p-2 border-slate-200 rounded-md bg-slate-50  my-5 gap-2 shadow-md">
      {/* Image section */}

      <img src={chicken} alt="Category" className="w-full  h-[70%]  cover   " />

      {/* title content */}
      <div className="flex  gap-2 mt-5 justify-between items-center">
        <p className="text-sm font-semibold"> Cheese Burger</p>
        <h5 className="text-[10px] text-slate-500">GHS 30.00</h5>
      </div>
    </div>
  );
};

export default CategoryItem;
