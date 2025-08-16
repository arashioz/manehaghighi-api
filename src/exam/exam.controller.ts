import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CreateExamInput } from "./exam.types";

const prisma = new PrismaClient();

export const getExams = async (req: Request, res: Response) => {
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
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const createExam = async (req: Request, res: Response) => {
    const { scores }: CreateExamInput = req.body;

    try {
        const exam = await prisma.exam.create({
            data: {
                userId: Number(req.userId),
                scores,
            },
        });

        res.json(exam);
    } catch (error) {
        res.status(500).json({ error });
    }
};
