import { useState } from "react";
import { Link } from "react-router-dom";
import ProductData from "../Data/ProductData";

const MegaMenu = () => {
  const [open, setOpen] = useState(false);

  const categories = [...new Set(ProductData.map((p) => p.category))];

  const menuItems = categories.map((cat) => ({
    title: cat,
    products: ProductData.filter((p) => p.category === cat).slice(0, 5),
  }));

  return (
    <nav className="relative">
      <ul className="flex gap-6 font-medium">
        {/* Categories */}
        <li
          className="relative"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <span className="cursor-pointer hover:text-blue-600 transition">
            Categories
          </span>

          {open && (
            <div
              className="
                absolute top-4 right-0 mt-3
                bg-white shadow-2xl border
                rounded-xl p-6 z-50
                w-[95vw] max-w-6xl
              "
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {menuItems.slice(0, 4).map((menu) => (
                  <div key={menu.title}>
                    {/* Category header */}
                    <div className="flex justify-between items-center mb-3">
                      <Link
                        to={`/category/${menu.title}`}
                        className="capitalize font-semibold text-sm text-black hover:text-blue-600 underline"
                      >
                        {menu.title}
                      </Link>
                    </div>

                    {/* Products */}
                    <div className="space-y-3">
                      {menu.products.map((product) => (
                        <Link
                          key={product.id}
                          to={`/products/${product.id}`}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition"
                        >
                          <img
                            src={`/image/${product.category}/${product.image}`}
                            alt={product.title}
                            className="h-12 w-12 object-contain"
                          />

                          <div>
                            <p className="text-sm font-medium truncate max-w-[160px]">
                              {product.title}
                            </p>
                            <p className="text-blue-600 font-semibold text-sm">
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
              <div className="mt-6 text-center">
                <Link
                  to="/products"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Browse All Products
                </Link>
              </div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default MegaMenu;
