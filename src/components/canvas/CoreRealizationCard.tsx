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
      className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 border border-[#E2E8F0] flex flex-col justify-between relative overflow-hidden"
    >
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-full bg-[#E8EFEA] text-[#284B3E] flex items-center justify-center">
              <Lightbulb size={16} />
            </span>
            <span className="text-xs font-bold tracking-wider text-[#284B3E] uppercase">
              Yang Kusadari
            </span>
          </div>
        </div>

        {/* Big Quote */}
        <div className="relative pt-2 pb-1">
          <span className="text-6xl sm:text-7xl text-[#284B3E]/15 leading-none select-none font-serif absolute -top-3 left-0">
            “
          </span>
          <blockquote className="text-lg sm:text-xl font-normal text-[#1E293B] leading-relaxed relative z-10 pt-2">
            <span>{quoteBefore}</span>
            <span className="text-[#C86D51] font-semibold">{quoteHighlight}</span>
            <span>{quoteAfter}</span>
          </blockquote>
        </div>

        {/* Need & Body Status Badges */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {/* Primary Need */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
              Yang Mungkin Kubutuhkan
            </span>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBE9E3] text-[#97472E] text-xs sm:text-sm font-semibold shadow-2xs">
              <Flower2 size={15} className="text-[#C86D51]" />
              <span>{primaryNeed}</span>
            </div>
          </div>

          {/* Body State */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
              Yang Kurasa di Tubuh
            </span>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1F5F9] text-[#334155] text-xs sm:text-sm font-medium">
              <Wind size={15} className="text-[#284B3E]" />
              <span>{bodyState}</span>
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
