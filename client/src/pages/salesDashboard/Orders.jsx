import { useEffect, useState } from "react";
import SectionContainer from "../../components/SectionContainer";
import ComponentContainer from "../../components/ComponentContainer";
import { salespersons } from '../../data/orders';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, IconButton } from "@mui/material";
import { TbTrash } from "react-icons/tb";
import { Scrollbars } from 'react-custom-scrollbars';
import { MdViewList, MdViewModule } from "react-icons/md";

const Orders = () => {
  const [orderList, setOrderList] = useState([]);
  const [salespersonList, setSalespersonList] = useState(salespersons);
  const [filter, setFilter] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");
  const [layout, setLayout] = useState("list"); // 'list' or 'grid'
  const [selectedOrder, setSelectedOrder] = useState(null); // To handle selected order for detailed view

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/');
        setOrderList(response.data);
      } catch (error) {
        toast.error("Failed to fetch orders");
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/orders/${orderId}`);

      if (response.status !== 200) {
        throw new Error('Failed to delete order');
      }

      const updatedOrderList = orderList.filter(order => order._id !== orderId);
      setOrderList(updatedOrderList);
      toast.success("Order deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete order");
    }
  };

  const assignOrder = (orderId, salespersonId) => {
    setOrderList(orderList.map(order =>
      order._id === orderId ? { ...order, assignedTo: salespersonId, status: 'Assigned' } : order
    ));
    setSalespersonList(salespersonList.map(sp =>
      sp.id === salespersonId ? { ...sp, status: 'Busy' } : sp
    ));
  };

  const reassignOrder = (orderId, salespersonId) => {
    const currentOrder = orderList.find(order => order.id === orderId);
    if (currentOrder) {
      setSalespersonList(salespersonList.map(sp =>
        sp.id === currentOrder.assignedTo ? { ...sp, status: 'Available' } : sp
      ));
      assignOrder(orderId, salespersonId);
    }
  };

  const completeOrder = (orderId) => {
    const confirmCompletion = window.confirm("Are you sure you have completed this order?");
    if (confirmCompletion) {
      setOrderList(orderList.map(order =>
        order._id === orderId ? { ...order, status: 'Completed' } : order
      ));
      toast.success("Order completed successfully!");
      const completedOrder = orderList.find(order => order._id === orderId);
      if (completedOrder) {
        setSalespersonList(salespersonList.map(sp =>
          sp.id === completedOrder.assignedTo ? { ...sp, status: 'Available' } : sp
        ));
      }
    }
  };

  const filteredOrders = () => {
    let filteredList = filter === "none" ? orderList : orderList.filter(order => order.status === filter);
    filteredList = filteredList.filter(order => order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return filteredList.sort((a, b) => new Date(b.time) - new Date(a.time));
  };

  return (
    <SectionContainer colsSpan={1} style={{height:'96vh'}}>
      <div className="w-full">
        <h2 className="text-[32px] mb-1 text-slate-300 font-bold ml-4">Items</h2>
        
        <div className="flex items-center justify-between mb-4 ml-2">
          <div className="">
            <select
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 mx-2 bg-[#21222D] text-white rounded w-[40%] text-[12px] font-bold"
            >
              <option value="none" className="">All</option>
              <option value="Pending">Missing/Lost</option>
              <option value="Assigned">Found</option>
              <option value="Completed">Received</option>
            </select>
            <input
              type="text"
              placeholder="Search by item name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 mx-2 bg-[#21222D] text-white rounded w-[40%] text-[12px]"
            />
          </div>
          <div>
            <IconButton style={{color:'#1199ff'}} onClick={() => setLayout(layout === "grid" ? "list" : "grid")}>
              {layout === "grid" ? <MdViewList className="text-[#3f51b5]" /> : <MdViewModule className="text-[#3f51b5]"/>}
            </IconButton>
          </div>
        </div>
        <Scrollbars style={{height:"58vh"}}>
          <div className={`grid ${layout === "grid" ? "grid-cols-3 gap-4" : ""}`}>
            {filteredOrders().length > 0 ? (
              filteredOrders().map(order => (
                <ComponentContainer
                  key={order._id}
                  
                  style={{ borderRadius: "8px", cursor: 'pointer' }}
                >
                  <Button variant="contained" sx={{backgroundColor:'#3f51b5', marginBottom:'12px', fontSize:'12px'}} onClick={() => setSelectedOrder(order)}>View Detail</Button>
                  <p className="text-[12px] font-bold mt-1">Item Name: {order.customer.name}</p>
                  <p className="text-[12px] mt-1">Item Desc: {order.desc}</p>
                  {/* <p className="text-[12px] mt-1">
                    Total: GHc{order.selections.reduce((total, selection) => total + (selection.price * order.copies), 0)}
                  </p> */}
                  <p className="text-[12px] mt-1">Status: {order.status}</p>
                  {/* <p className="text-[12px] mt-1">Assigned To: <span className="underline">
                  {order.assignedTo ? salespersons.find(sp => sp.id === order.assignedTo)?.name : 'N/A'}
                    </span> 
                  </p> */}
                  <p className="text-[12px] mt-1">Date: {new Date(order.time).toLocaleString()}</p>
                  <div className="flex">
                    {order.status === 'Pending' && (
                      <div>
                        <select
                          onChange={(e) => assignOrder(order._id, Number(e.target.value))}
                          defaultValue=""
                          className="p-1 bg-[#171821] text-white rounded text-[12px] mt-1"
                        >
                          <option value="" disabled>Receive</option>
                          {salespersonList.filter(sp => sp.status === 'Available').map(sp => (
                            <option key={sp.id} value={sp.id}>{sp.name}</option>
                          ))}
                        </select>
                      </div>
                    )}
                    {order.status === 'Assigned' && (
                      <div className="flex items-center">
                        <select
                          onChange={(e) => reassignOrder(order._id, Number(e.target.value))}
                          defaultValue={order.assignedTo || ""}
                          className="p-1 bg-[#171821] text-white rounded text-[12px]"
                        >
                          <option value="" disabled className="text-[12px]">Select Salesperson</option>
                          {salespersonList.map(sp => (
                            <option key={sp.id} value={sp.id}>{sp.name}</option>
                          ))}
                        </select>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            completeOrder(order._id);
                          }}
                          className="p-1 ml-2 text-white bg-blue-600 rounded text-[12px]"
                        >
                          Mark as Received
                        </button>
                      </div>
                    )}
                    <IconButton onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteOrder(order._id);
                    }}>
                      <TbTrash className="text-[24px] text-[#ff000099]" />
                    </IconButton>
                  </div>
                </ComponentContainer>
              ))
            ) : (
              <p className="text-[16px] font-bold">No Items Here</p>
            )}
          </div>
        </Scrollbars>
        {selectedOrder && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 bg-blue-200 rounded-lg">
              <h2 className="mb-4 text-xl font-bold">Order Details</h2>
              <p>Item : {selectedOrder.customer.name}</p>
              <p>Total: GHc{selectedOrder.selections.reduce((acc, selection) => acc + selection.price, 0)}</p>
              <p>Status: {selectedOrder.status}</p>
              <p>Assigned To: {selectedOrder.assignedTo ? salespersons.find(sp => sp.id === selectedOrder.assignedTo)?.name : 'N/A'}</p>
              <p>Date: {new Date(selectedOrder.time).toLocaleString()}</p>
              <div className="flex flex-col mt-4">
                {selectedOrder.selections.map((selection, index) => (
                  <div key={index} className="mb-2">
                    <p>Selection {index + 1}: {selection.item}</p>
                    <p>Price: GHc{selection.price}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 mt-4 text-white bg-blue-500 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </SectionContainer>
  );
};

export default Orders;
