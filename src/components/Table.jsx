import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = [
  "Product Id",
  "Product Name",
  "Price",
  "Date",
  "Order Status",
  "Quantity",
];

const TABLE_ROWS = [
  {
    id: "p1",
    name: "John Michael",
    price: "120",
    date: "23/04/18",
    status: "Completed",
    quantity: 30,
  },
  {
    id: "p2",
    name: "John Michael",
    price: "120",
    date: "23/04/18",
    status: "Completed",
    quantity: 30,
  },
  {
    id: "p3",
    name: "John Michael",
    price: "120",
    date: "23/04/18",
    status: "Completed",
    quantity: 30,
  },
  {
    id: "p4",
    name: "John Michael",
    price: "120",
    date: "23/04/18",
    status: "Pending",
    quantity: 30,
  },
  {
    id: "p5",
    name: "John Michael",
    price: "120",
    date: "23/04/18",
    status: "Completed",
    quantity: 30,
  },
];

export function TableWithStripedRows() {
  return (
    <Card className="h-full w-full overflow-scroll rounded-md">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-slate-300 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ id, name, price, date, status, quantity }) => (
            <tr key={id} className="even:bg-orange-50">
              <td className="p-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {id}
                </Typography>
              </td>
              <td className="p-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {name}
                </Typography>
              </td>
              <td className="p-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {price}
                </Typography>
              </td>
              <td className="p-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {date}
                </Typography>
              </td>
              <td className="p-2">
                <button className="text-sm rounded-full p-2 text-orange-300 border border-slate-200">
                  {status}
                </button>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {quantity}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
