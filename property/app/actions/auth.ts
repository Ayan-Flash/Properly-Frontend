'use server';

import { createUser, getUser, createSession, deleteSession, getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  const user = await getUser(email);
  if (!user || user.password !== password) {
    return { error: 'Invalid email or password' };
  }

  await createSession(email);
  redirect('/dashboard');
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  try {
    await createUser(email, password);
    await createSession(email);
  } catch (error: any) {
    return { error: error.message };
  }

  redirect('/dashboard');
}

export async function logout() {
  await deleteSession();
  redirect('/auth/login');
}

export async function getSessionAction() {
  return await getSession();
}