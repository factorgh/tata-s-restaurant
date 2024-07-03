/* eslint-disable react/prop-types */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, quantity, code, customer, phoneNumber, totalAmount) {
  return { name, quantity, code, customer, phoneNumber, totalAmount };
}

export default function DenseTable({ orders }) {
  const rows = orders.map((order) =>
    createData(
      order.name,
      order.quantity,
      order.code,
      order.customer,
      order.phoneNumber,
      order.totalAmount
    )
  );
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Item name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Code</TableCell>
            <TableCell align="right">Customer</TableCell>
            <TableCell align="right">PhoneNumber</TableCell>
            <TableCell align="right">Total Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.code}</TableCell>
              <TableCell align="right">{row.customer}</TableCell>
              <TableCell align="right">{row.phoneNumber}</TableCell>
              <TableCell align="right">{row.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
