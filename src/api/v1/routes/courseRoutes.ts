import { Router } from "express";
import * as courseController from "../controllers/courseController";
import { validate } from "../middleware/validateMiddleware";
import { courseSchemas } from "../validations/courseValidation";
import { authenticate } from "../middleware/authMiddleware";
import { requireRole } from "../middleware/roleMiddleware";

const router = Router();

const USE_AUTH = process.env.USE_AUTH === 'true';
const protect = USE_AUTH ? authenticate : (_: any, __: any, next: any) => next();

router.post("/", protect, validate(courseSchemas.create), courseController.createCourseController);
router.get("/", protect, courseController.getAllCoursesController);
router.get("/:id", protect, courseController.getCourseByIdController);
router.put("/:id", protect, validate(courseSchemas.update), courseController.updateCourseController);
router.delete("/:id", protect, requireRole('admin'), courseController.deleteCourseController);

export default router;
