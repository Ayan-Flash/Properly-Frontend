import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  PhoneAuthProvider,
  multiFactor,
  PhoneMultiFactorGenerator,
  RecaptchaVerifier,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import type {
  LoginCredentials,
  SignupCredentials,
  PasswordResetRequest,
  PasswordChangeRequest,
  PhoneVerificationRequest,
  AuthUser,
  Session,
} from '@/types/auth';
import { validatePasswordPolicy } from './password-policy';
import { checkRateLimit, recordAttempt } from './rate-limit';
import { createSession, validateSession, revokeSession } from './session';
import { logActivity } from './activity';

/**
 * Sign up a new user with email and password
 */
export async function signupWithEmail(credentials: SignupCredentials): Promise<AuthUser> {
  const { email, password, displayName, phoneNumber } = credentials;

  // Validate password policy
  const passwordValidation = validatePasswordPolicy(password);
  if (!passwordValidation.passesPolicy) {
    throw new Error(`Password does not meet requirements: ${passwordValidation.feedback.join(', ')}`);
  }

  try {
    console.log('Creating Firebase user...')
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    console.log('Sending email verification...')
    // Send email verification
    await sendEmailVerification(firebaseUser);

    // Create user document in Firestore
    const userData: AuthUser = {
      uid: firebaseUser.uid,
      email: firebaseUser.email!,
      emailVerified: false,
      displayName: displayName || null,
      phoneNumber: phoneNumber || null,
      photoURL: null,
      mfaEnabled: false,
      mfaMethods: [],
      passwordLastChanged: new Date(),
      accountStatus: 'active',
      loginAttempts: 0,
      metadata: {
        createdAt: new Date(),
        lastLoginAt: null,
        lastPasswordChangeAt: new Date(),
      },
    };

    const userDocData = {
      ...userData,
      passwordLastChanged: serverTimestamp(),
      metadata: {
        createdAt: serverTimestamp(),
        lastLoginAt: null,
        lastPasswordChangeAt: serverTimestamp(),
      },
    };

    console.log('Creating user document in Firestore...')
    await setDoc(doc(db, 'users', firebaseUser.uid), userDocData);

    console.log('Logging activity...')
    // Log activity
    await logActivity(firebaseUser.uid, 'signup', true);

    console.log('Signup complete!')
    return userData;
  } catch (error: any) {
    console.error('Signup error in auth.ts:', error)
    throw new Error(error.message || 'Failed to create account');
  }
}

/**
 * Sign in user with email and password
 */
export async function loginWithEmail(
  credentials: LoginCredentials,
  deviceInfo?: any
): Promise<{ user: AuthUser; session: Session }> {
  const { email, password, rememberMe } = credentials;

  try {
    // Attempt login
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Get or create user document
    let userData: AuthUser;
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    
    if (!userDoc.exists()) {
      // Create user document if it doesn't exist (for demo or first-time users)
      userData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        emailVerified: firebaseUser.emailVerified,
        displayName: firebaseUser.displayName || null,
        phoneNumber: firebaseUser.phoneNumber || null,
        photoURL: firebaseUser.photoURL || null,
        mfaEnabled: false,
        mfaMethods: [],
        passwordLastChanged: new Date(),
        accountStatus: 'active',
        loginAttempts: 0,
        metadata: {
          createdAt: new Date(),
          lastLoginAt: new Date(),
          lastPasswordChangeAt: new Date(),
        },
      };

      try {
        await setDoc(doc(db, 'users', firebaseUser.uid), {
          ...userData,
          passwordLastChanged: serverTimestamp(),
          metadata: {
            createdAt: serverTimestamp(),
            lastLoginAt: serverTimestamp(),
            lastPasswordChangeAt: serverTimestamp(),
          },
        });
      } catch (firestoreError) {
        console.warn('Could not create user document in Firestore:', firestoreError);
      }
    } else {
      userData = userDoc.data() as AuthUser;

      // Check account status
      if (userData.accountStatus === 'locked') {
        throw new Error('Account is locked. Please contact support.');
      }
      if (userData.accountStatus === 'suspended') {
        throw new Error('Account is suspended. Please contact support.');
      }

      // Update last login
      try {
        await updateDoc(doc(db, 'users', firebaseUser.uid), {
          loginAttempts: 0,
          'metadata.lastLoginAt': serverTimestamp(),
        });
      } catch (firestoreError) {
        console.warn('Could not update user document:', firestoreError);
      }
    }

    // Create session
    let session: Session;
    try {
      session = await createSession(firebaseUser.uid, rememberMe || false, deviceInfo);
    } catch (sessionError) {
      console.warn('Could not create session:', sessionError);
      // Create a basic session object
      session = {
        sessionId: `session-${Date.now()}`,
        userId: firebaseUser.uid,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + (rememberMe ? 7 : 1) * 24 * 60 * 60 * 1000),
        lastActivityAt: new Date(),
        deviceInfo: deviceInfo || {},
        ipAddress: 'unknown',
        isActive: true,
      };
    }

    // Try to log activity (non-blocking)
    try {
      await logActivity(firebaseUser.uid, 'login', true, { deviceInfo });
    } catch (logError) {
      console.warn('Could not log activity:', logError);
    }

    return {
      user: {
        ...userData,
        metadata: {
          ...userData.metadata,
          lastLoginAt: new Date(),
        },
      },
      session,
    };
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error.message || 'Invalid email or password');
  }
}

