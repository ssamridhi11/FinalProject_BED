import { authenticate } from '../src/api/v1/middleware/authMiddleware';
import { requireRole } from '../src/api/v1/middleware/roleMiddleware';
import { Request, Response } from 'express';

// We will test role middleware logic by calling the factory with a mock req

describe('Role middleware', () => {
  test('requireRole allows matching role', () => {
    const req: any = { user: { claims: { role: 'admin' } } } as Request;
    const res: any = {} as Response;
    const next = jest.fn();
    const mw = requireRole('admin');
    mw(req, res, next as any);
    expect(next).toHaveBeenCalled();
  });

  test('requireRole forbids non-matching role', () => {
    const req: any = { user: { claims: { role: 'user' } } } as Request;
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    const next = jest.fn();
    const mw = requireRole('admin');
    mw(req, res, next as any);
    expect(res.status).toHaveBeenCalledWith(403);
  });
});

