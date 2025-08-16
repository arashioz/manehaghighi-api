import app from "./app";
import { PrismaClient } from "@prisma/client";
import { config } from "./config";

const prisma = new PrismaClient();

async function main() {
  try {
    // Wait for the database to be ready
    await waitForDatabase();

    await prisma.$connect();
    console.log("Connected to the database");
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

async function waitForDatabase(retries = 5, delay = 5000) {
  while (retries > 0) {
    try {
      await prisma.$connect();
      return;
    } catch (error) {
      console.log(`Database not ready. Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      retries--;
    }
  }
  throw new Error("Unable to connect to the database");
}

main();
