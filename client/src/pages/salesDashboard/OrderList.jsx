import { Box, Button, Typography, Select, MenuItem } from "@mui/material";

const OrderList = ({ orders, salespersons, assignOrder }) => {
  return (
    <Box>
      {orders.map((order) => (
        <Box key={order.id} className="p-4 mb-4 rounded bg-slate-800">
          <Typography variant="h6" component="p">
            Order ID: {order.id}
          </Typography>
          <Typography component="p">Customer: {order.customerName}</Typography>
          <Typography component="p">Total: ${order.total}</Typography>
          <Typography component="p">
            Assigned to: {order.assignedTo ? order.assignedTo : "Not Assigned"}
          </Typography>
          <Select
            value={order.assignedTo || ""}
            onChange={(e) => assignOrder(order.id, e.target.value)}
            className="mt-2 bg-slate-700 text-slate-100"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {salespersons.map((person) => (
              <MenuItem key={person.id} value={person.name}>
                {person.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      ))}
    </Box>
  );
};

export default OrderList;
