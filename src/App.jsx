import React, { useEffect, Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/productContext";

import Header from "./component/Header";
import Footer from "./component/Footer";

const Home = lazy(() => import("./pages/Home"));
const Categories = lazy(() => import("./pages/Categories"));
const Category = lazy(() => import("./pages/Category"));
const Products = lazy(() => import("./pages/Products"));
const Product = lazy(() => import("./pages/Product"));
const SellerDashboard = lazy(() => import("./pages/SellerDashboard"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const Checkout = lazy(() => import("./pages/Checkout"));
const UserProfile = lazy(() => import("./component/UserProfile"));
const OrderHistory = lazy(() => import("./pages/Orders"));
const Wishlist = lazy(() => import("./pages/Wishlist"));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-white">
    <div className="animate-pulse text-slate-400 font-medium">Loading...</div>
  </div>
);

const App = () => {
  return (
    <div className="font-poppins antialiased">
      <ProductProvider>
        <AuthProvider>
          <CartProvider>
            <Header />
            <ScrollToTop />

            <Suspense fallback={<PageLoader />}>
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
            </Suspense>

            <Footer />
          </CartProvider>
        </AuthProvider>
      </ProductProvider>
    </div>
  );
};

export default App;
