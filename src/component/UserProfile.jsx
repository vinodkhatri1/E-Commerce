import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Clock from "lucide-react/dist/esm/icons/clock";
import Trash2 from "lucide-react/dist/esm/icons/trash-2";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import Plus from "lucide-react/dist/esm/icons/plus";
import Minus from "lucide-react/dist/esm/icons/minus";
import CheckCircle from "lucide-react/dist/esm/icons/check-circle";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import Save from "lucide-react/dist/esm/icons/save";
import Loader2 from "lucide-react/dist/esm/icons/loader-2";
import AlertTriangle from "lucide-react/dist/esm/icons/alert-triangle";
import LogOut from "lucide-react/dist/esm/icons/log-out";
import Package from "lucide-react/dist/esm/icons/package";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";

const UserProfile = () => {
  const { user, logout } = useAuth();
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
    if (user?.email) {
      const savedAddress = localStorage.getItem(`address_${user.email}`);
      const savedOrders = localStorage.getItem(`orders_${user.email}`);

      if (savedOrders) setOrderCount(JSON.parse(savedOrders).length);

      if (savedAddress) {
        setAddressInfo(JSON.parse(savedAddress));
      } else {
        setAddressInfo((prev) => ({ ...prev, email: user.email }));
      }
    }
  }, [user]);

  const handleDeleteAccount = () => {
    if (!user?.email) return;

    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = allUsers.filter((u) => u.email !== user.email);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

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
      localStorage.setItem(
        `address_${user.email}`,
        JSON.stringify(addressInfo),
      );
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
      <div className="p-20 text-center font-black text-slate-300 uppercase tracking-widest">
        Loading Profile...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-4xl p-6 shadow-sm border border-slate-200 text-center">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name || "User"}&backgroundColor=2563eb`}
              className="w-20 h-20 rounded-2xl mx-auto mb-4"
              alt="Avatar"
            />
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              {user.name}
            </h2>
            <button
              onClick={logout}
              className="mt-4 text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-red-500 transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              <LogOut size={12} /> Secure Logout
            </button>
          </div>

          <Link to="/orders" className="block group">
            <div className="bg-white rounded-4xl p-6 shadow-sm border border-slate-200 group-hover:border-blue-300 transition-all group-hover:shadow-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Clock size={14} className="text-blue-600" /> Order History
                </h3>
                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-full">
                  {orderCount}
                </span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                    <Package size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">
                      Track Orders
                    </p>
                    <p className="text-xs text-slate-400 font-medium">
                      View past purchases
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className="text-slate-300 group-hover:text-blue-600 transition-colors"
                />
              </div>
            </div>
          </Link>

          <div className="bg-red-50/50 rounded-4xl p-6 border border-red-100">
            <h3 className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <AlertTriangle size={14} /> Danger Zone
            </h3>
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full py-3 bg-white border border-red-200 text-red-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-sm"
              >
                Delete Account
              </button>
            ) : (
              <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
                <p className="text-[10px] font-bold text-red-600 text-center leading-tight">
                  This action is permanent. All orders and data will be wiped.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleDeleteAccount}
                    className="py-2 bg-red-600 text-white rounded-lg font-black text-[10px] uppercase"
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

        <main className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-4xl p-8 shadow-sm border border-slate-200 relative">
            <div className="flex justify-between items-start mb-8">
              <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3 uppercase">
                <MapPin size={20} className="text-blue-600" /> Shipping Details
              </h2>
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
              <div className="md:col-span-2 space-y-1">
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
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  First Name
                </label>
                <input
                  name="firstName"
                  value={addressInfo.firstName}
                  onChange={handleAddressChange}
                  placeholder="Alex"
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold focus:border-blue-500 outline-none"
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
                  placeholder="Doe"
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold focus:border-blue-500 outline-none"
                />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Address
                </label>
                <input
                  name="address"
                  value={addressInfo.address}
                  onChange={handleAddressChange}
                  placeholder="123 Street Name"
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold focus:border-blue-500 outline-none"
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
                  placeholder="New York"
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold focus:border-blue-500 outline-none"
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
                  placeholder="10001"
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

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
                    alt={item.title}
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
              <div className="mt-8 bg-slate-900 rounded-4xl p-7 text-white shadow-xl flex flex-col sm:flex-row justify-between items-center gap-6 border border-slate-800">
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
