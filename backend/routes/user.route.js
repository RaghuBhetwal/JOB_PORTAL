import express from "express";
import { register, login, updateProfile } from "..controllers/user.controllers.js";
import isAuthenticated from "./path_to_your_middleware";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated, updateProfile); // Securing this route 

export default router;
