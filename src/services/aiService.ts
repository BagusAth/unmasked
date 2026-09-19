import type { AiAnalysisResponse } from '../types/session';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

export const aiService = {
  /**
   * Analyzes raw reflection text using the backend Gemini AI proxy
   */
  async analyzeBurdens(text: string): Promise<AiAnalysisResponse> {
    const endpoint = `${API_BASE_URL}/api/ai/analyze-burdens`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ text }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data: AiAnalysisResponse = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('aiService.analyzeBurdens error:', error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Terjadi kesalahan saat menghubungkan ke server analisis AI.',
      };
    }
  },
};
