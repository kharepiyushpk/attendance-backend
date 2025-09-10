// server/server.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import employeeRoutes from "./routes/employeeRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in .env");
  process.exit(1);
}

// ✅ Configure CORS properly
const allowedOrigins = [
  "http://localhost:5173",   // local dev
  "https://attendance-frontend-eight-weld.vercel.app" // deployed frontend
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Handle preflight
app.options("*", cors());

app.use(express.json({ limit: "5mb" }));

// routes
app.use("/api/employees", employeeRoutes);

// basic health
app.get("/", (req, res) => res.send("Attendance API is up"));

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
