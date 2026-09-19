import { useState, useCallback } from 'react';
import type { FullReflectionSession } from '../types/session';

const ACTIVE_SESSION_KEY = 'unmasked_active_session';
const VAULT_KEY = 'unmasked_reflections';

export const useCanvasData = () => {
  const [session, setSession] = useState<FullReflectionSession | null>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem(ACTIVE_SESSION_KEY) : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.mask && parsed?.load && parsed?.need && parsed?.action) {
          return parsed as FullReflectionSession;
        }
      }
    } catch (e) {
      console.warn('Could not read active session:', e);
    }
    return null;
  });

  // Update micro-commitment status (single source of truth in session)
  const updateCommitment = useCallback((isCompleted: boolean) => {
    setSession((prev) => {
      if (!prev) return null;
      const updated = {
        ...prev,
        action: { ...prev.action, isCompleted },
      };
      // If we have an active session, update it in localStorage
      try {
        if (localStorage.getItem(ACTIVE_SESSION_KEY)) {
          localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(updated));
        }
      } catch (e) {
        console.warn('Could not update active session:', e);
      }
      return updated;
    });
  }, []);

  // Save current reflection session to Ruang Pribadi (local vault)
  const saveToVault = useCallback((): boolean => {
    if (!session) return false;
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
        fullSession: session,
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

  // Clear current active session & RAM (without touching saved vault)
  const clearSession = useCallback(() => {
    try {
      localStorage.removeItem(ACTIVE_SESSION_KEY);
    } catch (e) {
      console.warn('Could not clear active session storage:', e);
    }
    setSession(null);
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
            'Terima kasih sudah mau jujur pada diri sendiri hari ini. Kamu tidak harus selalu terlihat baik-baik saja untuk mengakui bahwa sesuatu terasa berat.',
        },
        load: {
          withinControlItems: [
            { id: 's1', text: 'Menulis 1 paragraf latar belakang hari ini', badge: 'Sore ini', category: 'within' },
            { id: 's2', text: 'Merapikan daftar pustaka 5 jurnal acuan', badge: 'Malam ini', category: 'within' },
            { id: 's3', text: 'Kirim draf revisi bab 2 ke dosen pembimbing', badge: 'Draf siap', category: 'within' },
          ],
          influenceControlItems: [
            { id: 's-inf1', text: 'Kirim chat sopan ke dosen untuk konfirmasi jadwal bimbingan minggu depan', badge: 'Perlu Chat', category: 'influence' },
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
          helperNote: 'Kamu bisa melakukannya saat siap.',
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
          influenceControlItems: [
            { id: 'o-inf1', text: 'Bicarakan pembagian shift jaga stand bersama rekan satu tim', badge: 'Perlu Diskusi', category: 'influence' },
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
          helperNote: 'Kamu bisa melakukannya saat siap.',
          isCompleted: false,
        },
        createdAt: new Date().toISOString(),
      };
    }

    localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(sampleSession));
    setSession(sampleSession);
  }, [clearSession]);

  return {
    session,
    hasActiveSession: session !== null,
    updateCommitment,
    saveToVault,
    clearSession,
    seedSampleData,
  };
};
