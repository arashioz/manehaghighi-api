import dotenv from "dotenv";

dotenv.config();

export const config = {
  // JWT
  jwtSecret: process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this-in-production",
  jwtExpiresIn: "9999999999d",

  // Backend port
  port: Number(process.env.APP_PORT || process.env.PORT || 3000),

  // Node environment
  nodeEnv: process.env.NODE_ENV || "development",

  // Database config
  database: {
    host: process.env.POSTGRES_HOST || "postgres",  // توجه: نام سرویس postgres در docker-compose
    port: Number(process.env.POSTGRES_PORT || 5432),
    name: process.env.POSTGRES_DB || "mane_haghighi_db",
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres123",
  },

  // کامل کردن DATABASE_URL از database config
  getDatabaseUrl: function () {
    const { host, port, name, user, password } = this.database;
    return `postgresql://${user}:${password}@${host}:${port}/${name}`;
  },

  // اگر بخوای مستقیم DATABASE_URL از env بگیری
  databaseUrl: process.env.DATABASE_URL || "",
};
