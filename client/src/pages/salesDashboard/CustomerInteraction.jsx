import { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import axios from 'axios';
import { toast } from "react-toastify";
import AddCustomerButton from '../../components/salesDashboard/CustomerInterraction/AddCustomerButton';
import SearchBar from '../../components/salesDashboard/CustomerInterraction/SearchBar';
import CustomerList from '../../components/salesDashboard/CustomerInterraction/CustomerList';
import CustomerModal from '../../components/salesDashboard/CustomerInterraction/CustomerModel';
const CustomerInteraction = () => {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [isAddingCustomer, setIsAddingCustomer] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/customers');
            setCustomers(response.data);
            setFilteredCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
            toast.error("Failed to fetch customers");
        }
    };

    const handleSearch = (query) => {
        const filtered = customers.filter(customer =>
            customer.name.toLowerCase().includes(query.toLowerCase()) ||
            customer.email.toLowerCase().includes(query.toLowerCase()) ||
            customer.phone.includes(query)
        );
        setFilteredCustomers(filtered);
        setCurrentPage(1);
    };

    return (
        <Container className="py-8 text-slate-300 ">
            <h1 className="mb-12 text-xl font-bold md:text-[32px]">Customer Interaction</h1>
            <div className='flex flex-wrap justify-between gap-2'>
            <AddCustomerButton onClick={() => {
                setIsAddingCustomer(true);
                setModalOpen(true);
                
            }} />
            <SearchBar onSearch={handleSearch} className='#'/>
            </div>
            
            <CustomerList 
                customers={filteredCustomers} 
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                onViewDetails={(customer) => {
                    setSelectedCustomer(customer);
                    setModalOpen(true);
                    setIsAddingCustomer(false);
                }}
                onDeleteCustomer={async (customerId) => {
                    try {
                        await axios.delete(`http://localhost:5000/api/customers/delete/${customerId}`);
                        fetchCustomers();
                        toast.success("Customer deleted successfully!");
                    } catch (error) {
                        console.error(error);
                        toast.error("Failed to delete customer");
                    }
                }}
            />
            <CustomerModal 
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                isAddingCustomer={isAddingCustomer}
                selectedCustomer={selectedCustomer}
                onAddCustomer={async (newCustomer) => {
                    try {
                        await axios.post('http://localhost:5000/api/customers/add', newCustomer);
                        fetchCustomers();
                        setModalOpen(false);
                        toast.success("Customer added successfully!");
                    } catch (error) {
                        console.error(error);
                        toast.error("Failed to add customer");
                    }
                }}
            />
        </Container>
    );
};

export default CustomerInteraction;