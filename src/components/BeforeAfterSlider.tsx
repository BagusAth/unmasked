import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Smile,
  ShieldCheck,
  BatteryMedium,
  Coffee,
  MicOff,
  Moon,
  Brain,
  Sparkles,
  Flame,
  MoveHorizontal
} from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  // Slider percentage from 0 to 100 (default at 60% showing mostly the left mask)
  const [sliderPosition, setSliderPosition] = useState<number>(68);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleInteractionEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleInteractionEnd);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleInteractionEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleInteractionEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleInteractionEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleInteractionEnd]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 mt-14">
      {/* Header prompt above card */}
      <div className="text-center mb-5">
        <p className="text-sm sm:text-base font-medium text-[#4B5565] flex items-center justify-center gap-2">
          <span>Geser untuk melihat sisi yang jarang ditunjukkan</span>
        </p>
      </div>

      {/* Main Container Card */}
      <div
        ref={containerRef}
        className="relative w-full h-[520px] sm:h-[460px] md:h-[420px] rounded-[28px] overflow-hidden border border-[#E2E8F0] shadow-sm select-none bg-[#0F172A]"
      >
        {/* RIGHT SIDE (REALITA BATIN / YANG DIRASAKAN - DARK THEME) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#111927] via-[#0F172A] to-[#0A0F1D] text-white p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Top Row */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/60 px-3 py-1 text-[11px] font-semibold tracking-wider text-indigo-300 uppercase">
                Realita Batin (Yang Dirasakan)
              </span>
              <div className="flex items-center gap-2 text-amber-200/90">
                <Moon size={20} className="fill-amber-300/20 text-amber-300" />
              </div>
            </div>

            <h3 className="mt-3 text-xl sm:text-2xl font-bold tracking-tight text-white">
              Kelelahan Ekstrem & Tertekan
            </h3>

            {/* 4 Cards Grid - Inner Reality */}
            <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-3xl">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 sm:p-4 backdrop-blur-md">
                <div className="flex items-center gap-2 text-amber-300">
                  <BatteryMedium size={16} />
                  <h4 className="text-xs sm:text-sm font-semibold text-white">
                    Energi Terkuras
                  </h4>
                </div>
                <p className="mt-1.5 text-[11px] sm:text-xs leading-relaxed text-slate-300">
                  Lelah luar biasa hanya ingin semuanya selesai, tanpa peduli hasilnya.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 sm:p-4 backdrop-blur-md">
                <div className="flex items-center gap-2 text-emerald-300">
                  <Sparkles size={16} />
                  <h4 className="text-xs sm:text-sm font-semibold text-white">
                    Beban Ekspektasi
                  </h4>
                </div>
                <p className="mt-1.5 text-[11px] sm:text-xs leading-relaxed text-slate-300">
                  Sudah berusaha maksimal, tetapi hasilnya belum sesuai harapan.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 sm:p-4 backdrop-blur-md">
                <div className="flex items-center gap-2 text-amber-300">
                  <Brain size={16} />
                  <h4 className="text-xs sm:text-sm font-semibold text-white">
                    Kelelahan Mental
                  </h4>
                </div>
                <p className="mt-1.5 text-[11px] sm:text-xs leading-relaxed text-slate-300">
                  Takut mengecewakan siapapun hingga terbiasa mengabaikan kesehatan mental.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 sm:p-4 backdrop-blur-md">
                <div className="flex items-center gap-2 text-emerald-300">
                  <Flame size={16} />
                  <h4 className="text-xs sm:text-sm font-semibold text-white">
                    Tertekan
                  </h4>
                </div>
                <p className="mt-1.5 text-[11px] sm:text-xs leading-relaxed text-slate-300">
                  Terus dikejar tugas yang seolah tidak pernah selesai.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LEFT SIDE (TOPENG SOSIAL / YANG DITAMPILKAN - LIGHT THEME) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden bg-gradient-to-br from-[#EEF4FB] via-[#F4F7FC] to-[#E9F0FA] text-[#172033]"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="w-[1000px] max-w-[1000px] h-full p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#DDF3E8] px-3 py-1 text-[11px] font-bold tracking-wider text-[#1E5F42] uppercase">
                Topeng Sosial (Yang Ditampilkan)
              </div>

              <h3 className="mt-3 text-xl sm:text-2xl font-bold tracking-tight text-[#111827]">
                Terlihat baik-baik saja
              </h3>

              {/* 4 Cards Grid - Social Mask */}
              <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-3xl">
                <div className="rounded-2xl border border-white/80 bg-white/75 p-3.5 sm:p-4 shadow-2xs backdrop-blur-xs">
                  <div className="flex items-center gap-2 text-sky-600">
                    <Sparkles size={16} />
                    <h4 className="text-xs sm:text-sm font-semibold text-[#1E293B]">
                      Tetap Tersenyum
                    </h4>
                  </div>
                  <p className="mt-1.5 text-[11px] sm:text-xs leading-relaxed text-[#5A6578]">
                    Berusaha terlihat santai dan baik-baik saja, meski sebenarnya tidak.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/80 bg-white/75 p-3.5 sm:p-4 shadow-2xs backdrop-blur-xs">
                  <div className="flex items-center gap-2 text-rose-500">
                    <Flame size={16} />
                    <h4 className="text-xs sm:text-sm font-semibold text-[#1E293B]">
                      Selalu Bisa Diandalkan
                    </h4>
                  </div>
                  <p className="mt-1.5 text-[11px] sm:text-xs leading-relaxed text-[#5A6578]">
                    Tetap bilang “bisa” meski sebenarnya tenaga sendiri sudah hampir habis.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/80 bg-white/75 p-3.5 sm:p-4 shadow-2xs backdrop-blur-xs">
                  <div className="flex items-center gap-2 text-sky-600">
                    <Coffee size={16} />
                    <h4 className="text-xs sm:text-sm font-semibold text-[#1E293B]">
                      Bersikap Biasa
                    </h4>
                  </div>
                  <p className="mt-1.5 text-[11px] sm:text-xs leading-relaxed text-[#5A6578]">
                    Terlihat tenang, seolah tidak ada yang mengganggu pikiran.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/80 bg-white/75 p-3.5 sm:p-4 shadow-2xs backdrop-blur-xs">
                  <div className="flex items-center gap-2 text-rose-600">
                    <MicOff size={16} />
                    <h4 className="text-xs sm:text-sm font-semibold text-[#1E293B]">
                      Tidak Bercerita
                    </h4>
                  </div>
                  <p className="mt-1.5 text-[11px] sm:text-xs leading-relaxed text-[#5A6578]">
                    Tidak membahas masalah pribadi karena takut merepotkan orang lain.
                  </p>
                </div>
              </div>
            </div>

            {/* Hint pill at bottom */}
            <div className="mt-4 flex items-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 border border-[#CBD5E1]/60 px-3 py-1 text-[11px] font-medium text-[#475569] shadow-2xs">
                ← Geser pembatas untuk melihat kedua sisi →
              </span>
            </div>
          </div>
        </div>

        {/* DIVIDER HANDLE */}
        <div
          className="absolute inset-y-0 z-20 flex items-center justify-center cursor-ew-resize group"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          {/* Vertical line */}
          <div className="w-0.5 h-full bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)] transition-all group-hover:w-1 group-hover:bg-white" />

          {/* Central circular drag button */}
          <div className="absolute flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#172033] shadow-lg border border-[#CBD5E1] transition-transform group-hover:scale-110 active:scale-95">
            <MoveHorizontal size={16} className="text-[#334155]" />
          </div>
        </div>
      </div>
    </div>
  );
};
