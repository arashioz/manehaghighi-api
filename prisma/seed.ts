import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const databaseUrl =
    "postgresql://root:k0CiVngA4qEOKEgAHQpRA8jX@taftan.liara.cloud:30396/postgres";

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: databaseUrl,
        },
    },
});

async function main() {
    // Seed Users
    const user1 = await prisma.user.create({
        data: {
            name: "علی رضایی",
            password: await bcrypt.hash("asdasdasd", 10),
            phone: "+989058688775",
            email: "ali@example.com",
            phoneVerified: false,
            emailVerified: false,
        },
    });

    const user2 = await prisma.user.create({
        data: {
            name: "مریم احمدی",
            password: await bcrypt.hash("asdasdasd", 10),
            phone: "+989987654321",
            email: "maryam@example.com",
            phoneVerified: true,
            emailVerified: true,
        },
    });

    // Seed Articles
    const article1 = await prisma.article.create({
        data: {
            title: "مقدمه‌ای بر برنامه‌نویسی وب",
            enTitle: "introduction-to-web-programming",
            content:
                "برنامه‌نویسی وب یکی از مهم‌ترین مهارت‌های دنیای فناوری امروز است. در این مقاله، ما به بررسی اصول اولیه HTML، CSS و JavaScript می‌پردازیم...",
            description: "آشنایی با اصول اولیه برنامه‌نویسی وب",
            hero: "/static/assets/course.jpg",
        },
    });

    // Seed Courses
    const course1 = await prisma.course.create({
        data: {
            title: "دوره جامع ری‌اکت",
            enTitle: "comprehensive-react-course",
            description:
                "در این دوره، شما با مفاهیم پیشرفته ری‌اکت آشنا خواهید شد و یاد می‌گیرید چگونه اپلیکیشن‌های وب مدرن و کارآمد بسازید.",
            price: 1500000, // 1,500,000 Rials
            hero: "/static/assets/course.jpg",
            Intro: "/static/assets/632dbfc30779e378da8cb8913870875661214635-480p.mp4",
            time: "۲۰ ساعت",
            seasons: 4,
            users: {
                connect: [{ id: user1.id }, { id: user2.id }],
            },
        },
    });

    // Seed Episodes
    await prisma.episode.createMany({
        data: [
            {
                title: "معرفی هوک‌های ری‌اکت",
                videoUrl:
                    "/static/assets/632dbfc30779e378da8cb8913870875661214635-480p.mp4",
                duration: 45,
                description: "در این قسمت با هوک‌های ری‌اکت آشنا می‌شویم.",
                order: 1,
                courseId: course1.id,
            },
            {
                title: "مدیریت حالت پیشرفته",
                videoUrl:
                    "/static/assets/632dbfc30779e378da8cb8913870875661214635-480p.mp4",
                duration: 60,
                description: "در این قسمت با مدیریت حالت پیشرفته آشنا می‌شویم.",
                order: 2,
                courseId: course1.id,
            },
        ],
    });

    // Seed Comments
    await prisma.comment.createMany({
        data: [
            {
                content: "مقاله بسیار مفیدی بود. ممنون از اشتراک‌گذاری!",
                approved: true,
                userId: user1.id,
                articleId: article1.id,
            },
            {
                content: "این دوره فوق‌العاده است. من خیلی چیزها یاد گرفتم.",
                approved: false,
                userId: user2.id,
                courseId: course1.id,
            },
        ],
    });

    // Seed Payments
    await prisma.payment.create({
        data: {
            amount: 1500000,
            refId: 123123,
            authority: "AUTH123456",
            status: "SUCCESS",
            userId: user1.id,
            courseId: course1.id,
        },
    });

    // Seed Tickets
    const ticket1 = await prisma.ticket.create({
        data: {
            title: "مشکل در دسترسی به محتوای دوره",
            userId: user2.id,
        },
    });

    // Seed Messages
    await prisma.message.createMany({
        data: [
            {
                content:
                    "سلام، من نمی‌توانم به ویدیوهای دوره دسترسی پیدا کنم. می‌توانید کمک کنید؟",
                ticketId: ticket1.id,
            },
            {
                content:
                    "سلام، متأسفم که این مشکل را تجربه می‌کنید. لطفاً اجازه دهید حساب کاربری شما را بررسی کنم.",
                isAdmin: true,
                ticketId: ticket1.id,
            },
        ],
    });

    console.log("داده‌های نمونه با موفقیت ایجاد شدند.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
