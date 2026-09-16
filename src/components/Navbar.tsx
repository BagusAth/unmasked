import React from 'react';
import logoImg from '../assets/unmasked-logo-notext.png';

interface NavbarProps {
  onStartClick?: () => void;
  isLoading?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartClick, isLoading = false }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E8E6DF]/80 bg-[#F8F7F4]/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <a href="/" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-[#172033]/5 p-1 transition group-hover:scale-105">
            <img
              src={logoImg}
              alt="UNMASKED Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight text-[#172033]">
              UNMASKED
            </span>
            <span className="hidden text-[10px] tracking-widest text-[#68708A] uppercase sm:inline-block">
              Beyond "I'm Fine."
            </span>
          </div>
        </a>

        {/* Navigation & Secondary CTA */}
        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-5 text-xs font-medium text-[#68708A] md:flex">
            <a
              href="#journey"
              className="transition hover:text-[#172033]"
            >
              The 4 Stages
            </a>
            <a
              href="#privacy"
              className="transition hover:text-[#172033]"
            >
              Privacy & Disclaimer
            </a>
          </nav>

          {onStartClick && (
            <button
              onClick={onStartClick}
              disabled={isLoading}
              className="hidden items-center gap-2 rounded-full bg-[#172033] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#25334d] disabled:cursor-not-allowed disabled:opacity-60 sm:inline-flex"
            >
              {isLoading ? (
                <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              ) : null}
              <span>Start Reflection</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
