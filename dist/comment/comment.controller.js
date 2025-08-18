"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArticleComment = exports.getArticleComments = exports.createCourseComment = exports.getCourseComments = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// COURSE Comment Operations
const getCourseComments = async (req, res) => {
    try {
        const { courseId } = req.params;
        const comments = await prisma.comment.findMany({
            where: { courseId: Number(courseId), approved: true },
            include: { user: { select: { name: true } } },
        });
        res.json(comments);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getCourseComments = getCourseComments;
const createCourseComment = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { content } = req.body;
        const comment = await prisma.comment.create({
            data: { content, userId: req.userId, courseId: Number(courseId) },
        });
        res.status(201).json(comment);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.createCourseComment = createCourseComment;
// ARTICLE Comment Operations
const getArticleComments = async (req, res) => {
    try {
        const { articleId } = req.params;
        const comments = await prisma.comment.findMany({
            where: { articleId: Number(articleId), approved: true },
            include: { user: { select: { name: true } } },
        });
        res.json(comments);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getArticleComments = getArticleComments;
const createArticleComment = async (req, res) => {
    try {
        const { articleId } = req.params;
        const { content } = req.body;
        const comment = await prisma.comment.create({
            data: { content, userId: req.userId, articleId: Number(articleId) },
        });
        res.status(201).json(comment);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};
exports.createArticleComment = createArticleComment;
