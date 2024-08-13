import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import OrderList from "./OrderList";
import { ordersDummy,salespersonsDummy } from "../../data/products";
import ComponentContainer from "../../components/ComponentContainer";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [salespersons, setSalespersons] = useState([]);

  useEffect(() => {
    // Fetch orders and salespersons from the API
    // fetchOrders();
    // fetchSalespersons();
    setOrders(ordersDummy);
    setSalespersons(salespersonsDummy);
  }, []);

  // const fetchOrders = async () => {
  //   // Replace with your API call
  //   const response = await fetch("/api/orders");
  //   const data = await response.json();
  //   // setOrders(data);
  // };

  // const fetchSalespersons = async () => {
  //   // Replace with your API call
  //   const response = await fetch("/api/salespersons");
  //   const data = await response.json();
  //   // setSalespersons(data);
  // };

  const assignOrder = (orderId, salespersonId) => {
    // Assign the order to the salesperson
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, assignedTo: salespersonId } : order
      )
    );
  };

  return (
    <ComponentContainer>
      <Typography variant="h4" component="h1" className="mb-4 text-slate-100">
        Sales Dashboard
      </Typography>
      <OrderList orders={orders} salespersons={salespersons} assignOrder={assignOrder} />
    </ComponentContainer>
  );
};

export default Dashboard;
