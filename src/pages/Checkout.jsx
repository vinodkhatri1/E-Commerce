import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import {
  Truck,
  CreditCard,
  ChevronLeft,
  ArrowRight,
  Banknote,
  AlertCircle,
  MapPin,
  ShieldCheck,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Fixed: Component moved OUTSIDE to prevent focus loss issues
const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  colSpan = "",
}) => (
  <div className={colSpan}>
    <label className="block text-sm font-bold text-slate-700 mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-3.5 bg-slate-50 border rounded-2xl outline-none transition-all ${
          error
            ? "border-red-500 focus:ring-4 focus:ring-red-500/10"
            : "border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500"
        }`}
      />
      {error && (
        <div className="flex items-center gap-1 mt-1 text-red-500 text-xs font-bold animate-in fade-in">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  </div>
);

const Checkout = () => {
  // Destructure functions from context
  const {
    cart,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    closeCart,
  } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [validationErrors, setValidationErrors] = useState({});
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

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const errors = {};
    const requiredFields = [
      "email",
      "firstName",
      "lastName",
      "address",
      "city",
      "zipCode",
    ];
    if (paymentMethod === "card")
      requiredFields.push("cardNumber", "expiry", "cvc");

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "")
        errors[field] = "Required";
    });

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    clearCart();
    closeCart();
    alert("Order Successful!");
    navigate("/");
  };

  if (cart.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">
          Your basket is empty
        </h2>
        <Link
          to="/"
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold"
        >
          Go Back Shopping
        </Link>
      </div>
    );

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-8">
          {/* Shipping Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-blue-600 p-2 rounded-xl text-white">
                <MapPin size={22} />
              </div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                Delivery Address
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="email@example.com"
                colSpan="md:col-span-2"
                value={formData.email}
                onChange={handleInputChange}
                error={validationErrors.email}
              />
              <InputField
                label="First Name"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleInputChange}
                error={validationErrors.firstName}
              />
              <InputField
                label="Last Name"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleInputChange}
                error={validationErrors.lastName}
              />
              <InputField
                label="Address"
                name="address"
                placeholder="123 Street"
                colSpan="md:col-span-2"
                value={formData.address}
                onChange={handleInputChange}
                error={validationErrors.address}
              />
              <InputField
                label="City"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                error={validationErrors.city}
              />
              <InputField
                label="ZIP Code"
                name="zipCode"
                placeholder="00000"
                value={formData.zipCode}
                onChange={handleInputChange}
                error={validationErrors.zipCode}
              />
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-green-600 p-2 rounded-xl text-white">
                <CreditCard size={22} />
              </div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                Payment
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`flex flex-col items-center gap-2 p-4 border-2 rounded-2xl transition-all ${
                  paymentMethod === "card"
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-slate-100 text-slate-400"
                }`}
              >
                <CreditCard /> <span className="font-bold">Card</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`flex flex-col items-center gap-2 p-4 border-2 rounded-2xl transition-all ${
                  paymentMethod === "cod"
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-slate-100 text-slate-400"
                }`}
              >
                <Banknote /> <span className="font-bold">Cash</span>
              </button>
            </div>

            {paymentMethod === "card" ? (
              <div className="grid grid-cols-2 gap-6">
                <InputField
                  label="Card Number"
                  name="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  colSpan="col-span-2"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  error={validationErrors.cardNumber}
                />
                <InputField
                  label="Expiry"
                  name="expiry"
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  error={validationErrors.expiry}
                />
                <InputField
                  label="CVC"
                  name="cvc"
                  placeholder="***"
                  value={formData.cvc}
                  onChange={handleInputChange}
                  error={validationErrors.cvc}
                />
              </div>
            ) : (
              <div className="p-4 bg-slate-900 rounded-2xl text-white">
                <p className="font-bold">Cash on Delivery</p>
                <p className="text-slate-400 text-sm mt-1">
                  Pay <b>${total.toFixed(2)}</b> when your order arrives.
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-10 bg-slate-900 text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-[0.98]"
            >
              {paymentMethod === "cod"
                ? "Place Order"
                : `Pay $${total.toFixed(2)}`}
              <ArrowRight size={22} />
            </button>
          </div>
        </form>

        {/* Summary Side with Quantity Controls */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 sticky top-28">
            <h2 className="text-2xl font-black text-slate-800 mb-8 tracking-tighter uppercase">
              Order Summary
            </h2>

            <div className="space-y-6 mb-8 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  {/* Image Container */}
                  <div className="w-20 h-20 bg-slate-50 rounded-2xl p-2 border border-slate-100 shrink-0">
                    <img
                      src={`/image/${item.category}/${item.image}`}
                      className="w-full h-full object-contain"
                      alt={item.title}
                    />
                  </div>

                  {/* Info and Quantity Controls */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-slate-800 truncate uppercase tracking-tight">
                      {item.title}
                    </p>
                    <p className="text-xs font-bold text-blue-500 uppercase mb-2 tracking-widest">
                      {item.category}
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          className="p-1 hover:bg-slate-200 text-slate-600 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-xs font-black text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => addToCart(item)}
                          className="p-1 hover:bg-slate-200 text-slate-600 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <p className="font-black text-slate-900 text-right shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals Section */}
            <div className="border-t border-slate-100 pt-6 space-y-3">
              <div className="flex justify-between font-bold text-slate-500">
                <span>Subtotal</span>
                <span className="text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-500">
                <span>Delivery</span>
                <span className="text-green-600">
                  {shipping === 0 ? "FREE" : `$${shipping}`}
                </span>
              </div>
              <div className="flex justify-between pt-4 border-t border-slate-100 mt-2 items-center">
                <span className="text-3xl font-black text-slate-900 tracking-tighter">
                  ${total.toFixed(2)}
                </span>
                <div className="flex items-center gap-1 px-3 py-1 bg-slate-100 rounded-full">
                  <ShieldCheck className="text-slate-500" size={16} />
                  <span className="text-[10px] font-black text-slate-600 uppercase">
                    Secure
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
