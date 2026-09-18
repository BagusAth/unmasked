import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  ChevronDown,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { JourneyFlow } from '../components/JourneyFlow';
import { BreathingWidget } from '../components/BreathingWidget';
import { Footer } from '../components/Footer';
import { useSession } from '../hooks/useSession';
import { useLanguage } from '../context/LanguageContext';

const Landing: React.FC = () => {
  const { isLoading, error, startSession, clearError } = useSession();
  const { t } = useLanguage();

  const handleStart = async (fallbackToLocal = false) => {
    await startSession({ fallbackToLocal });
  };

  return (
    <div className="min-h-screen bg-[#FDFCF9] text-[#111827] flex flex-col font-sans selection:bg-[#284B3E]/15 selection:text-[#172033]">
      {/* 1. TOP NAVIGATION */}
      <Navbar />

      <main className="flex-1 pb-12">
        {/* 2. HERO SECTION */}
        <section className="relative px-4 sm:px-6 pt-20 pb-10 sm:pt-28 sm:pb-12 text-center overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[420px] w-[650px] -translate-x-1/2 rounded-full bg-gradient-to-b from-emerald-50/40 via-blue-50/25 to-transparent blur-3xl" />

          <div className="mx-auto max-w-4xl">
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-[#111827] leading-[1.15]"
              style={{ whiteSpace: 'pre-line' }}
            >
              {t('landing.hero_title')}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-[#525F7F] font-normal leading-relaxed"
            >
              {t('landing.hero_subtitle')}
            </motion.p>

            {/* Error Banner & Fallback Option if connection fails */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto mt-6 max-w-lg rounded-2xl border border-rose-200 bg-rose-50/90 p-4 text-left text-xs shadow-xs"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle size={18} className="mt-0.5 shrink-0 text-rose-600" />
                  <div className="flex-1">
                    <p className="font-semibold text-rose-900">
                      {t('landing.server_error')}
                    </p>
                    <p className="mt-1 text-rose-700 leading-normal">
                      {error}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => handleStart(false)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-rose-700 px-3 py-1.5 font-medium text-white transition hover:bg-rose-800"
                      >
                        <RefreshCw size={12} />
                        {t('landing.try_again')}
                      </button>
                      <button
                        onClick={() => handleStart(true)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-rose-300 bg-white px-3 py-1.5 font-medium text-rose-800 transition hover:bg-rose-50"
                      >
                        {t('landing.offline_session')}
                      </button>
                      <button
                        onClick={clearError}
                        className="text-rose-600 underline underline-offset-2 hover:text-rose-800 ml-2"
                      >
                        {t('landing.close')}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
            >
              {/* Primary Forest Green Button */}
              <button
                id="start-reflection-btn"
                onClick={() => handleStart(false)}
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-full bg-[#284B3E] hover:bg-[#1E3A30] text-white px-7 py-3.5 text-sm font-semibold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-75 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span>{t('landing.preparing_space')}</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} className="text-emerald-200" />
                    <span>{t('landing.start_reflection')}</span>
                  </>
                )}
              </button>

              {/* Secondary Ghost Button */}
              <a
                href="#alur"
                className="inline-flex items-center gap-2 rounded-full border border-[#D8DBE2] bg-white hover:bg-[#FAF9F5] px-6 py-3.5 text-sm font-medium text-[#334155] shadow-2xs transition-all hover:border-[#CBD5E1]"
              >
                <span>{t('landing.how_it_works')}</span>
                <ChevronDown size={15} className="text-[#64748B]" />
              </a>
            </motion.div>

            {/* Trust Pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#DFE3EA] bg-white/80 px-4 py-1.5 text-xs text-[#525F7F] shadow-2xs"
            >
              <ShieldCheck size={14} className="text-[#10B981]" />
              <span>{t('landing.trust_badge')}</span>
            </motion.div>
          </div>
        </section>

        {/* 3. 4 STEPS JOURNEY SECTION */}
        <JourneyFlow />

        {/* 4. BOX BREATHING EXERCISE WIDGET */}
        <BreathingWidget />

        {/* 5. INTERACTIVE BEFORE/AFTER SPLIT SLIDER */}
        <BeforeAfterSlider />

        {/* 7. BOTTOM CALL TO ACTION BANNER */}
        <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 mt-16">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#284B3E] via-[#244437] to-[#1F392E] p-8 sm:p-12 text-white shadow-md border border-[#3A6155]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl">
              {/* Badge */}
              <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-xs font-medium text-emerald-100 backdrop-blur-xs border border-white/10">
                {t('landing.best_time_badge')}
              </span>

              {/* Heading */}
              <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-white" style={{ whiteSpace: 'pre-line' }}>
                {t('landing.best_time_title')}
              </h2>
            </div>

            {/* White Pill Action Button */}
            <div className="shrink-0">
              <button
                onClick={() => handleStart(false)}
                disabled={isLoading}
                className="inline-flex items-center gap-2.5 rounded-full bg-white hover:bg-neutral-100 text-[#172033] font-bold px-8 py-3.5 text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-70"
              >
                <span>{t('landing.start_btn')}</span>
                <ArrowRight size={16} className="text-[#172033]" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 8. PRE-FOOTER CRISIS STRIP & FOOTER */}
      <Footer />
    </div>
  );
};

export default Landing;