import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CreateSurveyInput } from "./survey.types";

const prisma = new PrismaClient();

export const createSurvey = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const { answers }: CreateSurveyInput = req.body;
    try {
        const survey = await prisma.survey.create({
            data: {
                userId: Number(req.userId),
                answers,
            },
        });

        res.json(survey);
    } catch (error) {
        res.status(500).json({ error });
    }
};
