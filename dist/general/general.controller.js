"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getStats = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getStats = getStats;
