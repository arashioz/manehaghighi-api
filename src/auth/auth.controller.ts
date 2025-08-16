import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { RegisterInput, LoginInput } from "./auth.types";
import { generateToken } from "../utils/token";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, phone, password }: RegisterInput = req.body;

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

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, phone, password: hashedPassword },
        });

        // Generate access token
        const token = generateToken(user.id);

        res.status(201).json({
            message: "کاربر با موفقیت ثبت‌نام شد",
            accessToken: token,
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password }: LoginInput = req.body;

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
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: "اطلاعات نا‌معتبر است" });
            return;
        }

        // Generate access token
        const token = generateToken(user.id);

        res.json({
            message: "ورود با موفقیت انجام شد",
            accessToken: token,
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};
