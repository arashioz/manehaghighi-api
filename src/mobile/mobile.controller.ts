import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getHomeSlider = async (req: Request, res: Response) => {
    try {
        res.json([
            {
                id: 1,
                title: "سفر به اعماق درون",
                image: "/static/assets/course-introcution/A Journey into Deep Self Moarefi Dore Site.jpg",
            },
            {
                id: 2,
                title: "سفر به ناخودآگاه",
                image: "/static/assets/course-introcution/A Journey into Unconscious Mind Moarefi Dore Site.jpg",
            },
        ]);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const getLatestArticles = async (req: Request, res: Response) => {
    try {
        const latestArticles = await prisma.article.findMany({
            orderBy: {
                createdAt: "desc",
            },
            take: 3,
        });
        res.json(latestArticles);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const getLatestCourses = async (req: Request, res: Response) => {
    try {
        const latestCourses = await prisma.course.findMany({
            orderBy: {
                createdAt: "desc",
            },
            take: 3,
        });
        res.json(latestCourses);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const getPodcasts = async (req: Request, res: Response) => {
    try {
        res.json([
            {
                id: 1,
                title: "پادکست 1",
                url: "/static/assets/podcast.mp3",
            },
            {
                id: 2,
                title: "پادکست 2",
                url: "/static/assets/podcast.mp3",
            },
        ]);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const getLives = async (req: Request, res: Response) => {
    try {
        res.json([
            {
                id: 1,
                title: "لایو 1",
                url: "/static/assets/live.mp4",
            },
            {
                id: 2,
                title: "لایو 2",
                url: "/static/assets/live.mp4",
            },
        ]);
    } catch (error) {
        res.status(500).json({ error });
    }
};
