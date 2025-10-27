//  const express = require('express');
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

// // Update order status (staff)
// router.patch('/:id/status', async (req,res)=>{
//   const {status} = req.body;
//   const order = await Order.findById(req.params.id);
//   if(!order) return res.status(404).json({error:'Order not found'});
//   order.status = status;
//   await order.save();
//   res.json(order);
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Table = require('../models/Table');

// Place order (customer)
router.post('/', async (req,res)=>{
  const {tableSlug, items} = req.body;
  const table = await Table.findOne({qrSlug:tableSlug});
  if(!table) return res.status(404).json({error:'Table not found'});
  let total = 0;
  items.forEach(i=>total+=i.price*i.qty);
  const order = new Order({tableId:table._id, items, totals:total});
  await order.save();
  res.json(order);
});

// Get orders by table/status (staff)
router.get('/', async (req,res)=>{
  const {status,table} = req.query;
  const query = {};
  if(status) query.status = status;
  if(table) query.tableId = table;
  const orders = await Order.find(query).populate('tableId').populate('items.menuItemId');
  res.json(orders);
});

// ✅ Get all active (placed or preparing) orders
router.get('/active', async (req, res) => {
  try {
    const orders = await Order.find({
      status: { $in: ['placed', 'preparing'] }
    })
      .populate('tableId')
      .populate('items.menuItemId');

    if (!orders.length) {
      return res.status(200).json({ message: 'No active orders found' });
    }

    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching active orders:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update order status (staff)
router.patch('/:id/status', async (req,res)=>{
  const {status} = req.body;
  const order = await Order.findById(req.params.id);
  if(!order) return res.status(404).json({error:'Order not found'});
  order.status = status;
  await order.save();
  res.json(order);
});

module.exports = router;
