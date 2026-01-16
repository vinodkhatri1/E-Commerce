import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ProductData from "../Data/ProductData";

const MegaMenu = () => {
  const [open, setOpen] = useState(false);

  if (!Array.isArray(ProductData) || ProductData.length === 0) return null;

  // 🔹 Group products by category (performance fix)
  const menuItems = useMemo(() => {
    const map = {};
    ProductData.forEach((p) => {
      if (!map[p.category]) map[p.category] = [];
      if (map[p.category].length < 5) {
        map[p.category].push(p);
      }
    });

    return Object.keys(map).map((cat) => ({
      title: cat,
      products: map[cat],
    }));
  }, []);

  return (
    <nav className="relative">
      <ul className="flex gap-6 font-medium">
        {/* 🔹 Hover wrapper */}
        <li
          className="relative"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <span className="cursor-pointer py-6 inline-flex items-center gap-1 hover:text-blue-600 transition">
            Categories <span className="text-xs">▼</span>
          </span>

          {open && (
            <div className="fixed right-20 top-20 z-50 ">
              {/* Hover bridge */}
              <div className="absolute -top-6 h-6 w-full" />

              {/* Mega Menu */}
              <div
                className="
                  bg-white w-full max-w-7xl p-6
                  border-t border-gray-100
                  shadow-2xl rounded-b-xl
                  animate-in fade-in slide-in-from-top-2 duration-200
                  max-h-[calc(100vh-120px)] overflow-y-auto
                "
              >
                <div
                  className="grid gap-8"
                  style={{
                    gridTemplateColumns: `repeat(${Math.min(
                      menuItems.length,
                      4
                    )}, minmax(0,1fr))`,
                  }}
                >
                  {menuItems.slice(0, 4).map((menu) => (
                    <div key={menu.title} className="flex flex-col">
                      <Link
                        to={`/category/${menu.title}`}
                        onClick={() => setOpen(false)}
                        className="mb-4 text-lg font-bold capitalize border-b pb-2
                                   hover:text-blue-600 transition"
                      >
                        {menu.title}
                      </Link>

                      <div className="space-y-3">
                        {menu.products.map((product) => (
                          <Link
                            key={product.id}
                            to={`/products/${product.id}`}
                            onClick={() => setOpen(false)}
                            className="flex gap-3 p-2 rounded-lg
                                       hover:bg-gray-50 transition group"
                          >
                            <div
                              className="h-12 w-12 flex items-center justify-center
                                            border rounded-md bg-white"
                            >
                              <img
                                src={`/image/${product.category}/${product.image}`}
                                alt={product.title}
                                className="h-full w-full object-contain
                                           group-hover:scale-110 transition-transform"
                              />
                            </div>

                            <div className="min-w-0">
                              <p
                                className="text-sm font-medium truncate
                                            group-hover:text-blue-600"
                              >
                                {product.title}
                              </p>
                              <p className="text-xs font-bold text-blue-600">
                                ${product.price.toFixed(2)}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-8 pt-4 border-t text-center">
                  <Link
                    to="/products"
                    onClick={() => setOpen(false)}
                    className="inline-flex px-8 py-2.5 rounded-full
                               bg-gray-900 text-white font-medium text-sm
                               hover:bg-blue-600 transition shadow-lg"
                  >
                    Browse All Products
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
