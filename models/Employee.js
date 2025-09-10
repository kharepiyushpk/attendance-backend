// server/models/Employee.js
import mongoose from "mongoose";
import "../config.js";
const attendanceSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  month: { type: Number, required: true }, 
  days: {
    type: Map, of: String, default: {}
  }
});

const employeeSchema = new mongoose.Schema({
  empId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  attendance: [attendanceSchema]
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
