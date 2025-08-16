import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { ADMIN_ID } from "../utils/admin";

export const adminMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
    console.log("authMiddleware -> token", token);

    if (!token) {
        res.status(401).json({ error: "ابتدا وارد شوید" });
        return;
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret) as {
            userId: number;
        };
        if (decoded.userId !== ADMIN_ID) {
            res.status(403).json({ error: "شما دسترسی ندارید" });
            return;
        }
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(400).json({ error: "دوباره وارد شوید" });
    }
};

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
    console.log("authMiddleware -> token", token);

    if (!token) {
        res.status(401).json({ error: "ابتدا وارد شوید" });
        return;
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret) as {
            userId: number;
        };
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(400).json({ error: "دوباره وارد شوید" });
    }
};
