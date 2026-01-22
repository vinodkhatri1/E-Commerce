import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DetailedOrderCard from "../component/DetailedOrderCard";
import { ArrowLeft, Package, Search } from "lucide-react";

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (user?.email) {
      const savedOrders = localStorage.getItem(`orders_${user.email}`);
      if (savedOrders) {
        // Sort by date (newest first)
        const parsed = JSON.parse(savedOrders).reverse();
        setOrders(parsed);
      }
    }
  }, [user]);

  // Filter logic
  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Link
              to="/UserProfile"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors text-sm font-bold mb-2"
            >
              <ArrowLeft size={16} /> Back to Profile
            </Link>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              My Orders
            </h1>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search Order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border border-slate-200 pl-10 pr-4 py-2.5 rounded-xl text-sm font-bold w-full md:w-64 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Package size={32} />
              </div>
              <h3 className="text-lg font-black text-slate-800 mb-2">
                No orders found
              </h3>
              <p className="text-slate-500 text-sm mb-6">
                {searchTerm
                  ? "Try a different Order ID"
                  : "You haven't placed any orders yet."}
              </p>
              {!searchTerm && (
                <Link
                  to="/shop"
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors"
                >
                  Start Shopping
                </Link>
              )}
            </div>
          ) : (
            filteredOrders.map((order) => (
              <DetailedOrderCard key={order.id} order={order} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
