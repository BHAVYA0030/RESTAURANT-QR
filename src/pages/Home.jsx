import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-yellow-50 flex flex-col items-center justify-center px-4 text-center">
      {/* Hero Animation */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-2xl"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-orange-600 drop-shadow-sm mb-4">
          🍽️ Scan & Dine
        </h1>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Scan your table QR to browse our delicious digital menu and place your
          order right from your seat. Fast, fun, and contactless!
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/menu"
            className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-xl shadow-md transition-all"
          >
            View Menu
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 border-2 border-orange-500 text-orange-600 font-semibold rounded-xl hover:bg-orange-500 hover:text-white transition-all"
          >
            Staff / Admin Login
          </Link>
        </div>
      </motion.div>

      {/* Image / Illustration */}
      <motion.img
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        src="https://cdn-icons-png.flaticon.com/512/2921/2921822.png"
        alt="QR Dining Illustration"
        className="w-72 md:w-96 mt-12 drop-shadow-xl"
      />

      {/* Footer */}
      <footer className="mt-16 text-sm text-gray-500">
        © 2025 Scan & Dine | Crafted with ❤️ using MERN Stack
      </footer>
    </div>
  );
};

export default Home;
