// server/routes/employeeRoutes.js
import express from "express";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  updateAttendance,
} from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", getEmployees);
router.post("/", addEmployee);
router.put("/:empId", updateEmployee);
router.delete("/:empId", deleteEmployee);
router.put("/:empId/attendance", updateAttendance);

export default router;
