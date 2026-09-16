import React from 'react';
import logoImg from '../assets/unmasked-logo-notext.png';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#E8E6DF] bg-[#F8F7F4] py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 text-center sm:flex-row sm:text-left">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <img
            src={logoImg}
            alt="UNMASKED Logo"
            className="h-7 w-7 object-contain opacity-80"
          />
          <div>
            <span className="text-sm font-semibold tracking-tight text-[#172033]">
              UNMASKED
            </span>
            <p className="text-xs text-[#68708A]">
              Beyond "I'm Fine." — A quiet space for mindful reflection.
            </p>
          </div>
        </div>

        {/* Links & Disclaimer */}
        <div className="text-xs text-[#8E95A8]">
          <p>© {new Date().getFullYear()} UNMASKED. Built with care and intention.</p>
        </div>
      </div>
    </footer>
  );
};
