import React from 'react';
import { motion } from 'motion/react';
import { PieChart, CheckCircle2, MessageSquare, Wind } from 'lucide-react';

interface ControlItem {
  id: string;
  text: string;
  badge: string;
}

interface CircleOfControlCardProps {
  withinControlItems?: ControlItem[];
  influenceControlItems?: ControlItem[];
  outsideControlItems?: ControlItem[];
}

export const CircleOfControlCard: React.FC<CircleOfControlCardProps> = ({
  withinControlItems = [
    { id: '1', text: 'Fokus 1 jam cicil kerangka tugas atau bahan bacaan', badge: 'Malam ini' },
    { id: '2', text: 'Tutup laptop jam 22:30 tanpa kompromi untuk tidur', badge: 'Batasan sehat' },
  ],
  influenceControlItems = [
    { id: '3', text: 'Kirim chat sopan ke dosen untuk minta sedikit perpanjangan waktu', badge: 'Draf siap' },
  ],
  outsideControlItems = [
    { id: '4', text: 'Omongan atau ekspektasi teman sekelas soal nilai ujian', badge: 'Relakan dulu' },
    { id: '5', text: 'Keputusan penilaian atau tugas dadakan yang di luar kendali', badge: 'Relakan dulu' },
  ],
}) => {
  const withinCount = withinControlItems.length;
  const influenceCount = influenceControlItems.length;
  const outsideCount = outsideControlItems.length;
  const totalItems = withinCount + influenceCount + outsideCount;

  const total = totalItems || 1;
  const withinPct = Math.round((withinCount / total) * 100);
  const influencePct = Math.round((influenceCount / total) * 100);
  const outsidePct = Math.max(0, 100 - withinPct - influencePct);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-[0_4px_20px_-2px_rgba(30,41,59,0.04),0_12px_32px_-4px_rgba(74,107,93,0.05)] hover:shadow-md transition-all duration-300 border border-[#E8E8E2] flex flex-col justify-between h-full"
    >
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-[#E8EFEA] text-[#284B3E] flex items-center justify-center shadow-2xs">
              <PieChart size={16} />
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-wider text-[#284B3E] uppercase">
                Yang Kutata
              </span>
              <span className="text-[11px] text-[#64748B]">Lingkaran Kendali & Pelepasan</span>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-[#284B3E] bg-[#E8EFEA] px-2.5 py-0.5 rounded-full">
            Tahap 2 • {totalItems} hal
          </span>
        </div>

        {/* Mini Distribution Ratio Bar */}
        <div className="p-3 rounded-2xl bg-[#F8FAF9] border border-[#E8EFEA] flex flex-col gap-2">
          <div className="h-2 w-full rounded-full bg-[#E2E8F0] overflow-hidden flex">
            {withinPct > 0 && (
              <div
                style={{ width: `${withinPct}%` }}
                className="bg-[#284B3E] h-full transition-all"
              />
            )}
            {influencePct > 0 && (
              <div
                style={{ width: `${influencePct}%` }}
                className="bg-[#D97706] h-full transition-all"
              />
            )}
            {outsidePct > 0 && (
              <div
                style={{ width: `${outsidePct}%` }}
                className="bg-[#C86D51] h-full transition-all"
              />
            )}
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#64748B] flex-wrap gap-1">
            <span className="flex items-center gap-1 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#284B3E]" />
              {withinCount} Dalam Kendali
            </span>
            {influenceCount > 0 && (
              <span className="flex items-center gap-1 font-medium text-[#92400E]">
                <span className="w-2 h-2 rounded-full bg-[#D97706]" />
                {influenceCount} Perlu Dibicarakan
              </span>
            )}
            <span className="flex items-center gap-1 font-medium text-[#A9503B]">
              <span className="w-2 h-2 rounded-full bg-[#C86D51]" />
              {outsideCount} Dilepaskan
            </span>
          </div>
        </div>

        {/* Section 1: Retained in Control */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-[#284B3E] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#284B3E]" />
              Ada dalam kendaliku
            </span>
          </div>

          <div className="space-y-2">
            {withinControlItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#F8FAF9] border border-[#E8EFEA] text-[#1E293B] text-xs sm:text-sm font-medium shadow-2xs"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#284B3E] shrink-0" />
                  <span className="leading-snug">{item.text}</span>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 bg-[#E8EFEA] text-[#284B3E] rounded-full shrink-0">
                  {item.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Influence / Communication (Warm Amber Token) */}
        {influenceControlItems.length > 0 && (
          <div className="flex flex-col gap-2 pt-1 border-t border-[#F1F5F9]">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-[#B45309] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#B45309]" />
                Perlu dibicarakan
              </span>
            </div>

            <div className="space-y-2">
              {influenceControlItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#FFFDF5] border border-[#FDE68A] text-[#1E293B] text-xs sm:text-sm font-medium shadow-2xs"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquare size={16} className="text-[#B45309] shrink-0" />
                    <span className="leading-snug">{item.text}</span>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 bg-[#FEF3C7] text-[#92400E] rounded-full shrink-0">
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: Outside Control (Released / Let Go) */}
        <div className="flex flex-col gap-2 pt-1 border-t border-[#F1F5F9]">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-[#C86D51] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#C86D51]" />
              Aku lepaskan untuk sekarang
            </span>
          </div>

          <div className="space-y-2">
            {outsideControlItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#FBFBFA] border border-[#ECEEE9] text-[#64748B] text-xs sm:text-sm shadow-2xs"
              >
                <div className="flex items-center gap-2.5">
                  <Wind size={16} className="text-[#C86D51] shrink-0" />
                  <span className="line-through opacity-85 leading-snug">{item.text}</span>
                </div>
                <span className="no-underline text-[11px] font-medium text-[#A9503B] bg-[#FBE9E3] px-2.5 py-0.5 rounded-full shrink-0">
                  {item.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
