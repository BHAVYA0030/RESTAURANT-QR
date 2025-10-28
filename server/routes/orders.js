// //  const express = require('express');
// // const router = express.Router();
// // const Order = require('../models/Order');
// // const Table = require('../models/Table');

// // // Place order (customer)
// // router.post('/', async (req,res)=>{
// //   const {tableSlug, items} = req.body;
// //   const table = await Table.findOne({qrSlug:tableSlug});
// //   if(!table) return res.status(404).json({error:'Table not found'});
// //   let total = 0;
// //   items.forEach(i=>total+=i.price*i.qty);
// //   const order = new Order({tableId:table._id, items, totals:total});
// //   await order.save();
// //   res.json(order);
// // });

// // // Get orders by table/status (staff)
// // router.get('/', async (req,res)=>{
// //   const {status,table} = req.query;
// //   const query = {};
// //   if(status) query.status = status;
// //   if(table) query.tableId = table;
// //   const orders = await Order.find(query).populate('tableId').populate('items.menuItemId');
// //   res.json(orders);
// // });

// // // Update order status (staff)
// // router.patch('/:id/status', async (req,res)=>{
// //   const {status} = req.body;
// //   const order = await Order.findById(req.params.id);
// //   if(!order) return res.status(404).json({error:'Order not found'});
// //   order.status = status;
// //   await order.save();
// //   res.json(order);
// // });

// // module.exports = router;
// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Order');
// const Table = require('../models/Table');

// // Place order (customer)
// router.post('/', async (req,res)=>{
//   const {tableSlug, items} = req.body;
//   const table = await Table.findOne({qrSlug:tableSlug});
//   if(!table) return res.status(404).json({error:'Table not found'});
//   let total = 0;
//   items.forEach(i=>total+=i.price*i.qty);
//   const order = new Order({tableId:table._id, items, totals:total});
//   await order.save();
//   res.json(order);
// });

// // Get orders by table/status (staff)
// router.get('/', async (req,res)=>{
//   const {status,table} = req.query;
//   const query = {};
//   if(status) query.status = status;
//   if(table) query.tableId = table;
//   const orders = await Order.find(query).populate('tableId').populate('items.menuItemId');
//   res.json(orders);
// });

// // ✅ Get all active (placed or preparing) orders
// router.get('/active', async (req, res) => {
//   try {
//     const orders = await Order.find({
//       status: { $in: ['placed', 'preparing'] }
//     })
//       .populate('tableId')
//       .populate('items.menuItemId');

//     if (!orders.length) {
//       return res.status(200).json({ message: 'No active orders found' });
//     }

//     res.status(200).json(orders);
//   } catch (err) {
//     console.error('Error fetching active orders:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Update order status (staff)
// router.patch('/:id/status', async (req,res)=>{
//   const {status} = req.body;
//   const order = await Order.findById(req.params.id);
//   if(!order) return res.status(404).json({error:'Order not found'});
//   order.status = status;
//   await order.save();
//   res.json(order);
// });








// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");
// const Table = require("../models/Table");

// // ==========================================================
// // 🧾 PLACE ORDER (Customer via QR Scanner)
// // ==========================================================
// router.post("/", async (req, res) => {
//   try {
//     const { tableSlug, items } = req.body;

//     if (!tableSlug || !items || !items.length) {
//       return res.status(400).json({ error: "Invalid order payload" });
//     }

//     // ✅ Verify table by QR slug
//     const table = await Table.findOne({ qrSlug: tableSlug });
//     if (!table) {
//       return res.status(404).json({ error: "Table not found" });
//     }

//     // ✅ Calculate total
//     let total = 0;
//     items.forEach((item) => {
//       total += item.price * item.qty;
//     });

//     // ✅ Create order linked by tableSlug instead of tableId
//     const order = new Order({
//       tableSlug, // store tableSlug directly
//       items,
//       totals: total,
//       status: "placed",
//     });

//     await order.save();

//     console.log(`✅ Order placed for ${tableSlug} (${items.length} items)`);

//     return res.status(201).json({
//       success: true,
//       message: `Order placed successfully for ${tableSlug}`,
//       order,
//     });
//   } catch (err) {
//     console.error("❌ Error placing order:", err);
//     res.status(500).json({ error: "Failed to place order" });
//   }
// });

// // ==========================================================
// // 📦 GET ALL ORDERS (Admin/Staff)
// // ==========================================================
// router.get("/", async (req, res) => {
//   try {
//     const { status, tableSlug } = req.query;
//     const query = {};

//     if (status) query.status = status;
//     if (tableSlug) query.tableSlug = tableSlug;

//     const orders = await Order.find(query).populate("items.menuItemId", "name price");

