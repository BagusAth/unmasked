import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pause, Play, RotateCcw, Check, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';

type BreathPhase = 'TARIK' | 'TAHAN_1' | 'HEMBUSKAN' | 'TAHAN_2';

interface PhaseConfig {
  label: string;
  guide: string;
  color: string;
}

const PHASES: Record<BreathPhase, PhaseConfig> = {
  TARIK: { label: 'TARIK', guide: 'Tarik napas perlahan lewat hidung', color: '#284B3E' },
  TAHAN_1: { label: 'TAHAN', guide: 'Tahan napas dengan rileks di dada', color: '#3A6352' },
  HEMBUSKAN: { label: 'HEMBUSKAN', guide: 'Hembuskan perlahan lewat mulut', color: '#2D5646' },
  TAHAN_2: { label: 'SEMPURNA', guide: 'Pertahankan ruang tenang sejenak', color: '#284B3E' },
};

const PHASE_SEQUENCE: BreathPhase[] = ['TARIK', 'TAHAN_1', 'HEMBUSKAN', 'TAHAN_2'];
const SECONDS_PER_PHASE = 4;

const GROUNDING_STEPS = [
  {
    count: 5,
    sense: 'Lihat',
    title: '5 Hal yang Dapat Kamu Lihat',
    desc: 'Amati sekitarmu tanpa terburu-buru. Temukan 5 objek konkret di ruanganmu (misal: bayangan di lantai, tekstur meja, cangkir, jendela, warna buku).',
    examples: ['Warna dinding', 'Tekstur meja', 'Cahaya lampu', 'Gagang pintu', 'Sudut buku'],
  },
  {
    count: 4,
    sense: 'Sentuh',
    title: '4 Hal yang Dapat Kamu Sentuh',
    desc: 'Rasakan sensasi fisik langsung pada kulitmu saat ini (misal: kain baju yang kamu kenakan, dinginnya permukaan meja, telapak kaki yang menapak di lantai).',
    examples: ['Kain pakaian', 'Permukaan meja', 'Kaki menapak lantai', 'Rambut di dahi'],
  },
  {
    count: 3,
    sense: 'Dengar',
    title: '3 Suara yang Dapat Kamu Dengar',
    desc: 'Tutup mata sejenak jika nyaman. Dengarkan suara di latar belakang (misal: desau angin, bunyi pendingin ruangan, lalu lintas di kejauhan).',
    examples: ['Desau kipas/AC', 'Lalu lintas kejauhan', 'Detak jam dinding'],
  },
  {
    count: 2,
    sense: 'Cium',
    title: '2 Aroma yang Dapat Kamu Hirup',
    desc: 'Tarik napas lembut dan kenali aroma di sekitarmu (misal: aroma kopi/teh, wangi sabun pakaian, atau udara segar di ruangan).',
    examples: ['Aroma udara ruangan', 'Wangi kain baju'],
  },
  {
    count: 1,
    sense: 'Syukuri',
    title: '1 Hal yang Kamu Rasakan & Syukuri',
    desc: 'Rasakan detak jantungmu atau satu hal kecil yang membuatmu bersyukur bisa bertahan dan berada di tempat yang aman hari ini.',
    examples: ['Napas yang masih mengalir tenang'],
  },
];

