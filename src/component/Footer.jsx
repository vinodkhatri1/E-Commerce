import React from "react";
import { Link } from "react-router-dom";
import Facebook from "lucide-react/dist/esm/icons/facebook";
import Instagram from "lucide-react/dist/esm/icons/instagram";
import Twitter from "lucide-react/dist/esm/icons/twitter";
import Github from "lucide-react/dist/esm/icons/github";
import Mail from "lucide-react/dist/esm/icons/mail";
import myLogo from "../assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-8">
          <Link to="/" className="inline-block">
            <img
              src={myLogo}
              alt="Store Logo"
              className="h-16 w-auto object-contain"
              onError={(e) => (e.target.style.display = "none")}
            />
          </Link>

          <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-medium">
            Elevating your lifestyle with curated premium goods. Experience
            seamless shopping from click to delivery.
          </p>

          <div className="flex gap-3">
            {[Instagram, Twitter, Facebook, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-900 hover:text-white transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Shop
            </h4>
            <ul className="space-y-4">
              {["All Products", "Categories", "Featured", "New Arrivals"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      to={
                        link === "All Products"
                          ? "/products"
                          : link === "Categories"
                            ? "/categories"
                            : "/#"
                      }
                      className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Support
            </h4>
            <ul className="space-y-4">
              {[
                "Order Status",
                "Shipping Policy",
                "Terms of Service",
                "Privacy",
              ].map((link) => (
                <li key={link}>
                  <Link
                    to="#"
                    className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-slate-900 p-8 rounded-4xl text-white shadow-xl shadow-blue-900/10">
            <h4 className="text-lg font-black tracking-tight mb-2">
              Join the club
            </h4>
            <p className="text-slate-400 text-xs font-medium mb-6">
              Get early access to drops and exclusive offers.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full bg-slate-800 border-none rounded-2xl py-4 pl-5 pr-14 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-500 transition-all active:scale-90">
                <Mail size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-50 py-10 px-6 bg-slate-50/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">
            © {currentYear} STORE GLOBAL LTD. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
              alt="Visa"
              className="h-3"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="Mastercard"
              className="h-5"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="PayPal"
              className="h-4"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
