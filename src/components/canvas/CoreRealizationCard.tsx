import React from 'react';
import { motion } from 'motion/react';
import { Lightbulb, Flower2, Wind, Lock } from 'lucide-react';

interface CoreRealizationCardProps {
  quoteBefore?: string;
  quoteHighlight?: string;
  quoteAfter?: string;
  primaryNeed?: string;
  bodyState?: string;
}

export const CoreRealizationCard: React.FC<CoreRealizationCardProps> = ({
  quoteBefore = '“Aku bukan takut bekerja keras; ',
  quoteHighlight = 'aku hanya takut pada kesunyian',
  quoteAfter = ' saat berhenti memaksakan diri tampil sempurna di depan orang lain.”',
  primaryNeed = 'Istirahat tanpa merasa bersalah & menjaga batasan sehat',
  bodyState = 'Bahu mulai rileks & napas terasa lebih lega',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.2 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-[0_4px_20px_-2px_rgba(30,41,59,0.04),0_12px_32px_-4px_rgba(74,107,93,0.05)] hover:shadow-md transition-all duration-300 border border-[#E8E8E2] flex flex-col justify-between relative overflow-hidden h-full"
    >
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-[#E8EFEA] text-[#284B3E] flex items-center justify-center shadow-2xs">
              <Lightbulb size={16} />
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-wider text-[#284B3E] uppercase">
                Yang Kusadari
              </span>
              <span className="text-[11px] text-[#64748B]">Pesan Batin & Kebutuhan Terdalam</span>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-[#284B3E] bg-[#E8EFEA] px-2.5 py-0.5 rounded-full">
            Tahap 3
          </span>
        </div>

        {/* Big Quote with Warm Ambient Frame */}
        <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#FAFBF9] to-[#F5F8F6] border border-[#E8EFEA]">
          <span className="text-6xl sm:text-7xl text-[#284B3E]/12 leading-none select-none font-serif absolute top-1 left-3">
            “
          </span>
          <blockquote className="text-base sm:text-lg md:text-xl font-normal text-[#1E293B] leading-relaxed relative z-10 pt-1">
            <span>{quoteBefore}</span>
            <span className="text-[#C86D51] font-semibold">{quoteHighlight}</span>
            <span>{quoteAfter}</span>
          </blockquote>
        </div>

        {/* Need & Body Status Dual Panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          {/* Primary Need */}
          <div className="p-3.5 rounded-2xl bg-[#FFF8F5] border border-[#FCDDD3] flex items-center gap-3 shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-[#FBE9E3] flex items-center justify-center shrink-0">
              <Flower2 size={16} className="text-[#C86D51]" />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-[10px] font-bold text-[#A9503B] uppercase tracking-wider">
                Yang Mungkin Kubutuhkan
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#97472E] leading-snug truncate">
                {primaryNeed}
              </span>
            </div>
          </div>

          {/* Body State */}
          <div className="p-3.5 rounded-2xl bg-[#F8FAF9] border border-[#E8EFEA] flex items-center gap-3 shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-[#E8EFEA] flex items-center justify-center shrink-0">
              <Wind size={16} className="text-[#284B3E]" />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-[10px] font-bold text-[#284B3E] uppercase tracking-wider">
                Yang Kurasa di Tubuh
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#284B3E] leading-snug truncate">
                {bodyState}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-6 pt-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B]">
        <span>Dari refleksimu sendiri.</span>
        <span className="flex items-center gap-1.5">
          <Lock size={13} className="text-[#284B3E]" />
          <span>Disimpan di perangkat ini</span>
        </span>
      </div>
    </motion.div>
  );
};
