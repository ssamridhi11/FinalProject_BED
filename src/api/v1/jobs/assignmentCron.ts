import cron from "node-cron";
import { markOverdueAssignments } from "../services/assignmentService";

export const startAssignmentCron = () => {
  cron.schedule("* * * * *", async () => {
    console.log("Checking overdue assignments...");

    try {
      await markOverdueAssignments();
    } catch (error) {
      console.error("Cron error:", error);
    }
  });
};