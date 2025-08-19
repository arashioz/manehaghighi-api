import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CreateTicketInput } from "./user.types";

const prisma = new PrismaClient();

export const meHaveCourse = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { courseId } = req.params;
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            include: {
                courses: true,
            },
        });

        if (!user) {
            res.status(404).json({ error: "کاربر یافت نشد" });
            return;
        }

        const haveCourse = user.courses.some(
            (course: { id: number }) => course.id === Number(courseId),
        );
        res.json({ haveCourse });
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const me = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            include: {
                comments: true,
                courses: true,
                exams: true,
                tickets: {
                    include: {
                        messages: true,
                    },
                },
            },
        });

        if (!user) {
            res.status(404).json({ error: "کاربر یافت نشد" });
            return;
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const createTicket = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { title, message }: CreateTicketInput = req.body;
        const ticket = await prisma.ticket.create({
            data: {
                title,
                messages: {
                    create: {
                        content: message,
                    },
                },
                user: {
                    connect: {
                        id: req.userId,
                    },
                },
            },
        });

        res.json(ticket);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};

export const continueTicket = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { id } = req.params;
        const { message }: CreateTicketInput = req.body;
        const ticket = await prisma.ticket.update({
            where: {
                id: Number(id),
            },
            data: {
                open: true,
                messages: {
                    create: {
                        content: message,
                    },
                },
                user: {
                    connect: {
                        id: req.userId,
                    },
                },
            },
        });

        res.json(ticket);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};
