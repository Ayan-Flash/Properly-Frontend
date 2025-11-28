'use client';

import { useCallback } from 'react';
import { useAuthContext } from '@/app/auth/AuthProvider';
import { AUTH_BYPASS_CONFIG } from '@/config/auth-bypass';
import {
  signupWithEmail,
  loginWithEmail,
  logout,
  resetPassword,
  changePassword,
  resendEmailVerification,
  sendSMSVerification,
  verifySMSCode,
  initializeRecaptcha,
} from '@/lib/firebase/auth';
import { getUserActivityLogs, getSecurityActivities } from '@/lib/firebase/activity';
import { getUserSessions, revokeSession, revokeAllSessions } from '@/lib/firebase/session';
import { parseDeviceInfo } from '@/lib/firebase/session';
import type {
  LoginCredentials,
  SignupCredentials,
  PasswordResetRequest,
  PasswordChangeRequest,
  PhoneVerificationRequest,
  ActivityLog,
  Session,
  AuthUser,
} from '@/types/auth';

export function useAuth() {
  const { user, loading, session } = useAuthContext();

  const signup = useCallback(async (credentials: SignupCredentials) => {
    const newUser = await signupWithEmail(credentials);
    return newUser;
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      console.log('[use-auth] Starting login...');
      
      // BYPASS AUTH FOR DEVELOPMENT
      const { BYPASS_AUTH, DEMO_EMAIL, DEMO_PASSWORD } = AUTH_BYPASS_CONFIG;
      
      if (BYPASS_AUTH && credentials.email === DEMO_EMAIL && credentials.password === DEMO_PASSWORD) {
        console.log('[use-auth] BYPASS MODE: Creating mock user session (NO PERSISTENCE)');
        
        // Create mock user and session
        const mockUser: AuthUser = {
          uid: 'demo-user-123',
          email: DEMO_EMAIL,
          emailVerified: true,
          displayName: 'Demo User',
          phoneNumber: null,
          photoURL: null,
          createdAt: new Date(),
          lastLoginAt: new Date(),
          mfaEnabled: false,
          mfaMethods: [],
          accountStatus: 'active',
          loginAttempts: 0,
        };
        
        // For demo email, use session-only cookie (expires when browser closes)
        // This allows testing multiple times without persistence
        const mockSession: Session = {
          sessionId: 'bypass-session-' + Date.now(),
          id: 'bypass-session-' + Date.now(),
          userId: mockUser.uid,
          deviceId: 'bypass-device',
          deviceInfo: {
            ...parseDeviceInfo(),
            userAgent: navigator.userAgent,
            isMobile: false,
          },
          createdAt: new Date(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours max
          lastActivityAt: new Date(),
          ipAddress: '127.0.0.1',
          isActive: true,
        };
        
        // DO NOT store in localStorage for demo - allows multiple test sessions
        // Only set session cookie (session-only, no max-age = expires on browser close)
        const cookieString = `session=${mockSession.sessionId}; path=/; SameSite=Lax`;
        document.cookie = cookieString;
        console.log('[use-auth] Set bypass session cookie (session-only, no persistence):', cookieString);
        console.log('[use-auth] Demo session will expire when browser closes');
        
        return { user: mockUser, session: mockSession };
      }
      
      // Regular Firebase auth
      const deviceInfo = parseDeviceInfo();
      console.log('[use-auth] Device info:', deviceInfo);
      
      const result = await loginWithEmail(credentials, deviceInfo);
      console.log('[use-auth] Login successful, got user and session');
      
      const { user, session } = result;
      
      // Store session ID in localStorage
      localStorage.setItem('sessionId', session.sessionId || '');
      console.log('[use-auth] Stored session ID');
      
      // Set session cookie for middleware
      document.cookie = `session=${session.sessionId}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
      console.log('[use-auth] Set session cookie');
      
      return { user, session };
    } catch (error) {
      console.error('[use-auth] Login failed:', error);
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    // Check if it's a demo session by checking cookie (not localStorage)
    const cookies = document.cookie.split(';');
    const sessionCookie = cookies.find(c => c.trim().startsWith('session='));
    const isDemoSession = sessionCookie && sessionCookie.includes('bypass-session-');
    
    if (isDemoSession) {
      // Bypass mode logout - clear everything
      console.log('[use-auth] BYPASS MODE: Logging out (clearing all demo data)');
      localStorage.removeItem('sessionId');
      localStorage.removeItem('bypassAuth');
      localStorage.removeItem('mockUser');
      // Clear session cookie
      document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      window.location.href = '/auth/login';
      return;
    }
    
    // Regular Firebase logout
    const sessionId = localStorage.getItem('sessionId');
    await logout(sessionId || undefined);
    localStorage.removeItem('sessionId');
    
    // Remove session cookie
    document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }, []);

  const requestPasswordReset = useCallback(async (request: PasswordResetRequest) => {
    await resetPassword(request);
  }, []);

  const updatePassword = useCallback(async (request: PasswordChangeRequest) => {
    await changePassword(request);
  }, []);

  const sendEmailVerification = useCallback(async () => {
    await resendEmailVerification();
  }, []);

  const sendPhoneVerification = useCallback(async (request: PhoneVerificationRequest) => {
    const recaptchaVerifier = initializeRecaptcha('recaptcha-container');
    const verificationId = await sendSMSVerification(request, recaptchaVerifier);
    return verificationId;
  }, []);

  const verifyPhoneCode = useCallback(async (verificationId: string, code: string) => {
    await verifySMSCode(verificationId, code);
  }, []);

  const getActivityLog = useCallback(async (maxResults: number = 50): Promise<ActivityLog[]> => {
    if (!user) return [];
    return getUserActivityLogs(user.uid, maxResults);
  }, [user]);

  const getSecurityLog = useCallback(async (maxResults: number = 50): Promise<ActivityLog[]> => {
    if (!user) return [];
    return getSecurityActivities(user.uid, maxResults);
  }, [user]);

  const getActiveSessions = useCallback(async (): Promise<Session[]> => {
    if (!user) return [];
    return getUserSessions(user.uid);
  }, [user]);

  const terminateSession = useCallback(async (sessionId: string) => {
    if (!user) return;
    await revokeSession(user.uid, sessionId);
  }, [user]);

  const terminateAllSessions = useCallback(async (exceptCurrent: boolean = true) => {
    if (!user) return;
    const currentSessionId = exceptCurrent ? localStorage.getItem('sessionId') || undefined : undefined;
    await revokeAllSessions(user.uid, currentSessionId);
  }, [user]);

  return {
    // State
    user,
    loading,
    session,
    isAuthenticated: !!user,
    
    // Auth methods
    signup,
    login,
    logout: signOut,
    resetPassword: requestPasswordReset,
    changePassword: updatePassword,
    
    // Verification
    sendEmailVerification,
    sendPhoneVerification,
    verifyPhoneCode,
    
    // Activity & Sessions
    getActivityLog,
    getSecurityLog,
    getActiveSessions,
    terminateSession,
    terminateAllSessions,
  };
}
