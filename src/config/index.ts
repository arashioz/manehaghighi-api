import dotenv from "dotenv";

dotenv.config();

export const config = {
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
  jwtExpiresIn: "9999999999d", // Token expires in 7 days
  databaseUrl: process.env.DATABASE_URL!,
  port: process.env.PORT || 3000,
};
