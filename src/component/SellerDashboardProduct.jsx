import { Edit, Trash2 } from "lucide-react";

const SellerDashboardProduct = ({
  products,
  setEditItem,
  deleteProduct,
  setActiveTab,
}) => {
  return (
    <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden animate-in fade-in">
      <div className="hidden md:block">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] uppercase font-black text-slate-400 border-b">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Product Info</th>
              <th className="p-4">Pricing</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-slate-50 transition group"
              >
                <td className="p-4 w-20">
                  <img
                    src={
                      product.image?.startsWith("data:")
                        ? product.image
                        : `/image/${product.category}/${product.image}`
                    }
                    className="w-12 h-12 rounded-xl object-cover bg-slate-100"
                    onError={(e) => (e.target.src = "https://placehold.co/100")}
                  />
                </td>

                <td className="p-4">
                  <p className="font-bold text-sm">{product.title}</p>
                  <p className="text-[10px] text-slate-400 uppercase">
                    {product.category}
                  </p>
                </td>

                <td className="p-4">
                  <p className="font-black text-sm">${product.price}</p>
                  {product.discountPercent > 0 && (
                    <p className="text-[10px] text-green-500 font-bold">
                      -{product.discountPercent}%
                    </p>
                  )}
                </td>

                <td className="p-4 text-right">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        setEditItem(product);
                        setActiveTab("add");
                      }}
                      className="p-2 hover:text-blue-600"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="p-2 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y">
        {products.map((product) => (
          <div key={product.id} className="p-4 flex gap-4">
            <img
              src={
                product.image?.startsWith("data:")
                  ? product.image
                  : `/image/${product.category}/${product.image}`
              }
              className="w-14 h-14 rounded-xl object-cover bg-slate-100 flex-shrink-0"
              onError={(e) => (e.target.src = "https://placehold.co/100")}
            />

            <div className="flex-1">
              <p className="font-bold text-sm">{product.title}</p>
              <p className="text-[10px] text-slate-400 uppercase mb-1">
                {product.category}
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-black text-sm">${product.price}</p>
                  {product.discountPercent > 0 && (
                    <p className="text-[10px] text-green-500 font-bold">
                      -{product.discountPercent}%
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditItem(product);
                      setActiveTab("add");
                    }}
                    className="p-2 text-blue-600"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="p-2 text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerDashboardProduct;
