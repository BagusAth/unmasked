import React, { useState } from 'react';
import { ShieldCheck, HardDrive, UserX, Trash2, CheckCircle2 } from 'lucide-react';
import { storage } from '../utils/storage';

export const PrivacyNotice: React.FC = () => {
  const [clearedNotice, setClearedNotice] = useState<boolean>(false);

  const handleClearData = () => {
    storage.removeSessionId();
    setClearedNotice(true);
    setTimeout(() => {
      setClearedNotice(false);
    }, 4000);
  };

  return (
    <section id="privasi" className="w-full max-w-5xl mx-auto px-4 sm:px-6 mt-20 scroll-mt-28">
      {/* Outer Ice-Blue Lavender Container */}
      <div className="rounded-[32px] bg-[#EFF3FD] border border-[#DEE7F8] p-8 sm:p-12">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#DCFCE7] px-3 py-1 text-[11px] font-bold text-[#15803D] uppercase tracking-wider">
            <ShieldCheck size={13} className="text-[#15803D]" />
            <span>PRIVASI</span>
          </div>

          <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-[#111827]">
            Privasi Adalah Prioritas
          </h2>
        </div>

        {/* 3 White Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Tersimpan di Perangkat Ini */}
          <div className="rounded-2xl bg-white p-6 shadow-2xs border border-white/80 transition hover:shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
              <HardDrive size={22} />
            </div>
            <h3 className="mt-4 text-base font-bold text-[#111827]">
              Tersimpan di Perangkat Ini
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#64748B]">
              Catatan hanya tersimpan lokal di browser. Tidak dikirim ke server mana pun.
            </p>
          </div>

          {/* Card 2: Tanpa Login */}
          <div className="rounded-2xl bg-white p-6 shadow-2xs border border-white/80 transition hover:shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
              <UserX size={22} />
            </div>
            <h3 className="mt-4 text-base font-bold text-[#111827]">
              Tanpa Login
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#64748B]">
              UNMASKED bekerja sepenuhnya di browser, tanpa login.
            </p>
          </div>

          {/* Card 3: Hapus Sekali Klik */}
          <div className="rounded-2xl bg-white p-6 shadow-2xs border border-white/80 transition hover:shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
                <Trash2 size={22} />
              </div>
              <h3 className="mt-4 text-base font-bold text-[#111827]">
                Hapus Sekali Klik
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#64748B]">
                Satu tombol untuk menghapus seluruh data.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
              <button
                onClick={handleClearData}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline transition inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Bersihkan Data Lokal</span>
              </button>

              {clearedNotice && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                  <CheckCircle2 size={13} />
                  <span>Data terhapus</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
