// // const express = require("express");
// // const jwt = require("jsonwebtoken");
// // const MenuItem = require("../models/MenuItem");

// // const router = express.Router();

// // // ===========================
// // // ✅ GET ALL MENU ITEMS (with tableSlug filter)
// // // ===========================
// // router.get("/items", async (req, res) => {
// //   try {
// //     const token = req.headers.authorization?.split(" ")[1];
// //     let role = "guest";

// //     // 🧩 Log request info
// //     console.log("📩 Received Query:", req.query);

// //     // ✅ Decode JWT (if available)
// //     if (token) {
// //       try {
// //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //         role = decoded.role;
// //       } catch {
// //         console.log("⚠️ Invalid or expired token — treating as guest");
// //       }
// //     }

// //     // ✅ Get tableSlug from query (both 'table' and 'tableSlug' accepted)
// //     const tableSlug = req.query.tableSlug || req.query.table || "default-table";
// //     console.log("🪑 Final TableSlug Used:", tableSlug);

// //     // ✅ Query filter
// //     let items;
// //     if (role === "staff" || role === "admin") {
// //       items = await MenuItem.find({ tableSlug });
// //     } else {
// //       items = await MenuItem.find({ tableSlug, availability: true });
// //     }

// //     if (!items || items.length === 0) {
// //       console.log("⚠️ No items found for table:", tableSlug);
// //       return res.status(200).json({ message: "No menu items found", items: [] });
// //     }

// //     console.log("✅ Items found:", items.length);
// //     res.status(200).json(items);
// //   } catch (err) {
// //     console.error("❌ Menu fetch error:", err);
// //     res.status(500).json({ error: "Server error" });
// //   }
// // });

// // // ===========================
// // // ✅ GET ALL UNIQUE CATEGORIES
// // // ===========================
// // router.get("/categories", async (req, res) => {
// //   try {
// //     const categories = await MenuItem.distinct("categoryId");
// //     res.json(categories);
// //   } catch (err) {
// //     console.error("❌ Category fetch error:", err);
// //     res.status(500).json({ error: "Server error" });
// //   }
// // });

// // module.exports = router;
// const express = require("express");
// const jwt = require("jsonwebtoken");
// const MenuItem = require("../models/MenuItem");

// const router = express.Router();

// // =====================================
// // ✅ GET MENU ITEMS (filtered by tableSlug)
// // =====================================
// router.get("/items", async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     let role = "guest";

//     // ✅ Decode JWT (if available)
//     if (token) {
//       try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         role = decoded.role;
//       } catch (error) {
//         console.log("⚠️ Invalid or expired token — treating as guest");
//       }
//     }

//     // ✅ Get tableSlug from query (used when QR scanned)
//     const tableSlug = req.query.tableSlug || "default-table";
//     console.log("🪑 Requesting menu for table:", tableSlug);

//     // ✅ Filter by tableSlug
//     let filter = { tableSlug };
//     if (role !== "staff" && role !== "admin") {
//       filter.availability = true; // guests see only available items
//     }

//     // ✅ Fetch items
//     const items = await MenuItem.find(filter).populate("categoryId", "name");

//     if (!items.length) {
//       console.log("⚠️ No menu items found for:", tableSlug);
//       return res.status(200).json({ message: "No items available", items: [] });
//     }

//     console.log(`✅ Found ${items.length} items for ${tableSlug}`);
//     return res.status(200).json({ items });
//   } catch (err) {
//     console.error("❌ Error fetching menu items:", err);
//     res.status(500).json({ error: "Server error while fetching menu" });
//   }
// });

// // =====================================
// // ✅ GET UNIQUE CATEGORIES (optional use)
// // =====================================
// router.get("/categories", async (req, res) => {
//   try {
//     const categories = await MenuItem.distinct("categoryId");
//     res.status(200).json({ categories });
//   } catch (err) {
//     console.error("❌ Error fetching categories:", err);
//     res.status(500).json({ error: "Server error while fetching categories" });
//   }
// });

// module.exports = router;
// server/routes/menuRoutes.js
// const express = require("express");
// const router = express.Router();
// const MenuItem = require("../models/MenuItem");
// const Table = require("../models/Table");

// // ✅ Fetch menu items for a tableSlug
// router.get("/items", async (req, res) => {
//   try {
//     const { tableSlug } = req.query;
//     console.log("📩 Received tableSlug:", tableSlug);

//     if (!tableSlug) {
//       return res.status(400).json({ error: "tableSlug is required" });
//     }

