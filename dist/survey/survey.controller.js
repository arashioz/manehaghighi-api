"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSurvey = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createSurvey = async (req, res) => {
    const { answers } = req.body;
    try {
        const survey = await prisma.survey.create({
            data: {
                userId: Number(req.userId),
                answers,
            },
        });
        res.json(survey);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.createSurvey = createSurvey;
