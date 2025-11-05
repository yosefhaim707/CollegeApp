import type { Request, Response } from 'express';
import { loginUser, refreshToken, registerUser } from '../services/auth-service';

export async function registerHandler(req: Request, res: Response) {
  const user = await registerUser(req.body);
  res.status(201).json({ user });
}

export async function loginHandler(req: Request, res: Response) {
  const result = await loginUser(req.body);
  res.json(result);
}

export async function refreshHandler(req: Request, res: Response) {
  const { token } = refreshToken(req.body.refreshToken);
  res.json({ token });
}
