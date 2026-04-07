import * as assignmentRepo from "../repositories/assignmentRepository";
import { Assignment } from "../models/assignmentModel";

export const getAllAssignments = async (): Promise<Assignment[]> => {
	return assignmentRepo.getAllAssignments();
};

export const createAssignment = async (assignmentData: Partial<Assignment>): Promise<Assignment> => {
	const id = await assignmentRepo.createAssignment(assignmentData);
	return { id, ...assignmentData } as Assignment;
};

export const getAssignmentById = async (id: string): Promise<Assignment> => {
	const assignment = await assignmentRepo.getAssignmentById(id);
	if (!assignment) throw new Error(`Assignment with ID ${id} not found`);
	return assignment;
};

export const updateAssignment = async (
	id: string,
	updates: Partial<Assignment>
): Promise<Assignment> => {
	const assignment = await getAssignmentById(id);
	const updated: Assignment = {
		...assignment,
		...updates,
	};
	await assignmentRepo.updateAssignment(id, updated);
	return updated;
};

export const deleteAssignment = async (id: string): Promise<void> => {
	await getAssignmentById(id); // verify existence
	await assignmentRepo.deleteAssignment(id);
};

