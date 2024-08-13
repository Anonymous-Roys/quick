const orders = [
    { id: 1, customerName: "John Doe", total: 100.50, status: "Pending", assignedTo: null, date: new Date("2024-07-01") },
    { id: 2, customerName: "Jane Smith", total: 250.00, status: "Assigned", assignedTo: 1, date: new Date("2024-07-02") },
    { id: 3, customerName: "Alice Johnson", total: 175.75, status: "Completed", assignedTo: 2, date: new Date("2024-07-03") },
    { id: 4, customerName: "Bob Brown", total: 300.00, status: "Pending", assignedTo: null, date: new Date("2024-07-04") },
    { id: 5, customerName: "Carol White", total: 150.25, status: "Assigned", assignedTo: 1, date: new Date("2024-07-05") }
  ];
  
  const salespersons = [
    { id: 1, name: "Michael Lee", status: "Busy" },
    { id: 2, name: "Sarah Kim", status: "Busy" },
    { id: 3, name: "Received", status: "Available" }
  ];


  export {
    orders,
    salespersons
  }