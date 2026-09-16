import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Clock, ShieldCheck, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { JourneyFlow } from '../components/JourneyFlow';
import { PrivacyNotice } from '../components/PrivacyNotice';
import { Footer } from '../components/Footer';
import { useSession } from '../hooks/useSession';
import logoImg from '../assets/unmasked-logo-notext.png';

const Landing: React.FC = () => {
  const { isLoading, error, startSession, clearError } = useSession();

  const handleStart = async (fallbackToLocal = false) => {
    await startSession({ fallbackToLocal });
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#172033] flex flex-col selection:bg-[#172033]/10 selection:text-[#172033]">
      {/* Top Navigation */}
      <Navbar onStartClick={() => handleStart(false)} isLoading={isLoading} />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden px-6 pt-16 pb-24 md:pt-24 md:pb-32">
          {/* Subtle Ambient Background Gradients */}
          <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-100/40 via-amber-50/30 to-transparent blur-3xl" />

          <div className="mx-auto max-w-4xl text-center">
            {/* Pill Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#DFDDD6] bg-white/80 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-[#68708A] uppercase shadow-2xs backdrop-blur-xs"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Beyond "I'm Fine."
            </motion.div>

            {/* Main Brand Title & Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 flex flex-col items-center justify-center gap-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={logoImg}
                  alt="UNMASKED Logo"
                  className="h-16 w-16 object-contain md:h-20 md:w-20"
                />
                <h1 className="text-5xl font-semibold tracking-tight text-[#172033] sm:text-7xl md:text-8xl">
                  unmasked
                </h1>
              </div>
            </motion.div>

            {/* Core Narrative / Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#5B637B] sm:text-xl font-light"
            >
              When people ask how you are, <span className="font-medium text-[#172033]">"I'm fine"</span> is
              often the reflexive shield. UNMASKED is a quiet, non-judgmental space to pause and
              uncover what you show, what you carry, what you need, and what you can do next.
            </motion.p>

            {/* Error Banner & Fallback Option (FR-04 Fallback State) */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto mt-8 max-w-lg rounded-2xl border border-rose-200 bg-rose-50/90 p-5 text-left text-xs shadow-xs"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle size={18} className="mt-0.5 shrink-0 text-rose-600" />
                  <div className="flex-1">
                    <p className="font-semibold text-rose-900">
                      Unable to initialize session
                    </p>
                    <p className="mt-1 text-rose-700 leading-normal">
                      {error}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => handleStart(false)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-rose-700 px-3 py-1.5 font-medium text-white transition hover:bg-rose-800"
                      >
                        <RefreshCw size={12} />
                        Retry Connection
                      </button>
                      <button
                        onClick={() => handleStart(true)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-rose-300 bg-white px-3 py-1.5 font-medium text-rose-800 transition hover:bg-rose-50"
                      >
                        Continue with Offline Session
                      </button>
                      <button
                        onClick={clearError}
                        className="text-rose-600 underline underline-offset-2 hover:text-rose-800"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Main CTA (FR-02 & FR-04) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col items-center justify-center gap-4"
            >
              <button
                id="start-reflection-btn"
                onClick={() => handleStart(false)}
                disabled={isLoading}
                className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-[#172033] px-9 py-4 text-base font-medium text-white shadow-md transition-all hover:bg-[#222c42] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-75"
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span>Preparing your reflection space...</span>
                  </>
                ) : (
                  <>
                    <span>Start Reflection</span>
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

              {/* Frictionless Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#7B839B]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span>No login required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-500" />
                  <span>100% private session</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-[#68708A]" />
                  <span>Takes ~5 minutes</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Flow Breadcrumbs Preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16 inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-[#E4E2DA] bg-white/70 px-5 py-3 text-xs text-[#525B74] shadow-2xs backdrop-blur-xs"
            >
              <span className="font-semibold text-[#172033]">The Journey:</span>
              <span className="rounded bg-indigo-50 px-2 py-0.5 font-medium text-indigo-700">1. MASK</span>
              <span>→</span>
              <span className="rounded bg-amber-50 px-2 py-0.5 font-medium text-amber-700">2. LOAD</span>
              <span>→</span>
              <span className="rounded bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700">3. NEED</span>
              <span>→</span>
              <span className="rounded bg-sky-50 px-2 py-0.5 font-medium text-sky-700">4. ACTION</span>
            </motion.div>
          </div>
        </section>

        {/* 4 STAGES JOURNEY VISUAL FLOW (FR-01) */}
        <JourneyFlow />

        {/* PRIVACY & DISCLAIMER NOTICE (FR-03) */}
        <PrivacyNotice />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Landing;