//     // ✅ Verify the table exists
//     const table = await Table.findOne({ qrSlug: tableSlug });
//     if (!table) {
//       return res.status(404).json({ error: "Table not found" });
//     }

//     // ✅ Fetch all active menu items
//     const items = await MenuItem.find({ active: true }).populate("categoryId", "name");

//     if (!items.length) {
//       console.log("⚠️ No menu items found");
//       return res.status(200).json({ message: "No menu items found", items: [] });
//     }

//     console.log(`✅ Found ${items.length} items for ${tableSlug}`);
//     return res.status(200).json(items);
//   } catch (err) {
//     console.error("❌ Error fetching menu items:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const MenuItem = require("../models/MenuItem");
// const Table = require("../models/Table");
// const MenuCategory = require("../models/MenuCategory");

// // ✅ Fetch menu items (verify tableSlug only)
// router.get("/items", async (req, res) => {
//   try {
//     const { tableSlug } = req.query;
//     console.log("📩 Received tableSlug:", tableSlug);

//     if (!tableSlug) {
//       return res.status(400).json({ error: "tableSlug is required" });
//     }

//     // ✅ Verify the table exists (for valid QR scan)
//     const table = await Table.findOne({ qrSlug: tableSlug });
//     if (!table) {
//       return res.status(404).json({ error: "Table not found" });
//     }

//     // ✅ Fetch all available menu items (no tableSlug filter)
//     const items = await MenuItem.find({ availability: true })
//       .populate("categoryId", "name");

//     if (!items.length) {
//       console.log("⚠️ No menu items found");
//       return res.status(200).json({ message: "No menu items found", items: [] });
//     }

//     console.log(`✅ Found ${items.length} menu items for table: ${tableSlug}`);
//     return res.status(200).json(items);

//   } catch (err) {
//     console.error("❌ Error fetching menu items:", err.message);
//     console.error(err.stack);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;





// const express = require("express");
// const router = express.Router();
// const MenuItem = require("../models/MenuItem");
// const Table = require("../models/Table");

// // ✅ Fetch menu items - verify tableSlug, but show all menu items
// router.get("/items", async (req, res) => {
//   try {
//     const { tableSlug } = req.query;
//     console.log("📩 Received tableSlug:", tableSlug);

//     // ✅ TableSlug must exist
//     if (!tableSlug) {
//       return res.status(400).json({ error: "tableSlug is required" });
//     }

//     // ✅ Verify table exists
//     const table = await Table.findOne({ qrSlug: tableSlug });
//     if (!table) {
//       return res.status(404).json({ error: "Invalid QR or table not found" });
//     }

//     // ✅ Fetch all menu items (regardless of table)
//     const items = await MenuItem.find({ availability: true }).populate(
//       "categoryId",
//       "name"
//     );

//     if (!items.length) {
//       console.log("⚠️ No menu items found");
//       return res.status(200).json({ message: "No menu items found", items: [] });
//     }

//     console.log(`✅ Found ${items.length} items for valid tableSlug: ${tableSlug}`);
//     return res.status(200).json(items);
//   } catch (err) {
//     console.error("❌ Error fetching menu items:", err.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");
const Table = require("../models/Table");

// ✅ Fetch menu items - verify tableSlug, but show all menu items
router.get("/items", async (req, res) => {
  try {
    const { tableSlug } = req.query;
    console.log("📩 Received tableSlug:", tableSlug);

    // ✅ Validate slug
    if (!tableSlug) {
      return res.status(400).json({ error: "tableSlug is required" });
    }

    // ✅ Normalize slug (convert 'table-1' → 'table1')
    const normalizedSlug = tableSlug.replace("-", "");
    console.log("🔧 Normalized Slug:", normalizedSlug);

    // ✅ Check table exists
    const table = await Table.findOne({ qrSlug: normalizedSlug });
    if (!table) {
      return res.status(404).json({ error: "Invalid QR or table not found" });
    }

    // ✅ Fetch all menu items
    const items = await MenuItem.find({ availability: true }).populate(
      "categoryId",
      "name"
    );

    if (!items.length) {
      console.log("⚠️ No menu items found");
      return res.status(200).json({ message: "No menu items found", items: [] });
    }

    console.log(`✅ Found ${items.length} items for valid tableSlug: ${normalizedSlug}`);
    return res.status(200).json(items);
  } catch (err) {
    console.error("❌ Error fetching menu items:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
