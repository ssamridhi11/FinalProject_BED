import { Router } from "express";
import * as courseController from "../controllers/courseController";
import { validate } from "../middleware/validateMiddleware";
import { courseSchemas } from "../validations/courseValidation";

const router = Router();

router.post("/", validate(courseSchemas.create), courseController.createCourseController);
router.get("/", courseController.getAllCoursesController);
router.get("/:id", courseController.getCourseByIdController);
router.put("/:id", validate(courseSchemas.update), courseController.updateCourseController);
router.delete("/:id", courseController.deleteCourseController);

export default router;
