import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ProductData from "../Data/ProductData";

const MegaMenu = () => {
  const [open, setOpen] = useState(false);

  // ✅ Correct memo dependency
  const menuItems = useMemo(() => {
    if (!Array.isArray(ProductData)) return [];

    const map = {};
    ProductData.forEach((p) => {
      if (!map[p.category]) map[p.category] = [];
      if (map[p.category].length < 5) map[p.category].push(p);
    });

    return Object.entries(map).map(([title, products]) => ({
      title,
      products,
    }));
  }, [ProductData]);

  if (!menuItems.length) return null;

  return (
    <nav className="relative">
      <ul className="flex gap-2 font-medium">
        <li
          className="relative"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {/* ✅ Link only */}
          <Link
            to="/categories"
            onClick={() => setOpen(false)}
            className="py-6 inline-flex items-center gap-1 hover:text-blue-600 transition cursor-pointer"
          >
            <span className="text-xl">Categories</span>
            <span className="text-md">▼</span>
          </Link>

          {/* ✅ Dropdown */}
          <div
            className={`
              absolute -right-30 top-full z-50 w-screen max-w-7xl
              transition-all duration-200 ease-out
              ${
                open
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }
            `}
          >
            <div className="bg-white p-6 shadow-2xl rounded-b-xl max-h-[calc(100vh-120px)] overflow-y-auto">
              <div
                className="grid gap-8"
                style={{
                  gridTemplateColumns: `repeat(${Math.min(menuItems.length, 4)}, minmax(0,1fr))`,
                }}
              >
                {menuItems.slice(0, 4).map((menu) => (
                  <div key={menu.title}>
                    <Link
                      to={`/category/${menu.title}`}
                      onClick={() => setOpen(false)}
                      className="block mb-4 text-lg font-bold capitalize border-b pb-2 hover:text-blue-600 transition"
                    >
                      {menu.title}
                    </Link>

                    <div className="space-y-3">
                      {menu.products.map((product) => (
                        <Link
                          key={product.id}
                          to={`/products/${product.id}`}
                          onClick={() => setOpen(false)}
                          className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition group"
                        >
                          <div className="h-12 w-12 border-2 border-gray-50 rounded bg-white overflow-hidden">
                            <img
                              src={`/image/${product.category}/${product.image}`}
                              alt={product.title}
                              className="h-full w-full object-contain group-hover:scale-110 transition"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate group-hover:text-blue-600">
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

              <div className="mt-8 pt-4 border-t text-center">
                <Link
                  to="/products"
                  onClick={() => setOpen(false)}
                  className="inline-flex px-8 py-2.5 rounded-full bg-gray-900 text-white hover:bg-blue-600 transition"
                >
                  Browse All Products
                </Link>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default MegaMenu;
