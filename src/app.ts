import express, { Express } from "express";

const app: Express = express(); // initalisation of express application
interface HealthCheckResponse{
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}

app.get("/api/v1/health", (req, res) => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };

    res.json(healthData);
});
export default app 