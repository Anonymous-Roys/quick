import { FaRegMessage } from "react-icons/fa6"

export const CTA = () => {
  return (
    <div className="sticky z-50 flex justify-end m-3 bottom-10">
    <div className="p-3 border-[1px]  rounded-full bg-[#3B82F6] w-fit">
        <FaRegMessage className="text-right text-white" />
    </div>
    </div>
  )
}

export default CTA