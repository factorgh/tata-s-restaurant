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
      <div className="w-[100%] h-[80%] p-2 overflow-y-scroll">
        <ItemTable />
      </div>
    </div>
  );
};

export default Items;
