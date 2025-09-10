// server/controllers/employeeController.js
import Employee from "../models/Employee.js";

// ✅ Get all employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Add new employee
export const addEmployee = async (req, res) => {
  try {
    const { empId, name, role } = req.body;

    const existing = await Employee.findOne({ empId });
    if (existing) return res.status(400).json({ message: "Employee ID already exists" });

    const newEmployee = new Employee({ empId, name, role, attendance: [] });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update employee details
export const updateEmployee = async (req, res) => {
  try {
    const { empId } = req.params;
    const { name, role, newEmpId } = req.body;

    const updated = await Employee.findOneAndUpdate(
      { empId },
      { empId: newEmpId || empId, name, role },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Employee not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete employee
export const deleteEmployee = async (req, res) => {
  try {
    const { empId } = req.params;
    const deleted = await Employee.findOneAndDelete({ empId });
    if (!deleted) return res.status(404).json({ message: "Employee not found" });

    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update attendance
export const updateAttendance = async (req, res) => {
  try {
    const { empId } = req.params;
    const { year, month, day, status } = req.body;

    const employee = await Employee.findOne({ empId });
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    let record = employee.attendance.find(r => r.year === year && r.month === month);
    if (!record) {
      record = { year, month, days: {} };
      employee.attendance.push(record);
    }

    record.days.set(String(day), status);

    await employee.save();
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
