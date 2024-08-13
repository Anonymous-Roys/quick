import { useEffect, useState } from "react";
import ComponentContainer from "../ComponentContainer";
import { IoInfiniteSharp } from "react-icons/io5";
import { TbSquareCheck } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";

const projectFig = [
    {
        index: 1,
        name:"Items",
        statValue:32,
        icon:<BiCategory/>,
        color:"#FEFA99",
    },
    {
        index:2,
        name:"Lost",
        statValue:20,
        icon: <IoInfiniteSharp className=""/>,
        color:"#FEC5EE",
    },
    {
        index:3,
        name:"Found",
        statValue:12,
        icon: <TbSquareCheck className=""/>,
        color:"#93FFB3"
    }
];

// eslint-disable-next-line react/prop-types
const ProjectsStat = ({ columnSpan = 1 }) => {
    const [currentProjectFig, setcurrentProjectFig] = useState(
        projectFig.map(() => ({statValue: 0 }))
    );

    useEffect(() => {
        projectFig.forEach((item, index) => {
            let num = 0;
            let statValue = 0;
            const increment = item.statValue / 100;
            const incrementstatValue = item.statValue / 100;
            const interval = setInterval(() => {
                num += increment;
                statValue += incrementstatValue;
                if (num >= item.statValue && statValue >= item.statValue) {
                    clearInterval(interval);
                    setcurrentProjectFig(current => {
                        const updated = [...current];
                        updated[index] = {statValue: item.statValue };
                        return updated;
                    });
                } else {
                    setcurrentProjectFig(current => {
                        const updated = [...current];
                        updated[index] = {statValue: Math.round(statValue) };
                        return updated;
                    });
                }
            }, 10);
        });
    }, []);


    return (
        
        <ComponentContainer columnSpan={columnSpan}>
            <div className="">
                <h1 className="text-[20px] font-bold">Item Stats</h1>
                <p className="text-[12px] text-slate-500">
                    32 <span className="text-sm border-l-[1px] border-slate-500 mr-1"> </span> 120 <span>Items found</span>
                </p>
            </div>
            <div className="grid justify-between grid-cols-2 gap-20 mt-10 text-black md:grid-cols-3">
                {projectFig.map((item, index) => (
                    <div key={item.index} className={`flex flex-col gap-2 p-2 rounded-xl bg-[${item.color}]`} style={{backgroundColor:`${item.color}`}}>
                        <div className={`text-4xl`}>{item.icon}</div>
                        <span className="text-[32px] font-semibold">{`${item.statValue >= 5000 ? "5K": currentProjectFig[index].statValue.toLocaleString()}`}</span>
                        <p className="font-semibold text-slate-900 text-[16px]">{item.name}</p>
                    </div>
                ))}
            </div>
        </ComponentContainer>
    );
};

export default ProjectsStat;
