import { useState, useCallback } from 'react';
import type { FullReflectionSession } from '../types/session';

const ACTIVE_SESSION_KEY = 'unmasked_active_session';
const VAULT_KEY = 'unmasked_reflections';
const COMMITMENT_KEY = 'unmasked_commitment_done';

export const DEFAULT_FALLBACK_SESSION: FullReflectionSession = {
  sessionId: 'demo-session-default',
  dateString: '14 November 2024 • Catatan Refleksi',
  durationMinutes: 12,
  mask: {
    publicPersonaText: '“Mahasiswa yang selalu kelihatan baik-baik saja dan bisa diandalkan”',
    publicTags: ['Kelihatan selalu tenang', 'Selalu ada untuk teman'],
    innerFeelingText: '“Kelelahan batin yang sunyi dan cemas kalau berhenti sejenak.”',
    innerTags: ['Kewalahan & butuh jeda', 'Takut dianggap tidak mampu'],
    validationMessage:
      'Terima kasih sudah mau jujur pada diri sendiri hari ini. Mengakui bahwa kamu lelah adalah langkah awal yang berani, bukan tanda kelemahan.',
  },
  load: {
    withinControlItems: [
      { id: '1', text: 'Fokus 1 jam cicil kerangka tugas atau bahan bacaan', badge: 'Malam ini', category: 'within' },
      { id: '2', text: 'Kirim chat sopan ke dosen untuk minta sedikit perpanjangan waktu', badge: 'Draf siap', category: 'within' },
      { id: '3', text: 'Tutup laptop jam 22:30 tanpa kompromi untuk tidur', badge: 'Batasan sehat', category: 'within' },
    ],
    outsideControlItems: [
      { id: '4', text: 'Omongan atau ekspektasi teman sekelas soal nilai ujian', badge: 'Relakan dulu', category: 'outside' },
      { id: '5', text: 'Keputusan penilaian atau tugas dadakan yang di luar kendali', badge: 'Relakan dulu', category: 'outside' },
    ],
  },
  need: {
    quoteBefore: '“Aku bukan takut bekerja keras; ',
    quoteHighlight: 'aku hanya takut pada kesunyian',
    quoteAfter: ' saat berhenti memaksakan diri tampil sempurna di depan orang lain.”',
    primaryNeed: 'Istirahat tanpa merasa bersalah & menjaga batasan sehat',
    bodyState: 'Bahu mulai rileks & napas terasa lebih lega',
  },
  action: {
    categoryBadge: 'Jangkar Hari Ini • Komunikasi Batasan',
    actionTitle: 'Sampaikan Batasanmu dengan Tenang',
    actionScript:
      '“Halo rekan-rekan tim, izin malam ini aku istirahat duluan ya untuk memulihkan kondisi. Pembahasan tugas kita lanjutkan besok pagi. Terima kasih banyak atas pengertiannya.”',
    helperNote: 'Kirim kapan pun kamu merasa siap dan tenang',
    isCompleted: false,
  },
  createdAt: new Date().toISOString(),
};

