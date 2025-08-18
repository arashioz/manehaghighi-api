"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.continueTicket = exports.createTicket = exports.me = exports.meHaveCourse = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const meHaveCourse = async (req, res) => {
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
        const haveCourse = user.courses.some((course) => course.id === Number(courseId));
        res.json({ haveCourse });
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.meHaveCourse = meHaveCourse;
const me = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.me = me;
const createTicket = async (req, res) => {
    try {
        const { title, message } = req.body;
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};
exports.createTicket = createTicket;
const continueTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};
exports.continueTicket = continueTicket;
