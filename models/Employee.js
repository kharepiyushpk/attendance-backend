// server/models/Employee.js
import mongoose from "mongoose";
import "../config.js"; // ✅ load config if it sets up env variables (like dotenv)
                      // If config.js exports something, import it properly, see note below.

// --- Attendance sub-schema ---
const attendanceSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  month: { type: Number, required: true }, // 1 = January, 12 = December
  days: {
    type: Map,
    of: String, // Example: { "1": "Present", "2": "Absent", "3": "Holiday" }
    default: {}
  }
});

// --- Employee schema ---
const employeeSchema = new mongoose.Schema({
  empId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  attendance: [attendanceSchema]
}, { timestamps: true });

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
