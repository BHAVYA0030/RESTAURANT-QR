const express = require("express");
const jwt = require("jsonwebtoken");
const MenuItem = require("../models/MenuItem");

const router = express.Router();

// ===========================
// ✅ GET ALL MENU ITEMS (with tableSlug filter)
// ===========================
router.get("/items", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    let role = "guest";

    // 🧩 Log request info
    console.log("📩 Received Query:", req.query);

    // ✅ Decode JWT (if available)
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        role = decoded.role;
      } catch {
        console.log("⚠️ Invalid or expired token — treating as guest");
      }
    }

    // ✅ Get tableSlug from query (both 'table' and 'tableSlug' accepted)
    const tableSlug = req.query.tableSlug || req.query.table || "default-table";
    console.log("🪑 Final TableSlug Used:", tableSlug);

    // ✅ Query filter
    let items;
    if (role === "staff" || role === "admin") {
      items = await MenuItem.find({ tableSlug });
    } else {
      items = await MenuItem.find({ tableSlug, availability: true });
    }

    if (!items || items.length === 0) {
      console.log("⚠️ No items found for table:", tableSlug);
      return res.status(200).json({ message: "No menu items found", items: [] });
    }

    console.log("✅ Items found:", items.length);
    res.status(200).json(items);
  } catch (err) {
    console.error("❌ Menu fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ===========================
// ✅ GET ALL UNIQUE CATEGORIES
// ===========================
router.get("/categories", async (req, res) => {
  try {
    const categories = await MenuItem.distinct("categoryId");
    res.json(categories);
  } catch (err) {
    console.error("❌ Category fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
