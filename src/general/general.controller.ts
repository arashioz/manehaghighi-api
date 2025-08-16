import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getStats = async (req: Request, res: Response) => {
    try {
        const usersCount = await prisma.user.aggregate({
            _count: true,
        });
        const articlesCount = await prisma.article.aggregate({
            _count: true,
        });
        const coursesCount = await prisma.course.aggregate({
            _count: true,
        });
        const episodesCount = await prisma.episode.aggregate({
            _count: true,
        });

        res.json({
            usersCount,
            articlesCount,
            coursesCount,
            episodesCount,
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};
