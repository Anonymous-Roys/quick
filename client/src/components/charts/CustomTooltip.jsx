

const CustomTooltip = ({ active, payload, label }) => {

    if (active && payload && payload.length) {
        return (
            <div className="flex flex-col gap-4 p-4 rounded-md bg-slate-900">
                <p className="text-lg text-medium">{label}</p>
                <p className="text-sm text-blue-400">
                    LastMonth:
                    <span className="ml-2">${payload[0].value}</span>
                </p>
                <p className="text-sm text-blue-400">
                    ThisMonth:
                    <span className="ml-2">${payload[1].value}</span>
                </p>
            </div>
        )
    }
}

export default CustomTooltip