//     res.status(200).json(orders);
//   } catch (err) {
//     console.error("❌ Error fetching orders:", err);
//     res.status(500).json({ error: "Server error fetching orders" });
//   }
// });

// // ==========================================================
// // 🔄 GET ACTIVE ORDERS (Placed / Preparing)
// // ==========================================================
// router.get("/active", async (req, res) => {
//   try {
//     const orders = await Order.find({
//       status: { $in: ["placed", "preparing"] },
//     }).populate("items.menuItemId", "name price");

//     if (!orders.length) {
//       return res.status(200).json({ message: "No active orders found" });
//     }

//     res.status(200).json(orders);
//   } catch (err) {
//     console.error("❌ Error fetching active orders:", err);
//     res.status(500).json({ error: "Server error fetching active orders" });
//   }
// });

// // ==========================================================
// // ⚙️ UPDATE ORDER STATUS (Staff/Admin)
// // ==========================================================
// router.patch("/:id/status", async (req, res) => {
//   try {
//     const { status } = req.body;
//     const validStatuses = ["placed", "preparing", "ready", "served", "canceled"];

//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({ error: "Invalid order status" });
//     }

//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ error: "Order not found" });

//     order.status = status;
//     await order.save();

//     console.log(`🔁 Order ${order._id} updated to ${status}`);
//     res.json(order);
//   } catch (err) {
//     console.error("❌ Error updating order status:", err);
//     res.status(500).json({ error: "Failed to update order status" });
//   }
// });

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");
// const Table = require("../models/Table");

// // ==========================================================
// // 🧾 PLACE ORDER (Customer via QR Scanner)
// // ==========================================================
// router.post("/", async (req, res) => {
//   try {
//     const { tableSlug, items, totalPrice } = req.body;

//     // 🔸 Validate input
//     if (!tableSlug || !items || !items.length) {
//       return res.status(400).json({ error: "Invalid order payload" });
//     }

//     // 🔸 Find the table by QR slug
//     const table = await Table.findOne({ qrSlug: tableSlug });
//     if (!table) {
//       return res.status(404).json({ error: "Table not found" });
//     }

//     // 🔸 Calculate total if not provided
//     let computedTotal = totalPrice || 0;
//     if (!totalPrice) {
//       computedTotal = items.reduce(
//         (sum, item) => sum + item.price * (item.qty || 1),
//         0
//       );
//     }

//     // 🔸 Create new order
//     const order = new Order({
//       tableId: table._id,
//       items,
//       totalPrice: computedTotal,
//       status: "placed",
//       createdAt: new Date(),
//     });

//     await order.save();

//     console.log(`✅ Order placed for ${tableSlug} (${items.length} items)`);

//     return res.status(201).json({
//       success: true,
//       message: `Order placed successfully for ${tableSlug}`,
//       order,
//     });
//   } catch (err) {
//     console.error("❌ Error placing order:", err);
//     res.status(500).json({ error: "Failed to place order" });
//   }
// });

// // ==========================================================
// // 📦 GET ALL ORDERS (Admin/Staff)
// // ==========================================================
// router.get("/", async (req, res) => {
//   try {
//     const { status, table } = req.query;
//     const query = {};

//     if (status) query.status = status;
//     if (table) query.tableId = table;

//     const orders = await Order.find(query)
//       .populate("tableId", "number qrSlug")
//       .populate("items.menuItemId", "name price")
//       .sort({ createdAt: -1 });

//     res.status(200).json(orders);
//   } catch (err) {
//     console.error("❌ Error fetching orders:", err);
//     res.status(500).json({ error: "Server error fetching orders" });
//   }
// });

// // ==========================================================
// // 🔄 GET ACTIVE ORDERS (Placed / Preparing)
// // ==========================================================
// router.get("/active", async (req, res) => {
//   try {
//     const orders = await Order.find({
//       status: { $in: ["placed", "preparing"] },
//     })
//       .populate("tableId", "number qrSlug")
//       .populate("items.menuItemId", "name price");

//     if (!orders.length) {
//       return res.status(200).json({ message: "No active orders found" });
//     }

//     res.status(200).json(orders);
//   } catch (err) {
//     console.error("❌ Error fetching active orders:", err);
//     res.status(500).json({ error: "Server error fetching active orders" });
//   }
// });

// // ==========================================================
// // ⚙️ UPDATE ORDER STATUS (Staff/Admin)
// // ==========================================================
// router.patch("/:id/status", async (req, res) => {
//   try {
//     const { status } = req.body;
//     const validStatuses = ["placed", "preparing", "ready", "served", "canceled"];

//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({ error: "Invalid order status" });
//     }

//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ error: "Order not found" });

//     order.status = status;
//     await order.save();

