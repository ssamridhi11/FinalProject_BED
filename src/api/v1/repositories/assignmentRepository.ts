import { Assignment } from "../models/assignmentModel";
const store: Map<string, Assignment> = new Map();

const generateId = (): string => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

export const getAllAssignments = async (): Promise<Assignment[]> => {
  return Array.from(store.values()).map((a) => ({ ...a } as Assignment));
};

export const createAssignment = async (data: Partial<Assignment>): Promise<string> => {
  const id = generateId();
  const record: Assignment = {
    id,
    courseId: data.courseId || "",
    title: data.title || "",
    dueDate: data.dueDate ? new Date(data.dueDate) : new Date(),
    status: (data.status as Assignment['status']) || "pending",
    grade: data.grade,
  } as Assignment;
  store.set(id, record);
  return id;
};

export const getAssignmentById = async (id: string): Promise<Assignment | null> => {
  const found = store.get(id) || null;
  return found ? { ...found } : null;
};

export const updateAssignment = async (id: string, data: Partial<Assignment>): Promise<void> => {
  const existing = store.get(id);
  if (!existing) throw new Error(`Assignment with id ${id} not found`);
  const updated: Assignment = {
    ...existing,
    ...data,
    dueDate: data.dueDate ? new Date(data.dueDate) : existing.dueDate,
  } as Assignment;
  store.set(id, updated);
};

export const deleteAssignment = async (id: string): Promise<void> => {
  store.delete(id);
};
