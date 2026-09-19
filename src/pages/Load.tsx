import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Edit3, Lock, ArrowRight, Wind, History as HistoryIcon } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

// Extracted Components
import { CircleOfControl } from '../components/load/CircleOfControl';
import { AmbientPlayer } from '../components/load/AmbientPlayer';
import { AffirmationCard } from '../components/load/AffirmationCard';
import { ReflectionDiary } from '../components/load/ReflectionDiary';

export interface BurdenItem {
  id: string;
  text: string;
  category: 'within' | 'influence' | 'outside';
  createdAt: string;
}

export function Load() {
  // State: Brain Dump & Burdens
  const [brainDumpText, setBrainDumpText] = useState('');
  const [burdens, setBurdens] = useState<BurdenItem[]>(() => {
    const saved = localStorage.getItem('unmasked_burdens');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [
      { id: '1', text: 'Ekspektasi tinggi orang tua terhadap IPK', category: 'outside', createdAt: 'Hari ini' },
      { id: '2', text: 'Menyiapkan outline skripsi & riset awal', category: 'within', createdAt: 'Hari ini' },
      { id: '3', text: 'Komunikasi batas waktu tugas dengan teman kelompok', category: 'influence', createdAt: 'Hari ini' }
    ];
  });

  // Persist burdens to local storage
  useEffect(() => {
    localStorage.setItem('unmasked_burdens', JSON.stringify(burdens));
  }, [burdens]);

  // Add new burden from brain dump
  const handleAddBurden = () => {
    if (!brainDumpText.trim()) return;
    const newBurden: BurdenItem = {
      id: Date.now().toString(),
      text: brainDumpText.trim(),
      category: 'outside', // Default to outside control, user can categorize
      createdAt: 'Baru saja'
    };
    setBurdens([newBurden, ...burdens]);
    setBrainDumpText('');
  };

  // Move burden category
  const handleMoveCategory = (id: string, category: 'within' | 'influence' | 'outside') => {
    setBurdens(burdens.map(b => b.id === id ? { ...b, category } : b));
  };

  // Release/Delete burden ("Let It Go")
  const handleReleaseBurden = (id: string) => {
    setBurdens(burdens.filter(b => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans text-[#1E293B] flex flex-col justify-between selection:bg-[#4A6B5D]/20">
      <Navbar />

      <main className="w-full pt-6 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl pb-16 flex-1">
        {/* HERO & KANVAS PELEPASAN UTAMA */}
        <section className="flex flex-col items-center justify-center mx-auto pt-6 pb-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center flex flex-col items-center gap-2 mb-8 max-w-3xl"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EFEA] text-[#4A6B5D] text-xs font-semibold tracking-wide uppercase">
              <Wind size={14} />
              Ruang Pribadiku
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1E293B] text-center leading-tight">
              Tarik napas perlahan.<br />Letakkan bebanmu di sini sejenak.
            </h1>
            <p className="text-sm sm:text-base text-[#64748B] text-center leading-relaxed max-w-2xl mt-1">
              Tidak perlu pura-pura kuat. Tuliskan apa pun yang membuat pundakmu terasa berat hari ini. Ruang ini hanya milikmu tanpa penilaian luar.
            </p>
          </motion.div>

          {/* KANVAS PELEPASAN INPUT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full bg-white rounded-[20px] p-5 sm:p-7 shadow-[0_4px_20px_2px_rgba(30,41,59,0.04),0_12px_32px_4px_rgba(74,107,93,0.05)] border border-[#E2E8F0] flex flex-col gap-4"
          >
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <span className="text-xs font-medium text-[#475569] flex items-center gap-1.5">
                <Edit3 size={15} className="text-[#4A6B5D]" />
                Kanvas Pelepasan Batin
              </span>
              <a
                href="#refleksi-terakhir"
                className="text-xs text-[#4A6B5D] hover:underline flex items-center gap-1 transition-colors font-medium"
              >
                <HistoryIcon size={14} />
                Lihat Refleksi Sebelumnya
              </a>
            </div>

            <div className="relative w-full">
              <textarea
                value={brainDumpText}
                onChange={(e) => setBrainDumpText(e.target.value)}
                className="w-full bg-[#FAF9F6] rounded-xl border border-[#E2E8F0] focus:border-[#4A6B5D] focus:ring-2 focus:ring-[#4A6B5D]/20 text-[#1E293B] text-base leading-relaxed resize-none placeholder:text-[#94A3B8] outline-none p-4 transition-all"
                placeholder="Pikiranku sedang dipenuhi oleh..."
                rows={5}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#F1F5F9]">
              <div className="flex items-center gap-2 text-[#64748B] text-xs">
                <Lock size={15} className="text-[#4A6B5D] shrink-0" />
                <span>Hanya kamu dan layarmu. Catatan ini tersimpan aman di perangkatmu sendiri.</span>
              </div>
              <button
                onClick={handleAddBurden}
                disabled={!brainDumpText.trim()}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#4A6B5D] text-white text-xs sm:text-sm font-semibold hover:bg-[#3D584C] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Lepaskan Beban ke Ruang Tenang</span>
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        </section>

        <CircleOfControl
          burdens={burdens}
          onMoveCategory={handleMoveCategory}
          onReleaseBurden={handleReleaseBurden}
        />

        <AmbientPlayer />

        <AffirmationCard />

        <ReflectionDiary />
      </main>

      <Footer />
    </div>
  );
}

export default Load;
