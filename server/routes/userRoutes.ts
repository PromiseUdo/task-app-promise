import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUser,
  logoutUser,
} from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

router.post("/", registerUser);
router.post("/auth", authUser);
router.get("/profile", protect, getUser);
router.post("/logout", logoutUser);

export default router;
