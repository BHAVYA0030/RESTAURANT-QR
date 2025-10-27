// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import Home from "./pages/Home";
// // import Menu from "./pages/Menu";
// // import Cart from "./pages/Cart";
// // import Login from "./pages/Login";
// // import StaffDashboard from "./pages/StaffDashboard";
// // import AdminPanel from "./pages/AdminPanel";

// // function App() {
// //   return (
  
    
    
// //     <BrowserRouter>
// //       <Routes>
// //         <Route path="/" element={<Home />} />
// //         <Route path="/menu" element={<Menu />} />
// //         <Route path="/cart" element={<Cart />} />
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/staff" element={<StaffDashboard />} />
// //         <Route path="/admin" element={<AdminPanel />} />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;
// // App.jsx


// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import Home from "./pages/Home";
// // import Menu from "./pages/Menu";
// // import Cart from "./pages/Cart";
// // import Login from "./pages/Login";
// // import StaffDashboard from "./pages/StaffDashboard";
// // import AdminPanel from "./pages/AdminPanel";

// // function App() {
// //   return (
// //     <BrowserRouter>
// //       {/* 👈 यहाँ पर Step 2 लागू करें: एक अदृश्य या अस्थायी बटन जोड़ें। */}
// //       {/* यह बटन Tailwind को 'bg-orange-500' और 'hover:bg-orange-600' classes
// //           को generate करने का संकेत देता है, जिससे आपका index.css में @apply काम करे। */}
// //       <div className="hidden bg-orange-500 hover:bg-orange-600"></div>

// //       <Routes>
// //         <Route path="/" element={<Home />} />
// //         <Route path="/menu" element={<Menu />} />
// //         <Route path="/cart" element={<Cart />} />
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/staff" element={<StaffDashboard />} />
// //         <Route path="/admin" element={<AdminPanel />} />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;


// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import Home from "./pages/Home";
// import Menu from "./pages/Menu";
// import Cart from "./pages/Cart";
// import Login from "./pages/Login";
// import StaffDashboard from "./pages/StaffDashboard";
// import AdminPanel from "./pages/AdminPanel";

// // Wrapper to read tableSlug from URL query
// function MenuWrapper() {
//   const query = new URLSearchParams(useLocation().search);
//   const tableSlug = query.get("table") || "default-table"; // fallback if missing
//   return <Menu tableSlug={tableSlug} />;
// }

// function App() {
//   return (
//     <BrowserRouter>
//       {/* Tailwind helper */}
//       <div className="hidden bg-orange-500 hover:bg-orange-600"></div>

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/menu" element={<MenuWrapper />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/staff" element={<StaffDashboard />} />
//         <Route path="/admin" element={<AdminPanel />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import AdminPanel from "./pages/AdminPanel";
import StaffDashboard from "./pages/StaffDashboard";
import MenuWrapper from "./pages/MenuWrapper";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/menu" element={<Navigate to="/menu/default-table" />} />
      <Route path="/menu/:tableSlug" element={<MenuWrapper />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff"
        element={
          <ProtectedRoute allowedRoles={["staff", "admin"]}>
            <StaffDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;


