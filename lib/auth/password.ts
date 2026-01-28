/**
 * Simple password verification for team access
 */

export function verifyPassword(password: string): boolean {
  const correctPassword = process.env.TRAINING_PASSWORD;

  if (!correctPassword) {
    console.error('TRAINING_PASSWORD environment variable not set');
    return false;
  }

  return password === correctPassword;
}

export function hashPassword(password: string): string {
  // Simple hash for cookie value (not for security, just obfuscation)
  return Buffer.from(password).toString('base64');
}

export function validateCookie(cookieValue: string | undefined): boolean {
  if (!cookieValue) return false;

  try {
    const decodedPassword = Buffer.from(cookieValue, 'base64').toString('utf-8');
    return verifyPassword(decodedPassword);
  } catch {
    return false;
  }
}
