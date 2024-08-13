import SectionContainer from "../../components/SectionContainer";
import CustomerFulfilment from "../../components/adminDashboard/CustomerFulfilment";
import ProjectsStat from "../../components/adminDashboard/ProjectsStat";
import TodaySalesStats from "../../components/adminDashboard/TodaySalesStats";
import TopProducts from "../../components/adminDashboard/TopProducts";
import Navigation from "../../components/navigation";

const CustomerDashboard = () => {
  return (
    <div className="bg-[#171821] min-h-[100vh] text-white flex">
      <Navigation />
      <div className="flex-grow overflow-y-auto">
        <SectionContainer>
          <TodaySalesStats colSpan={2} />
          <CustomerFulfilment colSpan={1}/>
          <CustomerFulfilment />
          <ProjectsStat colSpan={2} />
          <TopProducts />
        </SectionContainer>
      </div>
    </div>
  );
};

export default CustomerDashboard;
