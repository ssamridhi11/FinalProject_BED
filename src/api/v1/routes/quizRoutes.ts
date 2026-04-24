import { Router } from "express";
import * as quizController from "../controllers/quizController";
import { validate } from "../middleware/validateMiddleware";
import { quizSchemas } from "../validations/quizValidation";
import { authenticate } from "../middleware/authMiddleware";
import { requireRole } from "../middleware/roleMiddleware";

const router = Router();

const USE_AUTH = process.env.USE_AUTH === 'true';
const protect = USE_AUTH ? authenticate : (_: any, __: any, next: any) => next();

router.post("/", protect, validate(quizSchemas.create), quizController.createQuizController);
router.get("/", protect, quizController.getAllQuizzesController);
router.get("/:id", protect, quizController.getQuizByIdController);
router.put("/:id", protect, validate(quizSchemas.update), quizController.updateQuizController);
router.delete("/:id", protect, requireRole('admin'), quizController.deleteQuizController);

export default router;
