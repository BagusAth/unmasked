import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckSquare, Circle, CheckCircle2, Flower2 } from 'lucide-react';

interface MicroCommitmentCardProps {
  categoryBadge?: string;
  actionTitle?: string;
  actionScript?: string;
  helperNote?: string;
  isCompleted?: boolean;
  onStatusChange?: (isCompleted: boolean) => void;
}

export const MicroCommitmentCard: React.FC<MicroCommitmentCardProps> = ({
  categoryBadge = 'Jangkar Hari Ini • Komunikasi Batasan',
  actionTitle = 'Sampaikan Batasanmu dengan Tenang',
  actionScript = '“Halo rekan-rekan tim, izin malam ini aku istirahat duluan ya untuk memulihkan kondisi. Pembahasan tugas kita lanjutkan besok pagi. Terima kasih banyak atas pengertiannya.”',
  helperNote = 'Kamu bisa melakukannya saat siap.',
  isCompleted = false,
  onStatusChange,
}) => {
  const handleToggle = () => {
    if (onStatusChange) {
      onStatusChange(!isCompleted);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.25 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 border border-[#E2E8F0] flex flex-col justify-between"
    >
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-full bg-[#E8EFEA] text-[#284B3E] flex items-center justify-center">
              <CheckSquare size={16} />
            </span>
            <span className="text-xs font-bold tracking-wider text-[#284B3E] uppercase">
              Satu Langkah Kecil
            </span>
          </div>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
              isCompleted
                ? 'bg-[#E8EFEA] text-[#284B3E]'
                : 'bg-[#FBE9E3] text-[#C86D51]'
            }`}
          >
            {isCompleted ? 'Sudah dilakukan' : 'Belum dilakukan'}
          </span>
        </div>

        {/* Script Box */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#F8FAF9] border border-[#E2E8F0] flex flex-col gap-2">
          <span className="inline-block w-fit px-2.5 py-0.5 rounded-full bg-[#284B3E] text-white text-[11px] font-semibold">
            {categoryBadge}
          </span>
          <h3 className="text-base font-bold text-[#111827]">
            {actionTitle}
          </h3>
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed italic">
            {actionScript}
          </p>
        </div>

        {/* Interactive Completion Button */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            onClick={handleToggle}
            className={`w-full py-3 px-5 rounded-full text-xs sm:text-sm font-semibold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99] ${
              isCompleted
                ? 'bg-[#284B3E] hover:bg-[#1E3A30] text-white'
                : 'bg-[#4A6B5D] hover:bg-[#3D584C] text-white'
            }`}
          >
            {isCompleted ? (
              <CheckCircle2 size={18} className="text-emerald-300" />
            ) : (
              <Circle size={18} className="text-white/70" />
            )}
            <span>
              {isCompleted ? 'Sudah Kulakukan Hari Ini' : '✓ Tandai Sudah Kulakukan'}
            </span>
          </button>

          <AnimatePresence>
            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-center text-[#284B3E] text-xs font-semibold pt-1"
              >
                Langkah ini sudah kamu tandai sebagai selesai.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Helper footnote */}
      <div className="pt-4 border-t border-[#F1F5F9] flex items-center gap-2 text-xs text-[#64748B]">
        <Flower2 size={15} className="text-[#284B3E] shrink-0" />
        <span>{helperNote}</span>
      </div>
    </motion.div>
  );
};
