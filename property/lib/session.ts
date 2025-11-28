import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { AuthUser } from '@/types/auth';

const SECRET_KEY = process.env.JWT_SECRET || 'default-secret-key-change-me';
const COOKIE_NAME = 'session_token';

export async function createSession(user: AuthUser) {
  const token = jwt.sign({ ...user }, SECRET_KEY, { expiresIn: '7d' });
  
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export async function getSession(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as AuthUser;
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
