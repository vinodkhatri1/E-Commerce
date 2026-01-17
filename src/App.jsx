import Header from "./component/Header";
import Footer from "./component/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import { useEffect } from "react";
import SellProduct from "./pages/Sell";
import SearchResults from "./pages/SearchResults";
import SellerDashboard from "./pages/Sell";
import Checkout from "./pages/Checkout";
import { AuthProvider } from "./context/AuthContext";
const App = () => {
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  };
  return (
    
    <div className="font-poppins">
      <AuthProvider>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/sell" element={<SellProduct />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
      </AuthProvider>
    </div>
  );
};
export default App;
