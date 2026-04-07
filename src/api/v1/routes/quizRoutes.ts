import { Router } from "express";
import * as quizController from "../controllers/quizController";

const router = Router();

router.post("/", quizController.createQuizController);
router.get("/", quizController.getAllQuizzesController);
router.get("/:id", quizController.getQuizByIdController);
router.put("/:id", quizController.updateQuizController);
router.delete("/:id", quizController.deleteQuizController);

export default router;
