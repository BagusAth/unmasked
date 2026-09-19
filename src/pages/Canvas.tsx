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
import { Compass, ArrowRight } from 'lucide-react';

export const Canvas: React.FC = () => {
  const {
    session,
    updateCommitment,
    saveToVault,
    clearSession,
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
      showToast('Langkah ini sudah kamu tandai sebagai selesai.', 'check');
    } else {
      showToast('Status langkah dikembalikan ke tertunda.', 'check');
    }
  };

  // 1. EMPTY STATE IF NO ACTIVE SESSION EXISTS
  if (!session) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] text-[#111827] flex flex-col font-sans selection:bg-[#284B3E]/15 selection:text-[#172033]">
        <Navbar activePage="canvas" />

        <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-24 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#E8EFEA] border border-[#DCE6E0] flex items-center justify-center text-[#284B3E] mb-6 shadow-xs">
            <Compass size={32} className="stroke-[1.75]" />
          </div>

          <span className="text-xs font-semibold tracking-widest text-[#284B3E] uppercase bg-[#E8EFEA]/80 px-3.5 py-1 rounded-full border border-[#D0DDD5]">
            Ruang Refleksi • Kanvas Pribadi
          </span>

          <h1 className="text-3xl sm:text-4xl font-semibold text-[#172033] mt-4 mb-3 font-serif tracking-tight">
            Belum ada refleksi untuk ditampilkan
          </h1>

          <p className="text-[#64748B] max-w-lg text-sm sm:text-base leading-relaxed mb-8">
            Selesaikan perjalanan refleksimu terlebih dahulu. Kanvas ini akan merangkum apa yang kamu buka, tata, butuhkan, dan pilih untuk dilakukan.
          </p>

          <Link
            to="/mask"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#284B3E] text-white font-medium hover:bg-[#1f3a30] transition shadow-sm hover:shadow-md cursor-pointer text-sm group"
          >
            <span>Mulai Perjalanan Refleksi</span>
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
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

        {/* BENTO GRID (12 Columns - DYNAMIC DATA INGESTION) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
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
              influenceControlItems={session.load.influenceControlItems || []}
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
              isCompleted={session.action.isCompleted}
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
