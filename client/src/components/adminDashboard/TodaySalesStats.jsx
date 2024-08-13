import { useEffect, useState } from "react";
import { MdOutlineCardTravel, MdOutlinePersonAddAlt, MdOutlineLeaderboard } from "react-icons/md";
import { BsClipboard2Check } from "react-icons/bs";
import ComponentContainer from "../ComponentContainer";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodaySalesStats = ({ columnSpan = 1 }) => {
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [currentSales, setCurrentSales] = useState([]);
    
    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/orders/');
            const totalOrdersforTheDay = response.data.length;
            console.log(totalOrdersforTheDay);
            setTotalOrders(totalOrdersforTheDay);
        } catch (error) {
            toast.error('Failed to fetch orders');
            console.log(error);
        }
    };
    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/customers/');
            const totalCustomersforTheDay = response.data.length;
            console.log(totalCustomersforTheDay);
            setTotalCustomers(totalCustomersforTheDay);
        } catch (error) {
            toast.error('Failed to fetch orders');
            console.log(error);
        }
    };

    useEffect(() => {
        fetchOrders();
        fetchCustomers()

        const intervalId = setInterval(() => {
            fetchOrders();
        }, 60000); // Fetch every 60 seconds

        return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }, []);

    const salesItems = [
        {
            index: 0,
            number: 200,
            title: "Total Items Found",
            icon: <MdOutlineLeaderboard className="text-emerald-400" />,
            color: "emerald",
            fromYesterday: 10
        },
        {
            index: 1,
            number: totalOrders,
            title: "Total Lost Items",
            icon: <BsClipboard2Check className="text-indigo-400" />,
            color: "indigo",
            fromYesterday: 8
        },
        {
            index: 2,
            number: 9,
            title: "Items Received",
            icon: <MdOutlineCardTravel />,
            color: "blue",
            fromYesterday: 2
        },
        {
            index: 3,
            number: totalCustomers,
            title: "New Student",
            icon: <MdOutlinePersonAddAlt className="text-orange-400" />,
            color: "orange",
            fromYesterday: 3
        }
    ];

    useEffect(() => {
        salesItems.forEach((item, index) => {
            let num = 0;
            let fromYesterday = 0;
            const increment = item.number / 100;
            const incrementFromYesterday = item.fromYesterday / 100;
            const interval = setInterval(() => {
                num += increment;
                fromYesterday += incrementFromYesterday;
                if (num >= item.number && fromYesterday >= item.fromYesterday) {
                    clearInterval(interval);
                    setCurrentSales(current => {
                        const updated = [...current];
                        updated[index] = { number: item.number, fromYesterday: item.fromYesterday };
                        return updated;
                    });
                } else {
                    setCurrentSales(current => {
                        const updated = [...current];
                        updated[index] = { number: Math.round(num), fromYesterday: Math.round(fromYesterday) };
                        return updated;
                    });
                }
            }, 10);
        });
    }, [totalOrders, totalCustomers]); // Re-run the interval effect whenever totalOrders change

    return (
        <ComponentContainer columnSpan={columnSpan}>
            <div className="">
                <h1 className="text-[20px] font-bold">Monthly Review</h1>
                <p className="text-[12px] text-slate-500">Total Summary</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-10 md:grid-cols-4">
                {salesItems.map((item, index) => (
                    <div key={item.index} className="bg-[#171821] flex gap-2 flex-col  p-2 rounded-xl">
                        <div className={`text-[36px] text-${item.color}-400`}>{item.icon}</div>
                        <span className="text-[32px] font-semibold">{`${item.number >= 5000 ? "5K" : currentSales[index]?.number?.toLocaleString()}`}</span>
                        <p className="font-semibold text-slate-500 text-[16px]">{item.title}</p>
                        <p className={`text-${item.color}-400 text-[12px] font-semibold`}>{`+${currentSales[index]?.fromYesterday} from yesterday`}</p>
                    </div>
                ))}
            </div>
        </ComponentContainer>
    );
};

export default TodaySalesStats;
