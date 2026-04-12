import express, { Express } from "express";
import assignmentRoutes from "./api/v1/routes/assignmentRoutes";
import courseRoutes from "./api/v1/routes/courseRoutes";
import quizRoutes from "./api/v1/routes/quizRoutes";
import { errorHandler } from "./api/v1/middleware/errorMiddleware";

const app: Express = express(); // initalisation of express application
interface HealthCheckResponse{
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}

app.use(express.json());

// health
app.get("/api/v1/health", (req, res) => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };

    res.json(healthData);
});

app.use("/api/v1/assignments", assignmentRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/quizzes", quizRoutes);
app.use(errorHandler);
export default app;
