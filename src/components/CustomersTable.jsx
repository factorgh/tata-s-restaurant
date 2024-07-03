import { useEffect, useState } from "react";
import { Table } from "antd";
import { getAllCustomers } from "../services/api";
// import dayjs from "dayjs";

// const convertTimestampToDate = (timestamp) => {
//   if (!timestamp || typeof timestamp.toDate !== "function") {
//     return "Invalid date";
//   }

//   const date = timestamp.toDate();
//   return dayjs(date).format("MMMM D, YYYY h:mm:ss A");
// };

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },

  {
    title: "PhoneNumber",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },

  {
    title: "CreatedAt",
    dataIndex: "createdAt",
    key: "createdAt",
  },
];

const CustomersTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      const res = await getAllCustomers();
      const data = res.map((doc) => doc.data());
      console.log(data);
      setCustomers(data);
      setLoading(false);
    }
    fetchOrders();
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={customers}
      pagination={5}
      loading={loading}
    />
  );
};
export default CustomersTable;