export const useCanvasData = () => {
  const [session, setSession] = useState<FullReflectionSession>(() => {
    const isDone = typeof window !== 'undefined' && localStorage.getItem(COMMITMENT_KEY) === 'true';
    try {
      const saved = localStorage.getItem(ACTIVE_SESSION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.mask && parsed?.load && parsed?.need && parsed?.action) {
          return {
            ...parsed,
            action: { ...parsed.action, isCompleted: isDone },
          } as FullReflectionSession;
        }
      }
    } catch (e) {
      console.warn('Could not read active session, using fallback:', e);
    }
    return {
      ...DEFAULT_FALLBACK_SESSION,
      action: { ...DEFAULT_FALLBACK_SESSION.action, isCompleted: isDone },
    };
  });

  const [isUsingFallback, setIsUsingFallback] = useState<boolean>(() => {
    return typeof window !== 'undefined' && !localStorage.getItem(ACTIVE_SESSION_KEY);
  });

  // Update micro-commitment status
  const updateCommitment = useCallback((isCompleted: boolean) => {
    localStorage.setItem(COMMITMENT_KEY, String(isCompleted));
    setSession((prev) => {
      const updated = {
        ...prev,
        action: { ...prev.action, isCompleted },
      };
      // If we have an active session, update it in localStorage
      if (localStorage.getItem(ACTIVE_SESSION_KEY)) {
        localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  // Save current reflection session to Ruang Pribadi (local vault)
  const saveToVault = useCallback((): boolean => {
    try {
      const savedVault = localStorage.getItem(VAULT_KEY);
      const vaultList = savedVault ? JSON.parse(savedVault) : [];

      const vaultEntry = {
        id: session.sessionId || Date.now().toString(),
        date: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        durationMinutes: session.durationMinutes || 12,
        tags: [
          ...session.mask.publicTags.slice(0, 1),
          ...session.mask.innerTags.slice(0, 2),
        ],
        summary:
          session.need.quoteBefore +
          session.need.quoteHighlight +
          session.need.quoteAfter,
        needInsight: session.need.primaryNeed,
        actionTitle: session.action.actionTitle,
        actionCompleted: session.action.isCompleted,
        createdAt: new Date().toISOString(),
      };

      // Push to front of list, avoid exact duplicate ids
      const filtered = Array.isArray(vaultList)
        ? vaultList.filter((item: { id?: string }) => item.id !== vaultEntry.id)
        : [];

      localStorage.setItem(VAULT_KEY, JSON.stringify([vaultEntry, ...filtered]));
      return true;
    } catch (err) {
      console.error('Failed to save to vault:', err);
      return false;
    }
  }, [session]);

  // Clear current active session & RAM
  const clearSession = useCallback(() => {
    localStorage.removeItem(ACTIVE_SESSION_KEY);
    localStorage.removeItem(COMMITMENT_KEY);
    setSession(DEFAULT_FALLBACK_SESSION);
    setIsUsingFallback(true);
  }, []);

  // Seed sample data for testing/demoing dynamic transitions
  const seedSampleData = useCallback((type: 'skripsi' | 'organisasi' | 'reset' = 'skripsi') => {
    if (type === 'reset') {
      clearSession();
      return;
    }

    let sampleSession: FullReflectionSession;

    if (type === 'skripsi') {
      sampleSession = {
        sessionId: `session-skripsi-${Date.now()}`,
        dateString: 'Hari ini • Catatan Refleksi Skripsi',
        durationMinutes: 15,
        mask: {
          publicPersonaText: '“Mahasiswa semester akhir yang tenang dan terkendali”',
          publicTags: ['Selalu tampak produktif', 'Jarang mengeluh di sosmed'],
          innerFeelingText: '“Panik setiap membuka laptop dan takut skripsi tidak selesai tepat waktu.”',
          innerTags: ['Kelelahan kognitif', 'Takut mengecewakan orang tua'],
          validationMessage:
            'Mengakui bahwa skripsi ini berat bukan berarti kamu tidak mampu. Kamu sudah melangkah sangat jauh hingga titik ini.',
        },
        load: {
          withinControlItems: [
            { id: 's1', text: 'Menulis 1 paragraf latar belakang hari ini', badge: 'Sore ini', category: 'within' },
            { id: 's2', text: 'Merapikan daftar pustaka 5 jurnal acuan', badge: 'Malam ini', category: 'within' },
            { id: 's3', text: 'Kirim draf revisi bab 2 ke dosen pembimbing', badge: 'Draf siap', category: 'within' },
          ],
          outsideControlItems: [
            { id: 's4', text: 'Kecepatan respon email dan jadwal senggang dosen pembimbing', badge: 'Relakan dulu', category: 'outside' },
            { id: 's5', text: 'Pencapaian teman seangkatan yang sudah seminar proposal duluan', badge: 'Relakan dulu', category: 'outside' },
          ],
        },
        need: {
          quoteBefore: 'Aku tidak pernah takut untuk berjuang, ',
          quoteHighlight: 'tetapi aku lelah harus memikul segalanya sendirian',
          quoteAfter: ' di saat tubuh dan pikiranku sebenarnya sudah sangat butuh istirahat.',
          primaryNeed: 'Istirahat tanpa rasa bersalah & membagikan beban tanggung jawab',
          bodyState: 'Bahu yang tadinya tegang mulai melunak & napas terasa lebih lapang',
        },
        action: {
          categoryBadge: 'Jangkar Hari Ini • Komunikasi Batasan',
          actionTitle: 'Sampaikan Batasan Diri ke Kelompok',
          actionScript:
            '“Halo rekan-rekan, kondisi fisik dan pikiranku minggu ini sedang sangat lelah dan butuh istirahat sebentar. Pembahasan tugas kita lanjutkan besok pagi ya. Terima kasih banyak atas pengertiannya 🙏”',
          helperNote: 'Kirim saat kamu sudah merasa tenang',
          isCompleted: false,
        },
        createdAt: new Date().toISOString(),
      };
    } else {
      sampleSession = {
        sessionId: `session-org-${Date.now()}`,
        dateString: 'Hari ini • Refleksi Kepanitiaan Kampus',
        durationMinutes: 8,
        mask: {
          publicPersonaText: '“Ketua divisi yang sigap dan selalu punya solusi untuk semua orang”',
          publicTags: ['Bisa dihubungi 24/7', 'Selalu bilang aman'],
          innerFeelingText: '“Overwhelmed karena semua orang bergantung padaku dan tidak ada ruang bernapas.”',
          innerTags: ['People pleasing', 'Kelelahan emosional'],
          validationMessage:
            'Menjadi pemimpin bukan berarti harus membakar diri sendiri demi menerangi orang lain.',
        },
        load: {
          withinControlItems: [
            { id: 'o1', text: 'Mendelegasikan rundown acara ke wakil koordinator', badge: 'Hari ini', category: 'within' },
            { id: 'o2', text: 'Matikan notifikasi grup WhatsApp kepanitiaan jam 21:00', badge: 'Malam ini', category: 'within' },
          ],
          outsideControlItems: [
            { id: 'o3', text: 'Keterlambatan konfirmasi kehadiran pihak eksternal', badge: 'Relakan dulu', category: 'outside' },
          ],
        },
        need: {
          quoteBefore: 'Aku menyadari bahwa ',
          quoteHighlight: 'aku tidak bertanggung jawab atas kenyamanan semua orang',
          quoteAfter: ', dan kesehatanku sendiri layak diutamakan.',
          primaryNeed: 'Menetapkan batasan tanggung jawab tanpa rasa bersalah',
          bodyState: 'Beban di kepala mulai berkurang & dada terasa lebih ringan',
        },
        action: {
          categoryBadge: 'Jangkar Hari Ini • Delegasi Tugas',
          actionTitle: 'Minta Rekan Divisi Mengambil Alih',
          actionScript:
            '“Halo tim, untuk koordinasi logistik sore ini silakan langsung ke wakil divisi ya. Aku izin rehat sejenak agar besok bisa kembali optimal.”',
          helperNote: 'Delegasikan dengan percaya pada rekanmu',
          isCompleted: false,
        },
        createdAt: new Date().toISOString(),
      };
    }

    localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(sampleSession));
    setSession(sampleSession);
    setIsUsingFallback(false);
  }, [clearSession]);

  return {
    session,
    isUsingFallback,
    updateCommitment,
    saveToVault,
    clearSession,
    seedSampleData,
  };
};
