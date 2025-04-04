import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
// import AdminSignInRouter from "./router/adminSignInRouter.js";
// import messagingRoutes from "./routes/messagingRoutes.js";
// import requestRoutes from "./routes/requestRoutes.js"; // ✅ Added for handling requests
import studentRouter from "./router/studentRouter.js";
import teacherRouter from "./router/teacherRouter.js";
import assignmentRouter from "./router/assignmentRouter.js";
import announcementRouter from "./router/announcementRouter.js";
import classRouter from "./router/classRouter.js";
import libraryRouter from "./router/libraryRouter.js";
import eventsRouter from "./router/eventsRouter.js";
import examRouter from "./router/examRouter.js";
import attendanceRouter from "./router/attendanceRouter.js";
import usersRouter from "./router/usersRouter.js";
import adminRegisterRouter from "./router/adminRegisterRouter.js";
import sendEmailRoutes from "./routes/sendEmailRoutes.js"; // ✅ Import sendEmailRoutes
import { errorHandler } from "./middlewares/errorHandler.js";
//import uploadRoutes from "./router/uploadRouter.js";

// console.log("MONGO_URI:", process.env.MONGO_URI);
const app = express();
config();

// CORS Configuration
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "*",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log("anand")
// API Routes
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/assignments", assignmentRouter);
app.use("/api/v1/announcements", announcementRouter);
app.use("/api/v1/class", classRouter);
app.use("/api/v1/library", libraryRouter);
app.use("/api/v1/events", eventsRouter);
app.use("/api/v1/exam", examRouter);
app.use("/api/v1/attendance", attendanceRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/register", adminRegisterRouter);
// app.use("/api/v1/messages", messagingRoutes);
// app.use("/api/v1/requests", requestRoutes);
app.use("/api/v1/send-email", sendEmailRoutes); // ✅ Added send-email route
//app.use("/api/v1/uploadcsv", uploadRoutes);

// app.use("/api/v1/admin", AdminSignInRouter);

// Global Error Handler
app.use((err, req, res, next) => {
    res.json({ messgae: "Backend is connected to Frontend"})
    errorHandler(err, req, res, next);
});

// Database connection
dbConnection();

export default app;
