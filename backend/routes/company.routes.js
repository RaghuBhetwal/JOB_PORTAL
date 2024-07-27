import express from "express";
import { getCompanyById, registerCompany, updateCompany, getCompany } from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/isauthenticated.js";

const router = express.Router();

// Register a new company
router.post("/register", isAuthenticated, registerCompany);

// Get a list of companies
router.get("/get", isAuthenticated, getCompany);

// Get a company by ID
router.get("/get/:id", isAuthenticated, getCompanyById);

// Update company information
router.put("/update/:id", isAuthenticated, updateCompany);

export default router;
