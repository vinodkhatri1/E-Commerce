import React from "react";
import { AlertCircle } from "lucide-react";

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
      <p className="text-red-500 text-[10px] font-bold mt-1 flex items-center gap-1">
        <AlertCircle size={12} /> {error}
      </p>
    )}
  </div>
);

export default InputField;
