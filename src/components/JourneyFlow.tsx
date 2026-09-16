import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Shield, HeartHandshake, Compass, ArrowRight } from 'lucide-react';

interface StageInfo {
  stepNumber: string;
  name: string;
  question: string;
  tagline: string;
  description: string;
  reflectionPrompt: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color: {
    accent: string;
    badgeBg: string;
    badgeText: string;
    border: string;
  };
}

const STAGES: StageInfo[] = [
  {
    stepNumber: '01',
    name: 'MASK',
    question: 'What do I show?',
    tagline: 'The curated outside self',
    description:
      'Explore the protective facade you put on every day—the constant "I\'m fine" smile, the perfectionist shield, or the habit of always pleasing others.',
    reflectionPrompt: 'Which version of you does the outside world see most often?',
    icon: Shield,
    color: {
      accent: 'text-indigo-600',
      badgeBg: 'bg-indigo-50',
      badgeText: 'text-indigo-700',
      border: 'border-indigo-150',
    },
  },
  {
    stepNumber: '02',
    name: 'LOAD',
    question: 'What do I carry?',
    tagline: 'The unspoken internal weight',
    description:
      'Gently unpack the burdens underneath your mask—unexpressed expectations, mental burnout, bottled emotions, and silent exhaustion.',
    reflectionPrompt: 'What is taking the heaviest emotional toll on you lately?',
    icon: Compass,
    color: {
      accent: 'text-amber-600',
      badgeBg: 'bg-amber-50',
      badgeText: 'text-amber-700',
      border: 'border-amber-150',
    },
  },
  {
    stepNumber: '03',
    name: 'NEED',
    question: 'What do I need?',
    tagline: 'The missing nourishment',
    description:
      'Pinpoint your unmet psychological and emotional needs—genuine rest, emotional validation, firm boundaries, or feeling truly heard.',
    reflectionPrompt: 'If your heart had a quiet voice right now, what would it ask for?',
    icon: HeartHandshake,
    color: {
      accent: 'text-emerald-600',
      badgeBg: 'bg-emerald-50',
      badgeText: 'text-emerald-700',
      border: 'border-emerald-150',
    },
  },
  {
    stepNumber: '04',
    name: 'ACTION',
    question: 'What can I do next?',
    tagline: 'Gentle, realistic micro-steps',
    description:
      'Transform insights into compassionate micro-actions. No overwhelming to-do lists—just one achievable, grounded step to honor what you discovered.',
    reflectionPrompt: 'What is one tiny, gentle boundary or self-care act you can take today?',
    icon: Sparkles,
    color: {
      accent: 'text-sky-600',
      badgeBg: 'bg-sky-50',
      badgeText: 'text-sky-700',
      border: 'border-sky-150',
    },
  },
];

export const JourneyFlow: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);

  return (
    <section id="journey" className="w-full py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#DCDAD2] bg-white/60 px-3.5 py-1 text-xs font-medium tracking-wide text-[#68708A]">
            <Sparkles size={13} className="text-amber-500" />
            The UNMASKED Framework
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#172033] sm:text-4xl">
            A 4-step path beyond "I'm fine."
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#68708A]">
            True self-awareness isn't about fixing yourself immediately. It begins with noticing
            what you protect, what you carry, and what you genuinely require to heal.
          </p>
        </div>

        {/* Progress Timeline / Cards */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = activeStage === idx;

            return (
              <motion.div
                key={stage.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onClick={() => setActiveStage(idx)}
                className={`group relative cursor-pointer rounded-2xl border p-6 transition-all duration-300 ${
                  isSelected
                    ? 'border-[#172033] bg-white shadow-lg ring-1 ring-[#172033]/5'
                    : 'border-[#E5E3DC] bg-white/70 hover:border-[#CAC7BE] hover:bg-white hover:shadow-sm'
                }`}
              >
                {/* Step indicator header */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold tracking-wider ${stage.color.accent}`}>
                    STAGE {stage.stepNumber}
                  </span>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-xl transition ${
                      isSelected ? stage.color.badgeBg : 'bg-[#F2F1EC] group-hover:bg-[#EAE8E1]'
                    }`}
                  >
                    <Icon
                      size={16}
                      className={isSelected ? stage.color.accent : 'text-[#68708A]'}
                    />
                  </div>
                </div>

                {/* Stage title & question */}
                <div className="mt-5">
                  <h3 className="text-xl font-bold tracking-tight text-[#172033]">
                    {stage.name}
                  </h3>
                  <p className="mt-1 font-serif text-sm italic text-[#47526D]">
                    "{stage.question}"
                  </p>
                </div>

                {/* Short tagline */}
                <p className="mt-3 text-xs font-medium text-[#7C859F]">
                  {stage.tagline}
                </p>

                {/* Description */}
                <p className="mt-2 text-xs leading-relaxed text-[#68708A]">
                  {stage.description}
                </p>

                {/* Subtle active indicator bar */}
                <div
                  className={`mt-6 h-1 w-full rounded-full transition-all duration-300 ${
                    isSelected ? 'bg-[#172033]' : 'bg-transparent'
                  }`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Selected Stage Spotlight Highlight */}
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-8 rounded-3xl border border-[#DCDAD2] bg-white p-7 sm:p-9 shadow-sm"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${STAGES[activeStage].color.badgeBg} ${STAGES[activeStage].color.badgeText}`}
                >
                  Stage {STAGES[activeStage].stepNumber} Focus
                </span>
                <span className="text-xs text-[#8F96A9]">
                  {STAGES[activeStage].tagline}
                </span>
              </div>
              <h4 className="mt-3 text-2xl font-semibold tracking-tight text-[#172033]">
                {STAGES[activeStage].question}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[#56607A]">
                {STAGES[activeStage].description}
              </p>
              <div className="mt-4 rounded-xl bg-[#F8F7F4] p-4 border border-[#EBE9E2]">
                <p className="text-xs font-medium text-[#68708A] uppercase tracking-wider">
                  Deep reflection question:
                </p>
                <p className="mt-1 text-sm font-medium text-[#172033]">
                  "{STAGES[activeStage].reflectionPrompt}"
                </p>
              </div>
            </div>

            {/* Quick transition hint */}
            <div className="flex flex-col items-start gap-2 border-t border-[#EBE9E2] pt-4 md:border-t-0 md:border-l md:pl-8 md:pt-0">
              <span className="text-xs text-[#8F96A9]">Next step in journey</span>
              <div className="flex items-center gap-2 font-medium text-sm text-[#172033]">
                <span>
                  {activeStage < 3 ? STAGES[activeStage + 1].name : 'COMPLETION'}
                </span>
                <ArrowRight size={14} className="text-[#68708A]" />
              </div>
              <button
                onClick={() => setActiveStage((prev) => (prev + 1) % STAGES.length)}
                className="mt-2 text-xs font-semibold text-[#172033] underline underline-offset-4 hover:text-[#4F5B76]"
              >
                {activeStage < 3 ? 'Preview next step' : 'Review from Stage 1'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
