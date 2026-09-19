import React from 'react';
import { School, ClipboardList, Send, ShieldCheck } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: School,
    title: 'Kenali Unit BKM Kampus',
    desc: 'Cari tahu Unit Bimbingan Konseling Mahasiswa (BKM/PKM) di universitas atau fakultasmu. Layanan ini resmi dan umumnya gratis untuk seluruh mahasiswa aktif.',
    tag: 'Fasilitas Kampus',
  },
  {
    number: '02',
    icon: ClipboardList,
    title: 'Siapkan Data & Rangkuman',
    desc: 'Siapkan KTM/NIM, jadwal kuliah luang, dan poin yang kamu rasakan. Kamu juga dapat memperlihatkan rangkuman refleksi UNMASKED jika sulit mengucapkannya secara lisan.',
    tag: 'Persiapan Praktis',
  },
  {
    number: '03',
    icon: Send,
    title: 'Hubungi via Saluran Resmi',
    desc: 'Kirim pesan via nomor WhatsApp resmi BKM, formulir portal akademik kemahasiswaan, atau datang langsung ke ruang konseling kampus saat jam kerja.',
    tag: 'Pendaftaran Mudah',
  },
  {
    number: '04',
    icon: ShieldCheck,
    title: 'Jaminan Kerahasiaan Penuh',
    desc: 'Seluruh isi sesi terikat kode etik kerahasiaan psikologi. Konselor tidak berhak membagikan ceritamu ke dosen, teman kuliah, atau orang tua tanpa izinmu.',
    tag: '100% Konfidensial',
  },
];

export const CampusCounselingGuide: React.FC = () => {
  return (
    <section id="campus-guide" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <div className="mb-6 text-center sm:text-left">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#284B3E]">
          Akses Layanan Akademik
        </span>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111827] mt-1">
          Panduan Praktis Menghubungi Konseling Kampus (BKM)
        </h3>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-2xl">
          Sebagai mahasiswa, kamu berhak mendapatkan dukungan psikologis profesional di lingkungan perguruan tinggimu sendiri tanpa rasa takut atau dihakimi.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {STEPS.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className="rounded-3xl border border-[#E9ECEF] bg-white p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header with step number & tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-[#64748B] tracking-wider">
                    LANGKAH {step.number}
                  </span>
                  <span className="rounded-full bg-[#FAF9F5] border border-[#E9E8E3] px-2.5 py-0.5 text-[10px] font-medium text-[#525F7F]">
                    {step.tag}
                  </span>
                </div>

                {/* Icon in soft circle */}
                <div className="h-11 w-11 rounded-2xl bg-[#284B3E]/10 flex items-center justify-center text-[#284B3E] mb-4">
                  <Icon size={20} />
                </div>

                {/* Title */}
                <h4 className="text-base font-bold text-[#111827] leading-snug mb-2">
                  {step.title}
                </h4>

                {/* Description */}
                <p className="text-xs text-[#525F7F] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
