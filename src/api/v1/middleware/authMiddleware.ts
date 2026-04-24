import { Request, Response, NextFunction } from 'express';
import admin from '../../../config/firebase';

export interface AuthRequest extends Request {
  user?: { uid: string; email?: string; claims?: any };
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const header = (req.headers.authorization || '') as string;
  if (!header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = header.split(' ')[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = { uid: decoded.uid, email: decoded.email, claims: decoded };
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
