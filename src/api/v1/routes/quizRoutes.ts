import { Router } from "express";
import * as quizController from "../controllers/quizController";
import { validate } from "../middleware/validateMiddleware";
import { quizSchemas } from "../validations/quizValidation";

const router = Router();

router.post("/", validate(quizSchemas.create), quizController.createQuizController);
router.get("/", quizController.getAllQuizzesController);
router.get("/:id", quizController.getQuizByIdController);
router.put("/:id", validate(quizSchemas.update), quizController.updateQuizController);
router.delete("/:id", quizController.deleteQuizController);

export default router;
