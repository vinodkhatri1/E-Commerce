import Header from "./component/Header";
import Footer from "./component/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import { useEffect } from "react";
import SellerDashboard from "./pages/SellerDashboard";
import SearchResults from "./pages/SearchResults";
import Checkout from "./pages/Checkout";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/productContext";
import UserProfile from "./component/UserProfile";
import OrderHistory from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
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
      <ProductProvider>
        <AuthProvider>
          <CartProvider>
            <Header />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/category/:category" element={<Category />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/seller-dashboard" element={<SellerDashboard />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/userprofile" element={<UserProfile />} />
              <Route path="/orders" element={<OrderHistory />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </ProductProvider>
    </div>
  );
};
export default App;
