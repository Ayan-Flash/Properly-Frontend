import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Session, DeviceInfo } from '@/types/auth';
import { v4 as uuidv4 } from 'uuid';

/**
 * Parse device information from user agent
 */
export function parseDeviceInfo(userAgent?: string): DeviceInfo {
  if (typeof window === 'undefined' || !userAgent) {
    userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  }

  const ua = userAgent.toLowerCase();
  
  // Detect browser
  let browser = 'Unknown';
  if (ua.includes('chrome')) browser = 'Chrome';
  else if (ua.includes('firefox')) browser = 'Firefox';
  else if (ua.includes('safari')) browser = 'Safari';
  else if (ua.includes('edge')) browser = 'Edge';
  else if (ua.includes('opera')) browser = 'Opera';

  // Detect OS
  let os = 'Unknown';
  if (ua.includes('windows')) os = 'Windows';
  else if (ua.includes('mac')) os = 'macOS';
  else if (ua.includes('linux')) os = 'Linux';
  else if (ua.includes('android')) os = 'Android';
  else if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) os = 'iOS';

  // Detect device type
  let device = 'Desktop';
  if (ua.includes('mobile')) device = 'Mobile';
  else if (ua.includes('tablet') || ua.includes('ipad')) device = 'Tablet';

  const isMobile = device === 'Mobile' || device === 'Tablet';

  return {
    userAgent,
    browser,
    os,
    device,
    isMobile,
  };
}

/**
 * Get client IP address (Note: This needs server-side implementation)
 */
export function getClientIP(): string {
  // This is a placeholder. In production, you'd get this from the server
  // using headers like X-Forwarded-For or X-Real-IP
  return 'unknown';
}

/**
 * Create a new session
 */
export async function createSession(
  userId: string,
  rememberMe: boolean = false,
  deviceInfo?: DeviceInfo
): Promise<Session> {
  const sessionId = uuidv4();
  const now = new Date();
  
  // Session duration: 7 days if rememberMe, 24 hours otherwise
  const expiresIn = rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
  const expiresAt = new Date(now.getTime() + expiresIn);

  const session: Session = {
    sessionId,
    userId,
    createdAt: now,
    expiresAt,
    lastActivityAt: now,
    deviceInfo: deviceInfo || parseDeviceInfo(),
    ipAddress: getClientIP(),
    isActive: true,
  };

  // Store session in Firestore
  await setDoc(doc(db, 'sessions', sessionId), {
    ...session,
    createdAt: serverTimestamp(),
    expiresAt: expiresAt,
    lastActivityAt: serverTimestamp(),
  });

  return session;
}

/**
 * Validate a session
 */
export async function validateSession(sessionId: string): Promise<Session | null> {
  try {
    const sessionDoc = await getDoc(doc(db, 'sessions', sessionId));
    
    if (!sessionDoc.exists()) {
      return null;
    }

    const session = sessionDoc.data() as Session;
    const now = new Date();

    // Check if session is expired
    if (new Date(session.expiresAt) < now) {
      await revokeSession(session.userId, sessionId);
      return null;
    }

    // Check if session is active
    if (!session.isActive) {
      return null;
    }

    // Update last activity
    await updateDoc(doc(db, 'sessions', sessionId), {
      lastActivityAt: serverTimestamp(),
    });

    return session;
  } catch (error) {
    console.error('Error validating session:', error);
    return null;
  }
}

/**
 * Revoke a session
 */
export async function revokeSession(userId: string, sessionId: string): Promise<void> {
  try {
    await updateDoc(doc(db, 'sessions', sessionId), {
      isActive: false,
    });
  } catch (error) {
    console.error('Error revoking session:', error);
  }
}

/**
 * Revoke all sessions for a user
 */
export async function revokeAllSessions(userId: string, exceptSessionId?: string): Promise<void> {
  try {
    const sessionsRef = collection(db, 'sessions');
    const q = query(sessionsRef, where('userId', '==', userId), where('isActive', '==', true));
    const querySnapshot = await getDocs(q);

    const updatePromises = querySnapshot.docs
      .filter(doc => !exceptSessionId || doc.id !== exceptSessionId)
      .map(doc => updateDoc(doc.ref, { isActive: false }));

    await Promise.all(updatePromises);
  } catch (error) {
    console.error('Error revoking all sessions:', error);
  }
}

/**
 * Get all active sessions for a user
 */
export async function getUserSessions(userId: string): Promise<Session[]> {
  try {
    const sessionsRef = collection(db, 'sessions');
    const q = query(sessionsRef, where('userId', '==', userId), where('isActive', '==', true));
    const querySnapshot = await getDocs(q);

    const sessions: Session[] = [];
    const now = new Date();

    for (const docSnapshot of querySnapshot.docs) {
      const session = docSnapshot.data() as Session;
      
      // Check if session is expired
      if (new Date(session.expiresAt) < now) {
        await revokeSession(userId, docSnapshot.id);
        continue;
      }

      sessions.push(session);
    }

    return sessions;
  } catch (error) {
    console.error('Error getting user sessions:', error);
    return [];
  }
}

/**
 * Clean up expired sessions (run periodically)
 */
export async function cleanupExpiredSessions(): Promise<void> {
  try {
    const sessionsRef = collection(db, 'sessions');
    const q = query(sessionsRef, where('isActive', '==', true));
    const querySnapshot = await getDocs(q);

    const now = new Date();
    const deletePromises: Promise<void>[] = [];

    querySnapshot.docs.forEach(doc => {
      const session = doc.data() as Session;
      if (new Date(session.expiresAt) < now) {
        deletePromises.push(deleteDoc(doc.ref));
      }
    });

    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error cleaning up expired sessions:', error);
  }
}

/**
 * Extend session expiration
 */
export async function extendSession(sessionId: string, additionalMs: number = 7 * 24 * 60 * 60 * 1000): Promise<void> {
  try {
    const sessionDoc = await getDoc(doc(db, 'sessions', sessionId));
    
    if (!sessionDoc.exists()) {
      throw new Error('Session not found');
    }

    const session = sessionDoc.data() as Session;
    const newExpiresAt = new Date(new Date(session.expiresAt).getTime() + additionalMs);

    await updateDoc(doc(db, 'sessions', sessionId), {
      expiresAt: newExpiresAt,
    });
  } catch (error) {
    console.error('Error extending session:', error);
  }
}
