"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const token_1 = require("../utils/token");
const prisma = new client_1.PrismaClient();
const register = async (req, res) => {
    try {
        const { name, phone, password } = req.body;
        // Validate phone number
        const phoneRegex = /^9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/;
        if (!phoneRegex.test(phone)) {
            res.status(400).json({ error: "شماره موبایل نامعتبر است" });
            return;
        }
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { phone } });
        if (existingUser) {
            res.status(400).json({ error: "این کاربر قبلا ثبت‌نام کرده است" });
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, phone, password: hashedPassword },
        });
        // Generate access token
        const token = (0, token_1.generateToken)(user.id);
        res.status(201).json({
            message: "کاربر با موفقیت ثبت‌نام شد",
            accessToken: token,
        });
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Username can be either phone or email
        const user = await prisma.user.findFirst({
            where: {
                OR: [{ phone: username }, { email: username }],
            },
        });
        if (!user) {
            res.status(401).json({ error: "اطلاعات نا‌معتبر است" });
            return;
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: "اطلاعات نا‌معتبر است" });
            return;
        }
        // Generate access token
        const token = (0, token_1.generateToken)(user.id);
        res.json({
            message: "ورود با موفقیت انجام شد",
            accessToken: token,
        });
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.login = login;
