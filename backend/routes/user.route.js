import express from "express";
import { register, login, logout, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isauthenticated.js"; 

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);  // Change to POST for logout if necessary
router.post("/profile/update", isAuthenticated, updateProfile); // Securing this route 

export default router;
