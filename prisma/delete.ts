import { PrismaClient } from "@prisma/client";

const databaseUrl =
    "postgresql://root:k0CiVngA4qEOKEgAHQpRA8jX@taftan.liara.cloud:30396/postgres";

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: databaseUrl,
        },
    },
});

async function deleteAllRecords() {
    try {
        // Delete all records from tables with foreign key constraints first
        // await prisma.message.deleteMany();
        // await prisma.ticket.deleteMany();
        // await prisma.payment.deleteMany();
        // await prisma.comment.deleteMany();
        // await prisma.episode.deleteMany();
        // await prisma.course.deleteMany();
        // await prisma.article.deleteMany();
        // await prisma.user.deleteMany();
        await prisma.exam.deleteMany();

        console.log("All records have been deleted successfully.");
    } catch (error) {
        console.error("Error deleting records:", error);
    } finally {
        await prisma.$disconnect();
    }
}

// Run the function
deleteAllRecords();
