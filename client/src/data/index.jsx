
import {  DashboardCustomizeOutlined,   } from "@mui/icons-material";
import {
  ChatCircleDots,
  GearSix,
  Phone,
  Users,
  UsersFour,
} from "phosphor-react";
import { CiAlignBottom, CiChat2, CiStar } from "react-icons/ci";
import {  FiShoppingCart,} from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoAnalyticsOutline, IoBusinessOutline, IoCartOutline, IoGitNetworkOutline,  IoPersonOutline, IoTimerOutline } from "react-icons/io5";
import {  MdHistory } from "react-icons/md";
import { BsBox } from 'react-icons/bs';

import { MdOutlineAssignment } from 'react-icons/md';


const Nav_Buttons = [
  {
    index: 1,
    icon: <ChatCircleDots />,
    title: "Dashboard",
    component: "Dashboard",
  },
  {
    index: 2,
    icon: <Users />,
    title: "Profile",
    component: "Profile",
  },
  {
    index: 4,
    icon: <CiAlignBottom />,
    title: "LeaderBoard",
    component: "LeaderBoard",

  },
  {
    index: 5,
    icon: <CiChat2/>,
    title: "Message",
    component: "Profile",
  },
  {
    index: 6,
    icon: <FiShoppingCart />,
    title: "Order",
    component:"Order"
  },
  {
    index: 7,
    icon: <HiOutlineShoppingBag />,
    title: "Stocks",
    component: "Stocks",
  },
  {
    index: 8,
    icon: <Phone />,
    title: "Phone",
    component: "Phone",
    
  },
  {
    index: 9,
    icon: <CiStar />,
    title: "Salesperson",
    component: "Salesperson",
    
  },
  {
    index: 10,
    icon: <MdHistory />,
    title: "Recent",
    
  },
  {
    index: 11,
    icon: <GearSix />,
    title: "Setting",
    
  },
];
const Cust_Nav_Buttons = [
  {
    index: 1,
    icon: <ChatCircleDots />,
    title: "Dashboard",
    component: "Dashboard",
  },
  {
    index: 2,
    icon: <Users />,
    title: "Profile",
    component: "Profile",
  },
  {
    index: 3,
    icon: <CiAlignBottom />,
    title: "LeaderBoard",
    component: "LeaderBoard",
  },
  {
    index: 4,
    icon: <CiChat2 />,
    title: "Message",
    component: "Message",
  },
  {
    index: 5,
    icon: <FiShoppingCart />,
    title: "Order",
    component: "Order",
  },
  {
    index: 6,
    icon: <HiOutlineShoppingBag />,
    title: "Products",
    component: "Products",
  },
  {
    index: 7,
    icon: <Phone />,
    title: "Phone",
    component: "Phone",
  },
  {
    index: 8,
    icon: <CiStar />,
    title: "Favourites",
    component: "Favourites",
  },
  {
    index: 9,
    icon: <MdHistory />,
    title: "Recent",
    component: "Recent",
  },
];

const Sales_Nav_Buttons = [
  {
    index: 1,
    icon: <MdOutlineAssignment/>,
    title: "Dashboard",
    component: "Dashboard",
  },
  {
    index: 2,
    icon: <IoPersonOutline />,
    title: "Profile",
    component: "Profile",
  },
  {
    index: 3,
    icon: <IoCartOutline />,
    title: "All Items",
    component: "Orders",
  },
  
  {
    index: 4,
    icon: <IoTimerOutline />,  // Replace with appropriate icon
    title: "Report Missing Item",
    component: "Report Missing Item",
  },
  {
    index: 5,
    icon: <IoTimerOutline />,  // Replace with appropriate icon
    title: "Air Tag Registration",
    component: "Air Tag Registration",
  },
  {
    index: 6,
    icon: <IoTimerOutline />,  // Replace with appropriate icon
    title: "Find AirTag",
    component: "Find AirTag",
  },
  // {
  //   index: 5,
  //   icon: <IoAnalyticsOutline/>,  // Replace with appropriate icon
  //   title: "Performance Analysis",
  //   component: "Performance Analysis",
  // },
  {
    index: 7,
    icon: <UsersFour />,  
    title: "Report Found Item",
    component: "Customer Interaction",
  },
  {
    index: 8,
    icon: <IoBusinessOutline />,  // Replace with appropriate icon
    title: "Task Management",
    component: "Task Management",
  },
  // {
  //   index: 8,
  //   icon: <IoMdNotificationsOutline />,  // Replace with appropriate icon
  //   title: "Notifications",
  //   component: "Notifications",
  // },
  // {
  //   index: 9,
  //   icon: <BsBox/>,  // Replace with appropriate icon
  //   title: "Stock Management",
  //   component: "Stock Management",
  // },
  // {
  //   index: 10,
  //   icon: <IoGitNetworkOutline />,  // Replace with appropriate icon
  //   title: "Additional Features",
  //   component: "Additional Features",
  // },
  
 

];






const UserInfo =[
{
  name:"David",
email:"david@gmail.com",
image:"imahr"
}

]
// const 

export {
  Nav_Buttons,
  Cust_Nav_Buttons,
  Sales_Nav_Buttons,
  UserInfo
};
