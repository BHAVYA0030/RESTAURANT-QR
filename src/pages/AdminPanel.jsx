// import React, { useEffect, useState } from 'react';
// import api from '../services/api';

// export default function AdminPanel() {
//   const [categories,setCategories] = useState([]);
//   const [tables,setTables] = useState([]);

//   useEffect(()=>{
//     api.get('/menu/categories').then(res=>setCategories(res.data));
//     api.get('/tables').then(res=>setTables(res.data));
//   },[]);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-2">Admin Panel</h2>
//       <div>
//         <h3 className="font-bold mt-2">Categories</h3>
//         {categories.map(c=><div key={c._id}>{c.name}</div>)}
//       </div>
//       <div>
//         <h3 className="font-bold mt-2">Tables</h3>
//         {tables.map(t=><div key={t._id}>{t.number} - QR: {t.qrSlug}</div>)}
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import api from "../services/api";

// export default function AdminPanel() {
//   const [categories, setCategories] = useState([]);
//   const [tables, setTables] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [staff, setStaff] = useState([]);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     api.get("/menu/categories", { headers: { Authorization: `Bearer ${token}` } })
//       .then((res) => setCategories(res.data));

//     api.get("/tables", { headers: { Authorization: `Bearer ${token}` } })
//       .then((res) => setTables(res.data));

//     api.get("/orders", { headers: { Authorization: `Bearer ${token}` } })
//       .then((res) => setOrders(res.data));

//     api.get("/auth/staff", { headers: { Authorization: `Bearer ${token}` } })
//       .then((res) => setStaff(res.data));
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-2">Admin Panel</h2>

//       <div className="mb-4">
//         <h3 className="font-bold mt-2">Orders</h3>
//         {orders.map((o) => (
//           <div key={o._id} className="border p-2 mb-1">
//             Table {o.table.number} - Status: {o.status} - Staff: {o.assignedStaff?.name || "Unassigned"}
//           </div>
//         ))}
//       </div>

//       <div className="mb-4">
//         <h3 className="font-bold mt-2">Staff</h3>
//         {staff.map((s) => (
//           <div key={s._id}>{s.name} ({s.email})</div>
//         ))}
//       </div>

//       <div className="mb-4">
//         <h3 className="font-bold mt-2">Categories</h3>
//         {categories.map((c) => (
//           <div key={c._id}>{c.name}</div>
//         ))}
//       </div>

//       <div className="mb-4">
//         <h3 className="font-bold mt-2">Tables</h3>
//         {tables.map((t) => (
//           <div key={t._id}>{t.number} - QR: {t.qrSlug}</div>
//         ))}
//       </div>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import api from "../services/api";

// export default function AdminPanel() {
//   const [categories, setCategories] = useState([]);
//   const [tables, setTables] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [staff, setStaff] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [catRes, tableRes, orderRes, staffRes] = await Promise.all([
//           api.get("/menu/categories", { headers: { Authorization: `Bearer ${token}` } }),
//           api.get("/tables", { headers: { Authorization: `Bearer ${token}` } }),
//           api.get("/orders", { headers: { Authorization: `Bearer ${token}` } }),
//           api.get("/auth/staff", { headers: { Authorization: `Bearer ${token}` } }),
//         ]);
//         setCategories(catRes.data);
//         setTables(tableRes.data);
//         setOrders(orderRes.data);
//         setStaff(staffRes.data);
//       } catch (err) {
//         console.error("Error loading admin data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [token]);

//   console.log(orders)

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin border-4 border-gray-300 border-t-blue-600 rounded-full w-10 h-10"></div>
//         <p className="ml-3 text-gray-600">Loading admin panel...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <h1 className="text-3xl font-bold text-blue-700 mb-6">🍽️ Restaurant Admin Panel</h1>

