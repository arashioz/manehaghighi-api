import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { RequestPaymentInput } from "./payment.types";
import ZarinPal from "zarinpal-checkout";

const MERCHANT_ID = "5869a070-5a85-11e7-a004-005056a205be";
const zarinpal = ZarinPal.create(MERCHANT_ID, false);
const prisma = new PrismaClient();

export const requestPayment = async (req: Request, res: Response) => {
    try {
        const { courseId }: RequestPaymentInput = req.body;

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
            Email: user.email as string | undefined,
            Mobile: user.phone as string | undefined,
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
        } else {
            res.status(400).json({ error: "Payment initiation failed" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error });
    }
};

export const verifyPayment = async (req: Request, res: Response) => {
    const { Authority, Status } = req.query;

    try {
        if (Status === "OK") {
            const payment = await prisma.payment.findUnique({
                where: { authority: Authority?.toString() },
                include: { course: true },
            });

            if (!payment) {
                return res.status(404).json({ error: "Payment not found" });
            }

            const result = await zarinpal.PaymentVerification({
                Amount: payment.amount,
                Authority: Authority?.toString()!,
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
                    url: `/payment-success?refId=${(result as any).refId}`,
                });
            } else {
                await prisma.payment.update({
                    where: { id: payment.id },
                    data: { status: "FAILED" },
                });
                res.json({
                    url: `/payment-failed?error=${result.status}`,
                });
            }
        } else {
            const payment = await prisma.payment.findUnique({
                where: { authority: Authority?.toString() },
            });
            if (payment) {
                await prisma.payment.update({
                    where: { id: payment.id },
                    data: { status: "FAILED" },
                });
            }
            res.json({ url: "/payment-failed" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error });
    }
};
