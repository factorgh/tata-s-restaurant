import AddItemModal from "../components/AddItemModal";
import ItemTable from "../components/ItemTable";

const Items = () => {
  return (
    <div className="flex flex-col w-full p-2 mx-2">
      {/* header section */}
      <div className="flex p-3 justify-between items-center overflow-scroll  mx-5">
        <p>Total Item </p>
        <AddItemModal />
      </div>

      {/* Category slider section */}
      <div className="flex-1 h-[100%] overflow-y-scroll  w-[100%] p-2">
        <ItemTable />
      </div>
    </div>
  );
};

export default Items;
