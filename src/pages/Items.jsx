import AddItemModal from "../components/AddItemModal";
import ItemTable from "../components/ItemTable";

const Items = () => {
  return (
    <div className="mx-3 w-full p-3">
      {/* header section */}
      <div className="flex p-3 justify-between items-center mt-5 mx-5">
        <p>Total Item </p>
        <AddItemModal  />
      </div>

      {/* Category slider section */}
      <div className=" mx-3">
        <ItemTable />
      </div>
    </div>
  );
};

export default Items;
