import type { CreateSessionResponse, GetSessionResponse } from '../types/session';

// Use environment variable if provided, or empty string (which uses Vite proxy) / fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

class SessionService {
  private baseUrl: string;

  constructor() {
    // If API_BASE_URL is defined, strip trailing slash
    this.baseUrl = API_BASE_URL.replace(/\/$/, '');
  }

  /**
   * Initializes a new reflection session by calling POST /api/sessions
   */
  async createSession(): Promise<CreateSessionResponse> {
    const endpoint = `${this.baseUrl}/api/sessions`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = `Server error: ${response.status} ${response.statusText}`;
        try {
          const errData = await response.json();
          if (errData?.message) {
            errorMessage = errData.message;
          }
        } catch {
          // ignore parsing error
        }
        throw new Error(errorMessage);
      }

      const data: CreateSessionResponse = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new Error('Connection timed out. Please ensure the backend server is running.', { cause: error });
      }
      throw error;
    }
  }

  /**
   * Retrieves an existing session by ID
   */
  async getSession(sessionId: string): Promise<GetSessionResponse> {
    const endpoint = `${this.baseUrl}/api/sessions/${encodeURIComponent(sessionId)}`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch session: ${response.statusText}`);
    }

    return response.json();
  }
}

export const sessionService = new SessionService();
