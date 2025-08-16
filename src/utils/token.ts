import jwt from "jsonwebtoken";
import { config } from "../config";

export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};
