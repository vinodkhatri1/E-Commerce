import { createContext, useContext, useState } from "react";
import initialData from "../Data/ProductData"; // Your existing static file

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  // Initialize with your static data
  const [products, setProducts] = useState(initialData);

  // Function to add a new item (Seller Mode)
  const addProduct = (newItem) => {
    const itemWithId = { 
        ...newItem, 
        id: Date.now(), // Generate a unique ID
        rating: 0,      // Default rating
        reviews: [] 
    };
    setProducts((prev) => [itemWithId, ...prev]); // Add to top of list
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => useContext(ProductContext);