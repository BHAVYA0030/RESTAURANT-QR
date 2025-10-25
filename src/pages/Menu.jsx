// import React, { useEffect, useState } from 'react';
// import api from '../services/api';
// import ItemCard from '../components/ItemCard';
// const [tableSlug, setTableSlug] = useState("default-table");



// export default function Menu({ tableSlug }) {
//   const [items,setItems] = useState([]);
//   useEffect(()=>{
//     api.get(`/menu/items?table=${tableSlug}`).then(res=>setItems(res.data));
//   },[tableSlug]);

//   return (
//     <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
//       {items.map(item=><ItemCard key={item._id} item={item}/>)}
//     </div>
//   );
// }
// import React, { useEffect, useState } from 'react';
// import api from '../services/api';
// import ItemCard from '../components/ItemCard';
// // Removed: const [tableSlug, setTableSlug] = useState("default-table"); 
// // tableSlug is now correctly received as a prop.
// import React, { useState ,useEffect} from "react";

// export default function Menu({ tableSlug }) {
//   const [items, setItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(true); // Added loading state
  
//   // The useEffect will run whenever the prop tableSlug changes.
//   useEffect(() => {
//     // 1. ADDED GUARD CLAUSE: Do not fetch if tableSlug is null, undefined, or empty.
//     if (!tableSlug) {
//         console.warn("Table slug is missing, skipping menu fetch.");
//         setIsLoading(false);
//         return; 
//     }

//     setIsLoading(true);

//     // Fetch the menu items for the given tableSlug
//     api.get(`/menu/items?table=${tableSlug}`)
//       .then(res => {
//         setItems(res.data);
//         setIsLoading(false); // Finished loading
//       })
//       .catch(error => {
//         console.error("Failed to fetch menu items:", error);
//         setItems([]); // Clear items on error
//         setIsLoading(false); // Finished loading (with error)
//       });
      
//       // Cleanup function is good practice
//       // Note: Axios requests often don't need manual cleanup for this simple case, 
//       // but it's good practice for long-running processes.
//   }, [tableSlug]); // Dependency array ensures API is called when tableSlug changes

//   return (
//     <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
//       {/* IMPROVED LOADING STATE CHECK */}
//       {isLoading ? (
//         <p className="col-span-full text-center py-8 text-gray-500">Loading menu...</p>
//       ) : items.length === 0 ? (
//         <p className="col-span-full text-center py-8 text-red-500">No menu items found or failed to load.</p>
//       ) : (
//         items.map(item => <ItemCard key={item._id} item={item} />)
//       )}
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import api from '../services/api';
// import ItemCard from '../components/ItemCard';

// export default function Menu({ tableSlug }) {
//   const [items, setItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (!tableSlug) {
//       setIsLoading(false);
//       return;
//     }

//     setIsLoading(true);

//     api.get(`/menu/items?table=${tableSlug}`)
//       .then(res => setItems(res.data))
//       .catch(() => setItems([]))
//       .finally(() => setIsLoading(false));
//   }, [tableSlug]);

//   return (
//     <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
//       {isLoading ? (
//         <p className="col-span-full text-center py-8 text-gray-500">Loading menu...</p>
//       ) : items.length === 0 ? (
//         <p className="col-span-full text-center py-8 text-red-500">No menu items found.</p>
//       ) : (
//         items.map(item => <ItemCard key={item._id} item={item} />)
//       )}
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import api from '../services/api';
// import ItemCard from '../components/ItemCard';

// export default function Menu({ tableSlug }) {
//   const [items, setItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // Debug: log the received tableSlug
//   console.log("Menu received tableSlug:", tableSlug);

//   useEffect(() => {
//     if (!tableSlug) {
//       console.warn("No tableSlug provided, using default-table.");
//       setIsLoading(false);
//       return;
//     }

//     setIsLoading(true);

//     api.get(`/menu/items?table=${tableSlug}`)
//       .then(res => {
//         console.log("API response:", res.data); // Debug API data
//         setItems(res.data);
//       })
//       .catch(error => {
//         console.error("Failed to fetch menu items:", error);
//         setItems([]);
//       })
//       .finally(() => setIsLoading(false));
//   }, [tableSlug]);

//   return (
//     <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
//       {isLoading ? (
//         <p className="col-span-full text-center py-8 text-gray-500">Loading menu...</p>
//       ) : items.length === 0 ? (
//         <p className="col-span-full text-center py-8 text-red-500">
//           No menu items found for table: {tableSlug}
//         </p>
//       ) : (
//         items.map(item => <ItemCard key={item._id} item={item} />)
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import api from "../services/api";
import ItemCard from "../components/ItemCard";
import CartPanel from "../components/CartPanel";

export default function Menu({ tableSlug }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // ✅ Fetch menu items
  useEffect(() => {
    if (!tableSlug) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    api
      .get(`/menu/items?table=${tableSlug}`)
      .then((res) => setItems(res.data))
      .catch(() => setItems([]))
      .finally(() => setIsLoading(false));
  }, [tableSlug]);

  // ✅ Add to cart
  const addToCart = (item) => {
  setCart((prevCart) => {
    const existing = prevCart.find((i) => i._id === item._id);
    if (existing) {
      return prevCart.map((i) =>
        i._id === item._id ? { ...i, qty: i.qty + 1 } : i
      );
    }
    return [...prevCart, { ...item, qty: 1 }];
  });

  // ✅ Show the cart immediately after adding
  setShowCart(true);

  // ✅ Optional console log for debugging
  console.log("Added to cart:", item);
};


  // ✅ Remove from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((i) => i._id !== id));
  };

  // ✅ Place order (you can later connect this to backend)
  const placeOrder = () => {
    console.log("Order placed:", cart);
    alert("Order placed successfully!");
    setCart([]);
    setShowCart(false);
  };

  return (
    <div className="relative p-4">
      {/* 🔹 Menu grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {isLoading ? (
          <p className="col-span-full text-center py-8 text-gray-500">
            Loading menu...
          </p>
        ) : items.length === 0 ? (
          <p className="col-span-full text-center py-8 text-red-500">
            No menu items found.
          </p>
        ) : (
          items.map((item) => (
            <ItemCard key={item._id} item={item} addToCart={addToCart} />
          ))
        )}
      </div>

      {/* 🛒 Cart button */}
      <button
        onClick={() => setShowCart(!showCart)}
        className="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600"
      >
        🛒 Cart ({cart.length})
      </button>

      {/* 🧾 Cart Panel */}
      {showCart && (
        <CartPanel
          cart={cart}
          removeFromCart={removeFromCart}
          placeOrder={placeOrder}
        />
      )}
    </div>
  );
}

