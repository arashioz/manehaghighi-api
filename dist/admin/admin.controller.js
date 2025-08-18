"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSurveys = exports.editEpisode = exports.createEpisode = exports.getEpisode = exports.getEpisodes = exports.createArticle = exports.editArticle = exports.getArticle = exports.getArticles = exports.editCourse = exports.addUsersForCourse = exports.createCourse = exports.getCourse = exports.getCourses = exports.deleteComment = exports.getComments = exports.approveComment = exports.addCoursesForUser = exports.getUsers = exports.createUser = exports.closeTicket = exports.answerTicket = exports.getTickets = exports.login = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_1 = require("../utils/token");
const prisma = new client_1.PrismaClient();
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(400).json({ error: "کاربری با این ایمیل یافت نشد" });
        }
        const validPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!validPassword) {
            res.status(400).json({ error: "رمز عبور اشتباه است" });
        }
        const token = (0, token_1.generateToken)(user.id);
        res.json({ accessToken: token, message: "ورود موفقیت‌آمیز" });
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.login = login;
const getTickets = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getTickets = getTickets;
const answerTicket = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.answerTicket = answerTicket;
const closeTicket = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.closeTicket = closeTicket;
const createUser = async (req, res) => {
    try {
        const { email, password, name, phone } = req.body;
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
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
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.createUser = createUser;
const getUsers = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getUsers = getUsers;
const addCoursesForUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { courseIds } = req.body;
        const courses = courseIds.map((id) => ({ id }));
        await prisma.user.update({
            where: { id: Number(id) },
            data: { courses: { connect: courses } },
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.addCoursesForUser = addCoursesForUser;
const approveComment = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.comment.update({
            where: { id: Number(id) },
            data: { approved: true },
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.approveComment = approveComment;
const getComments = async (req, res) => {
    try {
        const comments = await prisma.comment.findMany({
            include: { user: true },
            orderBy: { createdAt: "desc" },
        });
        res.json(comments);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getComments = getComments;
const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.comment.delete({ where: { id: Number(id) } });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.deleteComment = deleteComment;
const getCourses = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getCourses = getCourses;
const getCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await prisma.course.findUnique({
            where: { id: Number(id) },
        });
        res.json(course);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getCourse = getCourse;
const createCourse = async (req, res) => {
    try {
        const { title, enTitle, description, price, hero, Intro, time, seasons, } = req.body;
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
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.createCourse = createCourse;
const addUsersForCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { userIds } = req.body;
        const users = userIds.map((id) => ({ id }));
        await prisma.course.update({
            where: { id: Number(id) },
            data: { users: { connect: users } },
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.addUsersForCourse = addUsersForCourse;
const editCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, enTitle, description, price, hero, Intro, time, seasons, } = req.body;
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
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.editCourse = editCourse;
const getArticles = async (req, res) => {
    try {
        const articles = await prisma.article.findMany({
            include: { comments: { select: { id: true } } },
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
        const { id } = req.params;
        const article = await prisma.article.findUnique({
            where: { id: Number(id) },
        });
        res.json(article);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getArticle = getArticle;
const editArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, enTitle, content, description, hero } = req.body;
        const article = await prisma.article.update({
            where: { id: Number(id) },
            data: { title, enTitle, content, description, hero },
        });
        res.status(201).json(article);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.editArticle = editArticle;
const createArticle = async (req, res) => {
    try {
        const { title, enTitle, content, description, hero, } = req.body;
        const article = await prisma.article.create({
            data: { title, enTitle, content, description, hero },
        });
        res.status(201).json(article);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.createArticle = createArticle;
const getEpisodes = async (req, res) => {
    try {
        const episode = await prisma.episode.findMany({
            include: { course: true },
            orderBy: { createdAt: "desc" },
        });
        res.json(episode);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getEpisodes = getEpisodes;
const getEpisode = async (req, res) => {
    try {
        const { id } = req.params;
        const episode = await prisma.episode.findUnique({
            where: { id: Number(id) },
            include: {
                course: true,
            },
        });
        res.json(episode);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getEpisode = getEpisode;
const createEpisode = async (req, res) => {
    try {
        const { title, description, courseId, duration, order, videoUrl480, videoUrl720, } = req.body;
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
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.createEpisode = createEpisode;
const editEpisode = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, courseId, duration, order, videoUrl480, videoUrl720, } = req.body;
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
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.editEpisode = editEpisode;
const getSurveys = async (req, res) => {
    try {
        const surveys = await prisma.survey.findMany({
            include: { user: true },
            orderBy: { createdAt: "desc" },
        });
        res.json(surveys);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getSurveys = getSurveys;
