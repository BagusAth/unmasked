import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CanvasHeader } from '../components/canvas/CanvasHeader';
import { MaskComparisonCard } from '../components/canvas/MaskComparisonCard';
import { CircleOfControlCard } from '../components/canvas/CircleOfControlCard';
import { CoreRealizationCard } from '../components/canvas/CoreRealizationCard';
import { MicroCommitmentCard } from '../components/canvas/MicroCommitmentCard';
import { MindfulKeepsakeCard } from '../components/canvas/MindfulKeepsakeCard';
import { BottomActionBar } from '../components/canvas/BottomActionBar';
import { ToastNotification } from '../components/canvas/ToastNotification';

export const Canvas: React.FC = () => {
  const [toast, setToast] = useState<{
    message: string | null;
    iconType: 'check' | 'security' | 'copy' | 'download' | 'save';
    isVisible: boolean;
  }>({
    message: null,
    iconType: 'check',
    isVisible: false,
  });

  const showToast = useCallback(
    (
      message: string,
      iconType: 'check' | 'security' | 'copy' | 'download' | 'save' = 'check'
    ) => {
      setToast({ message, iconType, isVisible: true });
    },
    []
  );

  useEffect(() => {
    if (toast.isVisible) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, isVisible: false }));
      }, 3200);
      return () => clearTimeout(timer);
    }
  }, [toast.isVisible]);

  // Handle saving session to local storage (Ruang Pribadi)
  const handleSaveToVault = () => {
    try {
      const saved = localStorage.getItem('unmasked_reflections');
      const existing = saved ? JSON.parse(saved) : [];

      const newEntry = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        durationMinutes: 12,
        tags: ['Kelelahan Mental', 'Ekspektasi Kuliah', 'Batasan Sehat'],
        summary: 'Pengakuan jujur atas rasa lelah dan komitmen menjaga batasan diri.',
        needInsight: 'Istirahat tanpa merasa bersalah & menjaga batasan sehat',
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem('unmasked_reflections', JSON.stringify([newEntry, ...existing]));
      showToast('Sesi berhasil disimpan ke Ruang Pribadimu di perangkat ini.', 'save');
    } catch (err) {
      console.error('Save failed:', err);
      showToast('Gagal menyimpan sesi ke ruang pribadi.', 'security');
    }
  };

  // Handle clearing transient session memory
  const handleClearSession = () => {
    localStorage.removeItem('unmasked_commitment_done');
    localStorage.removeItem('unmasked_current_session');
    showToast(
      'Data sesi berhasil dihapus dari memori sementara. Aman untuk komputer publik.',
      'security'
    );
  };

  // Micro-commitment status callback
  const handleCommitmentChange = (isDone: boolean) => {
    if (isDone) {
      showToast(
        'Batasan tersimpan. Berbanggalah karena telah memprioritaskan istirahat.',
        'check'
      );
    } else {
      showToast('Status aksi dikembalikan ke tertunda.', 'check');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111827] flex flex-col font-sans selection:bg-[#284B3E]/15 selection:text-[#172033]">
      {/* 1. TOP NAVBAR */}
      <Navbar activePage="canvas" />

      {/* 2. MAIN CANVAS CONTENT */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-12">
        {/* Header Breadcrumb & Status Ribbon */}
        <CanvasHeader
          dateString="14 November 2024 • Catatan Refleksi"
          durationMinutes={12}
        />

        {/* BENTO GRID (12 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4">
          {/* BLOCK 1: Mask Comparison (Col 1-6) */}
          <div className="md:col-span-6 flex flex-col">
            <MaskComparisonCard />
          </div>

          {/* BLOCK 2: Circle of Control (Col 7-12) */}
          <div className="md:col-span-6 flex flex-col">
            <CircleOfControlCard />
          </div>

          {/* BLOCK 3: Core Realization & Need (Col 1-7 on desktop) */}
          <div className="md:col-span-12 lg:col-span-7 flex flex-col">
            <CoreRealizationCard />
          </div>

          {/* BLOCK 4: Micro Commitment (Col 8-12 on desktop) */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col">
            <MicroCommitmentCard onStatusChange={handleCommitmentChange} />
          </div>

          {/* BLOCK 5: Keepsake Exportable Card (Full Width Col 1-12) */}
          <div className="md:col-span-12">
            <MindfulKeepsakeCard onShowToast={showToast} />
          </div>
        </div>

        {/* 3. BOTTOM ACTION BAR */}
        <BottomActionBar
          onSaveToVault={handleSaveToVault}
          onClearSession={handleClearSession}
        />
      </main>

      {/* 4. PRE-FOOTER CRISIS STRIP & FOOTER */}
      <Footer />

      {/* 5. FLOATING TOAST NOTIFICATION */}
      <ToastNotification
        message={toast.message}
        iconType={toast.iconType}
        isVisible={toast.isVisible}
      />
    </div>
  );
};

export default Canvas;
