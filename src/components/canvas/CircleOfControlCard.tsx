import React from 'react';
import { motion } from 'motion/react';
import { PieChart, CheckCircle2, Wind } from 'lucide-react';

interface ControlItem {
  id: string;
  text: string;
  badge: string;
}

interface CircleOfControlCardProps {
  withinControlItems?: ControlItem[];
  outsideControlItems?: ControlItem[];
}

export const CircleOfControlCard: React.FC<CircleOfControlCardProps> = ({
  withinControlItems = [
    { id: '1', text: 'Fokus 1 jam cicil kerangka tugas atau bahan bacaan', badge: 'Malam ini' },
    { id: '2', text: 'Kirim chat sopan ke dosen untuk minta sedikit perpanjangan waktu', badge: 'Draf siap' },
    { id: '3', text: 'Tutup laptop jam 22:30 tanpa kompromi untuk tidur', badge: 'Batasan sehat' },
  ],
  outsideControlItems = [
    { id: '4', text: 'Omongan atau ekspektasi teman sekelas soal nilai ujian', badge: 'Relakan dulu' },
    { id: '5', text: 'Keputusan penilaian atau tugas dadakan yang di luar kendali', badge: 'Relakan dulu' },
  ],
}) => {
  const totalItems = withinControlItems.length + outsideControlItems.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 border border-[#E2E8F0] flex flex-col justify-between"
    >
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-full bg-[#E8EFEA] text-[#284B3E] flex items-center justify-center">
              <PieChart size={16} />
            </span>
            <span className="text-xs font-bold tracking-wider text-[#284B3E] uppercase">
              Beban yang Berhasil Kupilah
            </span>
          </div>
          <span className="text-xs font-semibold text-[#284B3E] bg-[#E8EFEA] px-3 py-1 rounded-full">
            {totalItems} Hal Berhasil Dipilah
          </span>
        </div>

        {/* Section 1: Retained in Control */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-[#284B3E] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#284B3E]" />
              Bisa Aku Kendalikan
            </span>
            <span className="text-[#64748B] font-medium">Bisa Kulakukan Sekarang</span>
          </div>

          <div className="space-y-2">
            {withinControlItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#F8FAF9] border border-[#E8EFEA] text-[#1E293B] text-xs sm:text-sm font-medium"
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

        {/* Section 2: Outside Control (Released / Let Go) */}
        <div className="flex flex-col gap-2 pt-1 border-t border-[#F1F5F9]">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-[#C86D51] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#C86D51]" />
              Di Luar Kendaliku
            </span>
            <span className="text-[#64748B] font-medium">Untuk Sementara, Aku Lepaskan</span>
          </div>

          <div className="space-y-2">
            {outsideControlItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#FBFBFA] border border-[#F1F1EB] text-[#64748B] text-xs sm:text-sm"
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
