import { Router } from "express";
import * as assignmentController from "../controllers/assignmentController";

const router = Router();

router.post("/", assignmentController.createAssignmentController);
router.get("/", assignmentController.getAllAssignmentsController);
router.get("/:id", assignmentController.getAssignmentByIdController);
router.put("/:id", assignmentController.updateAssignmentController);
router.delete("/:id", assignmentController.deleteAssignmentController);


router.patch("/:id/grade", assignmentController.updateAssignmentGradeController);

export default router;
