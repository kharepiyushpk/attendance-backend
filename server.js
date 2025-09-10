// server/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import config from "./config.js";
import employeeRoutes from "./routes/employeeRoutes.js";

const app = express();

// Middleware
app.use(cors({
  origin: ["https://attendance-frontend-eight-weld.vercel.app/"], // your Vercel domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json({ limit: "5mb" }));

// Routes
app.use("/api/employees", employeeRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("✅ Attendance API is running");
});

// Connect DB and Start server
mongoose.connect(config.mongoURI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(config.port, () =>
      console.log(`🚀 Server running on port ${config.port}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
