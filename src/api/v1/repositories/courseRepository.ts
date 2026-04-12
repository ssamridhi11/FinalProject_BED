import { Course } from "../models/courseModel";

const store: Map<string, Course> = new Map();

const generateId = (): string => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

export const getAllCourses = async (): Promise<Course[]> => {
  return Array.from(store.values()).map((c) => ({ ...c } as Course));
};

export const createCourse = async (data: Partial<Course>): Promise<string> => {
  const id = generateId();
  const record: Course = {
    id,
    title: data.title || "",
    description: data.description || "",
    endDate: data.endDate ? new Date(data.endDate) : new Date(),
  } as Course;
  store.set(id, record);
  return id;
};

export const getCourseById = async (id: string): Promise<Course | null> => {
  const found = store.get(id) || null;
  return found ? { ...found } : null;
};

export const updateCourse = async (id: string, data: Partial<Course>): Promise<void> => {
  const existing = store.get(id);
  if (!existing) throw new Error(`Course with id ${id} not found`);
  const updated: Course = {
    ...existing,
    ...data,
    endDate: data.endDate ? new Date(data.endDate) : existing.endDate,
  } as Course;
  store.set(id, updated);
};

export const deleteCourse = async (id: string): Promise<void> => {
  store.delete(id);
};
