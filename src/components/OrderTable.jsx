import { useEffect, useState } from "react";
import { Table } from "antd";
import { getAllOrders } from "../services/api";

const columns = [
  {
    title: "Name",
    dataIndex: "items",
    key: "name",
    render: (items) =>
      items?.map((item) => <div key={item.id}>{item.name}</div>),
  },
  {
    title: "Price",
    dataIndex: "items",
    key: "price",
    render: (items) =>
      items?.map((item) => <div key={item.id}>{item.price}</div>),
  },

  {
    title: "Quantity",
    dataIndex: "items",
    key: "quantity",
    render: (items) =>
      items?.map((item) => <div key={item.id}>{item.quantity}</div>),
  },

  {
    title: "Customer",
    dataIndex: ["customer", "name"],
    key: "customer",
  },
  {
    title: "PhoneNumber",
    dataIndex: ["customer", "phoneNumber"],
    key: "phoneNumber",
  },
  {
    title: "TotalAmount",
    dataIndex: "items",
    key: "totalAmount",
    render: (items) =>
      items?.map((item) => <div key={item.id}>{item.totalAmount}</div>),
  },
  {
    title: "Payment",
    dataIndex: "payment",
    key: "payment",
  },
  {
    title: "Discounted",
    dataIndex: "discounted",
    key: "discounted",
  },
  {
    title: "CreatedAt",
    dataIndex: "items",
    key: "createdAt",
    render: (items) =>
      items?.map((item) => <div key={item.id}>{item.createdAt}</div>),
  },
];

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      const data = await getAllOrders();

      console.log(data);
      setOrders(data);
      setLoading(false);
    }
    fetchOrders();
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={orders}
      pagination={10}
      loading={loading}
    />
  );
};
export default OrderTable;
