import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
    CreateArticleCommentInput,
    CreateCourseCommentInput,
} from "./comment.types";

const prisma = new PrismaClient();

// COURSE Comment Operations
export const getCourseComments = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        const comments = await prisma.comment.findMany({
            where: { courseId: Number(courseId), approved: true },
            include: { user: { select: { name: true } } },
        });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const createCourseComment = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        const { content }: CreateCourseCommentInput = req.body;
        const comment = await prisma.comment.create({
            data: { content, userId: req.userId, courseId: Number(courseId) },
        });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// ARTICLE Comment Operations
export const getArticleComments = async (req: Request, res: Response) => {
    try {
        const { articleId } = req.params;
        const comments = await prisma.comment.findMany({
            where: { articleId: Number(articleId), approved: true },
            include: { user: { select: { name: true } } },
        });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const createArticleComment = async (req: Request, res: Response) => {
    try {
        const { articleId } = req.params;
        const { content }: CreateArticleCommentInput = req.body;
        const comment = await prisma.comment.create({
            data: { content, userId: req.userId, articleId: Number(articleId) },
        });
        res.status(201).json(comment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};
