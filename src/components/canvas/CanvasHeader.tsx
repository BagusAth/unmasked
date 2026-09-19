import React from 'react';
import { motion } from 'motion/react';
import { BadgeCheck, Lock, Clock } from 'lucide-react';

interface CanvasHeaderProps {
  dateString?: string;
  durationMinutes?: number;
}

export const CanvasHeader: React.FC<CanvasHeaderProps> = ({
  dateString = 'Hari ini • Catatan Refleksi',
  durationMinutes = 12,
}) => {
  return (
    <div className="relative w-full pb-8 pt-2">
      {/* Subtle Ambient Radial Glows */}
      <div className="pointer-events-none absolute -top-20 left-1/4 -z-10 h-96 w-96 rounded-full bg-[#284B3E]/10 blur-3xl" />
      <div className="pointer-events-none absolute top-36 right-4 -z-10 h-80 w-80 rounded-full bg-[#C86D51]/10 blur-3xl" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Session metadata & Titles */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-2"
        >
          {/* Breadcrumb Date Pill */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#64748B] uppercase">
            <span className="flex h-2 w-2 rounded-full bg-[#284B3E] animate-pulse" />
            <span>{dateString}</span>
          </div>

          {/* Main Title & Duration Badge */}
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111827]">
              Kanvas Refleksiku Hari Ini
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EFEA] text-[#284B3E] text-xs font-semibold shadow-2xs">
              <Clock size={13} className="text-[#284B3E]" />
              <span>Jeda hening {durationMinutes} menit</span>
            </span>
          </div>

          {/* Compassionate Subtitle */}
          <p className="text-sm sm:text-base text-[#525F7F] font-normal leading-relaxed max-w-2xl">
            Catatan jujur tentang apa yang sedang kamu hadapi dan langkah kecil yang bisa kamu ambil hari ini.
          </p>
        </motion.div>

        {/* Right: Security & Completion Status Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-2.5 flex-wrap"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#284B3E] shadow-2xs border border-[#E2E8F0] text-xs font-semibold">
            <BadgeCheck size={16} className="text-[#284B3E]" />
            <span>Selesai berefleksi • Tenang & rileks</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F4F5F0] text-[#525F7F] border border-[#E8E8E2] text-xs font-medium">
            <Lock size={14} className="text-[#284B3E]" />
            <span>Tersimpan aman di perambanmu</span>
          </span>
        </motion.div>
      </div>
    </div>
  );
};
