import type { Request, Response } from 'express';
import { sessionService } from '../services/sessionService.js';
import type { CreateSessionResponse, GetSessionResponse, ApiErrorResponse } from '../types/session.js';

export class SessionController {
  /**
   * POST /api/sessions
   * Creates a new reflection session
   */
  public static async createSession(_req: Request, res: Response<CreateSessionResponse | ApiErrorResponse>): Promise<void> {
    try {
      const session = sessionService.createSession();
      res.status(201).json({
        success: true,
        message: 'Reflection session initialized successfully',
        session,
      });
    } catch (error) {
      console.error('Error creating reflection session:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to initialize reflection session',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * GET /api/sessions/:id
   * Retrieves an existing session
   */
  public static async getSession(req: Request, res: Response<GetSessionResponse | ApiErrorResponse>): Promise<void> {
    try {
      const rawId = req.params.id;
      const id = Array.isArray(rawId) ? rawId[0] : rawId;
      if (!id) {
        res.status(400).json({
          success: false,
          message: 'Session ID is required',
        });
        return;
      }

      const session = sessionService.getSession(id);
      if (!session) {
        res.status(404).json({
          success: false,
          message: 'Session not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        session,
      });
    } catch (error) {
      console.error('Error retrieving session:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error while fetching session',
      });
    }
  }
}
