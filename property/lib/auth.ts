import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// Use a fixed secret so Middleware (Edge) and Server Actions (Node) share it.
// In a real app, this should be in .env
const SECRET_KEY = new TextEncoder().encode(
    process.env.SESSION_SECRET || 'ephemeral-session-secret-key-1234567890'
);

// In-Memory User Store
// This will be cleared on every server restart (and hot reload in dev).
const users: User[] = [
    {
        email: 'demo@example.com',
        password: 'password123',
        name: 'Demo User',
        uniqueId: 'DEMO-1234-5678'
    }
];

export type User = {
    email: string;
    password: string;
    name: string;
    uniqueId: string;
};

export async function getUser(email: string) {
    return users.find((u) => u.email === email);
}

export async function createUser(email: string, password: string) {
    const existing = users.find((u) => u.email === email);
    if (existing) throw new Error('User already exists');

    // Generate a random unique ID for the ephemeral session
    const uniqueId = 'USR-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    const name = email.split('@')[0]; // Simple name derivation

    const newUser = { email, password, name, uniqueId };
    users.push(newUser);
    return newUser;
}

export async function createSession(email: string) {
    const token = await new SignJWT({ email })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(SECRET_KEY);

    const cookieStore = await cookies();
    cookieStore.set('session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 3600
    });
}

// Used by Server Components/Actions (Node.js) - Checks DB
export async function getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get('session')?.value;

    if (!token) return null;

    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        const email = payload.email as string;

        // Verify user exists in memory (enforces ephemeral nature)
        const user = users.find(u => u.email === email);
        if (!user) return null;

        return {
            email,
            name: user.name,
            uniqueId: user.uniqueId
        };
    } catch (error) {
        return null;
    }
}


export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
}
