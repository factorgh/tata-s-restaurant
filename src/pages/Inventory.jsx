import InventoryTable from "../components/InventoryTable";
import AddInventoryModal from "../components/AddInventoryModal";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import RemoveInventoryModal from "../components/RemoveInventoryModal";

const Inventory = () => {
  return (
    <div className="flex flex-col gap-5 w-full h-full p-2">
      {/* Filter section */}
      <div className="flex  items-center  justify-between p-2 ">
        <h3 className="text-2xl font-semibold text-slate-800">Inventories</h3>
        <div className="flex gap-5 items-center  ">
          <div className="flex items-center justify-center border border-slate-200 p-1 rounded-md">
            <FaSearch />
            <input type="text" className="border-none" />
          </div>
          <RemoveInventoryModal />
          <AddInventoryModal />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 300 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "tween" }}
      >
        <InventoryTable />
      </motion.div>
    </div>
  );
};

export default Inventory;
