import { collection, addDoc, query, where, orderBy, limit, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { ActivityLog, ActivityAction } from '@/types/auth';

import { parseDeviceInfo, getClientIP as getIP } from './session';

/**
 * Log user activity
 */
export async function logActivity(
  userId: string,
  action: ActivityAction,
  success: boolean,
  metadata?: Record<string, any>
): Promise<void> {
  try {
    const activityLog: Omit<ActivityLog, 'id' | 'timestamp'> = {
      userId,
      action,
      success,
      metadata: metadata || {},
      ipAddress: getIP(), // Use imported getIP
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      deviceInfo: parseDeviceInfo(), // Add deviceInfo
    };

    await addDoc(collection(db, 'activity_logs'), {
      ...activityLog,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error logging activity:', error);
    // Don't throw - logging should not break the flow
  }
}

/**
 * Get activity logs for a user
 */
export async function getUserActivityLogs(
  userId: string,
  maxResults: number = 50
): Promise<ActivityLog[]> {
  try {
    const logsRef = collection(db, 'activity_logs');
    const q = query(
      logsRef,
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(maxResults)
    );

    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as ActivityLog[];
  } catch (error) {
    console.error('Error getting activity logs:', error);
    return [];
  }
}

/**
 * Get activity logs by action type
 */
export async function getActivityLogsByAction(
  userId: string,
  action: ActivityAction,
  maxResults: number = 50
): Promise<ActivityLog[]> {
  try {
    const logsRef = collection(db, 'activity_logs');
    const q = query(
      logsRef,
      where('userId', '==', userId),
      where('action', '==', action),
      orderBy('timestamp', 'desc'),
      limit(maxResults)
    );

    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as ActivityLog[];
  } catch (error) {
    console.error('Error getting activity logs by action:', error);
    return [];
  }
}

/**
 * Get failed login attempts for a user
 */
export async function getFailedLoginAttempts(
  userId: string,
  since?: Date
): Promise<ActivityLog[]> {
  try {
    const logsRef = collection(db, 'activity_logs');
    let q = query(
      logsRef,
      where('userId', '==', userId),
      where('action', '==', 'login_failed'),
      orderBy('timestamp', 'desc')
    );

    const querySnapshot = await getDocs(q);
    let logs = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as ActivityLog[];

    // Filter by date if provided
    if (since) {
      logs = logs.filter(log => new Date(log.timestamp) >= since);
    }

    return logs;
  } catch (error) {
    console.error('Error getting failed login attempts:', error);
    return [];
  }
}

/**
 * Get security-related activities
 */
export async function getSecurityActivities(
  userId: string,
  maxResults: number = 50
): Promise<ActivityLog[]> {
  const securityActions: ActivityAction[] = [
    'password_change',
    'password_reset_request',
    'password_reset_complete',
    'mfa_enabled',
    'mfa_disabled',
    'account_locked',
    'account_unlocked',
    'login_failed',
  ];

  try {
    const logsRef = collection(db, 'activity_logs');
    const q = query(
      logsRef,
      where('userId', '==', userId),
      where('action', 'in', securityActions),
      orderBy('timestamp', 'desc'),
      limit(maxResults)
    );

    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as ActivityLog[];
  } catch (error) {
    console.error('Error getting security activities:', error);
    return [];
  }
}

/**
 * Helper to get client IP (placeholder - needs server-side implementation)
 */
function getClientIP(): string {
  // This is a placeholder. In production, you'd get this from the server
  // using headers like X-Forwarded-For or X-Real-IP
  return 'unknown';
}

/**
 * Format activity action for display
 */
export function formatActivityAction(action: ActivityAction): string {
  const actionMap: Record<ActivityAction, string> = {
    login: 'Logged in',
    logout: 'Logged out',
    signup: 'Account created',
    password_change: 'Password changed',
    password_reset_request: 'Password reset requested',
    password_reset_complete: 'Password reset completed',
    email_verification: 'Email verification',
    phone_verification: 'Phone verification',
    session_revoked: 'Session revoked',
    email_verification_sent: 'Verification email sent',
    email_verified: 'Email verified',
    phone_verification_sent: 'Phone verification sent',
    phone_verified: 'Phone verified',
    mfa_enabled: '2FA enabled',
    mfa_disabled: '2FA disabled',
    session_created: 'New session created',
    account_locked: 'Account locked',
    account_unlocked: 'Account unlocked',
    login_failed: 'Login failed',
  };

  return actionMap[action] || action;
}

/**
 * Get activity icon for display
 */
export function getActivityIcon(action: ActivityAction): string {
  const iconMap: Record<ActivityAction, string> = {
    login: '🔓',
    logout: '🔒',
    signup: '✨',
    password_change: '🔑',
    password_reset_request: '🔑',
    password_reset_complete: '✅',
    email_verification: '📧',
    phone_verification: '📱',
    session_revoked: '🔒',
    email_verification_sent: '📧',
    email_verified: '✅',
    phone_verification_sent: '📱',
    phone_verified: '✅',
    mfa_enabled: '🛡️',
    mfa_disabled: '🛡️',
    session_created: '💻',
    account_locked: '🔐',
    account_unlocked: '🔓',
    login_failed: '❌',
  };

  return iconMap[action] || '📝';
}
