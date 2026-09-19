import React from 'react';
import { motion } from 'motion/react';
import { Archive, Save, ArrowRight, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BottomActionBarProps {
  onSaveToVault: () => void;
  onClearSession: () => void;
}

export const BottomActionBar: React.FC<BottomActionBarProps> = ({
  onSaveToVault,
  onClearSession,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.35 }}
      className="mt-12 p-5 sm:p-6 bg-white rounded-2xl shadow-sm border border-[#E2E8F0] flex flex-col md:flex-row items-center justify-between gap-5"
    >
      {/* Left: Privacy & Vault Status */}
      <div className="flex items-center gap-3.5 w-full md:w-auto">
        <div className="w-10 h-10 rounded-full bg-[#E8EFEA] flex items-center justify-center text-[#284B3E] shrink-0">
          <Archive size={18} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-[#111827]">
            Ruang Pribadi
          </span>
          <span className="text-xs text-[#64748B] leading-snug">
            Data refleksimu disimpan di perangkat ini melalui penyimpanan lokal browser. Pemrosesan AI berlangsung tanpa menyimpan catatan pribadimu di server.
          </span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
        {/* Save to Vault */}
        <button
          onClick={onSaveToVault}
          className="h-10 px-5 rounded-full bg-[#F4F5F0] hover:bg-[#E8EFEA] text-[#284B3E] border border-[#E2E8F0] text-xs sm:text-sm font-semibold transition-all inline-flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
        >
          <Save size={15} />
          <span>Simpan ke Ruang Pribadiku</span>
        </button>

        {/* Start New Reflection */}
        <button
          onClick={() => navigate('/mask')}
          className="h-10 px-5 rounded-full bg-[#284B3E] hover:bg-[#1E3A30] text-white text-xs sm:text-sm font-semibold transition-all inline-flex items-center justify-center gap-1.5 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Mulai Refleksi Baru</span>
          <ArrowRight size={15} />
        </button>

        {/* Clear Memory */}
        <button
          onClick={onClearSession}
          title="Bersihkan cache RAM jika menggunakan komputer publik kampus"
          className="h-10 px-4 rounded-full bg-[#FBE9E3]/70 hover:bg-[#FBE9E3] text-[#A9503B] border border-[#F8D5CB] text-xs sm:text-sm font-semibold transition-all inline-flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
        >
          <Trash2 size={15} />
          <span>Akhiri Sesi & Bersihkan Layar</span>
        </button>
      </div>
    </motion.div>
  );
};
