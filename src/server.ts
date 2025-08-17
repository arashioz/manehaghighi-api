import app from "./app";
import { PrismaClient } from "@prisma/client";
import { config } from "./config";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: config.getDatabaseUrl(),
    },
  },
});

async function main() {
  try {
    console.log("🚀 Starting Mane Haghighi Backend...");
    console.log(`🌍 Environment: ${config.nodeEnv}`);
    console.log(`🔗 Database: ${config.database.host}:${config.database.port}/${config.database.name}`);
    
    // Wait for the database to be ready
    await waitForDatabase();

    await prisma.$connect();
    console.log("✅ Connected to the database successfully");
    
    app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port}`);
      console.log(`🌐 Access: http://localhost:${config.port}`);
      console.log(`📊 Health: http://localhost:${config.port}/health`);
    });
  } catch (error) {
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
    } catch (error) {
      console.log(`⏳ Database not ready. Retrying in ${delay}ms... (${retries} attempts left)`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      retries--;
    }
  }
  
  const errorMsg = `Unable to connect to database at ${config.getDatabaseUrl()}`;
  console.error(`❌ ${errorMsg}`);
  throw new Error(errorMsg);
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 SIGINT received, shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

main();
