
import { FaArrowRight } from "react-icons/fa6";
import { BootstrapButton } from "../reusable/Button";

const About = () => {
  const scrollToSections = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section id="about" className="m-10">
      <div className="mt-16 mb-16 ml-2 mr-2">
        <h1 className="m-8 text-3xl font-bold text-center">
          About Sextortion Shield
        </h1>
        <p className="font-bold text-center">
          Sextortion Shield is an innovative platform designed to combat the
          growing threat of online sextortion. Utilizing advanced AI technology,
          we offer victims a safe to report incidents, recieve support and
          initiate investigations
        </p>
      </div>
      <div className="flex flex-wrap justify-around gap-5">
        <div className="mt-16 max-h-[490px]">
          <img
            src={"aboutImg"}
            alt="about image"
            className="w-[100%] h-[100%] overflow-hidden"
          />
        </div>
        <div className="lg:w-[50%] md:w-[90%] [100%]">
          <h1 className="m-2 mt-16 text-2xl font-bold text-center lg:text-3xl lg:m-8">
            How Sextortion Shield Protects You
          </h1>
          <p className="font-bold">
            Sextortion Sheild has been a game changer in combating online
            threats. Our platform provides essential tools and support to keep
            you safe. Below are the key features of Sextortion Shield:
          </p>
          <ul className="font-regular">
            <li className="mt-3 mb-3 custom-bullet">
              <span className="font-semibold">Comprehensive Support:</span>{" "}
              Access immediate advice through our chatbot.
            </li>
            <li className="mt-3 mb-3 custom-bullet">
              <span className="font-semibold">Secure Reporting:</span> Easily
              report incidents and upload evidence for AI analysis
            </li>
            <li className="mt-3 mb-3 custom-bullet">
              <span className="font-semibold">
                Law Enforcement Collaboration:
              </span>{" "}
              Verified evidence is shared with police for prompt action.
            </li>
            <li className="mt-3 mb-3 custom-bullet">
              <span className="font-semibold">Trauma management aid:</span>We
              will connect you to certified and experienced pschologists to help
              you recover.
            </li>
            <li className="mt-3 mb-3 custom-bullet">
              <span className="font-semibold">Educational Resources:</span>Learn
              about sextortion prevention through ourinformative blog.
            </li>
          </ul>

          <BootstrapButton variant="text">
            Learn More
            <FaArrowRight className="ml-2" />
          </BootstrapButton>
        </div>
      </div>
    </section>
  );
};

export default About;
