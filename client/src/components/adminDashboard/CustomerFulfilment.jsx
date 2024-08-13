import { 
    Area, 
    AreaChart, 
    ResponsiveContainer, 
    XAxis, 
    Tooltip,
    Legend,
} from "recharts";
import ComponentContainer from "../ComponentContainer";
import CustomTooltip from "../charts/CustomTooltip";
import { useState } from "react";

// Sample data
const productsSales = [
    { name: "0", lastMonth: 4000, thisMonth: 3000 },
    { name: "3", lastMonth: 2200, thisMonth: 1000 },
    { name: "6", lastMonth: 3000, thisMonth: 2600 },
    { name: "9", lastMonth: 2700, thisMonth: 2000 },
    { name: "12", lastMonth: 4000, thisMonth: 2000 },
    { name: "15", lastMonth: 1890, thisMonth: 1181 },
    { name: "18", lastMonth: 3000, thisMonth: 3000 },
    { name: "21", lastMonth: 4000, thisMonth: 3000 },
    { name: "24", lastMonth: 1700, thisMonth: 1500 },
    { name: "27", lastMonth: 4000, thisMonth: 3000 },
    { name: "30", lastMonth: 5000, thisMonth: 4000 },
];

// eslint-disable-next-line react/prop-types
const CustomerFulfilment = ({ columnSpan = 1 }) => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [opacity, setOpacity] = useState({
        thisMonth: 1,
        lastMonth: 1,
      });

    const customLegend = (props) => {
        // eslint-disable-next-line react/prop-types
        const { payload } = props;
        return (
            <div className="flex justify-around">
                {payload.map((entry, index) => (
                    <p
                        key={`item-${index}`}
                        style={{ color: entry.color, cursor: 'pointer' }}
                        onMouseEnter={() => setHoveredItem(entry.value)}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        {entry.value}
                    </p>
                ))}
            </div>
        );
    };

    const handleMouseEnter = (o) => {
        const { dataKey } = o;
    
        setOpacity((op) => ({ ...op, [dataKey]: 0.5 }));
      };
    
      const handleMouseLeave = (o) => {
        const { dataKey } = o;
    
        setOpacity((op) => ({ ...op, [dataKey]: 1 }));
      };

    return (
        <ComponentContainer columnSpan={columnSpan} style={{ height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <p className="text-[20px] font-bold">Student Satisfaction</p>
            <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={productsSales}>
                    <XAxis dataKey="name" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend content={customLegend} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                    <Area
                        type="monotone"
                        dataKey="lastMonth"
                        stroke={hoveredItem === 'lastMonth' ? "#242424" : "#3f51b5"}
                        fill="#3f51b5"
                        stackId="1"
                        name="Last Month"
                        strokeOpacity={opacity.lastMonth}
                    />
                    <Area
                        type="monotone"
                        dataKey="thisMonth"
                        stroke={hoveredItem === 'thisMonth' ? "#242424" : "#6f52a5"}
                        fill="#6f52a5"
                        stackId="1"
                        name="This Month"
                        strokeOpacity={opacity.thisMonth}
                        activeDot={{r:1}}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </ComponentContainer>
    );
};

export default CustomerFulfilment;
