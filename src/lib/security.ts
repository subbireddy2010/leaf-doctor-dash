
import { z } from 'zod';

// File validation schemas
export const imageFileSchema = z.object({
  file: z.instanceof(File).refine(
    (file) => file.size <= 10 * 1024 * 1024, // 10MB max
    { message: "File size must be less than 10MB" }
  ).refine(
    (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
    { message: "Only JPEG, PNG, and WebP images are allowed" }
  ),
});

// Input sanitization
export const sanitizeString = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
};

// Rate limiting helper (client-side)
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  
  constructor(
    private maxAttempts: number = 5,
    private windowMs: number = 60000 // 1 minute
  ) {}

  isAllowed(key: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    
    // Remove old attempts outside the window
    const validAttempts = attempts.filter(time => now - time < this.windowMs);
    
    if (validAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    // Record this attempt
    validAttempts.push(now);
    this.attempts.set(key, validAttempts);
    
    return true;
  }

  reset(key: string): void {
    this.attempts.delete(key);
  }
}

// Error handling that doesn't expose sensitive information
export const createSafeError = (error: unknown, fallbackMessage: string = 'An error occurred'): string => {
  if (error instanceof Error) {
    // Only show specific error messages in development
    if (import.meta.env.DEV) {
      console.error('Detailed error:', error);
      return error.message;
    }
    
    // In production, return generic messages for security
    const safeErrors = [
      'Invalid file type',
      'File too large',
      'Network error',
      'Validation failed'
    ];
    
    if (safeErrors.some(safe => error.message.includes(safe))) {
      return error.message;
    }
  }
  
  return fallbackMessage;
};

// Secure local storage wrapper
export const secureStorage = {
  set: (key: string, value: any): void => {
    try {
      const sanitizedKey = sanitizeString(key);
      localStorage.setItem(sanitizedKey, JSON.stringify(value));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  },
  
  get: (key: string): any => {
    try {
      const sanitizedKey = sanitizeString(key);
      const item = localStorage.getItem(sanitizedKey);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return null;
    }
  },
  
  remove: (key: string): void => {
    try {
      const sanitizedKey = sanitizeString(key);
      localStorage.removeItem(sanitizedKey);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  }
};
