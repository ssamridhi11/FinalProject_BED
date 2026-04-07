import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as assignmentService from "../services/assignmentService";

export const getAllAssignmentsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const assignments = await assignmentService.getAllAssignments();

  res.status(HTTP_STATUS.OK).json({
    message: "Assignments retrieved successfully.",
    data: assignments,
  });
};

export const getAssignmentByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const assignment = await assignmentService.getAssignmentById(req.params.id);

    res.status(HTTP_STATUS.OK).json({
      message: "Assignment retrieved successfully.",
      data: assignment,
    });
  } catch (error) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Assignment not found.",
    });
  }
};

export const createAssignmentController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const assignment = await assignmentService.createAssignment(req.body);

    res.status(HTTP_STATUS.CREATED).json({
      message: "Assignment created successfully.",
      data: assignment,
    });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: (error as Error).message,
    });
  }
};

export const updateAssignmentController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updated = await assignmentService.updateAssignment(req.params.id, req.body);

    res.status(HTTP_STATUS.OK).json({
      message: "Assignment updated successfully.",
      data: updated,
    });
  } catch (error) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: (error as Error).message,
    });
  }
};

export const deleteAssignmentController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await assignmentService.deleteAssignment(req.params.id);

    res.status(HTTP_STATUS.OK).json({
      message: "Assignment deleted successfully.",
    });
  } catch (error) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: (error as Error).message,
    });
  }
};

export const updateAssignmentGradeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updated = await assignmentService.updateAssignment(req.params.id, {
      grade: req.body.grade,
    });

    res.status(HTTP_STATUS.OK).json({
      message: "Assignment grade updated successfully.",
      data: updated,
    });
  } catch (error) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: (error as Error).message,
    });
  }
};
