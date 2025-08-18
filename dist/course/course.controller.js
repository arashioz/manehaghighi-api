"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourse = exports.getCourses = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getCourses = async (req, res) => {
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
        const courses = await prisma.course.findMany({
            where: whereClause,
            select: {
                id: true,
                title: true,
                enTitle: true,
                price: true,
                hero: true,
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
        const { slug } = req.params;
        const course = await prisma.course.findUnique({
            where: { enTitle: slug },
        });
        if (course) {
            res.json(course);
        }
        else {
            res.status(404).json({ error: "دوره یافت نشد" });
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getCourse = getCourse;