//     console.log(`🔁 Order ${order._id} updated to ${status}`);
//     res.json(order);
//   } catch (err) {
//     console.error("❌ Error updating order status:", err);
//     res.status(500).json({ error: "Failed to update order status" });
//   }
// });

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");
// const Table = require("../models/Table");
// const MenuItem = require("../models/MenuItem");

// // ✅ GET all orders
// router.get("/", async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate("tableId")
//       .populate("items.menuItemId");
//     res.json(orders);
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     res.status(500).json({ error: "Failed to fetch orders" });
//   }
// });

// // ✅ POST (Place new order)
// router.post("/", async (req, res) => {
//   try {
//     const { tableSlug, items } = req.body;

//     // Find table by slug
//     const table = await Table.findOne({ qrSlug: tableSlug });
//     if (!table) return res.status(404).json({ error: "Table not found" });

//     // Calculate total
//     let total = 0;
//     for (const item of items) {
//       const menuItem = await MenuItem.findById(item.menuItemId);
//       if (!menuItem) return res.status(404).json({ error: "Menu item not found" });
//       total += menuItem.price * item.qty;
//     }

//     // Create new order
//     const newOrder = new Order({
//       tableId: table._id,
//       items,
//       totals: total,
//       status: "placed",
//     });

//     await newOrder.save();
//     res.status(201).json(newOrder);
//   } catch (error) {
//     console.error("Error placing order:", error);
//     res.status(500).json({ error: "Failed to place order" });
//   }
// });

// module.exports = router;


// server/routes/orders.js
// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");
// const Table = require("../models/Table");
// const MenuItem = require("../models/MenuItem");

// // ✅ GET all orders
// router.get("/", async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate("tableId")
//       .populate("items.menuItemId")
//       .sort({ createdAt: -1 });
//     res.json(orders);
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     res.status(500).json({ error: "Failed to fetch orders" });
//   }
// });

// // ✅ POST new order
// router.post("/", async (req, res) => {
//   try {
//     const { tableSlug, items } = req.body;
//     console.log("📩 Received order:", req.body);

//     if (!tableSlug) {
//       return res.status(400).json({ error: "tableSlug is required" });
//     }
//     if (!items || !Array.isArray(items) || items.length === 0) {
//       return res.status(400).json({ error: "Order must contain items" });
//     }

//     const table = await Table.findOne({ qrSlug: tableSlug });
//     if (!table) {
//       return res.status(404).json({ error: "Table not found" });
//     }

//     let total = 0;
//     const processedItems = [];

//     for (const item of items) {
//       const menuItem = await MenuItem.findById(item.menuItemId);
//       if (!menuItem) {
//         return res
//           .status(404)
//           .json({ error: `Menu item not found: ${item.menuItemId}` });
//       }

//       const qty = item.qty || 1;
//       total += menuItem.price * qty;

//       processedItems.push({
//         menuItemId: menuItem._id,
//         qty,
//         price : menuItem.price
//       });
//     }

//     const newOrder = new Order({
//       tableId: table._id,
//       tableSlug,
//       items: processedItems,
//       totals: total,
//       status: "placed",
//     });

//     await newOrder.save();
//     console.log("✅ Order saved successfully:", newOrder._id);

//     res.status(201).json(newOrder);
//   } catch (error) {
//     console.error("❌ Error placing order:", error);
//     res.status(500).json({ error: "Failed to place order" });
//   }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Table = require("../models/Table");
const MenuItem = require("../models/MenuItem");

// ✅ POST new order
router.post("/", async (req, res) => {
  try {
    const { tableSlug, items } = req.body;
    console.log("📩 Received order:", req.body);

    if (!tableSlug) {
      return res.status(400).json({ error: "tableSlug is required" });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Order must contain items" });
    }

    // ⚙️ Normalize slug (remove dash)
    const normalizedSlug = tableSlug.replace("-", "");
    const table = await Table.findOne({ qrSlug: normalizedSlug });

    if (!table) {
      console.log("❌ Table not found for slug:", normalizedSlug);
      return res.status(404).json({ error: "Table not found" });
    }

    let total = 0;
    const processedItems = [];

    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItemId);
      if (!menuItem) {
        return res
          .status(404)
          .json({ error: `Menu item not found: ${item.menuItemId}` });
      }

      const qty = item.qty || 1;
      total += menuItem.price * qty;

      processedItems.push({
        menuItemId: menuItem._id,
        qty,
        price: menuItem.price,
      });
    }

    const newOrder = new Order({
      tableId: table._id,
      tableSlug: normalizedSlug,
      items: processedItems,
      totals: total,
      status: "placed",
    });

    await newOrder.save();
    console.log("✅ Order saved successfully:", newOrder._id);

    res.status(201).json({
      message: "✅ Order placed successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.error("❌ Error placing order:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
});
// ✅ GET all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("tableId", "number")
      .populate("items.menuItemId", "name price");
    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
