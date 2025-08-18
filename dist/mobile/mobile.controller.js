"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLives = exports.getPodcasts = exports.getLatestCourses = exports.getLatestArticles = exports.getHomeSlider = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getHomeSlider = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getHomeSlider = getHomeSlider;
const getLatestArticles = async (req, res) => {
    try {
        const latestArticles = await prisma.article.findMany({
            orderBy: {
                createdAt: "desc",
            },
            take: 3,
        });
        res.json(latestArticles);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getLatestArticles = getLatestArticles;
const getLatestCourses = async (req, res) => {
    try {
        const latestCourses = await prisma.course.findMany({
            orderBy: {
                createdAt: "desc",
            },
            take: 3,
        });
        res.json(latestCourses);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getLatestCourses = getLatestCourses;
const getPodcasts = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getPodcasts = getPodcasts;
const getLives = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getLives = getLives;
