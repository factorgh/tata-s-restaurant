import { useEffect, useState } from "react";
import { Table } from "antd";
import { getAllInventory } from "../services/api";
import { getAllInventory as getAll } from "../store/InventorySlice";
import { useSelector, useDispatch } from "react-redux";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },

  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },

  {
    title: "CreatedAt",
    dataIndex: "createdAt",
    key: "createdAt",
  },
];

const InventoryTable = () => {
  const orders = useSelector((state) => state.inventories.inventories);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      const res = await getAllInventory();
      const data = res.map((doc) => doc.data());
      console.log("<---------inventories------------>", data);
      dispatch(getAll(data));
      setLoading(false);
    }
    fetchOrders();
  }, [dispatch]);

  return (
    <Table
      columns={columns}
      dataSource={orders}
      pagination={5}
      loading={loading}
    />
  );
};
export default InventoryTable;
