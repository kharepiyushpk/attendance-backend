// server/config.js
import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI,
  clientURL: process.env.CLIENT_URL || "http://localhost:5173",
};

export default config;
