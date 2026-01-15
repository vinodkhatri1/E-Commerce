import { useState } from "react";
import { Link } from "react-router-dom";
import ProductData from "../Data/ProductData";

const MegaMenu = () => {
  const [open, setOpen] = useState(false);

  if (!ProductData) return null;

  const categories = [...new Set(ProductData.map((p) => p.category))];

  const menuItems = categories.map((cat) => ({
    title: cat,
    products: ProductData.filter((p) => p.category === cat).slice(0, 5),
  }));

  return (
    <nav>
      <ul className="flex gap-6 font-medium">
        <li
          className=""
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <span className="cursor-pointer hover:text-blue-600 transition py-6 inline-block h-full flex items-center gap-1">
            Categories <span className="text-xs">▼</span>
          </span>

          {open && (
            <div className="fixed top-20 inset-x-0 z-40 flex justify-center px-4">
              {/* Invisible hover bridge */}
              <div className="absolute -top-6 h-6 w-full bg-transparent" />

              {/* The Actual Menu Card */}
              <div 
                className="
                  bg-white shadow-2xl border-t border-gray-100 
                  rounded-b-xl p-6 w-full max-w-7xl 
                  max-h-[calc(100vh-100px)] overflow-y-auto
                  animate-in fade-in slide-in-from-top-2 duration-200
                "
              >
                <div className="grid grid-cols-4 gap-8">
                  {menuItems.slice(0, 4).map((menu) => (
                    <div key={menu.title} className="flex flex-col">
                      <Link
                        to={`/category/${menu.title}`}
                        className="mb-4 text-lg font-bold capitalize text-gray-900 hover:text-blue-600 border-b pb-2 flex justify-between items-center"
                      >
                        {menu.title}
                      </Link>

                      <div className="space-y-4 flex-1">
                        {menu.products.map((product) => (
                          <Link
                            key={product.id}
                            to={`/products/${product.id}`}
                            className="flex items-start gap-3 group p-2 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="h-12 w-12 flex-shrink-0 bg-white border border-gray-100 rounded-md p-1 flex items-center justify-center">
                                <img
                                src={`/image/${product.category}/${product.image}`}
                                alt={product.title}
                                className="h-full w-full object-contain group-hover:scale-110 transition-transform"
                                />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm text-gray-700 font-medium truncate w-full group-hover:text-blue-600">
                                {product.title}
                              </p>
                              <p className="text-blue-600 text-xs font-bold mt-0.5">
                                ${product.price.toFixed(2)}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-4 border-t border-gray-100 text-center">
                  <Link
                    to="/products"
                    className="inline-flex items-center justify-center bg-gray-900 text-white px-8 py-2.5 rounded-full hover:bg-blue-600 transition-colors font-medium text-sm shadow-lg hover:shadow-xl transform active:scale-95"
                  >
                    Browse All Categories
                  </Link>
                </div>
              </div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default MegaMenu;