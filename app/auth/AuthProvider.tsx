'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import type { AuthUser, AuthState, Session } from '@/types/auth';
import { getCurrentUser } from '@/lib/firebase/auth';
import { validateSession } from '@/lib/firebase/session';

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    session: null,
    error: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    // Demo email sessions should NOT persist - always start fresh
    // This allows testing multiple times without staying logged in
    // Only check session cookie for demo (session-only, expires on browser close)
    const cookies = document.cookie.split(';');
    const sessionCookie = cookies.find(c => c.trim().startsWith('session='));
    const isDemoSession = sessionCookie && sessionCookie.includes('bypass-session-');
    
    if (isDemoSession) {
      // Demo session exists in cookie (session-only, no localStorage)
      // This will only work during the same browser session
      console.log('[AuthProvider] Demo session detected (session-only, no persistence)');
      // Don't restore from localStorage - demo sessions don't persist
      // User must login again after closing browser
    }
    
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get full user data from Firestore
          const userData = await getCurrentUser();
          
          if (userData) {
            // Validate current session if exists
            let session: Session | null = null;
            const sessionId = localStorage.getItem('sessionId');
            
            if (sessionId) {
              session = await validateSession(sessionId);
              
              // If session is invalid, clear it
              if (!session) {
                localStorage.removeItem('sessionId');
              }
            }

            setState({
              user: userData,
              loading: false,
              session,
              error: null,
              isAuthenticated: true,
            });
            
            // Set session cookie if session exists
            if (session) {
              document.cookie = `session=${sessionId}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
            }
          } else {
            setState({
              user: null,
              loading: false,
              session: null,
              error: null,
              isAuthenticated: false,
            });
          }
        } catch (error) {
          console.error('Error loading user data:', error);
          setState({
            user: null,
            loading: false,
            session: null,
            error: {
              code: 'auth/user-load-error',
              message: error instanceof Error ? error.message : 'Failed to load user',
            },
            isAuthenticated: false,
          });
        }
      } else {
        setState({
          user: null,
          loading: false,
          session: null,
          error: null,
          isAuthenticated: false,
        });
        localStorage.removeItem('sessionId');
        // Remove session cookie
        document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
    });

    return () => unsubscribe();
  }, []);

  // Check session validity periodically
  useEffect(() => {
    if (!state.session) return;

    const checkSession = async () => {
      const bypassAuth = localStorage.getItem('bypassAuth');
      if (bypassAuth === 'true') {
        // Skip validation for bypass mode
        return;
      }
      
      const sessionId = localStorage.getItem('sessionId');
      if (!sessionId) return;

      const session = await validateSession(sessionId);
      if (!session) {
        // Session expired, sign out
        setState({
          user: null,
          loading: false,
          session: null,
          error: null,
          isAuthenticated: false,
        });
        localStorage.removeItem('sessionId');
        // Remove session cookie
        document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
    };

    // Check session every 5 minutes
    const interval = setInterval(checkSession, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [state.session]);

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