/**
 * Sign out current user
 */
export async function logout(sessionId?: string): Promise<void> {
  if (!auth.currentUser) {
    throw new Error('No user is currently signed in');
  }

  const uid = auth.currentUser.uid;

  try {
    // Revoke session if sessionId provided
    if (sessionId) {
      await revokeSession(uid, sessionId);
    }

    // Log activity
    await logActivity(uid, 'logout', true);

    // Sign out from Firebase
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message || 'Failed to sign out');
  }
}

/**
 * Send password reset email
 */
export async function resetPassword(request: PasswordResetRequest): Promise<void> {
  const { email } = request;

  try {
    await sendPasswordResetEmail(auth, email);
    await logActivity(email, 'password_reset_request', true);
  } catch (error: any) {
    await logActivity(email, 'password_reset_request', false);
    throw new Error(error.message || 'Failed to send password reset email');
  }
}

/**
 * Change user password
 */
export async function changePassword(request: PasswordChangeRequest): Promise<void> {
  if (!auth.currentUser) {
    throw new Error('No user is currently signed in');
  }

  const { currentPassword, newPassword } = request;

  // Validate new password
  const passwordValidation = validatePasswordPolicy(newPassword);
  if (!passwordValidation.passesPolicy) {
    throw new Error(`Password does not meet requirements: ${passwordValidation.feedback.join(', ')}`);
  }

  try {
    // Reauthenticate user
    const credential = EmailAuthProvider.credential(auth.currentUser.email!, currentPassword);
    await reauthenticateWithCredential(auth.currentUser, credential);

    // Update password
    await updatePassword(auth.currentUser, newPassword);

    // Update user document
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      passwordLastChanged: serverTimestamp(),
      'metadata.lastPasswordChangeAt': serverTimestamp(),
    });

    // Log activity
    await logActivity(auth.currentUser.uid, 'password_change', true);
  } catch (error: any) {
    await logActivity(auth.currentUser.uid, 'password_change', false);
    throw new Error(error.message || 'Failed to change password');
  }
}

/**
 * Resend email verification
 */
export async function resendEmailVerification(): Promise<void> {
  if (!auth.currentUser) {
    throw new Error('No user is currently signed in');
  }

  if (auth.currentUser.emailVerified) {
    throw new Error('Email is already verified');
  }

  try {
    await sendEmailVerification(auth.currentUser);
    await logActivity(auth.currentUser.uid, 'email_verification_sent', true);
  } catch (error: any) {
    await logActivity(auth.currentUser.uid, 'email_verification_sent', false);
    throw new Error(error.message || 'Failed to send verification email');
  }
}

/**
 * Initialize reCAPTCHA verifier
 */
export function initializeRecaptcha(containerId: string): RecaptchaVerifier {
  if (!auth) {
    throw new Error('Firebase auth not initialized');
  }

  return new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved
    },
  });
}

/**
 * Send SMS verification code (Firebase Phone Auth)
 */
export async function sendSMSVerification(
  request: PhoneVerificationRequest,
  recaptchaVerifier: RecaptchaVerifier
): Promise<string> {
  const { phoneNumber } = request;

  try {
    const phoneProvider = new PhoneAuthProvider(auth);
    const verificationId = await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier);

    if (auth.currentUser) {
      await logActivity(auth.currentUser.uid, 'phone_verification_sent', true, { phoneNumber });
    }

    return verificationId;
  } catch (error: any) {
    if (auth.currentUser) {
      await logActivity(auth.currentUser.uid, 'phone_verification_sent', false);
    }
    throw new Error(error.message || 'Failed to send SMS verification');
  }
}

/**
 * Verify SMS code and link phone number
 */
export async function verifySMSCode(verificationId: string, code: string): Promise<void> {
  if (!auth.currentUser) {
    throw new Error('No user is currently signed in');
  }

  try {
    const credential = PhoneAuthProvider.credential(verificationId, code);
    const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(credential);

    // Enroll in MFA
    await multiFactor(auth.currentUser).enroll(multiFactorAssertion, 'Phone Number');

    // Update user document
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      mfaEnabled: true,
      mfaMethods: ['sms'],
      phoneNumber: auth.currentUser.phoneNumber,
    });

    await logActivity(auth.currentUser.uid, 'mfa_enabled', true, { method: 'sms' });
  } catch (error: any) {
    await logActivity(auth.currentUser.uid, 'mfa_enabled', false);
    throw new Error(error.message || 'Failed to verify SMS code');
  }
}

/**
 * Get current user data
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  if (!auth.currentUser) {
    return null;
  }

  try {
    const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
    if (!userDoc.exists()) {
      return null;
    }

    return userDoc.data() as AuthUser;
  } catch (error) {
    return null;
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(updates: Partial<AuthUser>): Promise<void> {
  if (!auth.currentUser) {
    throw new Error('No user is currently signed in');
  }

  try {
    await updateDoc(doc(db, 'users', auth.currentUser.uid), updates);
  } catch (error: any) {
    throw new Error(error.message || 'Failed to update profile');
  }
}
