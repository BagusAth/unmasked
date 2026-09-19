import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Smile, Brain } from 'lucide-react';

interface MaskComparisonCardProps {
  publicPersonaText?: string;
  publicTags?: string[];
  innerFeelingText?: string;
  innerTags?: string[];
  validationMessage?: string;
}

export const MaskComparisonCard: React.FC<MaskComparisonCardProps> = ({
  publicPersonaText = '“Mahasiswa yang selalu kelihatan baik-baik saja dan bisa diandalkan”',
  publicTags = ['Kelihatan selalu tenang', 'Selalu ada untuk teman'],
  innerFeelingText = '“Kelelahan batin yang sunyi dan cemas kalau berhenti sejenak.”',
  innerTags = ['Kewalahan & butuh jeda', 'Takut dianggap tidak mampu'],
  validationMessage = 'Terima kasih sudah mau jujur pada diri sendiri hari ini. Mengakui bahwa kamu lelah adalah langkah awal yang berani, bukan tanda kelemahan.',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 border border-[#E2E8F0] flex flex-col justify-between"
    >
      <div className="flex flex-col gap-5">
        {/* Header Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-full bg-[#FBE9E3] text-[#C86D51] flex items-center justify-center">
              <Sparkles size={16} />
            </span>
            <span className="text-xs font-bold tracking-wider text-[#C86D51] uppercase">
              Yang Dirasakan
            </span>
          </div>
        </div>

        {/* Comparative Persona Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Public Persona Card */}
          <div className="bg-[#F8F9FA] rounded-xl p-4 sm:p-5 border border-[#ECEFEA] flex flex-col justify-between gap-3">
            <div className="flex items-center gap-1.5 text-[#64748B] text-xs font-semibold uppercase tracking-wider">
              <Smile size={14} className="text-[#4A6B5D]" />
              <span>Yang Tampak di Luar</span>
            </div>
            <p className="text-sm sm:text-base font-medium text-[#1E293B] leading-snug">
              {publicPersonaText}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {publicTags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#E2E8F0]/70 text-[#475569]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Inner Truth Card */}
          <div className="bg-[#FFF6F3] rounded-xl p-4 sm:p-5 border border-[#FCDDD3] flex flex-col justify-between gap-3">
            <div className="flex items-center gap-1.5 text-[#C86D51] text-xs font-semibold uppercase tracking-wider">
              <Brain size={14} className="text-[#C86D51]" />
              <span>Yang Sebenarnya Dirasakan</span>
            </div>
            <p className="text-sm sm:text-base font-semibold text-[#97472E] leading-snug">
              {innerFeelingText}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {innerTags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FBE9E3] text-[#A9503B]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Compassionate Validation Note */}
      <div className="mt-6 pt-4 bg-[#F2F7F4] rounded-xl p-4 sm:p-5 border border-[#E0ECE5] flex items-start gap-3">
        <Heart size={18} className="text-[#284B3E] shrink-0 mt-0.5" />
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-bold text-[#284B3E]">
            Apresiasi Diri yang Lembut
          </span>
          <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
            {validationMessage}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
