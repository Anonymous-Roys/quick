import { useState } from "react";
import { Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import ComponentContainer from "../ComponentContainer";
import { IoIosNotificationsOutline } from "react-icons/io";
import { faker } from "@faker-js/faker";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

const DashboardHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);

  return (

    <ComponentContainer style={{ backgroundColor: "transparent", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div className="w-[65%] relative">
        <input type="text" className="w-full bg-[#21222D] rounded-md h-[50px] pl-10 text-[12px] font-semibold" placeholder="Search here..." />
        <IoSearch className="absolute w-5 h-5 bottom-[15px] left-[15px]" />

      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
        <IconButton style={{width:'40px', fontWeight:900, color:'#3f51b5'}}>
          
        <IoIosNotificationsOutline style={{ height: "25px",  }}/>
        </IconButton>
        <div style={{ display: "flex", alignItems: "center", }}>
          <IconButton onClick={handleMenuOpen} style={{ display: "flex", alignItems: "center" }}>
            <Avatar src={faker.image.avatar()} />
            {isMenuOpen ? <MdArrowDropUp className="text-white" /> : <MdArrowDropDown className="text-white" />}
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose} sx={{ fontSize: '12px', fontWeight:600 }}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose} sx={{ fontSize: '12px', fontWeight:600 }}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose} sx={{ fontSize: '12px', fontWeight:600 }}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </ComponentContainer>
  );
};

export default DashboardHeader;
