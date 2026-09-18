import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react';

type BreathPhase = 'TARIK' | 'TAHAN_1' | 'HEMBUSKAN' | 'TAHAN_2';

interface PhaseConfig {
  label: string;
  name: string;
  color: string;
}

const PHASES: Record<BreathPhase, PhaseConfig> = {
  TARIK: { label: 'TARIK', name: 'Tarik Napas', color: 'text-emerald-200' },
  TAHAN_1: { label: 'TAHAN', name: 'Tahan Napas', color: 'text-amber-200' },
  HEMBUSKAN: { label: 'HEMBUSKAN', name: 'Hembuskan', color: 'text-sky-200' },
  TAHAN_2: { label: 'TAHAN', name: 'Tahan Kosong', color: 'text-teal-200' },
};

const PHASE_SEQUENCE: BreathPhase[] = ['TARIK', 'TAHAN_1', 'HEMBUSKAN', 'TAHAN_2'];
const SECONDS_PER_PHASE = 4;

export const BreathingWidget: React.FC = () => {
  const [timerState, setTimerState] = useState({ phaseIndex: 1, secondsLeft: 3 }); // starts at TAHAN 3d like in screenshot
  const { phaseIndex, secondsLeft } = timerState;
  const [isActive, setIsActive] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimerState((prev) => {
        if (prev.secondsLeft <= 1) {
          return {
            phaseIndex: (prev.phaseIndex + 1) % PHASE_SEQUENCE.length,
            secondsLeft: SECONDS_PER_PHASE,
          };
        }
        return {
          ...prev,
          secondsLeft: prev.secondsLeft - 1,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive]);

  const currentPhaseKey = PHASE_SEQUENCE[phaseIndex];
  const currentPhase = PHASES[currentPhaseKey];

  // Circle scale animation logic:
  // TARIK: expanding to 1.15
  // TAHAN_1: stays at 1.15
  // HEMBUSKAN: contracting to 0.88
  // TAHAN_2: stays at 0.88
  const getScale = () => {
    switch (currentPhaseKey) {
      case 'TARIK':
        return 1.12;
      case 'TAHAN_1':
        return 1.12;
      case 'HEMBUSKAN':
        return 0.88;
      case 'TAHAN_2':
        return 0.88;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 mt-16">
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#2E4E44] via-[#28453C] to-[#223B33] text-white p-8 sm:p-12 shadow-lg border border-[#3A6155]/40">
        {/* Ambient subtle glow behind breathing circle */}
        <div className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Column: Explanatory info */}
          <div className="flex-1 max-w-xl text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-emerald-100 backdrop-blur-md border border-white/10">
              <span>Jeda Sejenak</span>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                title={soundEnabled ? "Nonaktifkan suara" : "Aktifkan panduan"}
                className="hover:text-white transition opacity-80 hover:opacity-100 cursor-pointer"
              >
                {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
              </button>
            </div>

            {/* Title */}
            <h2 className="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Latihan Menenangkan Diri: Box Breathing
            </h2>

            {/* Subtitle */}
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-emerald-100/80">
              Atur ritme napasmu sejenak untuk memulihkan rasa tenang.
            </p>

            {/* Control buttons */}
            <div className="mt-[70px] flex items-center gap-3">
              <button
                onClick={() => setIsActive(!isActive)}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-white/25 transition border border-white/15 cursor-pointer"
              >
                {isActive ? <Pause size={13} /> : <Play size={13} />}
                <span>{isActive ? 'Jeda' : 'Lanjutkan'}</span>
              </button>
              <button
                onClick={() => {
                  setTimerState({ phaseIndex: 0, secondsLeft: SECONDS_PER_PHASE });
                }}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-emerald-100/70 hover:text-white hover:bg-white/20 transition cursor-pointer"
              >
                <RotateCcw size={12} />
                <span>Ulangi</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Box Breathing Circle */}
          <div className="flex flex-col items-center justify-center shrink-0">
            <div className="relative flex h-48 w-48 sm:h-52 sm:w-52 items-center justify-center">
              {/* Outer pulsing ring */}
              <motion.div
                animate={{
                  scale: getScale(),
                  opacity: [0.6, 0.9, 0.6],
                }}
                transition={{
                  duration: SECONDS_PER_PHASE,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 rounded-full border-2 border-white/30 bg-white/[0.03]"
              />

              {/* Middle dashed/gradient ring */}
              <motion.div
                animate={{ scale: getScale() * 0.96 }}
                transition={{ duration: SECONDS_PER_PHASE, ease: 'easeInOut' }}
                className="absolute inset-2 rounded-full border border-emerald-300/30"
              />

              {/* Inner Circle with label and countdown */}
              <div className="relative z-10 flex flex-col items-center justify-center rounded-full bg-white h-24 w-24 sm:h-28 sm:w-28 shadow-xl text-[#1E3A32]">
                <span className="text-[10px] sm:text-xs font-bold tracking-wider text-[#28453C] uppercase">
                  {currentPhase.label}
                </span>
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172033] mt-0.5">
                  {secondsLeft}d
                </span>
              </div>
            </div>

            {/* Rhythm guideline footer text */}
            <p className="mt-4 text-xs font-normal tracking-wide text-emerald-100/70 text-center">
              Tarik (4d) • Tahan (4d) • Hembuskan (4d) • Tahan (4d)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
