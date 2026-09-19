import React from 'react';
import { AlertTriangle, HeartPulse, CheckCircle2 } from 'lucide-react';

export const MedicalDisclaimerBanner: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="rounded-[32px] border border-[#E9E4EB] bg-gradient-to-r from-[#F2F4FB] via-[#F9F7FA] to-[#FFF4EE] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-start gap-6">
          
          {/* Icon */}
          <div className="h-14 w-14 rounded-2xl bg-[#FEECE8] flex items-center justify-center text-[#C86D51] shrink-0 shadow-2xs">
            <HeartPulse size={28} />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FAF0ED] px-3 py-1 text-xs font-semibold text-[#B84E34] mb-3">
              <AlertTriangle size={13} />
              <span>Standar Etika & Batasan Platform Digital</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111827] leading-snug">
              Batas Kemampuan Platform & Panduan Konsultasi Profesional
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-[#4B5563] leading-relaxed">
              <strong>UNMASKED adalah media refleksi mandiri terpandu</strong> untuk membantu mahasiswa mengenali emosi dan mengurai beban pikiran. Platform ini <strong>bukan pengganti diagnosis psikiatri klinis, evaluasi medis formal, maupun psikoterapi mendalam</strong>.
            </p>

            {/* Warning Signs Box */}
            <div className="mt-5 rounded-2xl bg-white/80 border border-[#E5E7EB] p-4 sm:p-5">
              <h4 className="text-xs sm:text-sm font-bold text-[#111827] mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                <span>Kapan Kamu Harus Segera Berkonsultasi ke Psikiater / Psikolog Klinis?</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#4B5563] mt-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-[#C86D51] shrink-0 mt-0.5" />
                  <span>Muncul dorongan, rencana, atau pikiran untuk melukai diri sendiri / mengakhiri hidup.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-[#C86D51] shrink-0 mt-0.5" />
                  <span>Kecemasan ekstrem, serangan panik berulang, atau rasa putus asa lebih dari 14 hari berturut-turut.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-[#C86D51] shrink-0 mt-0.5" />
                  <span>Gangguan tidur atau nafsu makan parah yang membuatmu tidak sanggup beraktivitas kuliah.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-[#C86D51] shrink-0 mt-0.5" />
                  <span>Mengalami kebingungan hebat, halusinasi suara/bayangan, atau lepas dari realitas.</span>
                </div>
              </div>
            </div>

            {/* Practical BPJS note */}
            <p className="mt-4 text-xs text-[#6B7280] leading-relaxed">
              💡 <em>Catatan Akses Medis Terjangkau:</em> Layanan konsultasi psikiater di RSU Daerah dan RSJ dijamin penuh oleh <strong>BPJS Kesehatan</strong> dengan meminta surat rujukan awal dari Faskes Tingkat 1 (Puskesmas atau Klinik Kampusmu).
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
