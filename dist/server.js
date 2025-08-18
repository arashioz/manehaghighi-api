"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const client_1 = require("@prisma/client");
const config_1 = require("./config");
const prisma = new client_1.PrismaClient({
    datasources: {
        db: {
            url: config_1.config.getDatabaseUrl(),
        },
    },
});
async function main() {
    try {
        console.log("🚀 Starting Mane Haghighi Backend...");
        console.log(`🌍 Environment: ${config_1.config.nodeEnv}`);
        console.log(`🔗 Database: ${config_1.config.database.host}:${config_1.config.database.port}/${config_1.config.database.name}`);
        // Wait for the database to be ready
        await waitForDatabase();
        await prisma.$connect();
        console.log("✅ Connected to the database successfully");
        app_1.default.listen(config_1.config.port, () => {
            console.log(`🚀 Server is running on port ${config_1.config.port}`);
            console.log(`🌐 Access: http://localhost:${config_1.config.port}`);
            console.log(`📊 Health: http://localhost:${config_1.config.port}/health`);
        });
    }
    catch (error) {
        console.error("❌ Error starting the server:", error);
        process.exit(1);
    }
}
async function waitForDatabase(retries = 10, delay = 3000) {
    console.log("⏳ Waiting for database to be ready...");
    while (retries > 0) {
        try {
            await prisma.$connect();
            return;
        }
        catch (error) {
            console.log(`⏳ Database not ready. Retrying in ${delay}ms... (${retries} attempts left)`);
            await new Promise((resolve) => setTimeout(resolve, delay));
            retries--;
        }
    }
    const errorMsg = `Unable to connect to database at ${config_1.config.getDatabaseUrl()}`;
    console.error(`❌ ${errorMsg}`);
    throw new Error(errorMsg);
}
// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('🛑 SIGTERM received, shutting down gracefully...');
    await prisma.$disconnect();
    process.exit(0);
});
main();
