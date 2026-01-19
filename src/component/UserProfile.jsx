import React, { useState } from 'react';

const UserProfile = () => {
  // --- State Management ---
  
  const [user] = useState({
    name: "Alex Doe",
    email: "alex.doe@example.com",
    memberSince: "Jan 2023",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  });

  const [cart, setCart] = useState([
    { id: 101, name: "Wireless Headphones", price: 59.99, image: "🎧" },
    { id: 102, name: "Mechanical Keyboard", price: 120.50, image: "⌨️" },
    { id: 103, name: "USB-C Hub", price: 25.00, image: "🔌" }
  ]);

  const [orderHistory, setOrderHistory] = useState([
    {
      orderId: "ORD-998",
      date: "2023-10-15",
      total: 45.00,
      status: "Delivered",
      items: [{ name: "Laptop Sleeve", price: 45.00 }]
    }
  ]);

  // --- Logic ---

  const cartTotal = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  const handlePayment = () => {
    if (cart.length === 0) return;

    const newOrder = {
      orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
      date: new Date().toLocaleDateString(),
      total: cartTotal,
      status: "Processing",
      items: [...cart]
    };

    setOrderHistory([newOrder, ...orderHistory]);
    setCart([]);
    alert("Payment Successful! Check your Order History.");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: User Info */}
        <aside className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <img 
              src={user.avatar} 
              alt="Profile" 
              className="w-24 h-24 mx-auto rounded-full bg-gray-200 mb-4" 
            />
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-500 mb-4">{user.email}</p>
            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full mb-6">
              Gold Member
            </span>
            <p className="text-sm text-gray-400">Member since {user.memberSince}</p>
          </div>
        </aside>

        {/* RIGHT COLUMN: Content */}
        <main className="md:col-span-2 space-y-6">
          
          {/* Section 1: Active Cart */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-4 mb-4">
              🛒 Your Cart
            </h3>
            
            {cart.length === 0 ? (
              <div className="text-center py-8 text-gray-400 italic">
                Your cart is currently empty.
              </div>
            ) : (
              <>
                <ul className="divide-y divide-gray-100">
                  {cart.map((item) => (
                    <li key={item.id} className="flex items-center justify-between py-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-4">{item.image}</span>
                        <h4 className="font-medium text-gray-700">{item.name}</h4>
                      </div>
                      <span className="font-bold text-gray-900">${item.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 pt-6 border-t border-dashed border-gray-200 flex justify-between items-center">
                  <div className="text-lg font-medium text-gray-700">
                    Total: <span className="text-2xl font-bold text-blue-600">${cartTotal}</span>
                  </div>
                  <button 
                    onClick={handlePayment} 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-md transform active:scale-95"
                  >
                    Pay Now 
                  </button>
                </div>
              </>
            )}
          </section>

          {/* Section 2: Order History */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-4 mb-4">
              📦 Order History
            </h3>
            
            <div className="space-y-4">
              {orderHistory.map((order, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-mono font-bold text-gray-700 mr-3">#{order.orderId}</span>
                      <span className="text-sm text-gray-500">{order.date}</span>
                    </div>
                    <span className={`text-xs font-bold uppercase px-2 py-1 rounded 
                      ${order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2">
                    {order.items.map((item, idx) => (
                       <span key={idx}>{item.name}{idx < order.items.length -1 ? ", " : ""}</span>
                    ))}
                  </div>
                  
                  <div className="text-right font-bold text-gray-800">
                    Total: ${order.total}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default UserProfile;