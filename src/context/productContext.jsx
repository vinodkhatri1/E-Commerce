import { createContext, useContext, useState } from "react";
import ProductData from "../Data/ProductData";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("seller_inventory");
    return saved ? JSON.parse(saved) : ProductData;
  });

  const categories = [...new Set(ProductData.map((p) => p.category))];

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      const updated = products.filter((p) => p.id !== id);
      localStorage.setItem("seller_inventory", JSON.stringify(updated));
      window.location.reload();
    }
  };

  const addProduct = (data) => {
    const updated = [{ ...data, id: Date.now() }, ...products];
    localStorage.setItem("seller_inventory", JSON.stringify(updated));
    window.location.reload();
  };

  const updateProduct = (id, data) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...data } : p));
    localStorage.setItem("seller_inventory", JSON.stringify(updated));
    window.location.reload();
  };

  const resetData = () => {
    localStorage.removeItem("seller_inventory");
    window.location.reload();
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        deleteProduct,
        addProduct,
        updateProduct,
        resetData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
