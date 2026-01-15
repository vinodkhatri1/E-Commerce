import ProductCard from "./ProductCard"
import productData from "../Data/ProductData";
const TrandingProduct = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold ml-5">Trending Products</h1>
            <div className="flex flex-wrap m-5">
                {productData.slice(0, 8).map((item) => (
                    <ProductCard key={item.id} productdt={item} />
                ))}
            </div>
        </div>
    )
}

export default TrandingProduct