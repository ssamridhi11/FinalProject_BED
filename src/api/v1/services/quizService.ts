import * as quizRepo from "../repositories/quizRepository";
import { Quiz } from "../models/quizModel";

export const getAllQuizzes = async (ownerId?: string): Promise<Quiz[]> => {
  return quizRepo.getAllQuizzes(ownerId);
};

export const createQuiz = async (quizData: Partial<Quiz>, ownerId?: string): Promise<Quiz> => {
  const id = await quizRepo.createQuiz(quizData, ownerId);
  return { id, ...quizData } as Quiz;
};

export const getQuizById = async (id: string): Promise<Quiz> => {
  const quiz = await quizRepo.getQuizById(id);
  if (!quiz) throw new Error(`Quiz with ID ${id} not found`);
  return quiz;
};

export const updateQuiz = async (id: string, updates: Partial<Quiz>): Promise<Quiz> => {
  const quiz = await getQuizById(id);
  const updated: Quiz = {
    ...quiz,
    ...updates,
  };
  await quizRepo.updateQuiz(id, updated);
  return updated;
};

export const deleteQuiz = async (id: string): Promise<void> => {
  await getQuizById(id);
  await quizRepo.deleteQuiz(id);
};
