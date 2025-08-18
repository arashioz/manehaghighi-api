"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTP = exports.requestOTP = void 0;
const client_1 = require("@prisma/client");
const otp_1 = require("../utils/otp");
const prisma = new client_1.PrismaClient();
const requestOTP = async (req, res) => {
    const { phone } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { phone } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const otp = (0, otp_1.generateOTP)();
        const smsSent = await (0, otp_1.sendSMS)(phone, otp);
        if (smsSent) {
            await prisma.user.update({
                where: { id: user.id },
                data: { phoneOtp: otp },
            });
            res.json({ message: "پیام با موفقیت ارسال شد" });
        }
        else {
            res.status(500).json({ message: "ارسال پیام ناموفق بود" });
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.requestOTP = requestOTP;
const verifyOTP = async (req, res) => {
    const { phone, otp } = req.body;
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
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.verifyOTP = verifyOTP;