//       {/* --- Orders Section --- */}
//       <section className="mb-8 bg-white p-4 rounded-lg shadow">
//         <h2 className="text-xl font-semibold mb-3 border-b pb-2">🧾 Current Orders</h2>
//         {orders.length === 0 ? (
//           <p className="text-gray-500">No active orders yet.</p>
//         ) : (
//           <div className="grid md:grid-cols-2 gap-3">
//             {orders.map((o) => (
//               <div
//                 key={o._id}
//                 className="border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition"
//               >
//                 <div className="flex justify-between items-center">
//                   <h3 className="font-bold text-lg">Table #{o?.table?.number}</h3>
//                   <span
//                     className={`px-2 py-1 rounded text-sm ${
//                       o.status === "completed"
//                         ? "bg-green-100 text-green-700"
//                         : o.status === "in-progress"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : "bg-gray-200 text-gray-700"
//                     }`}
//                   >
//                     {o.status}
//                   </span>
//                 </div>
//                 <p className="text-sm mt-1 text-gray-600">
//                   Staff:{" "}
//                   <span className="font-medium">
//                     {o.assignedStaff?.name || "Unassigned"}
//                   </span>
//                 </p>
//                 <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
//                   {o.items.map((i, idx) => (
//                     <li key={idx}>
//                       {i.name} × {i.qty}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* --- Staff Section --- */}
//       <section className="mb-8 bg-white p-4 rounded-lg shadow">
//         <h2 className="text-xl font-semibold mb-3 border-b pb-2">👨‍🍳 Staff Members</h2>
//         {staff.length === 0 ? (
//           <p className="text-gray-500">No staff registered.</p>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
//             {staff.map((s) => (
//               <div
//                 key={s._id}
//                 className="border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition"
//               >
//                 <h3 className="font-bold text-blue-700">{s.name}</h3>
//                 <p className="text-gray-600 text-sm">{s.email}</p>
//                 <p className="text-xs text-gray-500 mt-1">Role: {s.role || "Staff"}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* --- Categories Section --- */}
//       <section className="mb-8 bg-white p-4 rounded-lg shadow">
//         <h2 className="text-xl font-semibold mb-3 border-b pb-2">📋 Menu Categories</h2>
//         {categories.length === 0 ? (
//           <p className="text-gray-500">No categories added yet.</p>
//         ) : (
//           <div className="flex flex-wrap gap-3">
//             {categories.map((c) => (
//               <div
//                 key={c._id}
//                 className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg font-medium shadow-sm"
//               >
//                 {c.name}
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* --- Tables Section --- */}
//       <section className="bg-white p-4 rounded-lg shadow">
//         <h2 className="text-xl font-semibold mb-3 border-b pb-2">🪑 Tables</h2>
//         {tables.length === 0 ? (
//           <p className="text-gray-500">No tables found.</p>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
//             {tables.map((t) => (
//               <div
//                 key={t._id}
//                 className="border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition"
//               >
//                 <h3 className="font-bold">Table #{t.number}</h3>
//                 <p className="text-sm text-gray-600">QR: {t.qrSlug}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import api from "../services/api"; // Make sure this points to axios instance (with baseURL)

// export default function AdminPanel() {
//   const [categories, setCategories] = useState([]);
//   const [tables, setTables] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [staff, setStaff] = useState([]);
//   const [items, setItems] = useState([]); // ✅ Menu items
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const headers = { Authorization: `Bearer ${token}` };

//         const [catRes, tableRes, orderRes, staffRes, itemRes] = await Promise.all([
//           api.get("/menu/categories", { headers }),
//           api.get("/tables", { headers }),
//           api.get("/orders", { headers }),
//           api.get("/auth/staff", { headers }),
//           api.get("/menu/items", { headers }),
//         ]);

//         setCategories(catRes.data || []);
//         setTables(tableRes.data || []);
//         setOrders(orderRes.data || []);
//         setStaff(staffRes.data || []);
//         setItems(itemRes.data || []);
//       } catch (err) {
//         console.error("❌ Error loading admin data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [token]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin border-4 border-gray-300 border-t-blue-600 rounded-full w-10 h-10"></div>
//         <p className="ml-3 text-gray-600">Loading admin panel...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <h1 className="text-3xl font-bold text-blue-700 mb-6">
//         🍽️ Restaurant Admin Panel
//       </h1>

//       {/* --- Orders Section --- */}
//       <section className="mb-8 bg-white p-4 rounded-lg shadow">
//         <h2 className="text-xl font-semibold mb-3 border-b pb-2">🧾 Current Orders</h2>
//         {orders.length === 0 ? (
//           <p className="text-gray-500">No active orders yet.</p>
//         ) : (
//           <div className="grid md:grid-cols-2 gap-3">
//             {orders.map((o) => (
//               <div
//                 key={o._id}
//                 className="border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition"
//               >
//                 <div className="flex justify-between items-center">
//                   <h3 className="font-bold text-lg">
//                     Table #{o?.tableId?.number || o?.table?.number || "N/A"}
//                   </h3>
//                   <span
//                     className={`px-2 py-1 rounded text-sm ${
//                       o.status === "completed"
//                         ? "bg-green-100 text-green-700"
//                         : o.status === "in-progress"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : "bg-gray-200 text-gray-700"
//                     }`}
//                   >
//                     {o.status}
//                   </span>
//                 </div>

