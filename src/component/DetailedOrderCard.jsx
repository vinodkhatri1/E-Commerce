import React, { useState } from "react";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import Hash from "lucide-react/dist/esm/icons/hash";

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
          {isOpen ? "Hide Details" : `View ${order.items?.length || 0} Items`}
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
            {order.items?.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-50 rounded-lg p-1 border border-slate-100 shrink-0 flex items-center justify-center">
                  <img
                    src={
                      item.image?.startsWith("data:")
                        ? item.image
                        : `/image/${item.category}/${item.image}`
                    }
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

export default DetailedOrderCard;
