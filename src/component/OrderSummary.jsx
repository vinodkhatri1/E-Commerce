import React from "react";
import { ShieldCheck } from "lucide-react";

const OrderSummary = ({ cart, subtotal, shipping, total }) => (
  <div className="bg-white rounded-4xl p-6 shadow-sm border border-slate-200 sticky top-28">
    <h2 className="text-sm font-black text-slate-900 mb-6 uppercase tracking-widest border-b pb-4 border-slate-50 italic">
      Order Summary
    </h2>
    <div className="space-y-4 mb-8 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
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
            <p className="text-[11px] font-black text-slate-800 truncate uppercase tracking-tighter">
              {item.title}
            </p>
            <p className="text-[10px] font-bold text-slate-400">
              QTY: {item.quantity} •{" "}
              <span className="text-blue-600">${item.price}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
    <div className="space-y-3 pt-4 border-t border-slate-50">
      <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase">
        <span>Subtotal</span>{" "}
        <span className="text-slate-900">${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase">
        <span>Delivery</span>{" "}
        <span className="text-green-600">
          {shipping === 0 ? "FREE" : `$${shipping}`}
        </span>
      </div>
      <div className="flex justify-between pt-4 items-center border-t border-slate-50">
        <span className="text-3xl font-black text-slate-900 tracking-tighter">
          ${total}
        </span>
        <ShieldCheck className="text-green-500" size={24} />
      </div>
    </div>
  </div>
);

export default OrderSummary;
