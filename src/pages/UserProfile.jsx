import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

// Icons
import {
  Clock,
  Trash2,
  ArrowRight,
  Plus,
  Minus,
  CheckCircle,
  MapPin,
  Save,
  Loader2,
  AlertTriangle,
  LogOut,
  Package,
  ChevronRight,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";

const UserProfile = () => {
  const { user, logout, login } = useAuth();
  const { cart, addToCart, decreaseQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [orderCount, setOrderCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [addressInfo, setAddressInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
  });
  useEffect(() => {
    if (user) {
      // 1. Check for previously saved profile updates (specific to this page)
      const savedAddress = localStorage.getItem(`address_${user.email}`);
      // 2. Load order count
      const savedOrders = localStorage.getItem(`orders_${user.email}`);
      if (savedOrders) setOrderCount(JSON.parse(savedOrders).length);

      if (savedAddress) {
        // Use specifically updated profile data if it exists
        setAddressInfo(JSON.parse(savedAddress));
      } else {
        // AUTO-INPUT: Use the data provided during Registration/Login
        setAddressInfo({
          email: user.email || "",
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          address: user.address || "",
          city: user.city || "",
          zip: user.zipCode || "", // Note: mapped from zipCode to zip for your state
        });
      }
    }
  }, [user]);

  // --- ROLE LOGIC (Saves to both Active Session and Permanent Storage) ---
  const toggleSellerRole = () => {
    const newRole = user?.role === "seller" ? "buyer" : "seller";
    const updatedUser = { ...user, role: newRole };

    // 1. Update Permanent "Database"
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const updatedUsers = users.map((u) =>
      u.email === user.email ? { ...u, role: newRole } : u,
    );
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    // 2. Update Context & Active User Session
    login(updatedUser);

    if (newRole === "seller") {
      navigate("/seller-dashboard");
    }
  };

  const handleDeleteAccount = () => {
    if (!user?.email) return;

    // Sync with the key used in LogIn.jsx
    const allUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]",
    );
    const updatedUsers = allUsers.filter((u) => u.email !== user.email);
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    // Clean up personal data
    localStorage.removeItem(`orders_${user.email}`);
    localStorage.removeItem(`address_${user.email}`);

    logout();
    navigate("/");
    alert("Account permanently deleted.");
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressInfo((prev) => ({ ...prev, [name]: value }));
    if (saveSuccess) setSaveSuccess(false);
  };

  const saveProfileDetails = () => {
    if (!user?.email) return;
    setIsSaving(true);

    setTimeout(() => {
      // 1. Save to specific address key (for Checkout logic)
      localStorage.setItem(
        `address_${user.email}`,
        JSON.stringify(addressInfo),
      );

      // 2. Sync with the main user object in AuthContext
      const updatedUser = {
        ...user,
        firstName: addressInfo.firstName,
        lastName: addressInfo.lastName,
        address: addressInfo.address,
        city: addressInfo.city,
        zipCode: addressInfo.zip,
        name:
          `${addressInfo.firstName} ${addressInfo.lastName}`.trim() ||
          user.name,
      };

      // Update the active session via login (this updates AuthContext)
      login(updatedUser);

      // 3. Update the "Database" (registeredUsers)
      const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      const updatedUsers = users.map((u) =>
        u.email === user.email ? { ...u, ...updatedUser } : u,
      );
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

      setIsSaving(false);
      setSaveSuccess(true);
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
    if (!addressInfo.address || !addressInfo.city || !addressInfo.zip) {
      alert("Please complete your Delivery Address details before proceeding.");
      return;
    }
    localStorage.setItem(`address_${user.email}`, JSON.stringify(addressInfo));
    navigate("/checkout");
  };

  if (!user)
    return (
      <div className="p-20 text-center font-black text-slate-300 uppercase">
        Loading Profile...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ASIDE: IDENTITY & CONTROLS */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200 text-center">
            <div className="relative inline-block mb-4">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name || "User"}&backgroundColor=6366f1`}
                className="w-24 h-24 rounded-3xl mx-auto shadow-inner"
                alt="Avatar"
              />
              {user.role === "admin" && (
                <div className="absolute -top-2 -right-2 bg-rose-500 text-white p-1.5 rounded-full border-4 border-white">
                  <ShieldCheck size={16} />
                </div>
              )}
            </div>

            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              {user.name}
            </h2>
            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-6">
              {user.role || "Buyer"} Member
            </p>

            <div className="space-y-3">
              {(user.role === "seller" || user.role === "admin") && (
                <Link
                  to="/seller-dashboard"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-50 text-indigo-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-100 transition-all"
                >
                  <LayoutDashboard size={14} /> Merchant Dashboard
                </Link>
              )}

              {user.role !== "admin" && (
                <button
                  onClick={toggleSellerRole}
                  className="w-full py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg"
                >
                  {user.role === "seller"
                    ? "Switch to Buyer View"
                    : "Become a Seller"}
                </button>
              )}

              <button
                onClick={logout}
                className="mt-4 text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-rose-500 transition-colors flex items-center justify-center gap-2 mx-auto"
              >
                <LogOut size={12} /> Secure Logout
              </button>
            </div>
          </div>

          <Link to="/orders" className="block group">
            <div className="bg-white rounded-4xl p-6 shadow-sm border border-slate-200 group-hover:border-indigo-300 transition-all">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Clock size={14} className="text-indigo-600" /> Order History
                </h3>
                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-full">
                  {orderCount}
                </span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                    <Package size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">
                      Track Orders
                    </p>
                    <p className="text-xs text-slate-400">
                      View past purchases
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className="text-slate-300 group-hover:text-indigo-600"
                />
              </div>
            </div>
          </Link>

          <div className="bg-rose-50/50 rounded-4xl p-6 border border-rose-100">
            <h3 className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <AlertTriangle size={14} /> Danger Zone
            </h3>
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full py-3 bg-white border border-rose-200 text-rose-500 rounded-xl font-black text-[10px] uppercase hover:bg-rose-500 hover:text-white transition-all"
              >
                Delete Account
              </button>
            ) : (
              <div className="space-y-3 animate-in fade-in zoom-in-95">
                <p className="text-[10px] font-bold text-rose-600 text-center">
                  Action is permanent. All data will be wiped.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleDeleteAccount}
                    className="py-2 bg-rose-600 text-white rounded-lg font-black text-[10px] uppercase"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="py-2 bg-slate-200 text-slate-600 rounded-lg font-black text-[10px] uppercase"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* MAIN: SHIPPING & CART */}
        <main className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-8">
              <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3 uppercase">
                <MapPin size={20} className="text-indigo-600" /> Shipping
                Details
              </h2>
              <button
                onClick={saveProfileDetails}
                disabled={isSaving}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase transition-all
                  ${saveSuccess ? "bg-green-500 text-white" : "bg-slate-900 text-white hover:bg-indigo-600"}`}
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
              <ProfileInput
                label="Email"
                name="email"
                value={addressInfo.email}
                onChange={handleAddressChange}
              />
              <ProfileInput
                label="First Name"
                name="firstName"
                value={addressInfo.firstName}
                onChange={handleAddressChange}
                placeholder="Alex"
              />
              <ProfileInput
                label="Last Name"
                name="lastName"
                value={addressInfo.lastName}
                onChange={handleAddressChange}
                placeholder="Doe"
              />
              <div className="md:col-span-2">
                <ProfileInput
                  label="Address"
                  name="address"
                  value={addressInfo.address}
                  onChange={handleAddressChange}
                  placeholder="123 Street"
                />
              </div>
              <ProfileInput
                label="City"
                name="city"
                value={addressInfo.city}
                onChange={handleAddressChange}
                placeholder="New York"
              />
              <ProfileInput
                label="ZIP Code"
                name="zip"
                value={addressInfo.zip}
                onChange={handleAddressChange}
                placeholder="10001"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-black text-slate-900 px-2 flex items-center justify-between uppercase">
              Current Bag{" "}
              <span className="text-[10px] bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
                {cart.length} Items
              </span>
            </h2>
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 p-4 rounded-3xl flex items-center gap-5"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl p-2 shrink-0 flex items-center justify-center">
                  <img
                    src={
                      item.image?.startsWith("data:")
                        ? item.image
                        : `/image/${item.category}/${item.image}`
                    }
                    className="h-full object-contain"
                    alt={item.title}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-black text-slate-800 truncate">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center bg-slate-50 rounded-lg">
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
                  className="text-slate-200 hover:text-rose-500 p-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            {cart.length > 0 && (
              <div className="mt-8 bg-slate-900 rounded-4xl p-8 text-white flex flex-col sm:row justify-between items-center gap-6 shadow-xl">
                <div>
                  <p className="text-slate-500 text-[9px] font-black uppercase mb-1">
                    Total Due
                  </p>
                  <p className="text-3xl font-black tracking-tighter">
                    ${total}
                  </p>
                </div>
                <button
                  onClick={handlePayment}
                  className="w-full sm:w-auto bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-sm flex items-center gap-3"
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

const ProfileInput = ({ label, ...props }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold focus:border-indigo-500 outline-none transition-all"
    />
  </div>
);

export default UserProfile;
