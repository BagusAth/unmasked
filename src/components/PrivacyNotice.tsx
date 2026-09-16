import React from 'react';
import { ShieldCheck, Heart, AlertCircle, Lock } from 'lucide-react';

export const PrivacyNotice: React.FC = () => {
  return (
    <section id="privacy" className="w-full border-t border-[#E8E6DF] bg-[#F4F3EE] py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-3xl border border-[#DCDAD2] bg-white p-8 md:p-10 shadow-sm">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#172033]">
                Your Privacy & Emotional Safety
              </h3>
              <p className="text-xs text-[#68708A]">
                Transparency and non-judgmental guidance are at the heart of UNMASKED
              </p>
            </div>
          </div>

          {/* Three Key Tenets */}
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* 1. Purpose */}
            <div className="rounded-2xl border border-[#EBE9E2] bg-[#FAF9F6] p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#172033]">
                <Lock size={14} className="text-[#68708A]" />
                Personalized Reflection
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-[#68708A]">
                Information you share is used strictly within this session to shape thoughtful,
                personalized prompts and summaries. No passwords or invasive account profiles are required.
              </p>
            </div>

            {/* 2. Data handling */}
            <div className="rounded-2xl border border-[#EBE9E2] bg-[#FAF9F6] p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#172033]">
                <Heart size={14} className="text-[#68708A]" />
                Private & Ephemeral
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-[#68708A]">
                Your session is identified by a temporary private session token. We do not sell,
                monetize, or permanently track your personal reflection inputs.
              </p>
            </div>

            {/* 3. Non-diagnostic notice */}
            <div className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900">
                <AlertCircle size={14} className="text-amber-700" />
                Not Clinical Diagnosis
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-amber-900/80">
                UNMASKED is a self-reflection and psychoeducation platform. It is{' '}
                <strong className="font-semibold text-amber-950">
                  not a medical diagnosis, clinical assessment, or substitute for professional
                  mental healthcare
                </strong>.
              </p>
            </div>
          </div>

          {/* Support Reassurance Footer */}
          <div className="mt-6 rounded-xl bg-[#F8F7F4] px-5 py-4 border border-[#EBE9E2] text-xs text-[#68708A] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p>
              If you or someone you know is in acute distress or experiencing a crisis, please seek immediate help from licensed professionals or emergency hotlines.
            </p>
            <div className="shrink-0 font-medium text-[#172033]">
              Layanan Sejiwa: <span className="font-mono text-emerald-700">119 ext 8</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
