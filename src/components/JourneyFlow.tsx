import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Smile,
  Archive,
  Flower2,
  Sprout,
  Check,
  ArrowRight
} from 'lucide-react';

interface StepData {
  number: string;
  stepLabel: string;
  title: string;
  description: string;
  footerTag: string;
  iconBg: string;
  iconColor: string;
  badgeColor: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  detailPrompt: string;
}

const STEPS: StepData[] = [
  {
    number: '01',
    stepLabel: 'LANGKAH 01',
    title: 'Kenali Diri',
    description: 'Menyadari apa yang kamu tampilkan dan apa yang kamu rasakan.',
    footerTag: 'Sadari',
    iconBg: 'bg-[#FEF3C7]',
    iconColor: 'text-amber-600',
    badgeColor: 'text-[#3B66D1]',
    icon: Smile,
    detailPrompt: 'Apa topeng perlindungan yang paling sering kamu kenakan di hadapan orang lain?',
  },
  {
    number: '02',
    stepLabel: 'LANGKAH 02',
    title: 'Pilah Beban',
    description: 'Pilah mana yang bisa dikendalikan, ditunda, atau dilepaskan.',
    footerTag: 'Pilah',
    iconBg: 'bg-[#E0F2FE]',
    iconColor: 'text-sky-600',
    badgeColor: 'text-[#3B66D1]',
    icon: Archive,
    detailPrompt: 'Beban emosional apa yang terasa paling menguras energimu akhir-akhir ini?',
  },
  {
    number: '03',
    stepLabel: 'LANGKAH 03',
    title: 'Pahami Kebutuhan',
    description: 'Pahami apa yang tubuh dan pikiranmu perlukan saat ini.',
    footerTag: 'Validasi',
    iconBg: 'bg-[#DCFCE7]',
    iconColor: 'text-emerald-600',
    badgeColor: 'text-[#D97706]',
    icon: Flower2,
    detailPrompt: 'Jika tubuh dan batinmu bisa bersuara pelan, apa pertolongan pertama yang diinginkannya?',
  },
  {
    number: '04',
    stepLabel: 'LANGKAH 04',
    title: 'Lakukan Aksi',
    description: 'Satu langkah kecil yang realistis dalam waktu kurang dari 3 menit.',
    footerTag: 'Pulihkan',
    iconBg: 'bg-[#F0FDF4]',
    iconColor: 'text-green-700',
    badgeColor: 'text-[#16A34A]',
    icon: Sprout,
    detailPrompt: 'Tentukan 1 tindakan kecil yang paling mudah dilakukan hari ini untuk memulihkan diri.',
  },
];

export const JourneyFlow: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  return (
    <section id="alur" className="w-full max-w-5xl mx-auto px-4 sm:px-6 mt-20">
      {/* Pill Section Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EFF4FE] px-3.5 py-1 text-[11px] font-bold text-[#3B66D1] tracking-wide uppercase">
          <Sparkles size={12} className="text-[#3B66D1]" />
          <span>ALUR</span>
        </div>

        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-[#111827]">
          4 Langkah Ringan dan Menenangkan
        </h2>
        <p className="mt-1 text-sm sm:text-base text-[#64748B]">
          Selesai dalam 5 menit
        </p>
      </div>

      {/* 4 Cards Horizontal Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isSelected = selectedStep === idx;

          return (
            <motion.div
              key={step.number}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedStep(isSelected ? null : idx)}
              className={`relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-200 cursor-pointer bg-white ${isSelected
                ? 'border-[#284B3E] ring-2 ring-[#284B3E]/10 shadow-md'
                : 'border-[#ECECE8] hover:border-[#CBD5E1] shadow-2xs hover:shadow-sm'
                }`}
            >
              <div>
                {/* Top Row: Icon on left, Big Watermark Number on right */}
                <div className="flex items-start justify-between">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${step.iconBg} ${step.iconColor}`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#E5ECF8] select-none tracking-tight">
                    {step.number}
                  </span>
                </div>

                {/* Subtitle / Step label */}
                <span className={`block mt-4 text-[11px] font-bold tracking-wider uppercase ${step.badgeColor}`}>
                  {step.stepLabel}
                </span>

                {/* Title */}
                <h3 className="mt-1 text-lg font-bold tracking-tight text-[#111827]">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs leading-relaxed text-[#5A6578]">
                  {step.description}
                </p>
              </div>

              {/* Bottom Tag / Chip */}
              <div className="mt-6 pt-4 border-t border-[#F1F3F7] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#526077]">
                  <Check size={14} className="text-emerald-600 stroke-[2.5]" />
                  <span>{step.footerTag}</span>
                </div>
                {isSelected && (
                  <span className="text-[10px] text-[#284B3E] font-medium">Aktif</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Expandable Step Prompt Details */}
      {selectedStep !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="mt-6 rounded-2xl border border-[#DCE4F2] bg-[#F7F9FD] p-5 sm:p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800 uppercase">
                  Langkah {STEPS[selectedStep].number}
                </span>
                <span className="text-xs font-medium text-[#64748B]">
                  Fokus Refleksi Terarah
                </span>
              </div>
              <h4 className="mt-2 text-lg font-semibold text-[#111827]">
                "{STEPS[selectedStep].detailPrompt}"
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedStep(null)}
                className="text-xs text-[#64748B] hover:text-[#111827] px-3 py-1.5 rounded-lg border border-neutral-300 bg-white"
              >
                Tutup
              </button>
              <button
                onClick={() => setSelectedStep((prev) => ((prev ?? 0) + 1) % STEPS.length)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#284B3E] hover:bg-[#1E3A30] px-4 py-1.5 rounded-lg transition"
              >
                <span>Langkah Selanjutnya</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};
