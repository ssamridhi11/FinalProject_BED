import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as quizService from "../services/quizService";

// GET all quizzes
export const getAllQuizzesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const quizzes = await quizService.getAllQuizzes();
  res.status(HTTP_STATUS.OK).json({
    message: "Quizzes retrieved successfully.",
    data: quizzes,
  });
};

// GET quiz by ID
export const getQuizByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = String(req.params.id);
    const quiz = await quizService.getQuizById(id);
    res.status(HTTP_STATUS.OK).json({
      message: "Quiz retrieved successfully.",
      data: quiz,
    });
  } catch (error) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Quiz not found.",
    });
  }
};

// CREATE quiz
export const createQuizController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const quiz = await quizService.createQuiz(req.body);
    res.status(HTTP_STATUS.CREATED).json({
      message: "Quiz created successfully.",
      data: quiz,
    });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: (error as Error).message,
    });
  }
};

// UPDATE quiz
export const updateQuizController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = String(req.params.id);
    const updatedQuiz = await quizService.updateQuiz(id, req.body);
    res.status(HTTP_STATUS.OK).json({
      message: "Quiz updated successfully.",
      data: updatedQuiz,
    });
  } catch (error) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Quiz not found.",
    });
  }
};

export const deleteQuizController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = String(req.params.id);
    await quizService.deleteQuiz(id);
    res.status(HTTP_STATUS.OK).json({
      message: "Quiz deleted successfully.",
    });
  } catch (error) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Quiz not found.",
    });
  }
};
