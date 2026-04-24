import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as assignmentService from "../services/assignmentService";

export const getAllAssignmentsController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const ownerId = req.user?.uid;
  const assignments = await assignmentService.getAllAssignments(ownerId);

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
    const id = String(req.params.id);
    const assignment = await assignmentService.getAssignmentById(id);

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
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const ownerId = req.user?.uid;
    const assignment = await assignmentService.createAssignment(req.body, ownerId);

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
    const id = String(req.params.id);
    const updated = await assignmentService.updateAssignment(id, req.body);

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
    const id = String(req.params.id);
    await assignmentService.deleteAssignment(id);

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
    const id = String(req.params.id);
    const updated = await assignmentService.updateAssignment(id, {
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