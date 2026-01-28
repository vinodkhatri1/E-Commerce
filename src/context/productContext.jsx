import { createContext, useContext, useState } from "react";
import ProductData, { productImages } from "../Data/ProductData";
import { useAuth } from "./AuthContext";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { user } = useAuth();

  // Helper function to link image imports back to data
  const rehydrateImages = (data) => {
    if (!data) return [];
    return data.map((product) => ({
      ...product,
      // Map the title to the imported asset.
      // If no match (like a new seller upload), keep the original value.
      image: productImages[product.title] || product.image,
    }));
  };

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("seller_inventory"); // Fixed: define 'saved' first
    const initialData = saved ? JSON.parse(saved) : ProductData;
    return rehydrateImages(initialData);
  });

  const categories = [...new Set(ProductData.map((p) => p.category))];

  // Modified to ensure images are rehydrated whenever state updates
  const saveInventory = (newProducts) => {
    const rehydrated = rehydrateImages(newProducts);
    setProducts(rehydrated);
    localStorage.setItem("seller_inventory", JSON.stringify(newProducts));
  };

  const addProduct = (data) => {
    const currentUEmail = data.sellerId || user?.email;

    const newProduct = {
      ...data,
      id: Date.now(),
      sellerId: currentUEmail,
      sellerName: user?.name || "Seller",
    };

    saveInventory([newProduct, ...products]);
  };

  const deleteProduct = (id) => {
    const product = products.find((p) => p.id === id);
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
