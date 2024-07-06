import AddItemModal from "../components/AddItemModal";
import ItemTable from "../components/ItemTable";

const Items = () => {
  return (
    <div className=" w-full p-2 mx-2">
      {/* header section */}
      <div className="flex p-3 justify-between items-center overflow-scroll  mx-5">
        <p>Total Item </p>
        <AddItemModal />
      </div>

      {/* Category slider section */}
      <div className="flex  gap-5 h-[100%] px-10 mt-5  overflow-scroll ">
        <ItemTable />
      </div>
    </div>
  );
};

export default Items;
