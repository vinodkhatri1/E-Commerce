import ProductCard from "./ProductCard"
import productData from "../Data/ProductData";
const NewArrivals = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold ml-5">New Arrivals</h1>
            <div className="flex flex-wrap m-5">
                {productData.slice(9, 17).map((item) => (
                    <ProductCard key={item.id} productdt={item} />
                ))}
            </div>
        </div>
    )
}

export default NewArrivals