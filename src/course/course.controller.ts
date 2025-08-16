import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCourses = async (req: Request, res: Response) => {
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
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const getCourse = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const course = await prisma.course.findUnique({
            where: { enTitle: slug },
        });
        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ error: "دوره یافت نشد" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};
