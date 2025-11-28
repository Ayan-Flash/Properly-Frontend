import type { RateLimitConfig, RateLimitStatus } from '@/types/auth';

/**
 * Default rate limit configuration
 */
export const DEFAULT_RATE_LIMIT: RateLimitConfig = {
  maxAttempts: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes
  lockoutDurationMs: 30 * 60 * 1000, // 30 minutes
};

/**
 * In-memory storage for rate limiting
 * In production, use Redis or similar distributed cache
 */
interface RateLimitRecord {
  attempts: number;
  firstAttemptAt: number;
  lockedUntil?: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

/**
 * Get rate limit key
 */
function getRateLimitKey(identifier: string, action: string = 'login'): string {
  return `ratelimit:${action}:${identifier}`;
}

/**
 * Check if action is rate limited
 */
export async function checkRateLimit(
  identifier: string,
  action: string = 'login',
  config: RateLimitConfig = DEFAULT_RATE_LIMIT
): Promise<RateLimitStatus> {
  const key = getRateLimitKey(identifier, action);
  const now = Date.now();
  const record = rateLimitStore.get(key);

  // No previous attempts
  if (!record) {
    return {
      allowed: true,
      remaining: config.maxAttempts,
      resetIn: config.windowMs,
    };
  }

  // Check if account is locked
  if (record.lockedUntil && record.lockedUntil > now) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: record.lockedUntil - now,
    };
  }

  // Check if window has expired
  const windowExpired = now - record.firstAttemptAt > config.windowMs;
  if (windowExpired) {
    // Reset the record
    rateLimitStore.delete(key);
    return {
      allowed: true,
      remaining: config.maxAttempts,
      resetIn: config.windowMs,
    };
  }

  // Check if max attempts reached
  if (record.attempts >= config.maxAttempts) {
    // Lock the account
    const lockedUntil = now + config.lockoutDurationMs;
    rateLimitStore.set(key, {
      ...record,
      lockedUntil,
    });

    return {
      allowed: false,
      remaining: 0,
      resetIn: config.lockoutDurationMs,
    };
  }

  // Calculate remaining attempts and reset time
  const remaining = config.maxAttempts - record.attempts;
  const resetIn = config.windowMs - (now - record.firstAttemptAt);

  return {
    allowed: true,
    remaining,
    resetIn,
  };
}

/**
 * Record an attempt (success or failure)
 */
export async function recordAttempt(
  identifier: string,
  success: boolean,
  action: string = 'login',
  config: RateLimitConfig = DEFAULT_RATE_LIMIT
): Promise<void> {
  const key = getRateLimitKey(identifier, action);
  const now = Date.now();

  // If successful, reset the record
  if (success) {
    rateLimitStore.delete(key);
    return;
  }

  // Get or create record
  const record = rateLimitStore.get(key);

  if (!record) {
    // First failed attempt
    rateLimitStore.set(key, {
      attempts: 1,
      firstAttemptAt: now,
    });
  } else {
    // Check if window has expired
    const windowExpired = now - record.firstAttemptAt > config.windowMs;
    
    if (windowExpired) {
      // Reset and start new window
      rateLimitStore.set(key, {
        attempts: 1,
        firstAttemptAt: now,
      });
    } else {
      // Increment attempts
      rateLimitStore.set(key, {
        ...record,
        attempts: record.attempts + 1,
      });
    }
  }
}

/**
 * Reset rate limit for an identifier
 */
export async function resetRateLimit(identifier: string, action: string = 'login'): Promise<void> {
  const key = getRateLimitKey(identifier, action);
  rateLimitStore.delete(key);
}

/**
 * Get current rate limit status without checking
 */
export async function getRateLimitStatus(
  identifier: string,
  action: string = 'login',
  config: RateLimitConfig = DEFAULT_RATE_LIMIT
): Promise<RateLimitStatus> {
  return checkRateLimit(identifier, action, config);
}

/**
 * Clean up expired rate limit records (run periodically)
 */
export function cleanupExpiredRecords(config: RateLimitConfig = DEFAULT_RATE_LIMIT): void {
  const now = Date.now();
  const keysToDelete: string[] = [];

  rateLimitStore.forEach((record, key) => {
    const isExpired = now - record.firstAttemptAt > config.windowMs;
    const isUnlocked = !record.lockedUntil || record.lockedUntil < now;

    if (isExpired && isUnlocked) {
      keysToDelete.push(key);
    }
  });

  keysToDelete.forEach(key => rateLimitStore.delete(key));
}

// Run cleanup every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(() => cleanupExpiredRecords(), 5 * 60 * 1000);
}
