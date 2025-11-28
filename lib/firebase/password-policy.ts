import type { PasswordPolicy, PasswordStrength } from '@/types/auth';

/**
 * Default password policy
 */
export const DEFAULT_PASSWORD_POLICY: PasswordPolicy = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  preventCommonPasswords: true,
  preventPasswordReuse: 5, // Last 5 passwords
};

/**
 * Common passwords to block (top 100 most common)
 */
const COMMON_PASSWORDS = [
  'password', '123456', '12345678', 'qwerty', 'abc123', 'monkey', '1234567', 'letmein',
  'trustno1', 'dragon', 'baseball', 'iloveyou', 'master', 'sunshine', 'ashley', 'bailey',
  'passw0rd', 'shadow', '123123', '654321', 'superman', 'qazwsx', 'michael', 'football',
  'welcome', 'jesus', 'ninja', 'mustang', 'password1', '123456789', 'adobe123', 'admin',
  'administrator', 'root', 'toor', 'pass', 'test', 'guest', 'info', 'adm', 'mysql',
  'user', 'administrator', 'oracle', 'ftp', 'pi', 'puppet', 'ansible', 'ec2-user',
  'vagrant', 'azureuser', 'admin123', 'admin1234', 'password123', 'passw0rd123',
];

/**
 * Validate password against policy
 */
export function validatePasswordPolicy(
  password: string,
  policy: PasswordPolicy = DEFAULT_PASSWORD_POLICY
): PasswordStrength {
  const feedback: string[] = [];
  let score = 0;

  // Check minimum length
  if (password.length < policy.minLength) {
    feedback.push(`Password must be at least ${policy.minLength} characters long`);
  } else {
    score += 1;
  }

  // Check for uppercase
  if (policy.requireUppercase && !/[A-Z]/.test(password)) {
    feedback.push('Password must contain at least one uppercase letter');
  } else if (policy.requireUppercase) {
    score += 1;
  }

  // Check for lowercase
  if (policy.requireLowercase && !/[a-z]/.test(password)) {
    feedback.push('Password must contain at least one lowercase letter');
  } else if (policy.requireLowercase) {
    score += 1;
  }

  // Check for numbers
  if (policy.requireNumbers && !/[0-9]/.test(password)) {
    feedback.push('Password must contain at least one number');
  } else if (policy.requireNumbers) {
    score += 1;
  }

  // Check for special characters
  if (policy.requireSpecialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    feedback.push('Password must contain at least one special character');
  } else if (policy.requireSpecialChars) {
    score += 1;
  }

  // Check for common passwords
  if (policy.preventCommonPasswords && COMMON_PASSWORDS.includes(password.toLowerCase())) {
    feedback.push('This password is too common. Please choose a more unique password');
    score = Math.max(0, score - 2);
  }

  // Additional strength checks
  if (password.length >= 12) {
    score += 1;
  }
  if (password.length >= 16) {
    score += 1;
  }

  // Check for repeated characters
  if (/(.)\1{2,}/.test(password)) {
    feedback.push('Avoid using repeated characters');
    score = Math.max(0, score - 1);
  }

  // Check for sequential characters
  if (/(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(password)) {
    feedback.push('Avoid using sequential characters');
    score = Math.max(0, score - 1);
  }

  // Cap score at 4
  score = Math.min(4, score);

  // Determine strength level
  let strength: 'weak' | 'fair' | 'good' | 'strong' | 'very-strong' = 'weak';
  if (score >= 4) strength = 'very-strong';
  else if (score >= 3) strength = 'strong';
  else if (score >= 2) strength = 'good';
  else if (score >= 1) strength = 'fair';

  const passesPolicy = feedback.length === 0;

  return {
    score,
    strength,
    feedback,
    passesPolicy,
  };
}

/**
 * Check if password was recently used
 */
export function checkPasswordReuse(
  newPassword: string,
  previousPasswords: string[],
  policy: PasswordPolicy = DEFAULT_PASSWORD_POLICY
): boolean {
  if (!policy.preventPasswordReuse || policy.preventPasswordReuse === 0) {
    return true;
  }

  const recentPasswords = previousPasswords.slice(0, policy.preventPasswordReuse);
  
  // In production, you would use bcrypt.compare or similar for hashed passwords
  // For now, this is a placeholder
  return !recentPasswords.includes(newPassword);
}

/**
 * Generate password strength indicator color
 */
export function getPasswordStrengthColor(strength: PasswordStrength['strength']): string {
  switch (strength) {
    case 'very-strong':
      return 'text-green-600';
    case 'strong':
      return 'text-blue-600';
    case 'good':
      return 'text-yellow-600';
    case 'fair':
      return 'text-orange-600';
    case 'weak':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
}

/**
 * Get password strength percentage
 */
export function getPasswordStrengthPercentage(score: number): number {
  return (score / 4) * 100;
}
