import SectionContainer from "../../components/SectionContainer"
import CustomerFulfilment from "../../components/adminDashboard/CustomerFulfilment"
import ProjectsStat from "../../components/adminDashboard/ProjectsStat"
import TodaySalesStats from "../../components/adminDashboard/TodaySalesStats"
import TopProducts from "../../components/adminDashboard/TopProducts"


const Dashboard = () => {
  return (
      <SectionContainer>
          <TodaySalesStats columnSpan={2} />
          <CustomerFulfilment columnSpan={1}/>
          <CustomerFulfilment />
          <ProjectsStat columnSpan={2} />
          <TopProducts columnSpan={2}/>
        </SectionContainer>
  )
}

export default Dashboard