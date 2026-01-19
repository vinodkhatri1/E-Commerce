import React from "react";
import { ShieldCheck } from "lucide-react";

const SuccessOverlay = () => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-500">
    <div className="bg-white p-10 md:p-16 rounded-[3rem] text-center max-w-sm mx-4 shadow-2xl animate-in zoom-in-95 duration-300">
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
        <ShieldCheck size={48} strokeWidth={2.5} />
      </div>
      <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tighter uppercase italic">
        Success!
      </h2>
      <p className="text-slate-500 font-bold text-sm leading-relaxed mb-8">
        Order received. Preparing your items...
      </p>
      <div className="flex justify-center gap-2">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
      </div>
    </div>
  </div>
);

export default SuccessOverlay;
