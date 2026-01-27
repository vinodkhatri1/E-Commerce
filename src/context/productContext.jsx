import { createContext, useContext, useState } from "react";
import ProductData from "../Data/ProductData";
import { useAuth } from "./AuthContext";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { user } = useAuth();
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("seller_inventory");
    return saved ? JSON.parse(saved) : ProductData;
  });

  const categories = [...new Set(ProductData.map((p) => p.category))];

  const saveInventory = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem("seller_inventory", JSON.stringify(newProducts));
  };

  const addProduct = (data) => {
    // Ensure we have a fallback if user email isn't immediately available
    const currentUEmail = data.sellerId || user?.email;

    const newProduct = {
      ...data,
      id: Date.now(),
      sellerId: currentUEmail,
      sellerName: user?.name || "Seller",
    };

    const updatedProducts = [newProduct, ...products];
    setProducts(updatedProducts);
    localStorage.setItem("seller_inventory", JSON.stringify(updatedProducts));
  };

  const deleteProduct = (id) => {
    const product = products.find((p) => p.id === id);
    // PERMISSION CHECK
    if (user?.role === "admin" || product?.sellerId === user?.email) {
      if (window.confirm("Delete this listing?")) {
        saveInventory(products.filter((p) => p.id !== id));
      }
    } else {
      alert("Permission Denied: You don't own this product.");
    }
  };

  const updateProduct = (id, data) => {
    saveInventory(products.map((p) => (p.id === id ? { ...p, ...data } : p)));
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, categories }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
