import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // Added Auth import
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
    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
      {label} <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-3 bg-slate-50 border rounded-xl outline-none transition-all text-sm font-bold ${
          error
            ? "border-red-500 focus:ring-4 focus:ring-red-500/10"
            : "border-slate-100 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500"
        }`}
      />
      {error && (
        <div className="flex items-center gap-1 mt-1 text-red-500 text-[10px] font-bold animate-in fade-in">
          <AlertCircle size={12} />
          <span>{error}</span>
        </div>
      )}
    </div>
  </div>
);

const Checkout = () => {
  const {
    cart,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    closeCart,
  } = useCart();
  const { user } = useAuth(); // Access user info
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

  // --- AUTO-ADD INFORMATION LOGIC ---
  useEffect(() => {
    if (user?.email) {
      // 1. Try to get saved address from the profile settings
      const savedAddress = localStorage.getItem(`address_${user.email}`);

      if (savedAddress) {
        const parsed = JSON.parse(savedAddress);
        setFormData((prev) => ({
          ...prev,
          email: parsed.email || user.email,
          firstName: parsed.firstName || "",
          lastName: parsed.lastName || "",
          address: parsed.address || "",
          city: parsed.city || "",
          zipCode: parsed.zip || "", // Mapping 'zip' from profile to 'zipCode' here
        }));
      } else {
        // 2. If no saved address, at least pre-fill the email and name from Auth
        setFormData((prev) => ({
          ...prev,
          email: user.email,
          firstName: user.name?.split(" ")[0] || "",
          lastName: user.name?.split(" ")[1] || "",
        }));
      }
    }
  }, [user]);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
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

    // Save to order history for UserProfile
    const orderID = `SLT-${Math.floor(1000 + Math.random() * 9000)}-ZP`;
    const newOrder = {
      id: orderID,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      total: total.toFixed(2),
      status: "Processing",
      items: [...cart],
      shippingDetails: {
        address: formData.address,
        city: formData.city,
        zip: formData.zipCode,
      },
    };

    if (user?.email) {
      const existingOrders = JSON.parse(
        localStorage.getItem(`orders_${user.email}`) || "[]",
      );
      localStorage.setItem(
        `orders_${user.email}`,
        JSON.stringify([newOrder, ...existingOrders]),
      );
    }

    clearCart();
    closeCart();
    alert(`Order ${orderID} Placed Successfully!`);
    navigate("/profile"); // Navigate to profile to see the new order
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
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-4xl p-8 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-blue-600 p-2 rounded-xl text-white">
                <MapPin size={20} />
              </div>
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
                Delivery Details
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField
                label="Email"
                name="email"
                type="email"
                colSpan="md:col-span-2"
                value={formData.email}
                onChange={handleInputChange}
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
                colSpan="md:col-span-2"
                value={formData.address}
                onChange={handleInputChange}
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
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-green-600 p-2 rounded-xl text-white">
                <CreditCard size={20} />
              </div>
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
                Payment Method
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`flex flex-col items-center gap-2 p-4 border-2 rounded-2xl transition-all ${paymentMethod === "card" ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-50 text-slate-300"}`}
              >
                <CreditCard size={20} />{" "}
                <span className="text-[10px] font-black uppercase">Card</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`flex flex-col items-center gap-2 p-4 border-2 rounded-2xl transition-all ${paymentMethod === "cod" ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-50 text-slate-300"}`}
              >
                <Banknote size={20} />{" "}
                <span className="text-[10px] font-black uppercase">Cash</span>
              </button>
            </div>

            {paymentMethod === "card" ? (
              <div className="grid grid-cols-2 gap-5">
                <InputField
                  label="Card Number"
                  name="cardNumber"
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
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">
                  Pay on Delivery
                </p>
                <p className="font-black text-lg">${total.toFixed(2)}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-10 bg-blue-600 text-white py-4 rounded-xl font-black text-sm flex items-center justify-center gap-3 hover:bg-blue-500 transition-all uppercase tracking-[0.2em]"
            >
              {paymentMethod === "cod"
                ? "Place Order"
                : `Pay $${total.toFixed(2)}`}
              <ArrowRight size={18} />
            </button>
          </div>
        </form>

        <div className="lg:col-span-5">
          <div className="bg-white rounded-4xl p-6 shadow-sm border border-slate-200 sticky top-28">
            <h2 className="text-sm font-black text-slate-900 mb-6 uppercase tracking-widest border-b pb-4 border-slate-50">
              Order Summary
            </h2>
            <div className="space-y-4 mb-8 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-14 h-14 bg-slate-50 rounded-xl p-2 border border-slate-100 shrink-0">
                    <img
                      src={`/image/${item.category}/${item.image}`}
                      className="w-full h-full object-contain"
                      alt={item.title}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-black text-slate-800 truncate uppercase">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold text-slate-400">
                        QTY: {item.quantity}
                      </span>
                      <span className="text-[10px] font-black text-blue-600">
                        ${item.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-50">
              <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase">
                <span>Subtotal</span>
                <span className="text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase">
                <span>Delivery</span>
                <span className="text-green-600">
                  {shipping === 0 ? "FREE" : `$${shipping}`}
                </span>
              </div>
              <div className="flex justify-between pt-4 items-center">
                <span className="text-2xl font-black text-slate-900 tracking-tighter">
                  ${total.toFixed(2)}
                </span>
                <ShieldCheck className="text-green-500" size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
