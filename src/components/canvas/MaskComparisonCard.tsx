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
  validationMessage =
    'Terima kasih sudah mau jujur pada diri sendiri hari ini. Kamu tidak harus selalu terlihat baik-baik saja untuk mengakui bahwa sesuatu terasa berat.',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-[0_4px_20px_-2px_rgba(30,41,59,0.04),0_12px_32px_-4px_rgba(74,107,93,0.05)] hover:shadow-md transition-all duration-300 border border-[#E8E8E2] flex flex-col justify-between h-full"
    >
      <div className="flex flex-col gap-5">
        {/* Header Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-[#FBE9E3] text-[#C86D51] flex items-center justify-center shadow-2xs">
              <Sparkles size={16} />
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-wider text-[#C86D51] uppercase">
                Yang Kubuka
              </span>
              <span className="text-[11px] text-[#64748B]">Topeng Sosial vs Kenyataan Batin</span>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-[#284B3E] bg-[#E8EFEA] px-2.5 py-0.5 rounded-full">
            Tahap 1
          </span>
        </div>

        {/* Comparative Persona Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Public Persona Card */}
          <div className="bg-[#F9FAF9] rounded-2xl p-4 sm:p-5 border border-[#E8EFEA] flex flex-col justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-1.5 text-[#525F7F] text-xs font-semibold uppercase tracking-wider">
              <Smile size={15} className="text-[#4A6B5D]" />
              <span>Yang Tampak di Luar</span>
            </div>
            <p className="text-sm sm:text-base font-medium text-[#1E293B] leading-snug">
              {publicPersonaText}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {publicTags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#E8EFEA]/80 text-[#284B3E] border border-[#DCE6E0]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Inner Truth Card */}
          <div className="bg-gradient-to-br from-[#FFF8F5] to-[#FDF4F0] rounded-2xl p-4 sm:p-5 border border-[#F8DDD4] flex flex-col justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-1.5 text-[#C86D51] text-xs font-semibold uppercase tracking-wider">
              <Brain size={15} className="text-[#C86D51]" />
              <span>Yang Ada di Balik Topeng</span>
            </div>
            <p className="text-sm sm:text-base font-semibold text-[#97472E] leading-snug">
              {innerFeelingText}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {innerTags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FBE9E3] text-[#A9503B] border border-[#F6CDC1]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Compassionate Validation Note */}
      <div className="mt-6 bg-[#F4F7F5] rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-[#E0ECE5] border-l-4 border-l-[#284B3E] flex items-start gap-3.5 shadow-2xs">
        <div className="w-7 h-7 rounded-full bg-[#E8EFEA] flex items-center justify-center shrink-0 mt-0.5">
          <Heart size={15} className="text-[#284B3E]" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-[#284B3E]">
            Sedikit Pengingat untukmu
          </span>
          <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
            {validationMessage}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
