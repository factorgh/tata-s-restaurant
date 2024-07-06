import { useEffect, useState } from "react";
import { Table } from "antd";
import { getAllItems } from "../services/api";
import { getAllItems as getAll } from "../store/itemSlice";
import { useDispatch, useSelector } from "react-redux";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
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

const ItemTable = () => {
  const orders = useSelector((state) => state.items.items);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      const res = await getAllItems();
      const data = res.map((doc) => doc.data());
      dispatch(getAll(data));
      setLoading(false);
    }
    fetchOrders();
  }, [dispatch]);

  return (
    <div style={{ width: "100%" }}>
      <Table
        columns={columns}
        dataSource={orders}
        pagination={8}
        loading={loading}
      />
    </div>
  );
};
export default ItemTable;
