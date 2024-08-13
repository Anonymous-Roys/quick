import { useEffect, useState } from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";
// import { Sidebar } from "react-pro-sidebar";

import Tooltip from "@mui/material/Tooltip";
import { NavLink } from "react-router-dom";
import "tailwindcss/tailwind.css";
import Button from "@mui/material/Button";

const Navbar = () => {
  const [toggled, setToggled] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const scrollPage = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", scrollPage);

    return () => {
      window.removeEventListener("scroll", scrollPage);
    };
  }, []);

  const scrollToSections = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`shadow sticky top-0 left-0 right-0 z-50 flex items-center justify-between  ${
        isScrolled ? "pt-0 pb-0" : ""
      } bg-white   `}
    >
      <div className="flex items-center justify-center ml-8 cursor-pointer">
        <span className="mr-2">
          <NavLink to="/">
            <img
              src={"kl"}
              className="w-20 h-20 my-auto mr-4"
              alt="Printing Logo"
              title="Sextortion Logo"
              loading="eager"
            />
          </NavLink>
        </span>
      </div>
      <ul className="hidden mr-8 space-x-6 md:flex">
        <li>
          <NavLink to="/blog" onClick={() => scrollToSections("Blogs")}>
            Blogs
          </NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/#contact" onClick={() => scrollToSections("contact")}>
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/report">
            <Button variant="contained" href="/report">
              Report
            </Button>
          </NavLink>
        </li>
      </ul>
      <div className="flex items-center md:hidden">
        <Tooltip title="menu" arrow>
          <button onClick={() => setToggled(!toggled)}>
            <HiOutlineMenu className="text-3xl" />
          </button>
        </Tooltip>
      </div>
      {/* <Sidebar
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
        breakPoint="all"
        width="40%"
        className="fixed top-0 right-0 bg-[#3B82F6] z-100"
      > */}
        <ul className="flex flex-col p-4 space-y-4 text-black">
          <li className="flex justify-end">
            <HiX
              onClick={() => setToggled(!toggled)}
              className="text-3xl text-white"
            />
          </li>
          <li>
            <NavLink to="/" onClick={() => scrollToSections("home")}>
              <span onClick={() => setToggled(!toggled)}>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => scrollToSections("#about")}>
              <span onClick={() => setToggled(!toggled)}>About</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" onClick={() => scrollToSections("blog")}>
              <span onClick={() => setToggled(!toggled)}>Blogs</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={() => scrollToSections("contact")}>
              <span onClick={() => setToggled(!toggled)}>Contact</span>
            </NavLink>
          </li>
        </ul>
      {/* </Sidebar> */}
    </header>
  );
};

export default Navbar;
