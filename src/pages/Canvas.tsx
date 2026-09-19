import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
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
import { Sparkles, RefreshCw, Compass, ArrowRight } from 'lucide-react';

export const Canvas: React.FC = () => {
  const {
    session,
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

  // 1. EMPTY STATE IF NO ACTIVE SESSION EXISTS
  if (!session) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] text-[#111827] flex flex-col font-sans selection:bg-[#284B3E]/15 selection:text-[#172033]">
        <Navbar activePage="canvas" />

        <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-20 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#E8EFEA] border border-[#DCE6E0] flex items-center justify-center text-[#284B3E] mb-6 shadow-xs">
            <Compass size={32} className="stroke-[1.75]" />
          </div>

          <span className="text-xs font-semibold tracking-widest text-[#284B3E] uppercase bg-[#E8EFEA]/80 px-3.5 py-1 rounded-full border border-[#D0DDD5]">
            Ruang Refleksi • Kanvas Pribadi
          </span>

          <h1 className="text-3xl sm:text-4xl font-semibold text-[#172033] mt-4 mb-3 font-serif tracking-tight">
            Belum Ada Sesi Refleksi yang Aktif
          </h1>

          <p className="text-[#64748B] max-w-xl text-sm sm:text-base leading-relaxed mb-8">
            Kanvas refleksi dirimu akan otomatis terisi secara utuh setelah kamu menyelesaikan perjalanan refleksi: mengenali Topeng (Mask), memetakan Beban (Load), menemukan Kebutuhan sejati (Need), hingga menetapkan Tindakan Nyata (Action).
          </p>

          <Link
            to="/mask"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#284B3E] text-white font-medium hover:bg-[#1f3a30] transition shadow-sm hover:shadow-md cursor-pointer text-sm group"
          >
            <span>Mulai Perjalanan Refleksi</span>
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>

          {/* Dev/Testing simulation buttons */}
          <div className="mt-14 pt-8 border-t border-[#E5E7EB] w-full max-w-md">
            <p className="text-xs text-[#64748B] mb-3 flex items-center justify-center gap-1.5 font-medium">
              <Sparkles size={13} className="text-[#284B3E]" />
              <span>Ingin mencoba pratinjau tampilan kanvas? Muat simulasi data:</span>
            </p>
            <div className="flex items-center justify-center gap-2.5 flex-wrap">
              <button
                onClick={() => {
                  seedSampleData('skripsi');
                  showToast('Memuat data dinamis simulasi skripsi...', 'check');
                }}
                className="px-3.5 py-1.5 rounded-full bg-white text-[#284B3E] text-xs font-medium border border-[#D0DDD5] hover:bg-[#E8EFEA] transition shadow-2xs cursor-pointer"
              >
                Simulasi Refleksi Skripsi
              </button>
              <button
                onClick={() => {
                  seedSampleData('organisasi');
                  showToast('Memuat data dinamis simulasi kepanitiaan...', 'check');
                }}
                className="px-3.5 py-1.5 rounded-full bg-white text-[#284B3E] text-xs font-medium border border-[#D0DDD5] hover:bg-[#E8EFEA] transition shadow-2xs cursor-pointer"
              >
                Simulasi Kepanitiaan Kampus
              </button>
            </div>
          </div>
        </main>

        <Footer />
        <ToastNotification
          message={toast.message}
          iconType={toast.iconType}
          isVisible={toast.isVisible}
        />
      </div>
    );
  }

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
              Mode Tampilan: Data Dinamis Aktif ({session.sessionId})
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
