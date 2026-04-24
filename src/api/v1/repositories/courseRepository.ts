import { Course } from "../models/courseModel";
import admin from '../../../config/firebase';

const USE_FIRESTORE = process.env.USE_FIRESTORE === 'true';

const store: Map<string, Course> = new Map();
const generateId = (): string => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
const collectionName = 'courses';

export const getAllCourses = async (ownerId?: string): Promise<Course[]> => {
  if (USE_FIRESTORE) {
    const db = admin.firestore();
    let q: FirebaseFirestore.Query = db.collection(collectionName);
    if (ownerId) q = q.where('ownerId', '==', ownerId);
    const snap = await q.get();
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Course));
  }
  return Array.from(store.values()).map((c) => ({ ...c } as Course));
};

export const createCourse = async (data: Partial<Course>, ownerId?: string): Promise<string> => {
  if (USE_FIRESTORE) {
    const db = admin.firestore();
    const payload = {
      title: data.title || '',
      description: data.description || '',
      endDate: data.endDate ? new Date(data.endDate) : new Date(),
      ownerId: ownerId || null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    } as any;
    const docRef = await db.collection(collectionName).add(payload);
    return docRef.id;
  }
  const id = generateId();
  const record: Course = {
    id,
    title: data.title || '',
    description: data.description || '',
    endDate: data.endDate ? new Date(data.endDate) : new Date(),
  } as Course;
  store.set(id, record);
  return id;
};

export const getCourseById = async (id: string): Promise<Course | null> => {
  if (USE_FIRESTORE) {
    const db = admin.firestore();
    const doc = await db.collection(collectionName).doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...(doc.data() as Course) };
  }
  const found = store.get(id) || null;
  return found ? { ...found } : null;
};

export const updateCourse = async (id: string, data: Partial<Course>): Promise<void> => {
  if (USE_FIRESTORE) {
    const db = admin.firestore();
    const updatePayload: any = { ...data };
    if (data.endDate) updatePayload.endDate = new Date(data.endDate as any);
    await db.collection(collectionName).doc(id).update(updatePayload);
    return;
  }
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
  if (USE_FIRESTORE) {
    const db = admin.firestore();
    await db.collection(collectionName).doc(id).delete();
    return;
  }
  store.delete(id);
};
