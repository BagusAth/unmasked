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
import { useCanvasData } from '../hooks/useCanvasData';
import { Sparkles, RefreshCw } from 'lucide-react';

export const Canvas: React.FC = () => {
  const {
    session,
    isUsingFallback,
    updateCommitment,
    saveToVault,
    clearSession,
    seedSampleData,
  } = useCanvasData();

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

  // Handle saving session to local vault (Ruang Pribadi)
  const handleSaveVault = () => {
    const success = saveToVault();
    if (success) {
      showToast('Sesi berhasil disimpan ke Ruang Pribadimu di perangkat ini.', 'save');
    } else {
      showToast('Gagal menyimpan sesi ke ruang pribadi.', 'security');
    }
  };

  // Handle clearing transient session memory
  const handleClearData = () => {
    clearSession();
    showToast(
      'Data sesi berhasil dihapus dari memori sementara. Aman untuk komputer publik.',
      'security'
    );
  };

  // Micro-commitment status callback
  const handleCommitmentChange = (isDone: boolean) => {
    updateCommitment(isDone);
    if (isDone) {
      showToast(
        'Batasan tersimpan. Berbanggalah karena telah memprioritaskan istirahat.',
        'check'
      );
    } else {
      showToast('Status aksi dikembalikan ke tertunda.', 'check');
    }
  };

  // Format keepsake quote cleanly
  const keepsakeQuote = `“${session.need.quoteBefore.replace(/^[“"']/, '')}${session.need.quoteHighlight}${session.need.quoteAfter.replace(/[”"']$/, '')}”`;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111827] flex flex-col font-sans selection:bg-[#284B3E]/15 selection:text-[#172033]">
      {/* 1. TOP NAVBAR */}
      <Navbar activePage="canvas" />

      {/* 2. MAIN CANVAS CONTENT */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-12">
        {/* Dynamic Header */}
        <CanvasHeader
          dateString={session.dateString}
          durationMinutes={session.durationMinutes}
        />

        {/* SIMULATION & DYNAMIC DATA TEST BAR */}
        <div className="my-3 p-3 rounded-2xl bg-[#F0F4F1] border border-[#DCE6E0] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#284B3E]">
            <Sparkles size={15} className="shrink-0" />
            <span className="font-semibold">
              {isUsingFallback
                ? 'Mode Tampilan: Data Default (Siap Menerima Data Dinamis Sesi)'
                : `Mode Tampilan: Data Dinamis Aktif (${session.sessionId})`}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[#64748B]">Uji Reaktivitas Data:</span>
            <button
              onClick={() => {
                seedSampleData('skripsi');
                showToast('Memuat data dinamis simulasi skripsi...', 'check');
              }}
              className="px-3 py-1 rounded-full bg-white text-[#284B3E] font-medium border border-[#D0DDD5] hover:bg-[#E8EFEA] transition shadow-2xs cursor-pointer"
            >
              Simulasi Skripsi
            </button>
            <button
              onClick={() => {
                seedSampleData('organisasi');
                showToast('Memuat data dinamis simulasi kepanitiaan...', 'check');
              }}
              className="px-3 py-1 rounded-full bg-white text-[#284B3E] font-medium border border-[#D0DDD5] hover:bg-[#E8EFEA] transition shadow-2xs cursor-pointer"
            >
              Simulasi Kepanitiaan
            </button>
            <button
              onClick={() => {
                seedSampleData('reset');
                showToast('Mereset data ke template default.', 'check');
              }}
              className="px-3 py-1 rounded-full bg-white text-[#64748B] font-medium border border-neutral-200 hover:bg-neutral-50 transition shadow-2xs cursor-pointer flex items-center gap-1"
            >
              <RefreshCw size={11} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* BENTO GRID (12 Columns - DYNAMIC DATA INGESTION) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4">
          {/* BLOCK 1: Mask Comparison (Col 1-6) */}
          <div className="md:col-span-6 flex flex-col">
            <MaskComparisonCard
              publicPersonaText={session.mask.publicPersonaText}
              publicTags={session.mask.publicTags}
              innerFeelingText={session.mask.innerFeelingText}
              innerTags={session.mask.innerTags}
              validationMessage={session.mask.validationMessage}
            />
          </div>

          {/* BLOCK 2: Circle of Control (Col 7-12) */}
          <div className="md:col-span-6 flex flex-col">
            <CircleOfControlCard
              withinControlItems={session.load.withinControlItems}
              outsideControlItems={session.load.outsideControlItems}
            />
          </div>

          {/* BLOCK 3: Core Realization & Need (Col 1-7 on desktop) */}
          <div className="md:col-span-12 lg:col-span-7 flex flex-col">
            <CoreRealizationCard
              quoteBefore={session.need.quoteBefore}
              quoteHighlight={session.need.quoteHighlight}
              quoteAfter={session.need.quoteAfter}
              primaryNeed={session.need.primaryNeed}
              bodyState={session.need.bodyState}
            />
          </div>

          {/* BLOCK 4: Micro Commitment (Col 8-12 on desktop) */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col">
            <MicroCommitmentCard
              categoryBadge={session.action.categoryBadge}
              actionTitle={session.action.actionTitle}
              actionScript={session.action.actionScript}
              helperNote={session.action.helperNote}
              onStatusChange={handleCommitmentChange}
            />
          </div>

          {/* BLOCK 5: Keepsake Exportable Card (Full Width Col 1-12) */}
          <div className="md:col-span-12">
            <MindfulKeepsakeCard
              dateLabel={new Date().toLocaleDateString('id-ID', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
              }).replace(/\//g, '.')}
              quoteText={keepsakeQuote}
              scriptToCopy={session.action.actionScript}
              onShowToast={showToast}
            />
          </div>
        </div>

        {/* 3. BOTTOM ACTION BAR */}
        <BottomActionBar
          onSaveToVault={handleSaveVault}
          onClearSession={handleClearData}
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
