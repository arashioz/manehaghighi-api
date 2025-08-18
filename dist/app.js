"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const article_routes_1 = __importDefault(require("./article/article.routes"));
const course_routes_1 = __importDefault(require("./course/course.routes"));
const episode_routes_1 = __importDefault(require("./episode/episode.routes"));
const comment_routes_1 = __importDefault(require("./comment/comment.routes"));
const user_routes_1 = __importDefault(require("./user/user.routes"));
const payment_routes_1 = __importDefault(require("./payment/payment.routes"));
const otp_routes_1 = __importDefault(require("./otp/otp.routes"));
const admin_routes_1 = __importDefault(require("./admin/admin.routes"));
const general_routes_1 = __importDefault(require("./general/general.routes"));
const exam_routes_1 = __importDefault(require("./exam/exam.routes"));
const survey_routes_1 = __importDefault(require("./survey/survey.routes"));
const mobile_routes_1 = __importDefault(require("./mobile/mobile.routes"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use("/static", express_1.default.static(path_1.default.join(__dirname, "static")));
app.use(express_1.default.json({
    limit: "50mb",
}));
app.get("/", (req, res) => {
    res.send("Hello, world!");
});
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});
app.use("/auth", auth_routes_1.default);
app.use("/article", article_routes_1.default);
app.use("/course", course_routes_1.default);
app.use("/episode", episode_routes_1.default);
app.use("/comment", comment_routes_1.default);
app.use("/user", user_routes_1.default);
app.use("/payment", payment_routes_1.default);
app.use("/otp", otp_routes_1.default);
app.use("/admin", admin_routes_1.default);
app.use("/general", general_routes_1.default);
app.use("/exam", exam_routes_1.default);
app.use("/survey", survey_routes_1.default);
app.use("/mobile", mobile_routes_1.default);
exports.default = app;
