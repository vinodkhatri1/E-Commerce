import ProductCard from "./ProductCard";
import productData from "../Data/ProductData";

const TrandingProduct = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-l-4 border-red-500 pl-4">
                Trending Products
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {productData.slice(0, 8).map((item) => (
                    <ProductCard key={item.id} productdt={item} />
                ))}
            </div>
        </div>
    )
}

export default TrandingProduct;