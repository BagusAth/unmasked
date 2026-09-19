import React, { useState } from 'react';
import { Phone, MessageCircle, ExternalLink, Copy, Check } from 'lucide-react';

export const HotlineSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <section id="hotlines" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* CARD 1: Layanan SEJIWA */}
        <div className="rounded-[28px] border border-[#E9ECEF] bg-white p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            {/* Badges Header */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center rounded-full bg-[#FEECE8] px-3.5 py-1 text-xs font-medium text-[#B84E34]">
                Pertolongan Pertama Emosional
              </span>
              <span className="text-xs font-medium text-[#64748B]">
                Tersedia 24/7
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111827] leading-tight mb-4">
              Layanan Kesehatan Jiwa SEJIWA (KemenPPPA & BNPB)
            </h3>

            {/* Inner Info Box */}
            <div className="rounded-2xl bg-[#F0F4FE]/80 border border-[#E0E7F8] p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#E0ECFF] flex items-center justify-center text-[#2563EB] shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[#64748B] uppercase tracking-wider">
                    Nomor Hotline
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-[#111827]">
                    119 Ekstensi 8
                  </p>
                </div>
              </div>
              <span className="rounded-md bg-[#DDE7FB] px-2.5 py-1 text-xs font-semibold text-[#2563EB]">
                Bebas Pulsa
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="tel:119,8"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#8B3A2B] hover:bg-[#742E21] text-white py-3.5 px-6 font-medium text-sm transition-all shadow-xs active:scale-[0.99]"
            >
              <Phone size={16} />
              <span>Panggil Hotline 119</span>
            </a>
            <button
              onClick={() => handleCopy('119 ext 8', 'sejiwa')}
              title="Salin nomor"
              className="relative h-12 w-12 rounded-full border border-[#CBD5E1] bg-white hover:bg-neutral-50 flex items-center justify-center text-[#475569] transition shrink-0 cursor-pointer"
            >
              {copiedId === 'sejiwa' ? (
                <Check size={18} className="text-emerald-600" />
              ) : (
                <Copy size={18} />
              )}
              {copiedId === 'sejiwa' && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-neutral-900 px-2 py-0.5 text-[10px] text-white font-medium whitespace-nowrap shadow-xs">
                  Disalin!
                </span>
              )}
            </button>
          </div>
        </div>

        {/* CARD 2: Halo Kemenkes */}
        <div className="rounded-[28px] border border-[#E9ECEF] bg-white p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            {/* Badges Header */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center rounded-full bg-[#EAF5ED] px-3.5 py-1 text-xs font-medium text-[#2D6A4F]">
                Layanan Sahabat Kemenkes
              </span>
              <span className="text-xs font-medium text-[#64748B]">
                24 Jam Setiap Hari
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111827] leading-tight mb-4">
              Halo Kemenkes
            </h3>

            {/* Inner Info Box: 2 Columns */}
            <div className="rounded-2xl bg-[#F0F4FE]/80 border border-[#E0E7F8] p-4 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <p className="text-[11px] font-medium text-[#64748B] uppercase tracking-wider">
                  Telepon Langsung
                </p>
                <p className="text-lg font-bold text-[#111827] mt-0.5">
                  1500-567
                </p>
              </div>
              <div className="sm:border-l sm:border-[#D0DBF0] sm:pl-4">
                <p className="text-[11px] font-medium text-[#64748B] uppercase tracking-wider">
                  WhatsApp Resmi
                </p>
                <p className="text-lg font-bold text-[#111827] mt-0.5">
                  0812-1212-3119
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/6281212123119?text=Halo%20Kemenkes%2C%20saya%20membutuhkan%20informasi%20bantuan%20kesehatan%20jiwa."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#365A48] hover:bg-[#2B4839] text-white py-3.5 px-6 font-medium text-sm transition-all shadow-xs active:scale-[0.99]"
            >
              <MessageCircle size={17} />
              <span>Chat WhatsApp Resmi</span>
            </a>
            <a
              href="tel:1500567"
              title="Panggil 1500-567"
              className="h-12 w-12 rounded-full border border-[#CBD5E1] bg-white hover:bg-neutral-50 flex items-center justify-center text-[#475569] transition shrink-0"
            >
              <Phone size={18} />
            </a>
          </div>
        </div>

        {/* CARD 3: Yayasan Pulih */}
        <div className="rounded-[28px] border border-[#E9ECEF] bg-white p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            {/* Badges Header */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center rounded-full bg-[#F1EEFA] px-3.5 py-1 text-xs font-medium text-[#6D4DA8]">
                Konseling Teman Mahasiswa
              </span>
              <span className="text-xs font-medium text-[#64748B]">
                Luring & Daring
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111827] leading-tight mb-4">
              Yayasan Pulih (Pemulihan Trauma & Konseling)
            </h3>

            {/* Content info */}
            <div className="space-y-2 mb-6 text-sm text-[#475569]">
              <div className="flex items-center gap-2.5">
                <MessageCircle size={16} className="text-[#2563EB] shrink-0" />
                <span>WhatsApp Hotline: <strong>+62 811 8436 633</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#2563EB] shrink-0" />
                <span>Telepon: <strong>(021) 788 42580</strong> (Jam Kerja)</span>
              </div>
              <p className="text-xs text-[#64748B] pt-1">
                Layanan konseling profesional ramah mahasiswa untuk pemulihan trauma psikologis, kecemasan, kekerasan, dan kesehatan mental.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <a
            href="https://wa.me/628118436633?text=Halo%20Yayasan%20Pulih%2C%20saya%20mahasiswa%20yang%20ingin%20berkonsultasi%20mengenai%20layanan%20konseling."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#F0F4FE] hover:bg-[#E2E8F4] text-[#2563EB] py-3.5 px-6 font-medium text-sm transition-all"
          >
            <MessageCircle size={17} />
            <span>Hubungi WhatsApp Pulih</span>
          </a>
        </div>

        {/* CARD 4: Into The Light Indonesia */}
        <div className="rounded-[28px] border border-[#E9ECEF] bg-white p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            {/* Badges Header */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center rounded-full bg-[#FEF0EA] px-3.5 py-1 text-xs font-medium text-[#C25433]">
                Pencegahan Krisis & Edukasi
              </span>
              <span className="text-xs font-medium text-[#64748B]">
                Berbasis Web
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111827] leading-tight mb-4">
              Into The Light Indonesia
            </h3>

            {/* Inner Info Box */}
            <div className="rounded-2xl bg-[#F0F4FE]/80 border border-[#E0E7F8] p-4 mb-6">
              <p className="text-xs font-semibold text-[#1E3A8A] mb-1">
                Form Panduan Bantuan
              </p>
              <p className="text-xs text-[#475569] leading-relaxed">
                Direktori RSJ / RSU Daerah dengan layanan poli jiwa yang dijamin oleh BPJS Kesehatan serta panduan respon krisis bunuh diri.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <a
            href="https://www.intothelightid.org/tentang-bunuh-diri/layanan-konseling-kejiwaan/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#F0F4FE] hover:bg-[#E2E8F4] text-[#2563EB] py-3.5 px-6 font-medium text-sm transition-all"
          >
            <ExternalLink size={16} />
            <span>Buka Direktori Bantuan Mental</span>
          </a>
        </div>
      </div>
    </section>
  );
};
