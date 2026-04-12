import { Router } from "express";
import * as courseController from "../controllers/courseController";

const router = Router();

router.post("/", courseController.createCourseController);
router.get("/", courseController.getAllCoursesController);
router.get("/:id", courseController.getCourseByIdController);
router.put("/:id", courseController.updateCourseController);
router.delete("/:id", courseController.deleteCourseController);

export default router;
