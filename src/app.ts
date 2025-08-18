import express from "express";
import authRoutes from "./auth/auth.routes";
import articleRoutes from "./article/article.routes";
import courseRoutes from "./course/course.routes";
import episodeRoutes from "./episode/episode.routes";
import commentRoutes from "./comment/comment.routes";
import userRoutes from "./user/user.routes";
import paymenRoutes from "./payment/payment.routes";
import otpRoutes from "./otp/otp.routes";
import adminRoutes from "./admin/admin.routes";
import generalRoutes from "./general/general.routes";
import examRoutes from "./exam/exam.routes";
import surveyRoutes from "./survey/survey.routes";
import mobileRoutes from "./mobile/mobile.routes";
import cors from "cors";
import path from "path";

const app = express();

app.use(cors());
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(
    express.json({
        limit: "50mb",
    }),
);

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});
app.use("/auth", authRoutes);
app.use("/article", articleRoutes);
app.use("/course", courseRoutes);
app.use("/episode", episodeRoutes);
app.use("/comment", commentRoutes);
app.use("/user", userRoutes);
app.use("/payment", paymenRoutes);
app.use("/otp", otpRoutes);
app.use("/admin", adminRoutes);
app.use("/general", generalRoutes);
app.use("/exam", examRoutes);
app.use("/survey", surveyRoutes);
app.use("/mobile", mobileRoutes);

export default app;
