import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const scrollPage = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", scrollPage);

    return () => {
      window.removeEventListener("scroll", scrollPage);
    };
  }, [isScrolled]);

  /* eslint-disable no-unused-vars */
  const scrollToSections = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section
      className="flex items-center justify-center m-10 md:justify-around "
      id="home"
    >
      <div className="md:w-[45%] z-20">
        <h1 className="mb-4 text-3xl font-bold text-center md:text-start">
          Sextortion Shield: AI-powered <br /> Reporting and Prevention Platform
        </h1>
        <p>
          Welcome to Sextortion Shield, your ultimate defense against online
          sextortion
        </p>

        <div className="mt-[90px]">
          <Button variant="contained" href="/report">
            Report
          </Button>
          <p className="mt-[10px]">
            Our AI-powered platform provides immediate support and guidance to
            victims, ensuring swift reporting and effective action.
          </p>
        </div>
      </div>
      <div className="ml-[-20px] w-0 md:w-fit">
        <img src="kl" alt="landingImg" className="" />
      </div>
    </section>
  );
};

export default LandingPage;
