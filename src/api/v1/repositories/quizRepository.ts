import { Quiz } from "../models/quizModel";

const store: Map<string, Quiz> = new Map();

const generateId = (): string => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

export const getAllQuizzes = async (): Promise<Quiz[]> => {
  return Array.from(store.values()).map((q) => ({ ...q } as Quiz));
};

export const createQuiz = async (data: Partial<Quiz>): Promise<string> => {
  const id = generateId();
  const record: Quiz = {
    id,
    courseId: data.courseId || "",
    title: data.title || "",
    dueDate: data.dueDate ? new Date(data.dueDate) : new Date(),
    attempts: typeof data.attempts === 'number' ? data.attempts : 0,
    score: typeof data.score === 'number' ? data.score : 0,
  } as Quiz;
  store.set(id, record);
  return id;
};

export const getQuizById = async (id: string): Promise<Quiz | null> => {
  const found = store.get(id) || null;
  return found ? { ...found } : null;
};

export const updateQuiz = async (id: string, data: Partial<Quiz>): Promise<void> => {
  const existing = store.get(id);
  if (!existing) throw new Error(`Quiz with id ${id} not found`);
  const updated: Quiz = {
    ...existing,
    ...data,
    dueDate: data.dueDate ? new Date(data.dueDate) : existing.dueDate,
  } as Quiz;
  store.set(id, updated);
};

export const deleteQuiz = async (id: string): Promise<void> => {
  store.delete(id);
};
