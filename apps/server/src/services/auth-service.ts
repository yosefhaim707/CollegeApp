import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user';
import { env } from '../config/env';
import type { LoginInput, RegisterInput } from '../schemas/auth';

export async function registerUser(input: RegisterInput) {
  const existing = await UserModel.findOne({ email: input.email }).lean();
  if (existing) {
    throw { status: 409, message: 'User already exists' };
  }
  const passwordHash = await argon2.hash(input.password);
  const user = await UserModel.create({
    email: input.email,
    name: input.name,
    passwordHash,
  });
  return user.toJSON();
}

export async function loginUser(input: LoginInput) {
  const user = await UserModel.findOne({ email: input.email });
  if (!user) {
    throw { status: 401, message: 'Invalid credentials' };
  }
  const valid = await argon2.verify(user.passwordHash, input.password);
  if (!valid) {
    throw { status: 401, message: 'Invalid credentials' };
  }
  const token = jwt.sign({ sub: user.id, roles: user.roles }, env.JWT_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ sub: user.id }, env.JWT_SECRET, { expiresIn: '7d' });
  return { token, refreshToken, user: user.toJSON() };
}

export function refreshToken(token: string) {
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { sub: string };
    const accessToken = jwt.sign({ sub: payload.sub, roles: ['user'] }, env.JWT_SECRET, {
      expiresIn: '1h',
    });
    return { token: accessToken };
  } catch (error) {
    throw { status: 401, message: 'Invalid refresh token', error };
  }
}
