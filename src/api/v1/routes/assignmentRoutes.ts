import { Router } from "express";
import * as assignmentController from "../controllers/assignmentController";
import { validate } from "../middleware/validateMiddleware";
import { assignmentSchemas } from "../validations/assignmentValidation";

const router = Router();

router.post("/", validate(assignmentSchemas.create), assignmentController.createAssignmentController);
router.get("/", assignmentController.getAllAssignmentsController);
router.get("/:id", assignmentController.getAssignmentByIdController);
router.put("/:id", validate(assignmentSchemas.update), assignmentController.updateAssignmentController);
router.delete("/:id", assignmentController.deleteAssignmentController);


router.patch("/:id/grade", assignmentController.updateAssignmentGradeController);

export default router;
