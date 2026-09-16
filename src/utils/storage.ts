const SESSION_ID_KEY = 'unmasked_session_id';
const SESSION_DATA_KEY = 'unmasked_session_data';

export const storage = {
  getSessionId: (): string | null => {
    try {
      return localStorage.getItem(SESSION_ID_KEY);
    } catch {
      return null;
    }
  },

  setSessionId: (sessionId: string): void => {
    try {
      localStorage.setItem(SESSION_ID_KEY, sessionId);
    } catch (e) {
      console.warn('Could not save session ID to localStorage:', e);
    }
  },

  removeSessionId: (): void => {
    try {
      localStorage.removeItem(SESSION_ID_KEY);
      localStorage.removeItem(SESSION_DATA_KEY);
    } catch (e) {
      console.warn('Could not remove session from localStorage:', e);
    }
  },

  setSessionData: (data: unknown): void => {
    try {
      localStorage.setItem(SESSION_DATA_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Could not save session data to localStorage:', e);
    }
  },

  getSessionData: <T>(): T | null => {
    try {
      const data = localStorage.getItem(SESSION_DATA_KEY);
      return data ? (JSON.parse(data) as T) : null;
    } catch {
      return null;
    }
  },
};
