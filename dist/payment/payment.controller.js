"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = exports.requestPayment = void 0;
const client_1 = require("@prisma/client");
const zarinpal_checkout_1 = __importDefault(require("zarinpal-checkout"));
const MERCHANT_ID = "5869a070-5a85-11e7-a004-005056a205be";
const zarinpal = zarinpal_checkout_1.default.create(MERCHANT_ID, false);
const prisma = new client_1.PrismaClient();
const requestPayment = async (req, res) => {
    try {
        const { courseId } = req.body;
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
        });
        const course = await prisma.course.findUnique({
            where: { id: courseId },
        });
        if (!user || !course) {
            return res.status(404).json({ error: "User or Course not found" });
        }
        const callbackUrl = `https://mane-haghighi.liara.run/payment-verify`;
        const result = await zarinpal.PaymentRequest({
            Amount: course.price,
            CallbackURL: callbackUrl,
            Description: `Payment for course: ${course.title} by ${user.name}`,
            Email: user.email,
            Mobile: user.phone,
        });
        if (result.status === 100) {
            await prisma.payment.create({
                data: {
                    amount: course.price,
                    authority: result.authority,
                    status: "PENDING",
                    user: { connect: { id: req.userId } },
                    course: { connect: { id: courseId } },
                },
            });
            res.json({ paymentUrl: result.url });
        }
        else {
            res.status(400).json({ error: "Payment initiation failed" });
        }
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error });
    }
};
exports.requestPayment = requestPayment;
const verifyPayment = async (req, res) => {
    const { Authority, Status } = req.query;
    try {
        if (Status === "OK") {
            const payment = await prisma.payment.findUnique({
                where: { authority: Authority === null || Authority === void 0 ? void 0 : Authority.toString() },
                include: { course: true },
            });
            if (!payment) {
                return res.status(404).json({ error: "Payment not found" });
            }
            const result = await zarinpal.PaymentVerification({
                Amount: payment.amount,
                Authority: Authority === null || Authority === void 0 ? void 0 : Authority.toString(),
            });
            if (result.status === 100) {
                await prisma.payment.update({
                    where: { id: payment.id },
                    data: {
                        status: "SUCCESS",
                        refId: result.RefID,
                    },
                });
                await prisma.user.update({
                    where: { id: payment.userId },
                    data: {
                        courses: {
                            connect: { id: payment.courseId },
                        },
                    },
                });
                res.json({
                    url: `/payment-success?refId=${result.refId}`,
                });
            }
            else {
                await prisma.payment.update({
                    where: { id: payment.id },
                    data: { status: "FAILED" },
                });
                res.json({
                    url: `/payment-failed?error=${result.status}`,
                });
            }
        }
        else {
            const payment = await prisma.payment.findUnique({
                where: { authority: Authority === null || Authority === void 0 ? void 0 : Authority.toString() },
            });
            if (payment) {
                await prisma.payment.update({
                    where: { id: payment.id },
                    data: { status: "FAILED" },
                });
            }
            res.json({ url: "/payment-failed" });
        }
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error });
    }
};
exports.verifyPayment = verifyPayment;
