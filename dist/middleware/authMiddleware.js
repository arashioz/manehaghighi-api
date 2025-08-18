"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.adminMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const admin_1 = require("../utils/admin");
const adminMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
    console.log("authMiddleware -> token", token);
    if (!token) {
        res.status(401).json({ error: "ابتدا وارد شوید" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret);
        if (decoded.userId !== admin_1.ADMIN_ID) {
            res.status(403).json({ error: "شما دسترسی ندارید" });
            return;
        }
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        res.status(400).json({ error: "دوباره وارد شوید" });
    }
};
exports.adminMiddleware = adminMiddleware;
const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
    console.log("authMiddleware -> token", token);
    if (!token) {
        res.status(401).json({ error: "ابتدا وارد شوید" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        res.status(400).json({ error: "دوباره وارد شوید" });
    }
};
exports.authMiddleware = authMiddleware;
