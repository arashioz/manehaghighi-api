"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticle = exports.getArticles = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getArticles = async (req, res) => {
    try {
        const { search } = req.query;
        let whereClause = {};
        if (typeof search === "string" && search.trim() !== "") {
            whereClause = {
                OR: [
                    { title: { contains: search, mode: "insensitive" } },
                    { enTitle: { contains: search, mode: "insensitive" } },
                ],
            };
        }
        const articles = await prisma.article.findMany({
            where: whereClause,
            select: {
                id: true,
                title: true,
                enTitle: true,
                description: true,
                hero: true,
            },
            orderBy: { createdAt: "desc" },
        });
        res.json(articles);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getArticles = getArticles;
const getArticle = async (req, res) => {
    try {
        const { slug } = req.params;
        const article = await prisma.article.findUnique({
            where: { enTitle: slug },
        });
        if (article) {
            res.json(article);
        }
        else {
            res.status(404).json({ error: "مقاله یافت نشد" });
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getArticle = getArticle;
