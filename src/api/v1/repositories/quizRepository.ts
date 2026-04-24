import { Quiz } from "../models/quizModel";
import admin from '../../../config/firebase';

const USE_FIRESTORE = process.env.USE_FIRESTORE === 'true';

const store: Map<string, Quiz> = new Map();
const generateId = (): string => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
const collectionName = 'quizzes';

export const getAllQuizzes = async (ownerId?: string): Promise<Quiz[]> => {
  if (USE_FIRESTORE) {
    const db = admin.firestore();
    let q: FirebaseFirestore.Query = db.collection(collectionName);
    if (ownerId) q = q.where('ownerId', '==', ownerId);
    const snap = await q.get();
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Quiz));
  }
  return Array.from(store.values()).map((q) => ({ ...q } as Quiz));
};

export const createQuiz = async (data: Partial<Quiz>, ownerId?: string): Promise<string> => {
  if (USE_FIRESTORE) {
    const db = admin.firestore();
    const payload = {
      courseId: data.courseId || '',
      title: data.title || '',
      dueDate: data.dueDate ? new Date(data.dueDate) : new Date(),
      attempts: typeof data.attempts === 'number' ? data.attempts : 0,
      score: typeof data.score === 'number' ? data.score : 0,
      ownerId: ownerId || null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    } as any;
    const docRef = await db.collection(collectionName).add(payload);
    return docRef.id;
  }
  const id = generateId();
  const record: Quiz = {
    id,
    courseId: data.courseId || '',
    title: data.title || '',
    dueDate: data.dueDate ? new Date(data.dueDate) : new Date(),
    attempts: typeof data.attempts === 'number' ? data.attempts : 0,
    score: typeof data.score === 'number' ? data.score : 0,
  } as Quiz;
  store.set(id, record);
  return id;
};

export const getQuizById = async (id: string): Promise<Quiz | null> => {
  if (USE_FIRESTORE) {
    const db = admin.firestore();
    const doc = await db.collection(collectionName).doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...(doc.data() as Quiz) };
  }
  const found = store.get(id) || null;
  return found ? { ...found } : null;
};

export const updateQuiz = async (id: string, data: Partial<Quiz>): Promise<void> => {
  if (USE_FIRESTORE) {
    const db = admin.firestore();
    const updatePayload: any = { ...data };
    if (data.dueDate) updatePayload.dueDate = new Date(data.dueDate as any);
    await db.collection(collectionName).doc(id).update(updatePayload);
    return;
  }
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
  if (USE_FIRESTORE) {
    const db = admin.firestore();
    await db.collection(collectionName).doc(id).delete();
    return;
  }
  store.delete(id);
};