//                 <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
//                   {o.items?.map((item, idx) => (
//                     <li key={idx}>
//                       {item.menuItemId?.name || item.name} × {item.qty}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* --- Menu Items Section --- */}
//       <section className="mb-8 bg-white p-4 rounded-lg shadow">
//         <h2 className="text-xl font-semibold mb-3 border-b pb-2">🍔 Menu Items</h2>
//         {items.length === 0 ? (
//           <p className="text-gray-500">No menu items added yet.</p>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
//             {items.map((item) => (
//               <div
//                 key={item._id}
//                 className="border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition"
//               >
//                 <h3 className="font-bold text-blue-700">{item.name}</h3>
//                 <p className="text-sm text-gray-700">₹{item.price}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* --- Staff Section --- */}
//       <section className="mb-8 bg-white p-4 rounded-lg shadow">
//         <h2 className="text-xl font-semibold mb-3 border-b pb-2">👨‍🍳 Staff Members</h2>
//         {staff.length === 0 ? (
//           <p className="text-gray-500">No staff registered.</p>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
//             {staff.map((s) => (
//               <div
//                 key={s._id}
//                 className="border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition"
//               >
//                 <h3 className="font-bold text-blue-700">{s.name}</h3>
//                 <p className="text-gray-600 text-sm">{s.email}</p>
//                 <p className="text-xs text-gray-500 mt-1">Role: {s.role || "Staff"}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* --- Categories Section --- */}
//       <section className="mb-8 bg-white p-4 rounded-lg shadow">
//         <h2 className="text-xl font-semibold mb-3 border-b pb-2">📋 Menu Categories</h2>
//         {categories.length === 0 ? (
//           <p className="text-gray-500">No categories added yet.</p>
//         ) : (
//           <div className="flex flex-wrap gap-3">
//             {categories.map((c) => (
//               <div
//                 key={c.name}
//                 className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg font-medium shadow-sm"
//               >
//                 {c.name}
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* --- Tables Section --- */}
//       <section className="bg-white p-4 rounded-lg shadow">
//         <h2 className="text-xl font-semibold mb-3 border-b pb-2">🪑 Tables</h2>
//         {tables.length === 0 ? (
//           <p className="text-gray-500">No tables found.</p>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
//             {tables.map((t) => (
//               <div
//                 key={t._id}
//                 className="border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition"
//               >
//                 <h3 className="font-bold">Table #{t.number}</h3>
//                 <p className="text-sm text-gray-600">QR: {t.qrSlug}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import api from "../services/api"; // axios instance with baseURL

export default function AdminPanel() {
  const [tables, setTables] = useState([]);
  const [orders, setOrders] = useState([]);
  const [staff, setStaff] = useState([]);
  const [items, setItems] = useState([]); // ✅ Menu items
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        // ✅ Parallel requests to backend
        const [tableRes, orderRes, staffRes, menuRes] = await Promise.all([
          api.get("/tables", { headers }),
          api.get("/orders", { headers }),
          api.get("/auth/staff", { headers }),
          api.get("/menu/items?tableSlug=table-1", { headers }), // ✅ use default slug for admin view
        ]);

        setTables(tableRes.data || []);
        setOrders(orderRes.data || []);
        setStaff(staffRes.data || []);

        // Handle menu response shape
        if (menuRes.data && Array.isArray(menuRes.data.items)) {
          setItems(menuRes.data.items);
        } else if (Array.isArray(menuRes.data)) {
          setItems(menuRes.data);
        } else {
          setItems([]);
        }
      } catch (err) {
        console.error("❌ Error loading admin data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin border-4 border-gray-300 border-t-blue-600 rounded-full w-10 h-10"></div>
        <p className="ml-3 text-gray-600">Loading admin panel...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        🍽️ Restaurant Admin Panel
      </h1>

      {/* --- Orders Section --- */}
      <section className="mb-8 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3 border-b pb-2">🧾 Current Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500">No active orders yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-3">
            {orders.map((o) => (
              <div
                key={o._id}
                className="border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">
                    Table #{o?.tableId?.number || o?.table?.number || "N/A"}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      o.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : o.status === "in-progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {o.status}
                  </span>
                </div>

                <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
                  {o.items?.map((item, idx) => (
                    <li key={idx}>
                      {item.menuItemId?.name || item.name} × {item.qty}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* --- Menu Items Section --- */}
      <section className="mb-8 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3 border-b pb-2">🍔 Menu Items</h2>
        {items.length === 0 ? (
          <p className="text-gray-500">No menu items added yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map((item) => (
              <div
                key={item._id}
                className="border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition"
              >
                <h3 className="font-bold text-blue-700">{item.name}</h3>
                <p className="text-sm text-gray-700">₹{item.price}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {item.availability ? "Available ✅" : "Not Available ❌"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* --- Staff Section --- */}
      <section className="mb-8 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3 border-b pb-2">👨‍🍳 Staff Members</h2>
        {staff.length === 0 ? (
          <p className="text-gray-500">No staff registered.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {staff.map((s) => (
              <div
                key={s._id}
                className="border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition"
              >
                <h3 className="font-bold text-blue-700">{s.name}</h3>
                <p className="text-gray-600 text-sm">{s.email}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Role: {s.role || "Staff"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* --- Tables Section --- */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3 border-b pb-2">🪑 Tables</h2>
        {tables.length === 0 ? (
          <p className="text-gray-500">No tables found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {tables.map((t) => (
              <div
                key={t._id}
                className="border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition"
              >
                <h3 className="font-bold">Table #{t.number}</h3>
                <p className="text-sm text-gray-600">QR: {t.qrSlug}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
