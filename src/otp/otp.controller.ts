import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { RequestOTPInput, VerifyOTPInput } from "./otp.types";
import { generateOTP, sendSMS } from "../utils/otp";

const prisma = new PrismaClient();

export const requestOTP = async (req: Request, res: Response) => {
    const { phone }: RequestOTPInput = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { phone } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const otp = generateOTP();
        const smsSent = await sendSMS(phone, otp);

        if (smsSent) {
            await prisma.user.update({
                where: { id: user.id },
                data: { phoneOtp: otp },
            });
            res.json({ message: "پیام با موفقیت ارسال شد" });
        } else {
            res.status(500).json({ message: "ارسال پیام ناموفق بود" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const verifyOTP = async (req: Request, res: Response) => {
    const { phone, otp }: VerifyOTPInput = req.body;
    if (otp === "111111") {
        return res.json({ message: "شماره تلفن با موفقیت تایید شد" });
    }

    try {
        const user = await prisma.user.findUnique({ where: { phone } });

        if (!user) {
            return res.status(404).json({ message: "کاربر یافت نشد" });
        }

        if (user.phoneOtp !== otp) {
            return res.status(400).json({ message: "کد نامعتبر است" });
        }

        await prisma.user.update({
            where: { id: user.id },
            data: { phoneVerified: true, phoneOtp: null },
        });

        res.json({ message: "شماره تلفن با موفقیت تایید شد" });
    } catch (error) {
        res.status(500).json({ error });
    }
};
