import { registerUser } from '../src/services/auth-service';
import { UserModel } from '../src/models/user';

jest.mock('../src/models/user', () => ({
  UserModel: {
    findOne: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({
      toJSON: () => ({ email: 'test@example.com' }),
    }),
  },
}));

jest.mock('argon2', () => ({
  hash: jest.fn().mockResolvedValue('hash'),
}));

describe('registerUser', () => {
  it('creates a user when email unused', async () => {
    const user = await registerUser({ email: 'test@example.com', password: 'password123' });
    expect(user).toEqual({ email: 'test@example.com' });
  });
});
