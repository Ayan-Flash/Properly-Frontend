import { AuthUser } from '@/types/auth';

// In-memory store for users
// This will be reset when the server restarts
const globalForUsers = global as unknown as { users: AuthUser[] };

export const users = globalForUsers.users || [];

if (process.env.NODE_ENV !== 'production') globalForUsers.users = users;

export const addUser = (user: AuthUser) => {
  users.push(user);
};

export const findUserByEmail = (email: string) => {
  return users.find((u) => u.email === email);
};

export const getAllUsers = () => users;
