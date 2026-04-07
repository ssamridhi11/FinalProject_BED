import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as courseService from "../services/courseService";

export const getAllCoursesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const courses = await courseService.getAllCourses();

  res.status(HTTP_STATUS.OK).json({
    message: "Courses retrieved successfully.",
    data: courses,
  });
};

export const getCourseByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = String(req.params.id);
    const course = await courseService.getCourseById(id);

    res.status(HTTP_STATUS.OK).json({
      message: "Course retrieved successfully.",
      data: course,
    });
  } catch (error) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Course not found.",
    });
  }
};

export const createCourseController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const course = await courseService.createCourse(req.body);

    res.status(HTTP_STATUS.CREATED).json({
      message: "Course created successfully.",
      data: course,
    });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: (error as Error).message,
    });
  }
};

export const updateCourseController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = String(req.params.id);
    const updated = await courseService.updateCourse(id, req.body);

    res.status(HTTP_STATUS.OK).json({
      message: "Course updated successfully.",
      data: updated,
    });
  } catch (error) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: (error as Error).message,
    });
  }
};

export const deleteCourseController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = String(req.params.id);
    await courseService.deleteCourse(id);

    res.status(HTTP_STATUS.OK).json({
      message: "Course deleted successfully.",
    });
  } catch (error) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: (error as Error).message,
    });
  }
};
