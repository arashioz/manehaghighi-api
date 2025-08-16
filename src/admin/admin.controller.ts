import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
    CreateArticleInput,
    EditCourseInput,
    LoginInput,
    CreateUserInput,
    EditArticleInput,
    AddCourseForUserInput,
    AddUserForCourseInput,
    CreateEpisodeInput,
} from "./admin.types";
import { CreateCourseInput } from "./admin.types";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password }: LoginInput = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(400).json({ error: "کاربری با این ایمیل یافت نشد" });
        }
        const validPassword = await bcrypt.compare(password, user!.password);
        if (!validPassword) {
            res.status(400).json({ error: "رمز عبور اشتباه است" });
        }
        const token = generateToken(user!.id);
        res.json({ accessToken: token, message: "ورود موفقیت‌آمیز" });
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const getTickets = async (req: Request, res: Response) => {
    try {
        const notAnsweredTickets = await prisma.ticket.findMany({
            where: { open: true },
            include: {
                messages: true,
                user: true,
            },
            orderBy: { createdAt: "desc" },
        });
        const answeredTickets = await prisma.ticket.findMany({
            where: { open: false },
            include: {
                messages: true,
                user: true,
            },
            orderBy: { createdAt: "desc" },
        });
        const tickets = { notAnsweredTickets, answeredTickets };
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const answerTicket = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { message } = req.body;
        const ticket = await prisma.ticket.findUnique({
            where: { id: Number(id) },
            select: { open: true },
        });
        if (!ticket || !ticket.open) {
            return res.status(400).json({ error: "تیکت بسته شده است" });
        }
        await prisma.message.create({
            data: {
                content: message,
                isAdmin: true,
                ticket: { connect: { id: Number(id) } },
            },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const closeTicket = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const ticket = await prisma.ticket.findUnique({
            where: { id: Number(id) },
            select: { open: true },
        });
        if (!ticket || !ticket.open) {
            return res.status(400).json({ error: "تیکت بسته شده است" });
        }
        await prisma.ticket.update({
            where: { id: Number(id) },
            data: { open: false },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, password, name, phone }: CreateUserInput = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                phone,
                emailVerified: true,
                phoneVerified: true,
            },
        });
        res.status(201).send();
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                comments: { select: { id: true } },
                courses: { select: { id: true } },
                payments: { select: { id: true } },
                tickets: { select: { id: true } },
            },
            orderBy: { createdAt: "desc" },
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const addCoursesForUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { courseIds }: AddCourseForUserInput = req.body;
        const courses = courseIds.map((id) => ({ id }));
        await prisma.user.update({
            where: { id: Number(id) },
            data: { courses: { connect: courses } },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const approveComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.comment.update({
            where: { id: Number(id) },
            data: { approved: true },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const getComments = async (req: Request, res: Response) => {
    try {
        const comments = await prisma.comment.findMany({
            include: { user: true },
            orderBy: { createdAt: "desc" },
        });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.comment.delete({ where: { id: Number(id) } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const getCourses = async (req: Request, res: Response) => {
    try {
        const courses = await prisma.course.findMany({
            include: {
                comments: { select: { id: true } },
                episodes: { select: { id: true } },
                payments: { select: { id: true } },
                users: { select: { id: true } },
            },
            orderBy: { createdAt: "desc" },
        });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const getCourse = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const course = await prisma.course.findUnique({
            where: { id: Number(id) },
        });
        res.json(course);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const createCourse = async (req: Request, res: Response) => {
    try {
        const {
            title,
            enTitle,
            description,
            price,
            hero,
            Intro,
            time,
            seasons,
        }: CreateCourseInput = req.body;
        const course = await prisma.course.create({
            data: {
                title,
                enTitle,
                description,
                price,
                hero,
                Intro,
                time,
                seasons,
            },
        });
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const addUsersForCourse = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userIds }: AddUserForCourseInput = req.body;
        const users = userIds.map((id) => ({ id }));
        await prisma.course.update({
            where: { id: Number(id) },
            data: { users: { connect: users } },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const editCourse = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            title,
            enTitle,
            description,
            price,
            hero,
            Intro,
            time,
            seasons,
        }: EditCourseInput = req.body;
        const course = await prisma.course.update({
            where: { id: Number(id) },
            data: {
                title,
                enTitle,
                description,
                price,
                hero,
                Intro,
                time,
                seasons,
            },
        });
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const getArticles = async (req: Request, res: Response) => {
    try {
        const articles = await prisma.article.findMany({
            include: { comments: { select: { id: true } } },
            orderBy: { createdAt: "desc" },
        });
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const getArticle = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const article = await prisma.article.findUnique({
            where: { id: Number(id) },
        });
        res.json(article);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const editArticle = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, enTitle, content, description, hero }: EditArticleInput =
            req.body;
        const article = await prisma.article.update({
            where: { id: Number(id) },
            data: { title, enTitle, content, description, hero },
        });
        res.status(201).json(article);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const createArticle = async (req: Request, res: Response) => {
    try {
        const {
            title,
            enTitle,
            content,
            description,
            hero,
        }: CreateArticleInput = req.body;
        const article = await prisma.article.create({
            data: { title, enTitle, content, description, hero },
        });
        res.status(201).json(article);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const getEpisodes = async (req: Request, res: Response) => {
    try {
        const episode = await prisma.episode.findMany({
            include: { course: true },
            orderBy: { createdAt: "desc" },
        });
        res.json(episode);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const getEpisode = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const episode = await prisma.episode.findUnique({
            where: { id: Number(id) },
            include: {
                course: true,
            },
        });
        res.json(episode);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const createEpisode = async (req: Request, res: Response) => {
    try {
        const {
            title,
            description,
            courseId,
            duration,
            order,
            videoUrl480,
            videoUrl720,
        }: CreateEpisodeInput = req.body;
        const episode = await prisma.episode.create({
            data: {
                title,
                description,
                duration,
                order,
                videoUrl480,
                videoUrl720,
                course: { connect: { id: courseId } },
            },
        });
        res.status(201).json(episode);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const editEpisode = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            courseId,
            duration,
            order,
            videoUrl480,
            videoUrl720,
        }: CreateEpisodeInput = req.body;
        const episode = await prisma.episode.update({
            where: {
                id: Number(id),
            },
            data: {
                title,
                description,
                duration,
                order,
                videoUrl480,
                videoUrl720,
                course: { connect: { id: courseId } },
            },
        });
        res.status(201).json(episode);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const getSurveys = async (req: Request, res: Response) => {
    try {
        const surveys = await prisma.survey.findMany({
            include: { user: true },
            orderBy: { createdAt: "desc" },
        });
        res.json(surveys);
    } catch (error) {
        res.status(500).json({ error });
    }
};
