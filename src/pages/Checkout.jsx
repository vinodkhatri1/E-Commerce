import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import CreditCard from "lucide-react/dist/esm/icons/credit-card";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import Banknote from "lucide-react/dist/esm/icons/banknote";

import InputField from "../component/InputField";
import OrderSummary from "../component/OrderSummary";
import SuccessOverlay from "../component/SuccessOverlay";

const Checkout = () => {
  const { cart, clearCart, closeCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [validationErrors, setValidationErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  useEffect(() => {
    if (user?.email) {
      const savedAddress = localStorage.getItem(`address_${user.email}`);
      if (savedAddress) {
        const parsed = JSON.parse(savedAddress);
        setFormData((prev) => ({
          ...prev,
          ...parsed,
          zipCode: parsed.zip || "",
          email: parsed.email || user.email,
        }));
      }
    }
  }, [user]);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0,
  );
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 25;
  const total = (subtotal + shipping).toFixed(2);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name])
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const errors = {};
    const required = [
      "email",
      "firstName",
      "lastName",
      "address",
      "city",
      "zipCode",
    ];
    if (paymentMethod === "card") required.push("cardNumber", "expiry", "cvc");

    required.forEach((f) => {
      if (!formData[f]?.trim()) errors[f] = "Required";
    });

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
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
      shippingDetails: formData,
    };

    const history = JSON.parse(
      localStorage.getItem(`orders_${user.email}`) || "[]",
    );
    localStorage.setItem(
      `orders_${user.email}`,
      JSON.stringify([newOrder, ...history]),
    );

    setShowSuccess(true);
    clearCart();
    closeCart();
    setTimeout(() => navigate("/UserProfile"), 3500);
  };

  if (cart.length === 0 && !showSuccess) return navigate("/UserProfile");

  return (
    <div className="relative">
      {showSuccess && <SuccessOverlay />}
      <div
        className={`bg-slate-50 min-h-screen py-10 transition-all duration-700 ${showSuccess ? "blur-xl opacity-50 scale-95" : ""}`}
      >
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-4xl p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight italic mb-8 flex items-center gap-3">
                <MapPin className="text-blue-600" /> Delivery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  colSpan="md:col-span-2"
                  error={validationErrors.email}
                />
                <InputField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={validationErrors.firstName}
                />
                <InputField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={validationErrors.lastName}
                />
                <InputField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  colSpan="md:col-span-2"
                  error={validationErrors.address}
                />
                <InputField
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  error={validationErrors.city}
                />
                <InputField
                  label="ZIP Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  error={validationErrors.zipCode}
                />
              </div>
            </div>

            <div className="bg-white rounded-4xl p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight italic mb-8 flex items-center gap-3">
                <CreditCard className="text-green-600" /> Payment
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 rounded-2xl border-2 transition-all font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 ${paymentMethod === "card" ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-100 text-slate-400"}`}
                >
                  <CreditCard size={16} /> Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-4 rounded-2xl border-2 transition-all font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 ${paymentMethod === "cod" ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-100 text-slate-400"}`}
                >
                  <Banknote size={16} /> Cash
                </button>
              </div>

              {paymentMethod === "card" && (
                <div className="grid grid-cols-2 gap-5 animate-in slide-in-from-top-2">
                  <InputField
                    label="Card Number"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    colSpan="col-span-2"
                    error={validationErrors.cardNumber}
                    placeholder="0000 0000 0000 0000"
                  />
                  <InputField
                    label="Expiry"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    error={validationErrors.expiry}
                  />
                  <InputField
                    label="CVC"
                    name="cvc"
                    value={formData.cvc}
                    onChange={handleInputChange}
                    placeholder="***"
                    error={validationErrors.cvc}
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-10 bg-blue-600 text-white py-4 rounded-xl font-black text-sm flex items-center justify-center gap-3 hover:bg-blue-500 transition-all uppercase tracking-widest shadow-lg shadow-blue-600/20"
              >
                Confirm & Pay ${total} <ArrowRight size={18} />
              </button>
            </div>
          </form>

          <div className="lg:col-span-5">
            <OrderSummary
              cart={cart}
              subtotal={subtotal}
              shipping={shipping}
              total={total}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
