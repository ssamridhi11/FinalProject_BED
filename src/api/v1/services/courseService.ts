import * as courseRepo from "../repositories/courseRepository";
import { Course } from "../models/courseModel";

export const getAllCourses = async (ownerId?: string): Promise<Course[]> => {
  return courseRepo.getAllCourses(ownerId);
};

export const createCourse = async (courseData: Partial<Course>, ownerId?: string): Promise<Course> => {
  const id = await courseRepo.createCourse(courseData, ownerId);
  return { id, ...courseData } as Course;
};

export const getCourseById = async (id: string): Promise<Course> => {
  const course = await courseRepo.getCourseById(id);
  if (!course) throw new Error(`Course with ID ${id} not found`);
  return course;
};

export const updateCourse = async (id: string, updates: Partial<Course>): Promise<Course> => {
  const course = await getCourseById(id);
  const updated: Course = {
    ...course,
    ...updates,
  };
  await courseRepo.updateCourse(id, updated);
  return updated;
};

export const deleteCourse = async (id: string): Promise<void> => {
  await getCourseById(id);
  await courseRepo.deleteCourse(id);
};
