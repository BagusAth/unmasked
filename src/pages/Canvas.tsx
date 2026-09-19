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
import { Compass, ArrowRight, Sparkles } from 'lucide-react';

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
      showToast('Refleksi ini sudah disimpan di Ruang Pribadimu.', 'save');
    } else {
      showToast('Gagal menyimpan refleksi ke ruang pribadi.', 'security');
    }
  };

  // Handle clearing transient session memory
  const handleClearData = () => {
    clearSession();
    showToast(
      'Sesi ini sudah ditutup dan data sementaranya dihapus dari perangkat ini.',
      'security'
    );
  };

  // Micro-commitment status callback
  const handleCommitmentChange = (isDone: boolean) => {
    updateCommitment(isDone);
    if (isDone) {
      showToast('Langkah ini sudah kamu tandai sebagai selesai.', 'check');
    } else {
      showToast('Status langkah ditandai belum dilakukan.', 'check');
    }
  };

  // 1. EMPTY STATE IF NO ACTIVE SESSION EXISTS
  if (!session) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] text-[#111827] flex flex-col font-sans selection:bg-[#284B3E]/15 selection:text-[#172033] relative overflow-hidden">
        <Navbar activePage="canvas" />

        {/* Ambient Warmth Glows */}
        <div className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-full max-w-4xl rounded-full bg-gradient-to-b from-[#284B3E]/8 via-[#C86D51]/5 to-transparent blur-3xl opacity-70" />

        <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center justify-center text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8EFEA] border border-[#D0DDD5] text-xs font-semibold text-[#284B3E] mb-5 shadow-2xs">
            <Compass size={14} className="text-[#284B3E]" />
            <span>Ruang Refleksi UNMASKED</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] max-w-xl tracking-tight leading-tight">
            Belum ada yang kamu bawa ke sini
          </h1>

          {/* Subtitle */}
          <p className="text-[#525F7F] max-w-lg text-sm sm:text-base leading-relaxed mt-4 mb-8">
            Setelah kamu selesai berefleksi, kanvas ini akan merangkum apa yang kamu buka, tata, rasakan, dan pilih untuk dilakukan.
          </p>

          {/* Primary CTA */}
          <Link
            to="/mask"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#284B3E] text-white font-semibold hover:bg-[#1E3A30] transition-all shadow-sm hover:shadow-md cursor-pointer text-sm group hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Mulai Refleksi</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* 4-Step Journey Teaser Ribbon */}
          <div className="mt-12 w-full bg-white/90 backdrop-blur-xs rounded-2xl p-5 sm:p-6 border border-[#E2E8F0] shadow-xs text-left">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold tracking-wider text-[#64748B] uppercase">
                Empat Tahap yang Akan Membentuk Kanvasmu:
              </span>
              <span className="text-[11px] text-[#284B3E] font-medium hidden sm:inline">
                ~10-15 Menit Refleksi
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-[#E8EFEA] flex flex-col gap-1.5">
                <span className="w-6 h-6 rounded-full bg-[#E8EFEA] text-[#284B3E] text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <span className="text-xs font-bold text-[#111827]">Buka Topeng</span>
                <span className="text-[11px] text-[#64748B] leading-relaxed">
                  Jujur pada rasa lelah di balik persona yang tampak di luar.
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-[#E8EFEA] flex flex-col gap-1.5">
                <span className="w-6 h-6 rounded-full bg-[#E8EFEA] text-[#284B3E] text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <span className="text-xs font-bold text-[#111827]">Tata Beban</span>
                <span className="text-[11px] text-[#64748B] leading-relaxed">
                  Pilah mana yang bisa dikendalikan, dikomunikasikan, atau dilepas.
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-[#E8EFEA] flex flex-col gap-1.5">
                <span className="w-6 h-6 rounded-full bg-[#E8EFEA] text-[#284B3E] text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <span className="text-xs font-bold text-[#111827]">Dengar Kebutuhan</span>
                <span className="text-[11px] text-[#64748B] leading-relaxed">
                  Pahami apa yang sebenarnya dicari oleh tubuh dan pikiranmu.
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-[#E8EFEA] flex flex-col gap-1.5">
                <span className="w-6 h-6 rounded-full bg-[#E8EFEA] text-[#284B3E] text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <span className="text-xs font-bold text-[#111827]">Satu Langkah</span>
                <span className="text-[11px] text-[#64748B] leading-relaxed">
                  Pilih satu aksi mikro yang realistis untuk kamu lakukan hari ini.
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Simulation Cards */}
          <div className="mt-10 w-full flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#525F7F] mb-4">
              <Sparkles size={14} className="text-[#C86D51]" />
              <span>Ingin melihat gambaran kanvas? Coba jelajahi contoh berikut:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
              {/* Card 1: Skripsi */}
              <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:shadow-md hover:border-[#CBD5E1] transition-all flex flex-col justify-between gap-4 group">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#284B3E] bg-[#E8EFEA] px-2.5 py-0.5 rounded-full">
                      Akademik
                    </span>
                    <span className="text-[11px] text-[#64748B] font-medium">Refleksi • 15 mnt</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#111827] group-hover:text-[#284B3E] transition-colors">
                    Krisis Skripsi & Beban Ekspektasi Diri
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Membuka cemas di balik persona mahasiswa teladan dan menyusun draf chat izin ke pembimbing.
                  </p>
                </div>
                <button
                  onClick={() => {
                    seedSampleData('skripsi');
                    showToast('Memuat contoh refleksi skripsi...', 'check');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#F4F5F0] hover:bg-[#284B3E] text-[#284B3E] hover:text-white text-xs font-semibold border border-[#E2E8F0] hover:border-transparent transition-all flex items-center justify-between cursor-pointer"
                >
                  <span>Lihat Pratinjau Kanvas Ini</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              {/* Card 2: Kepanitiaan */}
              <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:shadow-md hover:border-[#CBD5E1] transition-all flex flex-col justify-between gap-4 group">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C86D51] bg-[#FBE9E3] px-2.5 py-0.5 rounded-full">
                      Organisasi
                    </span>
                    <span className="text-[11px] text-[#64748B] font-medium">Refleksi • 12 mnt</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#111827] group-hover:text-[#C86D51] transition-colors">
                    Kepanitiaan Kampus & Batasan Diri
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Mengurai lelah karena selalu mengiyakan tanggung jawab dan memilih istirahat tanpa rasa bersalah.
                  </p>
                </div>
                <button
                  onClick={() => {
                    seedSampleData('organisasi');
                    showToast('Memuat contoh refleksi kepanitiaan...', 'check');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#F4F5F0] hover:bg-[#C86D51] text-[#A9503B] hover:text-white text-xs font-semibold border border-[#E2E8F0] hover:border-transparent transition-all flex items-center justify-between cursor-pointer"
                >
                  <span>Lihat Pratinjau Kanvas Ini</span>
                  <ArrowRight size={13} />
                </button>
              </div>
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

  const isExampleSession =
    session.sessionId.startsWith('session-skripsi-') || session.sessionId.startsWith('session-org-');

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

        {/* Banner Penanda Mode Contoh (hanya muncul saat pengguna melihat simulasi contoh) */}
        {isExampleSession && (
          <div className="my-4 p-4 rounded-2xl bg-[#F0F4F1] border border-[#DCE6E0] shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-[#284B3E]">
              <div className="w-7 h-7 rounded-full bg-[#E8EFEA] flex items-center justify-center shrink-0">
                <Sparkles size={15} className="text-[#284B3E]" />
              </div>
              <div>
                <span className="font-bold text-[#111827] block text-xs sm:text-sm">
                  Mode Simulasi: Kamu sedang melihat contoh hasil kanvas refleksi.
                </span>
                <span className="text-[#525F7F] text-xs">
                  Coba interaksi pada kartu di bawah atau mulai refleksimu sendiri dari awal.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                to="/mask"
                className="px-4 py-2 rounded-full bg-[#284B3E] hover:bg-[#1E3A30] text-white font-semibold transition shadow-xs cursor-pointer"
              >
                Mulai Refleksimu Sendiri
              </Link>
              <button
                onClick={() => {
                  clearSession();
                  showToast('Contoh refleksi ditutup.', 'check');
                }}
                className="px-3.5 py-2 rounded-full bg-white text-[#64748B] hover:text-[#1E293B] font-medium border border-[#D8DBE2] hover:bg-[#F8FAF9] transition shadow-2xs cursor-pointer"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        )}

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
