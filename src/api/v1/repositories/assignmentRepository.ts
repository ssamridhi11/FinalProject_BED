import { Assignment } from "../models/assignmentModel";
import admin from '../../../config/firebase';

const USE_FIRESTORE = process.env.USE_FIRESTORE === 'true';

// In-memory fallback (keeps tests and local dev working)
const store: Map<string, Assignment> = new Map();
const generateId = (): string => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

const collectionName = 'assignments';

export const getAllAssignments = async (ownerId?: string): Promise<Assignment[]> => {
  if (USE_FIRESTORE) {
    const db = admin.firestore();
    let q: FirebaseFirestore.Query = db.collection(collectionName);
    if (ownerId) q = q.where('ownerId', '==', ownerId);
    const snap = await q.get();
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Assignment));
  }
  return Array.from(store.values()).map((a) => ({ ...a } as Assignment));
};

export const createAssignment = async (data: Partial<Assignment>, ownerId?: string): Promise<string> => {
  if (USE_FIRESTORE) {
    const db = admin.firestore();
    const payload = {
      courseId: data.courseId || '',
      title: data.title || '',
      dueDate: data.dueDate ? new Date(data.dueDate) : new Date(),
      status: (data.status as Assignment['status']) || 'pending',
      grade: data.grade,
      ownerId: ownerId || null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    } as any;
    const docRef = await db.collection(collectionName).add(payload);
    return docRef.id;
  }
  const id = generateId();
  const record: Assignment = {
    id,
    courseId: data.courseId || '',
    title: data.title || '',
    dueDate: data.dueDate ? new Date(data.dueDate) : new Date(),
    status: (data.status as Assignment['status']) || 'pending',
    grade: data.grade,
  } as Assignment;
  store.set(id, record);
  return id;
};

export const getAssignmentById = async (id: string): Promise<Assignment | null> => {
  if (USE_FIRESTORE) {
    const db = admin.firestore();
    const doc = await db.collection(collectionName).doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...(doc.data() as Assignment) };
  }
  const found = store.get(id) || null;
  return found ? { ...found } : null;
};

export const updateAssignment = async (id: string, data: Partial<Assignment>): Promise<void> => {
  if (USE_FIRESTORE) {
    const db = admin.firestore();
    const updatePayload: any = { ...data };
    if (data.dueDate) updatePayload.dueDate = new Date(data.dueDate as any);
    await db.collection(collectionName).doc(id).update(updatePayload);
    return;
  }
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
  if (USE_FIRESTORE) {
    const db = admin.firestore();
    await db.collection(collectionName).doc(id).delete();
    return;
  }
  store.delete(id);
};
