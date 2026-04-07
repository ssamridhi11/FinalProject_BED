import { Router } from "express";
import * as assignmentController from "../controllers/assignmentController";

const router = Router();

router.post("/", assignmentController.createAssignment);
router.get("/", assignmentController.getAllAssignments);
router.get("/:id", assignmentController.getAssignmentById);
router.put("/:id", assignmentController.updateAssignment);
router.delete("/:id", assignmentController.deleteAssignment);


router.patch("/:id/grade", assignmentController.updateAssignmentGrade);

export default router;
