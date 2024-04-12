"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
router.post("/", userController_1.registerUser);
router.post("/auth", userController_1.authUser);
router.get("/profile", authMiddleware_1.protect, userController_1.getUser);
router.post("/logout", userController_1.logoutUser);
exports.default = router;
