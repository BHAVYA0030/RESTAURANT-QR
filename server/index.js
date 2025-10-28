// const express = require('express'); 
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const authRoutes = require('./routes/auth');
// const menuRoutes = require('./routes/menu');
// const tableRoutes = require('./routes/tables');
// const orderRoutes = require('./routes/orders');
// const cartRoutes= require('./routes/cartRoutes');

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/menu', menuRoutes);
// app.use('/api/cartRoutes',cartRoutes);
// app.use('/api/tables', tableRoutes);
// app.use('/api/orders', orderRoutes);

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));




// app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// const generateQRCodes = require('./utils/generateQRCodes');

// // After DB connection success
// generateQRCodes("http://localhost:5173"); 
// // 🔁 you can replace with your deployed frontend URL later

// const authRoutes = require('./routes/auth');
// const menuRoutes = require('./routes/menu');
// const tableRoutes = require('./routes/tables');
// const orderRoutes = require('./routes/orders');
// const cartRoutes = require('./routes/cartRoutes');

// const app = express();

// app.use(cors());
// app.use(express.json());

// // API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/menu', menuRoutes);
// app.use('/api/cartRoutes', cartRoutes);
// app.use('/api/tables', tableRoutes);
// app.use('/api/orders', orderRoutes);

// // Health check
// app.get('/', (req, res) => res.send('Server is running'));

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));



// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const generateQRCodes = require("./utils/generateQRCodes"); // ✅ adjust path if needed

// dotenv.config();
// const app = express();

// const PORT = process.env.PORT || 4000;
// const baseURL = process.env.BASE_URL || `http://localhost:${PORT}`;

// // ✅ Connect to MongoDB first
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(async () => {
//     console.log("MongoDB connected");

//     // ✅ Run QR code generation *after* connection established
//     try {
//       await generateQRCodes(baseURL);
//       console.log("✅ QR codes generated successfully");
//     } catch (err) {
//       console.error("❌ Error generating QR codes:", err);
//     }

//     // ✅ Start server only after MongoDB + QR code step is ready
//     app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
//   })
//   .catch((err) => console.error("MongoDB connection error:", err));



// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const generateQRCodes = require("./utils/generateQRCodes"); // ✅ adjust path if needed
// require("./models/MenuCategory");

// // ✅ Load .env variables
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 4000;
// const baseURL = process.env.BASE_URL || `http://localhost:${PORT}`;

// // ✅ Middlewares
// app.use(express.json()); // parse JSON requests

// // ✅ Allow CORS for React frontend (http://localhost:5173)
// app.use(
//   cors({
//     origin: "http://localhost:5173", // frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// // ✅ Import routes
// const authRoutes = require('./routes/auth');
// const menuRoutes = require('./routes/menu');
// const tableRoutes = require('./routes/tables');
// const orderRoutes = require('./routes/orders');
// const cartRoutes = require('./routes/cartRoutes');
// // ✅ Use routes
// app.use('/api/auth', authRoutes);
// app.use('/api/menu', menuRoutes);
// app.use('/api/cartRoutes', cartRoutes);
// app.use('/api/tables', tableRoutes);
// app.use('/api/orders', orderRoutes);
// // ✅ Default route
// app.get("/", (req, res) => {
//   res.send("🍽️ Restaurant QR Backend is running successfully!");
// });

// // ✅ Connect MongoDB and start server
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(async () => {
//     console.log("MongoDB connected");

//     // ✅ Generate QR codes only after successful DB connection
//     try {
//       await generateQRCodes(baseURL);
//       console.log("✅ QR codes generated successfully");
//     } catch (err) {
//       console.error("❌ Error generating QR codes:", err);
//     }

//     // ✅ Start server
//     app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
//   })
//   .catch((err) => console.error("MongoDB connection error:", err));





// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const path = require("path");
// const cors = require("cors");
// const generateQRCodes = require("./utils/generateQRCodes");
// require("./models/MenuCategory");

// // ✅ Load .env variables (with absolute path)
// dotenv.config({ path: path.join(__dirname, "../.env") });

// // ✅ Debug log to verify .env loaded
// console.log("📦 Loaded MONGO_URI:", process.env.MONGO_URI ? "✅ Found" : "❌ Missing");

// const app = express();
// const PORT = process.env.PORT || 4000;
// const baseURL = process.env.BASE_URL || `http://localhost:${PORT}`;

// // ✅ Middlewares
// app.use(express.json());

// // ✅ Allow CORS for React frontend (http://localhost:5173)
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// // ✅ Import routes
// const authRoutes = require("./routes/auth");
// const menuRoutes = require("./routes/menu");
// const tableRoutes = require("./routes/tables");
// const orderRoutes = require("./routes/orders");
// const cartRoutes = require("./routes/cartRoutes");

// // ✅ Use routes
// app.use("/api/auth", authRoutes);
// app.use("/api/menu", menuRoutes);
// app.use("/api/cartRoutes", cartRoutes);
// app.use("/api/tables", tableRoutes);
// app.use("/api/orders", orderRoutes);

// // ✅ Default route
// app.get("/", (req, res) => {
//   res.send("🍽️ Restaurant QR Backend is running successfully!");
// });

// // ✅ Connect MongoDB and start server
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(async () => {
//     console.log("✅ MongoDB connected");

//     // ✅ Generate QR codes after DB connection
//     try {
//       await generateQRCodes(baseURL);
//       console.log("✅ QR codes generated successfully");
//     } catch (err) {
//       console.error("❌ Error generating QR codes:", err);
//     }

//     app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
//   })
//   .catch((err) => console.error("❌ MongoDB connection error:", err));




  const express = require("express");
  const mongoose = require("mongoose");
  const dotenv = require("dotenv");
  const path = require("path");
  const cors = require("cors");
  const generateQRCodes = require("./utils/generateQRCodes");
  require("./models/MenuCategory");

  // ✅ Load environment variables from root .env
  dotenv.config({ path: path.join(__dirname, "../.env") });

  // ✅ Debug log
  console.log("📦 MONGO_URI:", process.env.MONGO_URI ? "✅ Found" : "❌ Missing");

  const app = express();
  const PORT = process.env.PORT || 4000;
  const baseURL = process.env.BASE_URL || `http://localhost:${PORT}`;

  // ✅ Middleware setup
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:5173", // frontend (Vite) origin
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

  // ✅ Import routes
  const authRoutes = require("./routes/auth");
  const menuRoutes = require("./routes/menu");
  const tableRoutes = require("./routes/tables");
  const orderRoutes = require("./routes/orders");
  const cartRoutes = require("./routes/cartRoutes");

  // ✅ Register routes
  app.use("/api/auth", authRoutes);
  app.use("/api/menu", menuRoutes);
  app.use("/api/cart", cartRoutes);
  app.use("/api/tables", tableRoutes);
  app.use("/api/orders", orderRoutes);

  // ✅ Default route
  app.get("/", (req, res) => {
    res.send("🍽️ Restaurant QR Backend is running successfully!");
  });

  // ✅ Connect MongoDB and start server
  mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
      console.log("✅ MongoDB connected successfully!");

      try {
        await generateQRCodes(baseURL);
        console.log("✅ QR codes generated successfully");
      } catch (err) {
        console.error("❌ Error generating QR codes:", err.message);
      }

      app.listen(PORT, () =>
        console.log(`🚀 Server running on: http://localhost:${PORT}`)
      );
    })
    .catch((err) => console.error("❌ MongoDB connection error:", err.message));
