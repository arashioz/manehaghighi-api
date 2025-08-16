import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getEpisodes = async (req: Request, res: Response) => {
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
        if (
            !user?.courses.map((course) => course.id).includes(Number(courseId))
        ) {
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
    } catch (error) {
        res.status(500).json({ error });
    }
};