export const StandaloneGroundingTool: React.FC = () => {
  // Breathing state
  const [phaseIndex, setPhaseIndex] = useState<number>(0);
  const [secondsLeft, setSecondsLeft] = useState<number>(SECONDS_PER_PHASE);
  const [isBreathingActive, setIsBreathingActive] = useState<boolean>(true);

  // Sensory Grounding state
  const [groundingStep, setGroundingStep] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (!isBreathingActive) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setPhaseIndex((curr) => (curr + 1) % PHASE_SEQUENCE.length);
          return SECONDS_PER_PHASE;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isBreathingActive]);

  const currentPhaseKey = PHASE_SEQUENCE[phaseIndex];
  const currentPhase = PHASES[currentPhaseKey];

  const handleResetBreath = () => {
    setPhaseIndex(0);
    setSecondsLeft(SECONDS_PER_PHASE);
    setIsBreathingActive(true);
  };

  const toggleGroundingStep = (idx: number) => {
    if (completedSteps.includes(idx)) {
      setCompletedSteps(completedSteps.filter((s) => s !== idx));
    } else {
      setCompletedSteps([...completedSteps, idx]);
    }
  };

  const currentGrounding = GROUNDING_STEPS[groundingStep];

  return (
    <section id="grounding-tool" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="rounded-[32px] border border-[#E9ECEF] bg-white p-6 sm:p-10 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Box Breathing (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center border-b lg:border-b-0 lg:border-r border-[#E9ECEF] pb-8 lg:pb-0 lg:pr-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#284B3E] mb-1">
              Box Breath Timer 4 - 4 - 4 - 4
            </span>
            <p className="text-xs text-[#64748B] mb-8">
              Atur ritme pernapasan untuk menurunkan detak jantung dan hormon stres
            </p>

            {/* Concentric Breathing Circles */}
            <div className="relative flex h-60 w-60 sm:h-64 sm:w-64 items-center justify-center my-2">
              {/* Outer soft circle ring */}
              <motion.div
                animate={{
                  scale: currentPhaseKey === 'TARIK' || currentPhaseKey === 'TAHAN_1' ? 1.08 : 0.94,
                  opacity: [0.35, 0.55, 0.35],
                }}
                transition={{ duration: SECONDS_PER_PHASE, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-[#EAF2ED]"
              />

              {/* Middle mint ring */}
              <motion.div
                animate={{
                  scale: currentPhaseKey === 'TARIK' || currentPhaseKey === 'TAHAN_1' ? 1.05 : 0.92,
                }}
                transition={{ duration: SECONDS_PER_PHASE, ease: 'easeInOut' }}
                className="absolute inset-5 rounded-full bg-[#D4E6DC]/80"
              />

              {/* Inner Dark Forest Green Circle */}
              <motion.div
                animate={{
                  scale: currentPhaseKey === 'TARIK' || currentPhaseKey === 'TAHAN_1' ? 1.02 : 0.95,
                }}
                transition={{ duration: SECONDS_PER_PHASE, ease: 'easeInOut' }}
                className="relative z-10 flex h-36 w-36 sm:h-40 sm:w-40 flex-col items-center justify-center rounded-full bg-[#284B3E] text-white shadow-lg"
              >
                <span className="text-4xl sm:text-5xl font-bold font-sans tracking-tight">
                  {secondsLeft}
                </span>
                <span className="mt-1 text-[11px] font-semibold tracking-wider text-emerald-100 uppercase">
                  {currentPhase.label}
                </span>
              </motion.div>
            </div>

            {/* Phase instruction */}
            <p className="mt-4 text-xs font-medium text-[#284B3E] h-5">
              {currentPhase.guide}
            </p>

            {/* Controls */}
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => setIsBreathingActive(!isBreathingActive)}
                className="inline-flex items-center gap-2 rounded-full bg-[#284B3E] hover:bg-[#1E3A30] text-white px-5 py-2.5 text-xs font-semibold shadow-xs transition cursor-pointer"
              >
                {isBreathingActive ? <Pause size={14} /> : <Play size={14} />}
                <span>{isBreathingActive ? 'Jeda Latihan' : 'Lanjutkan'}</span>
              </button>
              <button
                onClick={handleResetBreath}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#64748B] hover:text-[#111827] px-3 py-2 transition cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>Mulai Ulang</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: 5-4-3-2-1 Sensory Grounding Tool (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full">
            <div>
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF2F9] px-3 py-1 text-xs font-medium text-[#2563EB]">
                    <Sparkles size={12} />
                    <span>Teknik Grounding 5-4-3-2-1</span>
                  </span>
                  <h3 className="text-lg sm:text-xl font-semibold tracking-[-0.03em] text-[#111827] mt-2">
                    Jangkar Panca Indera Saat Pikiran Terasa Kewalahan
                  </h3>
                </div>

                {/* Step indicator */}
                <span className="text-xs font-medium text-[#64748B] bg-neutral-100 px-2.5 py-1 rounded-full">
                  Langkah {groundingStep + 1} dari 5
                </span>
              </div>

              {/* Progress Steps Tabs */}
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-6">
                {GROUNDING_STEPS.map((step, idx) => {
                  const isCurrent = idx === groundingStep;
                  const isDone = completedSteps.includes(idx);
                  return (
                    <button
                      key={step.count}
                      onClick={() => setGroundingStep(idx)}
                      className={`rounded-xl py-2 px-1 text-center transition cursor-pointer border ${
                        isCurrent
                          ? 'border-[#284B3E] bg-[#284B3E] text-white font-bold'
                          : isDone
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                          : 'border-[#E9ECEF] bg-neutral-50 text-[#64748B] hover:bg-neutral-100'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-bold leading-none">
                        {step.count}
                      </div>
                      <div className="text-[10px] sm:text-[11px] truncate mt-0.5 opacity-90">
                        {step.sense}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Step Content Box */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={groundingStep}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-[#E9ECEF] bg-[#FAF9F6] p-5 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h4 className="text-base sm:text-lg font-bold text-[#111827]">
                      {currentGrounding.title}
                    </h4>
                    <button
                      onClick={() => toggleGroundingStep(groundingStep)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition cursor-pointer ${
                        completedSteps.includes(groundingStep)
                          ? 'bg-emerald-600 text-white'
                          : 'border border-[#CBD5E1] bg-white text-[#475569] hover:bg-neutral-50'
                      }`}
                    >
                      <Check size={13} />
                      <span>
                        {completedSteps.includes(groundingStep) ? 'Selesai' : 'Tandai Selesai'}
                      </span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-[#525F7F] leading-relaxed mb-4">
                    {currentGrounding.desc}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-medium text-[#64748B] mr-1">
                      Contoh pemicu:
                    </span>
                    {currentGrounding.examples.map((ex, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-white border border-[#E2E8F0] px-2 py-0.5 text-[11px] text-[#475569]"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Stepper Nav */}
            <div className="mt-6 pt-4 border-t border-[#F1F3F5] flex items-center justify-between">
              <button
                onClick={() => setGroundingStep((prev) => Math.max(0, prev - 1))}
                disabled={groundingStep === 0}
                className="inline-flex items-center gap-1 text-xs font-medium text-[#64748B] hover:text-[#111827] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
              >
                <ChevronLeft size={16} />
                <span>Sebelumnya</span>
              </button>

              <span className="text-xs text-[#64748B]">
                {completedSteps.length === 5
                  ? '🎉 Seluruh langkah selesai. Napasmu kini lebih tenang.'
                  : `${completedSteps.length} dari 5 kejauhan tenang`}
              </span>

              <button
                onClick={() => setGroundingStep((prev) => Math.min(GROUNDING_STEPS.length - 1, prev + 1))}
                disabled={groundingStep === GROUNDING_STEPS.length - 1}
                className="inline-flex items-center gap-1 text-xs font-medium text-[#284B3E] hover:text-[#1E3A30] font-semibold disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
              >
                <span>Langkah Berikutnya</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
