import dotenv from "dotenv";

dotenv.config();

export const config = {
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
  jwtExpiresIn: "9999999999d", 
  
  databaseUrl: process.env.DATABASE_URL || "postgresql://postgres:postgres123@localhost:5432/mane_haghighi_db",
  
  port: process.env.PORT || 3000,
  
  // Database Details (for reference)
  database: {
    host: process.env.POSTGRES_HOST || "localhost",
    port: process.env.POSTGRES_PORT || 5432,
    name: process.env.POSTGRES_DB || "mane_haghighi_db",
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres123",
  },
  
  // Environment
  nodeEnv: process.env.NODE_ENV || "development",
  
  // Build connection string from individual parts
  getDatabaseUrl: () => {
    const { host, port, name, user, password } = config.database;
    return `postgresql://${user}:${password}@${host}:${port}/${name}`;
  }
};
