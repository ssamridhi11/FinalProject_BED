import { authenticate } from '../src/api/v1/middleware/authMiddleware';
import admin from '../src/config/firebase';

jest.mock('../src/config/firebase', () => ({
  auth: jest.fn(() => ({
    verifyIdToken: jest.fn(),
  })),
  default: {
    auth: () => ({ verifyIdToken: jest.fn() }),
  },
}));

describe('Auth middleware', () => {
  test('unauthorized when missing header', async () => {
    const req: any = { headers: {} };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    // @ts-ignore - call directly
    await authenticate(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });
});
