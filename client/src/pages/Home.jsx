import About from "../components/Home/About";
import Navbar from "../components/navigation/Navbar";
import LandingPage from "../components/Home/LandingPage";
// import Footer from "../components/Stats/Footer";
import CTA from "../components/reusable/CTA";

const Home = () => {
  return (
    <main className="relative">
      <Navbar />
      <LandingPage />
      <About />
      <CTA />
      {/* <Footer /> */}
    </main>
  );
};

export default Home;
