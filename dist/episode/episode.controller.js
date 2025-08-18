"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEpisodes = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getEpisodes = async (req, res) => {
    const { courseId } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId,
            },
            include: {
                courses: true,
            },
        });
        if (!(user === null || user === void 0 ? void 0 : user.courses.map((course) => course.id).includes(Number(courseId)))) {
            return res
                .status(403)
                .json({ message: "You don't have access to this course" });
        }
        const episodes = await prisma.episode.findMany({
            where: {
                courseId: parseInt(courseId),
            },
            orderBy: {
                order: "asc",
            },
        });
        res.json(episodes);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getEpisodes = getEpisodes;
