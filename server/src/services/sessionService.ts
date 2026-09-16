import { randomUUID } from 'node:crypto';
import type { ReflectionSession } from '../types/session.js';

class SessionService {
  private sessions = new Map<string, ReflectionSession>();

  /**
   * Create a new reflection session
   */
  public createSession(): ReflectionSession {
    const now = new Date().toISOString();
    const session: ReflectionSession = {
      sessionId: randomUUID(),
      currentStep: 'mask',
      status: 'active',
      createdAt: now,
      updatedAt: now,
    };

    this.sessions.set(session.sessionId, session);
    return session;
  }

  /**
   * Retrieve a session by its ID
   */
  public getSession(sessionId: string): ReflectionSession | null {
    return this.sessions.get(sessionId) ?? null;
  }

  /**
   * Retrieve all sessions (useful for debugging/testing)
   */
  public getAllSessions(): ReflectionSession[] {
    return Array.from(this.sessions.values());
  }

  /**
   * Clear all sessions (for testing)
   */
  public clear(): void {
    this.sessions.clear();
  }
}

export const sessionService = new SessionService();
