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

// import React, { useState, useEffect } from "react";
// import api from "../services/api";
// import ItemCard from "../components/ItemCard";
// import CartPanel from "../components/CartPanel";
// import { useNavigate } from "react-router-dom";

// export default function Menu({ tableSlug }) {
//   const navigate = useNavigate(); // ✅ Hook must be called inside the component body

//   const [items, setItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [cart, setCart] = useState([]);
//   const [showCart, setShowCart] = useState(false);

//   // ✅ Fetch menu items
//   useEffect(() => {
//     console.log("📩 Fetching menu for tableSlug:", tableSlug);

//     if (!tableSlug) {
//       setIsLoading(false);
//       return;
//     }

//     setIsLoading(true);
//     api
//       .get(`/menu/items?tableSlug=${tableSlug}`)
//       .then((res) => {
//         console.log("✅ API Response:", res.data);
//         setItems(res.data);
//       })
//       .catch((err) => {
//         console.error("❌ API Error:", err);
//         setItems([]);
//       })
//       .finally(() => setIsLoading(false));
//   }, [tableSlug]);

//   // ✅ Add to cart
//   const addToCart = (item) => {
//     setCart((prevCart) => {
//       const existing = prevCart.find((i) => i._id === item._id);
//       if (existing) {
//         return prevCart.map((i) =>
//           i._id === item._id ? { ...i, qty: i.qty + 1 } : i
//         );
//       }
//       return [...prevCart, { ...item, qty: 1 }];
//     });
//     setShowCart(true);
//     console.log("Added to cart:", item);
//   };

//   // ✅ Remove from cart
//   const removeFromCart = (id) => {
//     setCart((prevCart) => prevCart.filter((i) => i._id !== id));
//   };

//   // ✅ Place order
//   // const placeOrder = () => {
//   //   console.log("Order placed:", cart);
//   //   alert("Order placed successfully!");
//   //   setCart([]);
//   //   setShowCart(false);
//   // };
// const placeOrder = async () => {
//   if (cart.length === 0) {
//     alert("Cart is empty!");
//     return;
//   }

//   try {
//     // 🔥 Fixed line — yahan tableSlug ko hardcode kar diya "table1"
//     const res = await api.post("/orders", {
//       tableSlug: "table1", // ✅ Change this if you want to test with other tables like "table2"
//       items: cart.map((item) => ({
//         menuItemId: item._id,
//         qty: item.qty,
//         price: item.price,
//       })),
//     });

//     console.log("✅ Order created:", res.data);
//     alert("Order placed successfully!");
//     setCart([]);
//     setShowCart(false);
//   } catch (err) {
//     console.error("❌ Order placement failed:", err);
//     alert("Failed to place order");
//   }
// };


