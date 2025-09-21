const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const todoRoutes = require("./routes/todos");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/todos", todoRoutes);

// ✅ Serve React frontend in production
// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../client/build");
  app.use(express.static(frontendPath));

  // Catch-all: must be "/*", not "*", not ":all(*)"
  app.get("/*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}


// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
