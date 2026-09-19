import React from 'react';
import { motion } from 'motion/react';
import { Archive, Save, ArrowRight, LogOut } from 'lucide-react';
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
      className="mt-12 p-5 sm:p-7 bg-white rounded-2xl sm:rounded-3xl shadow-[0_4px_20px_-2px_rgba(30,41,59,0.04),0_12px_32px_-4px_rgba(74,107,93,0.05)] border border-[#E8E8E2] flex flex-col md:flex-row items-center justify-between gap-6"
    >
      {/* Left: Privacy & Vault Status */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="w-11 h-11 rounded-2xl bg-[#E8EFEA] flex items-center justify-center text-[#284B3E] shrink-0 shadow-2xs border border-[#DCE6E0]">
          <Archive size={20} />
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#111827]">
              Ruang Pribadi & Privasi
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.2 bg-[#E8EFEA] text-[#284B3E] rounded-full">
              Lokal Browser
            </span>
          </div>
          <span className="text-xs text-[#525F7F] leading-snug max-w-lg">
            Data refleksimu tersimpan secara privat di perangkat ini. Catatan batinmu tidak pernah diarsipkan di server luar.
          </span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-start md:justify-end">
        {/* Save to Vault */}
        <button
          onClick={onSaveToVault}
          className="h-10 px-5 rounded-full bg-[#F4F5F0] hover:bg-[#E8EFEA] text-[#284B3E] border border-[#DCE6E0] text-xs sm:text-sm font-semibold transition-all inline-flex items-center justify-center gap-2 shadow-2xs cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
        >
          <Save size={15} />
          <span>Simpan ke Ruang Pribadiku</span>
        </button>

        {/* Start New Reflection (Primary) */}
        <button
          onClick={() => navigate('/mask')}
          className="h-10 px-5 rounded-full bg-[#284B3E] hover:bg-[#1E3A30] text-white text-xs sm:text-sm font-semibold transition-all inline-flex items-center justify-center gap-2 shadow-xs cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Mulai Refleksi Baru</span>
          <ArrowRight size={15} />
        </button>

        {/* Close Session (Neutral Calm Ghost) */}
        <button
          onClick={onClearSession}
          title="Tutup sesi aktif dan bersihkan data sementara dari perangkat ini"
          className="h-10 px-4 rounded-full bg-white hover:bg-[#F8FAF9] text-[#64748B] hover:text-[#1E293B] border border-[#E2E8F0] hover:border-[#CBD5E1] text-xs sm:text-sm font-medium transition-all inline-flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
        >
          <LogOut size={15} />
          <span>Tutup Refleksi</span>
        </button>
      </div>
    </motion.div>
  );
};