//   return (
//     <div className="relative p-4">
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         {isLoading ? (
//           <p className="col-span-full text-center py-8 text-gray-500">
//             Loading menu...
//           </p>
//         ) : items.length === 0 ? (
//           <p className="col-span-full text-center py-8 text-red-500">
//             No menu items found.
//           </p>
//         ) : (
//           items.map((item) => (
//             <ItemCard key={item._id} item={item} addToCart={addToCart} />
//           ))
//         )}
//       </div>

//       {/* 🛒 Cart Button */}
//       <button
//         onClick={() => setShowCart(!showCart)}
//         className="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600"
//       >
//         🛒 Cart ({cart.length})
//       </button>

//       {/* 🏠 Home Button */}
//       <button
//         onClick={() => navigate("/")}
//         className="fixed bottom-5 left-5 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600"
//       >
//         🏠 Home
//       </button>

//       {/* 🧾 Cart Panel */}
//       {showCart && (
//         <CartPanel
//           cart={cart}
//           removeFromCart={removeFromCart}
//           placeOrder={placeOrder}
//         />
//       )}
//     </div>
//   );
// }



// import React, { useState, useEffect } from "react";
// import api from "../services/api";
// import ItemCard from "../components/ItemCard";
// import CartPanel from "../components/CartPanel";
// import { useNavigate } from "react-router-dom";

// export default function Menu({ tableSlug }) {
// const navigate = useNavigate();

// const [items, setItems] = useState([]);
// const [isLoading, setIsLoading] = useState(true);
// const [cart, setCart] = useState([]);
// const [showCart, setShowCart] = useState(false);

// // ✅ Fetch menu items safely
// useEffect(() => {
// console.log("📩 Fetching menu for tableSlug:", tableSlug);


// if (!tableSlug) {
//   setIsLoading(false);
//   return;
// }

// setIsLoading(true);
// api
//   .get(`/menu/items?tableSlug=${tableSlug}`)
//   .then((res) => {
//     console.log("✅ API Response:", res.data);

//     // 🧠 Make sure items is always an array
//     if (res.data && Array.isArray(res.data.items)) {
//       setItems(res.data.items);
//     } else if (Array.isArray(res.data)) {
//       setItems(res.data);
//     } else {
//       setItems([]);
//     }
//   })
//   .catch((err) => {
//     console.error("❌ API Error:", err);
//     setItems([]);
//   })
//   .finally(() => setIsLoading(false));


// }, [tableSlug]);

// // ✅ Add to cart
// const addToCart = (item) => {
// setCart((prevCart) => {
// const existing = prevCart.find((i) => i._id === item._id);
// if (existing) {
// return prevCart.map((i) =>
// i._id === item._id ? { ...i, qty: i.qty + 1 } : i
// );
// }
// return [...prevCart, { ...item, qty: 1 }];
// });
// setShowCart(true);
// console.log("Added to cart:", item);
// };

// // ✅ Remove from cart
// const removeFromCart = (id) => {
// setCart((prevCart) => prevCart.filter((i) => i._id !== id));
// };

// // ✅ Place order
// const placeOrder = async () => {
// if (cart.length === 0) {
// alert("Cart is empty!");
// return;
// }


// try {
//   const res = await api.post("/orders", {
//     tableSlug: tableSlug || "table1", // ✅ Use current tableSlug or fallback
//     items: cart.map((item) => ({
//       menuItemId: item._id,
//       qty: item.qty,
//       price: item.price,
//     })),
//   });

//   console.log("✅ Order created:", res.data);
//   alert("Order placed successfully!");
//   setCart([]);
//   setShowCart(false);
// } catch (err) {
//   console.error("❌ Order placement failed:", err);
//   alert("Failed to place order");
// }


// };

// return ( <div className="relative p-4"> <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
// {isLoading ? ( <p className="col-span-full text-center py-8 text-gray-500">
// Loading menu... </p>
// ) : items.length === 0 ? ( <p className="col-span-full text-center py-8 text-red-500">
// No menu items found. </p>
// ) : (
// items.map((item) => ( <ItemCard key={item._id} item={item} addToCart={addToCart} />
// ))
// )} </div>

// ```
//   {/* 🛒 Cart Button */}
//   <button
//     onClick={() => setShowCart(!showCart)}
//     className="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600"
//   >
//     🛒 Cart ({cart.length})
//   </button>

//   {/* 🏠 Home Button */}
//   <button
//     onClick={() => navigate("/")}
//     className="fixed bottom-5 left-5 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600"
//   >
//     🏠 Home
//   </button>

//   {/* 🧾 Cart Panel */}
//   {showCart && (
//     <CartPanel
//       cart={cart}
//       removeFromCart={removeFromCart}
//       placeOrder={placeOrder}
//     />
//   )}
// </div>

// );
// }



import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemCard from "../components/ItemCard";
import CartPanel from "../components/CartPanel";
import { useNavigate } from "react-router-dom";

export default function Menu({ tableSlug }) {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // ✅ Fetch menu items
  useEffect(() => {
    console.log("📩 Fetching menu for tableSlug:", tableSlug);

    if (!tableSlug) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    axios
      .get(`http://10.226.36.188:4000/api/menu/items?tableSlug=${tableSlug}`)
      .then((res) => {
        console.log("✅ API Response:", res.data);

        if (res.data && Array.isArray(res.data.items)) {
          setItems(res.data.items);
        } else if (Array.isArray(res.data)) {
          setItems(res.data);
        } else {
          setItems([]);
        }
      })
      .catch((err) => {
        console.error("❌ API Error:", err);
        setItems([]);
      })
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
    setShowCart(true);
    console.log("Added to cart:", item);
  };

  // ✅ Remove from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((i) => i._id !== id));
  };

  // ✅ Place order
  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    try {
      const res = await axios.post("http://10.226.36.188:4000/api/orders", {
        tableSlug: tableSlug || "table1",
        items: cart.map((item) => ({
          menuItemId: item._id,
          qty: item.qty,
          price: item.price,
        })),
      });

      console.log("✅ Order created:", res.data);
      alert("Order placed successfully!");
      setCart([]);
      setShowCart(false);
    } catch (err) {
      console.error("❌ Order placement failed:", err);
      alert("Failed to place order");
    }
  };

  return (
    <div className="relative p-4">
      {/* 🧾 Menu Items */}
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

      {/* 🛒 Cart Button */}
      <button
        onClick={() => setShowCart(!showCart)}
        className="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600"
      >
        🛒 Cart ({cart.length})
      </button>

      {/* 🏠 Home Button */}
      <button
        onClick={() => navigate("/")}
        className="fixed bottom-5 left-5 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600"
      >
        🏠 Home
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
