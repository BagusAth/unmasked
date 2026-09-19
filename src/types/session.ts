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

// ==========================================
// FULL DYNAMIC REFLECTION SESSION CONTRACTS
// ==========================================

export interface MaskSessionData {
  publicPersonaText: string;
  publicTags: string[];
  innerFeelingText: string;
  innerTags: string[];
  validationMessage?: string;
}

export interface BurdenItem {
  id: string;
  text: string;
  category: 'within' | 'influence' | 'outside';
  badge: string;
}

export interface LoadSessionData {
  brainDump?: string;
  withinControlItems: BurdenItem[];
  influenceControlItems: BurdenItem[];
  outsideControlItems: BurdenItem[];
}

export interface NeedSessionData {
  quoteBefore: string;
  quoteHighlight: string;
  quoteAfter: string;
  primaryNeed: string;
  bodyState: string;
  summary?: string;
}

export interface ActionSessionData {
  categoryBadge: string;
  actionTitle: string;
  actionScript: string;
  helperNote?: string;
  isCompleted: boolean;
}

export interface FullReflectionSession {
  sessionId: string;
  dateString: string;
  durationMinutes: number;
  mask: MaskSessionData;
  load: LoadSessionData;
  need: NeedSessionData;
  action: ActionSessionData;
  createdAt: string;
}

// AI API Response contract
export interface AiAnalysisData {
  burdens: Array<{
    text: string;
    category: 'within' | 'influence' | 'outside';
  }>;
  summary: string;
  needInsight: string;
  quote: {
    before: string;
    highlight: string;
    after: string;
  };
  primaryNeed: string;
  bodyState: string;
  microAction: {
    categoryBadge: string;
    actionTitle: string;
    actionScript: string;
  };
}

export interface AiAnalysisResponse {
  success: boolean;
  data?: AiAnalysisData;
  message?: string;
  error?: string;
}
