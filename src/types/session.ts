export type ReflectionStep = 'mask' | 'load' | 'need' | 'action' | 'summary';

export interface ReflectionSession {
  sessionId: string;
  currentStep: ReflectionStep;
  status: 'active' | 'completed';
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, unknown>;
}

export interface CreateSessionResponse {
  success: boolean;
  message: string;
  session: ReflectionSession;
}

export interface GetSessionResponse {
  success: boolean;
  session: ReflectionSession;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string;
}
