"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExam = exports.getExams = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getExams = async (req, res) => {
    try {
        const exams = await prisma.exam.findMany({
            where: {
                userId: req.userId,
            },
            orderBy: {
                createdAt: "asc",
            },
        });
        res.json(exams);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getExams = getExams;
const createExam = async (req, res) => {
    const { scores } = req.body;
    try {
        const exam = await prisma.exam.create({
            data: {
                userId: Number(req.userId),
                scores,
            },
        });
        res.json(exam);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.createExam = createExam;
