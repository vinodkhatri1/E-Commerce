import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Stars from "./Stars";
import {
  ShoppingBag,
  Package,
  LogOut,
  Clock,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Plus,
  Minus,
  CreditCard,
  CheckCircle,
  ChevronDown,
  Hash,
  MapPin,
  Mail,
  Save,
  Loader2,
} from "lucide-react";

// --- SUB-COMPONENT: DETAILED ORDER ITEM ---
const DetailedOrderCard = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all hover:border-blue-200 shadow-sm">
      <div className="p-4 flex items-center justify-between bg-slate-50/50 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white">
            <Hash size={12} />
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
              Tracking Number
            </p>
            <p className="text-[13px] font-black text-slate-900 font-mono tracking-tighter uppercase">
              {order.id}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
            Paid Total
          </p>
          <p className="text-[13px] font-black text-blue-600">${order.total}</p>
        </div>
      </div>

      <div className="px-4 py-3">
        <div className="flex justify-between items-center mb-1.5">
          <span
            className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest 
            ${order.status === "Processing" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"}`}
          >
            {order.status}
          </span>
          <span className="text-[9px] font-bold text-slate-400 uppercase">
            {order.date}
          </span>
        </div>
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ${order.status === "Processing" ? "w-1/3 bg-blue-500" : "w-full bg-green-500"}`}
          />
        </div>
      </div>

      <div className="px-4 pb-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 py-1 transition-colors"
        >
          {isOpen ? "Hide Details" : `View ${order.items.length} Items`}
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="mt-3 space-y-2 pt-2 border-t border-slate-50">
            <div className="mb-3 p-2 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-[8px] font-black text-slate-400 uppercase mb-1">
                Shipping To:
              </p>
              <p className="text-[10px] text-slate-600 leading-tight">
                {order.shippingDetails?.address}, {order.shippingDetails?.city}{" "}
                {order.shippingDetails?.zip}
              </p>
            </div>
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-50 rounded-lg p-1 border border-slate-100 shrink-0 flex items-center justify-center">
                  <img
                    src={`/image/${item.category}/${item.image}`}
                    className="w-full h-full object-contain mix-blend-multiply"
                    alt=""
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-slate-700 truncate leading-none">
                    {item.title}
                  </p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">
                    Qty: {item.quantity || 1}
                  </p>
                </div>
                <p className="text-[11px] font-black text-slate-900">
                  ${item.price}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN PROFILE COMPONENT ---
const UserProfile = () => {
  const { user, logout } = useAuth();
  const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart } =
    useCart();
  const navigate = useNavigate();

  // States
  const [orders, setOrders] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [addressInfo, setAddressInfo] = useState({
    email: user?.email || "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
  });

  // Load user data & orders
  useEffect(() => {
    if (user?.email) {
      const savedOrders = localStorage.getItem(`orders_${user.email}`);
      const savedAddress = localStorage.getItem(`address_${user.email}`);
      if (savedOrders) setOrders(JSON.parse(savedOrders));
      if (savedAddress) setAddressInfo(JSON.parse(savedAddress));
    }
  }, [user]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressInfo({ ...addressInfo, [name]: value });
    if (saveSuccess) setSaveSuccess(false); // Reset success state on change
  };

  const saveProfileDetails = () => {
    setIsSaving(true);
    // Simulate API delay for premium feel
    setTimeout(() => {
      localStorage.setItem(
        `address_${user.email}`,
        JSON.stringify(addressInfo),
      );
      setIsSaving(false);
      setSaveSuccess(true);

      // Clear success icon after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 800);
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0,
  );
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 25;
  const total = (subtotal + shipping).toFixed(2);

  const handlePayment = () => {
    if (cart.length === 0) return;
    if (!addressInfo.address || !addressInfo.city) {
      alert("Please complete your Delivery Address first.");
      return;
    }

    const orderID = `SLT-${Math.floor(1000 + Math.random() * 9000)}-ZP`;
    const newOrder = {
      id: orderID,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      total: total,
      status: "Processing",
      items: [...cart],
      shippingDetails: addressInfo,
    };

    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem(`orders_${user.email}`, JSON.stringify(updated));
    clearCart();
    alert(`Order ${orderID} successful!`);
  };

  if (!user)
    return (
      <div className="p-20 text-center font-black text-slate-300 uppercase tracking-widest">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200 text-center">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}&backgroundColor=2563eb`}
              className="w-20 h-20 rounded-2xl mx-auto mb-4"
              alt="P"
            />
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              {user.name}
            </h2>
            <button
              onClick={logout}
              className="mt-4 text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-red-500 transition-colors"
            >
              Secure Logout
            </button>
          </div>

          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Clock size={14} className="text-blue-600" /> Order History
            </h3>
            <div className="space-y-3">
              {orders.length === 0 ? (
                <p className="text-[10px] text-slate-300 italic text-center py-4">
                  No orders yet
                </p>
              ) : (
                orders.map((o, i) => <DetailedOrderCard key={i} order={o} />)
              )}
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN */}
        <main className="lg:col-span-8 space-y-6">
          {/* DELIVERY ADDRESS FORM */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200 relative">
            <div className="flex justify-between items-start mb-8">
              <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3 uppercase">
                <MapPin size={20} className="text-blue-600" /> Shipping Details
              </h2>

              {/* SAVE BUTTON WITH LOADING */}
              <button
                onClick={saveProfileDetails}
                disabled={isSaving}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all
                  ${saveSuccess ? "bg-green-500 text-white" : "bg-slate-900 text-white hover:bg-blue-600"}
                  ${isSaving ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {isSaving ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : saveSuccess ? (
                  <CheckCircle size={14} />
                ) : (
                  <Save size={14} />
                )}
                {isSaving
                  ? "Saving..."
                  : saveSuccess
                    ? "Saved!"
                    : "Update Profile"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Email
                </label>
                <input
                  name="email"
                  value={addressInfo.email}
                  onChange={handleAddressChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 md:col-span-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    First Name
                  </label>
                  <input
                    name="firstName"
                    value={addressInfo.firstName}
                    onChange={handleAddressChange}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold focus:border-blue-500 outline-none"
                    placeholder="Alex"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    value={addressInfo.lastName}
                    onChange={handleAddressChange}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold focus:border-blue-500 outline-none"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Address
                </label>
                <input
                  name="address"
                  value={addressInfo.address}
                  onChange={handleAddressChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold focus:border-blue-500 outline-none"
                  placeholder="123 Street Name"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  City
                </label>
                <input
                  name="city"
                  value={addressInfo.city}
                  onChange={handleAddressChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold focus:border-blue-500 outline-none"
                  placeholder="New York"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  ZIP Code
                </label>
                <input
                  name="zip"
                  value={addressInfo.zip}
                  onChange={handleAddressChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold focus:border-blue-500 outline-none"
                  placeholder="10001"
                />
              </div>
            </div>
          </div>

          {/* ACTIVE CART */}
          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-black text-slate-900 px-2 tracking-tight uppercase flex items-center justify-between">
              Current Bag
              <span className="text-[10px] bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                {cart.length} Items
              </span>
            </h2>
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-5 hover:border-blue-200 transition-all"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-xl p-2 shrink-0 flex items-center justify-center">
                  <img
                    src={`/image/${item.category}/${item.image}`}
                    className="h-full object-contain"
                    alt=""
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-black text-slate-800 truncate">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center bg-slate-50 border border-slate-100 rounded-lg">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="p-1 px-2"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-black w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="p-1 px-2"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <p className="text-sm font-black text-slate-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-slate-200 hover:text-red-500 p-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            {cart.length > 0 && (
              <div className="mt-8 bg-slate-900 rounded-[2rem] p-7 text-white shadow-xl flex flex-col sm:flex-row justify-between items-center gap-6 border border-slate-800">
                <div>
                  <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">
                    Due Now
                  </p>
                  <p className="text-3xl font-black text-white tracking-tighter">
                    ${total}
                  </p>
                </div>
                <button
                  onClick={handlePayment}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-black text-sm flex items-center gap-3 transition-all active:scale-95 shadow-lg shadow-blue-900/20"
                >
                  COMPLETE PURCHASE <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
