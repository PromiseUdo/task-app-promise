"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.logoutUser = exports.registerUser = exports.authUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
// @desc Auth user/set token
// route POST /api/users/auth
// @access  Public
const authUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModel_1.default.findOne({ email });
    if (user && (yield user.matchPassword(password))) {
        (0, generateToken_1.default)(res, user._id);
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    }
    else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
}));
exports.authUser = authUser;
const registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    const userExists = yield userModel_1.default.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    const user = yield userModel_1.default.create({
        username,
        email,
        password,
    });
    if (user) {
        (0, generateToken_1.default)(res, user._id);
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid user data");
    }
}));
exports.registerUser = registerUser;
const logoutUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({
        message: "Logged out",
    });
}));
exports.logoutUser = logoutUser;
const getUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        _id: req.user.id,
        username: req.user.username,
        email: req.user.email,
    };
    res.status(200).json(user);
}));
exports.getUser = getUser;
