import React from 'react';
import { motion } from 'motion/react';
import { PhoneCall, Wind, ArrowLeft, ArrowRight } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { HotlineSection } from '../components/support/HotlineCard';
import { StandaloneGroundingTool } from '../components/support/StandaloneGroundingTool';
import { CampusCounselingGuide } from '../components/support/CampusCounselingGuide';
import { MedicalDisclaimerBanner } from '../components/support/MedicalDisclaimerBanner';

const Support: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FDFCF9] text-[#111827] flex flex-col font-sans selection:bg-[#284B3E]/15 selection:text-[#172033]">
      {/* 1. TOP NAVBAR */}
      <Navbar activePage="support" />

      <main className="flex-1 pb-16">
        {/* 2. HERO SECTION */}
        <section className="relative px-4 sm:px-6 pt-12 pb-8 sm:pt-16 sm:pb-12 text-center overflow-hidden">
          {/* Ambient Warm Gradient Mesh */}
          <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[380px] w-[640px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#FDECE7]/60 via-[#F5F2EA]/40 to-transparent blur-3xl" />

          <div className="mx-auto max-w-4xl">
            {/* Top Indicator Dot Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center justify-center p-1 px-3 rounded-full bg-[#FCEBE6] border border-[#F8D5CB] mb-6"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-[#C86D51]" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-semibold tracking-[-0.03em] text-[#111827] leading-[1.2]"
            >
              Kamu Tidak Harus Menghadapi<br />
              Semuanya Sendirian.
            </motion.h1>

            {/* Sub-toggle Filter Pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-3"
            >
              <a
                href="#hotlines"
                className="inline-flex items-center gap-2 rounded-full bg-[#8B3A2B] hover:bg-[#742E21] text-white px-6 py-2.5 text-xs font-semibold shadow-xs transition active:scale-[0.98]"
              >
                <PhoneCall size={14} />
                <span>Bantuan Kontak Darurat</span>
              </a>
              <a
                href="#grounding-tool"
                className="inline-flex items-center gap-2 rounded-full border border-[#D8DBE2] bg-white hover:bg-[#FAF9F5] px-6 py-2.5 text-xs font-medium text-[#475569] shadow-2xs transition"
              >
                <Wind size={14} className="text-[#64748B]" />
                <span>Latihan Grounding & Relaksasi</span>
              </a>
            </motion.div>
          </div>
        </section>

        {/* 3. 4 CRISIS HOTLINES GRID */}
        <HotlineSection />

        {/* 4. STANDALONE GROUNDING TOOL (Box Breathing + 5-4-3-2-1) */}
        <StandaloneGroundingTool />

        {/* 5. PANDUAN KONSELING KAMPUS (4 Practical Steps) */}
        <CampusCounselingGuide />

        {/* 6. SELF-ASSESSMENT DISCLAIMER & MEDICAL BOUNDARY */}
        <MedicalDisclaimerBanner />

        {/* 7. BOTTOM NAVIGATION LINKS */}
        <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E9ECEF] pt-6 text-xs text-[#64748B]">
            <a
              href="/#alur"
              className="inline-flex items-center gap-1.5 hover:text-[#111827] font-medium transition"
            >
              <ArrowLeft size={14} />
              <span>Kembali ke Alur Refleksi</span>
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-1.5 hover:text-[#111827] font-medium transition"
            >
              <span>Kembali ke Beranda</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </section>
      </main>

      {/* 8. PRE-FOOTER STRIP */}
      <a
        href="#hotlines"
        className="block w-full bg-[#FFF0EB] hover:bg-[#FFE5DC] border-t border-[#FDDCD0] py-3.5 text-center text-xs font-semibold text-[#9A3412] transition"
      >
        <span>Sedang butuh pertolongan sekarang? Hubungi Layanan Sekarang →</span>
      </a>

      {/* 9. DEDICATED SAFE HARBOR FOOTER */}
      <footer className="w-full border-t border-[#ECEBE6] bg-[#FAF9F5] py-8 text-xs text-[#6B7280]">
        <div className="mx-auto flex max-w-6xl flex-col md:flex-row items-center justify-between gap-6 px-4 sm:px-6 text-center md:text-left">
          {/* Brand Info & Mission */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <span className="font-bold tracking-tight text-[#111827] text-sm">
                UNMASKED
              </span>
              <span className="rounded-full bg-[#EAF2ED] px-2.5 py-0.5 text-[10px] font-semibold text-[#284B3E]">
                Pusat Kesejahteraan Mahasiswa
              </span>
            </div>
            <p className="max-w-lg leading-relaxed text-[#525F7F]">
              Media refleksi mandiri untuk kesehatan mental mahasiswa. Bukan pengganti layanan medis klinis profesional.
            </p>
          </div>

          {/* Links & Copyright */}
          <div className="flex flex-col items-center md:items-end gap-2 text-[#64748B]">
            <div className="flex items-center gap-4 text-xs">
              <a href="/#privasi" className="hover:text-[#111827] transition">
                Pengumuman Privasi Lokal
              </a>
              <span>•</span>
              <a href="#hotlines" className="hover:text-[#111827] transition">
                Kontak Darurat
              </a>
            </div>
            <p className="text-[11px] text-[#94A3B8]">
              © 2026 UNMASKED. Autentisitas radikal & ruang aman yang tenang.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Support;
