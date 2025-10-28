// // // // import React, { useEffect, useState } from 'react';
// // // // import api from '../services/api';
// // // // import { motion, AnimatePresence } from 'framer-motion';

// // // // export default function StaffDashboard() {
// // // //   const [orders,setOrders] = useState([]);

// // // //   useEffect(()=>{
// // // //     const fetchOrders = async ()=>{
// // // //       const res = await api.get('/orders?status=placed');
// // // //       setOrders(res.data);
// // // //     };
// // // //     fetchOrders();
// // // //     const interval = setInterval(fetchOrders,5000);
// // // //     return ()=>clearInterval(interval);
// // // //   },[]);

// // // //   const updateStatus = async (id,status)=>{
// // // //     await api.patch(`/orders/${id}/status`,{status});
// // // //     setOrders(orders.map(o=>o._id===id?{...o,status}:o));
// // // //   };

// // // //   return (
// // // //     <div className="p-4">
// // // //       <h2 className="text-xl font-bold mb-4">Staff Dashboard - Placed Orders</h2>
// // // //       <AnimatePresence>
// // // //       {orders.map(order=>(
// // // //         <motion.div 
// // // //           key={order._id}
// // // //           initial={{opacity:0, y:-20}} 
// // // //           animate={{opacity:1, y:0}} 
// // // //           exit={{opacity:0, y:-20}}
// // // //           className="border p-4 mb-2 rounded shadow flex justify-between items-center"
// // // //         >
// // // //           <div>
// // // //             <div className="font-semibold">Table {order.tableId.number}</div>
// // // //             {order.items.map(i=><div key={i.menuItemId._id}>{i.menuItemId.name} x {i.qty}</div>)}
// // // //           </div>
// // // //           <button onClick={()=>updateStatus(order._id,'preparing')} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
// // // //             Mark Preparing
// // // //           </button>
// // // //         </motion.div>
// // // //       ))}
// // // //       </AnimatePresence>
// // // //     </div>
// // // //   );
// // // // }
// // // const express = require("express"); 
// // // const router = express.Router(); 
// // // const jwt = require("jsonwebtoken"); 
// // // // const MenuItem = require("../models/MenuItem");


// // // const MenuItem = require("../models/MenuItem");

// // // // GET menu items
// // // router.get("/", async (req, res) => {
// // //   try {
// // //     const token = req.headers.authorization?.split(" ")[1];
// // //     if (!token) return res.status(401).json({ error: "Unauthorized" });

// // //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// // //     const role = decoded.role;

// // //     let items;

// // //     if (role === "staff" || role === "admin") {
// // //       // Staff/Admin dekhen sab tables ka menu  ye seed.js h

// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";

// // // const StaffDashboard = () => {
// // //   const [menuItems, setMenuItems] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");

// // //   useEffect(() => {
// // //     const fetchMenu = async () => {
// // //       try {
// // //         setLoading(true);
// // //         setError("");

// // //         const token = localStorage.getItem("token");

// // //         const res = await axios.get("http://localhost:4000/api/menu", {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //         });

// // //         // Agar backend message bheje "No menu items found"
// // //         if (res.data.message) {
// // //           setMenuItems([]);
// // //           setError(res.data.message);
// // //         } else {
// // //           setMenuItems(res.data);
// // //         }
// // //       } catch (err) {
// // //         console.error("Fetch menu error:", err);
// // //         setError("Failed to fetch menu items");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchMenu();
// // //   }, []);

// // //   return (
// // //     <div className="p-6">
// // //       <h1 className="text-3xl font-bold mb-4">Staff Dashboard</h1>

// // //       {loading && <p>Loading menu items...</p>}
// // //       {error && <p className="text-red-500">{error}</p>}

// // //       {!loading && !error && menuItems.length === 0 && (
// // //         <p>No menu items available.</p>
// // //       )}

// // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// // //         {menuItems.map((item) => (
// // //           <div
// // //             key={item._id}
// // //             className="border p-4 rounded-lg shadow-sm hover:shadow-lg transition"
// // //           >
// // //             <h2 className="font-semibold text-xl">{item.name}</h2>
// // //             <p className="text-gray-600">{item.description}</p>
// // //             <p className="mt-2 font-medium">Price: ₹{item.price}</p>
// // //             <p className="mt-1 text-sm text-gray-500">
// // //               Table: {item.tableSlug || "All"}
// // //             </p>
// // //             <p className="mt-1 text-sm">
// // //               Available: {item.availability ? "Yes" : "No"}
// // //             </p>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default StaffDashboard;
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const StaffDashboard = () => {
// //   const [menuItems, setMenuItems] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     const fetchMenu = async () => {
// //       try {
// //         setLoading(true);
// //         setError("");

// //         const token = localStorage.getItem("token"); // staff/admin token

// //         // Backend call
// //         const res = await axios.get("http://localhost:4000/api/menu", {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });

// //         // Agar backend message bheje "No menu items found"
// //         if (res.data.message) {
// //           setMenuItems([]);
// //           setError(res.data.message);
// //         } else {
// //           setMenuItems(res.data);
// //         }
// //       } catch (err) {
// //         console.error("Fetch menu error:", err);
// //         setError("Failed to fetch menu items");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchMenu();
// //   }, []);

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-3xl font-bold mb-4">Staff Dashboard</h1>

// //       {loading && <p>Loading menu items...</p>}
// //       {error && <p className="text-red-500">{error}</p>}

// //       {!loading && !error && menuItems.length === 0 && (
// //         <p>No menu items available.</p>
// //       )}

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //         {menuItems.map((item) => (
// //           <div
// //             key={item._id}
// //             className="border p-4 rounded-lg shadow-sm hover:shadow-lg transition"
// //           >
// //             <h2 className="font-semibold text-xl">{item.name}</h2>
// //             <p className="text-gray-600">{item.description}</p>
// //             <p className="mt-2 font-medium">Price: ₹{item.price}</p>
// //             <p className="mt-1 text-sm text-gray-500">
// //               Table: {item.tableSlug || "All"}
// //             </p>
// //             <p className="mt-1 text-sm">
// //               Available: {item.availability ? "Yes" : "No"}
// //             </p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default StaffDashboard;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const StaffDashboard = () => {
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchMenu = async () => {
//       try {
//         setLoading(true);
//         setError('');

//         const token = localStorage.getItem('token');
//         if (!token) {
//           setError('No token found. Please login.');
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get('http://localhost:4000/api/menu', {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.data.message) {
//           setMenuItems([]);
//           setError(res.data.message);
//         } else {
//           setMenuItems(res.data);
//         }
//       } catch (err) {
//         console.error('Fetch menu error:', err);
//         setError(err.response?.data?.error || 'Failed to fetch menu items');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMenu();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Staff Dashboard</h1>

//       {loading && <p>Loading menu items...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {!loading && !error && menuItems.length === 0 && (
//         <p>No menu items available.</p>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {menuItems.map(item => (
//           <div
//             key={item._id}
//             className="border p-4 rounded-lg shadow-sm hover:shadow-lg transition"
//           >
//             <h2 className="font-semibold text-xl">{item.name}</h2>
//             <p className="text-gray-600">{item.description}</p>
//             <p className="mt-2 font-medium">Price: ₹{item.price}</p>
//             <p className="mt-1 text-sm text-gray-500">
//               Table: {item.tableSlug || 'All'}
//             </p>
//             <p className="mt-1 text-sm">
//               Available: {item.availability ? 'Yes' : 'No'}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StaffDashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const StaffDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch all active orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login.");
        
        setLoading(false);
        return;
      }

    const res = await axios.get("http://localhost:4000/api/orders", {
  headers: { Authorization: `Bearer ${token}` },
});


      if (res.data.message) {
        setOrders([]);
        setError(res.data.message);
      } else {
        setOrders(res.data);
      }
    } catch (err) {
      console.error("Fetch orders error:", err);
      setError(err.response?.data?.error || "Failed to fetch active orders");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Auto-refresh orders every 5 seconds
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 4000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Update order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:4000/api/orders/${orderId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update local state instantly
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (err) {
      console.error("Update status error:", err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-orange-600">
        🍽️ Staff Dashboard
      </h1>

      {loading && <p>Loading active orders...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p>No active orders found.</p>
      )}

      <AnimatePresence>
        {orders.map((order) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="border p-5 mb-3 rounded-lg shadow-md hover:shadow-lg transition bg-white"
          >
            {/* 🪑 Table Info */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-gray-800">
                Table: {order.tableId?.number || "Unknown"}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "placed"
                    ? "bg-yellow-200 text-yellow-800"
                    : order.status === "preparing"
                    ? "bg-blue-200 text-blue-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {order.status.toUpperCase()}
              </span>
            </div>

            {/* 🍛 Order Items */}
            <div className="pl-3">
              {order.items.map((item) => (
                <div
                  key={item.menuItemId?._id}
                  className="flex justify-between text-gray-700 mb-1"
                >
                  <span>{item.menuItemId?.name}</span>
                  <span>x {item.qty}</span>
                </div>
              ))}
            </div>

            {/* ✅ Action Buttons */}
            <div className="mt-4 flex gap-3">
              {order.status === "placed" && (
                <button
                  onClick={() => updateOrderStatus(order._id, "preparing")}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                  Mark Preparing
                </button>
              )}

              {order.status === "preparing" && (
                <button
                  onClick={() => updateOrderStatus(order._id, "served")}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                >
                  Mark Served
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default StaffDashboard;
