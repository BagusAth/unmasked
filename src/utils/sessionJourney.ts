import type {
  FullReflectionSession,
  MaskSessionData,
  LoadSessionData,
  NeedSessionData,
  ActionSessionData,
  AiAnalysisData,
  BurdenItem,
} from '../types/session';

const ACTIVE_SESSION_KEY = 'unmasked_active_session';
const DRAFT_SESSION_KEY = 'unmasked_draft_session';

/**
 * Shared Session Journey Manager
 * Memastikan alur data dari setiap halaman (Mask -> Load -> Need -> Action)
 * tersimpan secara rapi dan otomatis masuk ke backend AI serta Canvas.
 */
export const sessionJourney = {
  /**
   * Mengambil draft sesi yang sedang berjalan dari localStorage
   */
  getDraft(): Partial<FullReflectionSession> {
    try {
      const saved = localStorage.getItem(DRAFT_SESSION_KEY) || localStorage.getItem(ACTIVE_SESSION_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Gagal membaca draft sesi:', e);
    }
    return {
      sessionId: `session-${Date.now()}`,
      dateString: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }) + ' • Catatan Refleksi',
      durationMinutes: 10,
      createdAt: new Date().toISOString(),
    };
  },

  /**
   * TAHAP 1: Halaman Mask (/mask)
   * Rekan yang mengerjakan halaman Mask memanggil fungsi ini saat user selesai mengisi.
   */
  saveMaskStep(maskData: MaskSessionData): Partial<FullReflectionSession> {
    const current = this.getDraft();
    const updated: Partial<FullReflectionSession> = {
      ...current,
      mask: maskData,
    };
    try {
      localStorage.setItem(DRAFT_SESSION_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Gagal menyimpan tahap mask:', e);
    }
    return updated;
  },

  /**
   * TAHAP 2 (Dengan AI): Halaman Load (/load)
   * Rekan yang mengerjakan halaman Load memanggil fungsi ini setelah memanggil backend AI (aiService.analyzeBurdens).
   * Fungsi ini otomatis mengonversi data AI ke format Circle of Control, sekaligus menyiapkan draft default untuk Need dan Action!
   */
  saveLoadWithAi(brainDump: string, aiData: AiAnalysisData): Partial<FullReflectionSession> {
    const current = this.getDraft();

    // Petakan burdens dari AI ke Circle of Control
    const withinControlItems: BurdenItem[] = [];
    const outsideControlItems: BurdenItem[] = [];

    aiData.burdens.forEach((item, index) => {
      const burden: BurdenItem = {
        id: `burden-${Date.now()}-${index}`,
        text: item.text,
        category: item.category,
        badge: item.category === 'within' ? 'Dalam Kendali' : 'Di Luar Kendali',
      };
      if (item.category === 'outside') {
        outsideControlItems.push(burden);
      } else {
        withinControlItems.push(burden);
      }
    });

    const loadData: LoadSessionData = {
      brainDump,
      withinControlItems,
      outsideControlItems,
    };

    // Pre-populate tahap Need dan Action dari analisis AI agar rekan di halaman berikutnya memiliki data awal
    const needDraft: NeedSessionData = {
      quoteBefore: aiData.quote.before,
      quoteHighlight: aiData.quote.highlight,
      quoteAfter: aiData.quote.after,
      primaryNeed: aiData.primaryNeed,
      bodyState: aiData.bodyState,
      summary: aiData.summary,
    };

    const actionDraft: ActionSessionData = {
      categoryBadge: aiData.microAction.categoryBadge || 'Langkah Nyata',
      actionTitle: aiData.microAction.actionTitle,
      actionScript: aiData.microAction.actionScript,
      helperNote: 'Kirim saat kamu merasa sudah siap dan tenang',
      isCompleted: false,
    };

    const updated: Partial<FullReflectionSession> = {
      ...current,
      load: loadData,
      need: current.need || needDraft,
      action: current.action || actionDraft,
    };

    try {
      localStorage.setItem(DRAFT_SESSION_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Gagal menyimpan tahap load:', e);
    }

    return updated;
  },

  /**
   * TAHAP 2 (Manual): Halaman Load (/load) jika tidak menggunakan auto-mapping AI
   */
  saveLoadStep(loadData: LoadSessionData): Partial<FullReflectionSession> {
    const current = this.getDraft();
    const updated: Partial<FullReflectionSession> = {
      ...current,
      load: loadData,
    };
    try {
      localStorage.setItem(DRAFT_SESSION_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Gagal menyimpan tahap load manual:', e);
    }
    return updated;
  },

  /**
   * TAHAP 3: Halaman Need (/need)
   * Rekan yang mengerjakan halaman Need memanggil ini untuk menyimpan pilihan/penyesuaian kebutuhan inti.
   */
  saveNeedStep(needData: NeedSessionData): Partial<FullReflectionSession> {
    const current = this.getDraft();
    const updated: Partial<FullReflectionSession> = {
      ...current,
      need: needData,
    };
    try {
      localStorage.setItem(DRAFT_SESSION_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Gagal menyimpan tahap need:', e);
    }
    return updated;
  },

  /**
   * TAHAP 4: Halaman Action (/action) - FINALISASI
   * Rekan yang mengerjakan halaman Action memanggil ini untuk menyelesaikan sesi.
   * Fungsi ini langsung memvalidasi dan mempublikasikan data ke 'unmasked_active_session',
   * sehingga begitu user di-redirect ke /canvas, Kanvas Refleksi langsung tampil utuh!
   */
  finalizeSession(actionData: Omit<ActionSessionData, 'isCompleted'> & { isCompleted?: boolean }): FullReflectionSession {
    const current = this.getDraft();

    const fullSession: FullReflectionSession = {
      sessionId: current.sessionId || `session-${Date.now()}`,
      dateString:
        current.dateString ||
        new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }) + ' • Catatan Refleksi',
      durationMinutes: current.durationMinutes || 10,
      mask: current.mask || {
        publicPersonaText: 'Persona Publik',
        publicTags: ['Aktif'],
        innerFeelingText: 'Kelelahan batin',
        innerTags: ['Butuh Jeda'],
      },
      load: current.load || {
        withinControlItems: [],
        outsideControlItems: [],
      },
      need: current.need || {
        quoteBefore: '',
        quoteHighlight: 'Aku butuh ruang bernapas',
        quoteAfter: '',
        primaryNeed: 'Istirahat yang tenang',
        bodyState: 'Bahu mulai rileks',
      },
      action: {
        categoryBadge: actionData.categoryBadge,
        actionTitle: actionData.actionTitle,
        actionScript: actionData.actionScript,
        helperNote: actionData.helperNote || 'Kirim saat kamu merasa siap',
        isCompleted: actionData.isCompleted ?? false,
      },
      createdAt: current.createdAt || new Date().toISOString(),
    };

    try {
      // Simpan ke storage aktif kanvas
      localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(fullSession));
      // Bersihkan draft sementara
      localStorage.removeItem(DRAFT_SESSION_KEY);
    } catch (e) {
      console.warn('Gagal memfinalisasi sesi:', e);
    }

    return fullSession;
  },

  /**
   * Menghapus semua riwayat draft dan sesi aktif
   */
  clearAll() {
    try {
      localStorage.removeItem(ACTIVE_SESSION_KEY);
      localStorage.removeItem(DRAFT_SESSION_KEY);
    } catch (e) {
      console.warn('Gagal menghapus sesi:', e);
    }
  },
};
