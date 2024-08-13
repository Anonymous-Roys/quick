// eslint-disable-next-line react/prop-types
const ComponentContainer = ({children,columnSpan=1,...props}) => {
    return ( <div className={`p-3 md:p-4 bg-[#21222D] rounded-md md:m-4 m-2 col-span-${columnSpan} h-fit` } {...props}>
        {children}
    </div> );
}
 
export default ComponentContainer;