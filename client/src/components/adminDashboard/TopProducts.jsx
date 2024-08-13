import ComponentContainer from "../ComponentContainer";

const products = [
    {
        index: 1,
        name: "Laptop",
        popularity: 100,
        sales: 1000
    },
    {
        index: 2,
        name: "Phone",
        popularity: 200,
        sales: 2000
    },
    {
        index: 3,
        name: "Books",
        popularity: 300,
        sales: 3000
    },
    {
        index: 4,
        name: "ACSES T-Shirt",
        popularity: 400,
        sales: 4000,
    },
];

const colors = ["#F2C8ED", "#28AEF3", "#FCB859", "#A9DFD8"];

// eslint-disable-next-line react/prop-types
const TopProducts = ({columnSpan=1}) => {
    const sumOfPopularity = (products) => {
        return products.reduce((sum, product) => sum + product.popularity, 0);
    };

    const sumOfSales = (products) => {
        return products.reduce((sum, product) => sum + product.sales, 0);
    };

    const totalPopularity = sumOfPopularity(products);
    const totalSales = sumOfSales(products);

    return (
        <ComponentContainer columnSpan={columnSpan} style={{ padding: "22px"}}>
            <div>
                <p className="text-[20px] font-bold">Top Items Lost</p>
            </div>
            <div>
                <div className="grid w-full grid-cols-5 gap-4 p-2 font-bold text-slate-500 text-[16px]">
                    <p>#</p>
                    <p>Name</p>
                    <p className="col-span-2">Popularity</p>
                    <p>Percentage</p>
                </div>

                {products.map((item, index) => (
                    <div key={item.index} className="grid items-center w-full grid-cols-5 gap-1 md:gap-4 p-1 md:font-bold border-t-[1px] text-slate-200 border-slate-700 text-[14px]">
                        <p className="">
                            {item.index < 10 ? "0" + item.index : item.index}
                        </p>
                        <p className="">{item.name}</p>
                        <div className="w-full col-span-2">
                            <div className="w-[100%] text-center bg-[#727070] rounded-md overflow-hidden content-center">
                                <div
                                    style={{ width: `${(item.popularity / totalPopularity) * 100}%`, backgroundColor: colors[index % colors.length] }}
                                    className="h-[4px]"
                                >
                                </div>
                            </div>
                        </div>
                        <p>{((item.sales / totalSales) * 100).toFixed(2)}%</p>
                    </div>
                ))}
            </div>
        </ComponentContainer>
    );
};

export default TopProducts;
