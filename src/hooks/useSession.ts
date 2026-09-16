import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { sessionService } from '../services/sessionService';
import { storage } from '../utils/storage';
import type { ReflectionSession } from '../types/session';

interface UseSessionReturn {
  session: ReflectionSession | null;
  isLoading: boolean;
  error: string | null;
  startSession: (options?: { fallbackToLocal?: boolean }) => Promise<void>;
  clearError: () => void;
}

export const useSession = (): UseSessionReturn => {
  const [session, setSession] = useState<ReflectionSession | null>(() => storage.getSessionData<ReflectionSession>());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const startSession = useCallback(async (options?: { fallbackToLocal?: boolean }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await sessionService.createSession();

      if (response.success && response.session) {
        setSession(response.session);
        storage.setSessionId(response.session.sessionId);
        storage.setSessionData(response.session);

        // Transition to next stage: Mask
        navigate('/mask');
      } else {
        throw new Error(response.message || 'Unable to create session');
      }
    } catch (err) {
      console.error('Session creation failed:', err);
      const errMsg = err instanceof Error ? err.message : 'An unexpected error occurred while connecting to the server.';
      
      if (options?.fallbackToLocal) {
        // Safe offline/fallback mode so user journey isn't blocked if backend isn't ready
        const localSession: ReflectionSession = {
          sessionId: `local-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          currentStep: 'mask',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setSession(localSession);
        storage.setSessionId(localSession.sessionId);
        storage.setSessionData(localSession);
        navigate('/mask');
        return;
      }

      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  return {
    session,
    isLoading,
    error,
    startSession,
    clearError,
  };
};
