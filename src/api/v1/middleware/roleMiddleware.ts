import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';

export const requireRole = (role: string | string[]) => (req: AuthRequest, res: Response, next: NextFunction) => {
  const claims = req.user?.claims || {};
  const userRole = claims.role || (claims.admin ? 'admin' : 'user');
  const allowed = Array.isArray(role) ? role : [role];
  if (allowed.includes(userRole)) {
    return next();
  }
  return res.status(403).json({ message: 'Forbidden' });
};
