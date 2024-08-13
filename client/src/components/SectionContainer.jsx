import DashboardHeader from "./navigation/DashboardHeader"


// eslint-disable-next-line react/prop-types
const SectionContainer = ({children, colsSpan=3}) => {
  return (
    <div className="p-0 md:p-2 bg-[#171821] w-full">
      <DashboardHeader/>
    <div className={`grid w-full grid-cols-1 md:p-4 md:grid-cols-${colsSpan}`}>
        {children}
    </div>
    </div>
  )
}

export default SectionContainer