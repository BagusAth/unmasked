import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import logoImg from '../assets/unmasked-logo-notext.png';

interface NavbarProps {
  onStartClick?: () => void;
  isLoading?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartClick, isLoading = false }) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'ID' | 'EN'>('ID');

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-[#F0EFEB] transition-all">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3.5">
        {/* Left: Brand Logo & Title */}
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-[#284B3E]/10 p-1 transition group-hover:scale-105">
            <img
              src={logoImg}
              alt="UNMASKED Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="text-base font-bold tracking-tight text-[#111827]">
            UNMASKED
          </span>
        </a>

        {/* Center: Navigation Pill Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1.5 rounded-full border border-[#E9E8E3] bg-[#FAF9F5]/70 p-1 text-xs font-medium text-[#5B6376] shadow-2xs">
          {/* Active 'Beranda' Pill */}
          <a
            href="/"
            className="rounded-full bg-[#E8EEFB] px-4 py-1.5 font-semibold text-[#2563EB] transition-colors"
          >
            Beranda
          </a>
          <a
            href="#alur"
            className="rounded-full px-3.5 py-1.5 hover:text-[#111827] hover:bg-white/60 transition-colors"
          >
            Alur Refleksi
          </a>
          <button
            onClick={onStartClick}
            disabled={isLoading}
            className="rounded-full px-3.5 py-1.5 hover:text-[#111827] hover:bg-white/60 transition-colors cursor-pointer"
          >
            Kanvas Refleksi
          </button>
          <a
            href="#privasi"
            className="rounded-full px-3.5 py-1.5 hover:text-[#111827] hover:bg-white/60 transition-colors"
          >
            Ruang Pribadi
          </a>
          <a
            href="#krisis"
            className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 hover:text-[#111827] hover:bg-white/60 transition-colors"
          >
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            <span>Bantuan Krisis</span>
          </a>
        </nav>

        {/* Right: Language Selector & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs font-medium text-[#374151] hover:bg-neutral-50 shadow-2xs transition"
            >
              <span>{currentLang === 'ID' ? '🇮🇩' : '🇬🇧'}</span>
              <span>{currentLang}</span>
              <ChevronDown size={13} className="text-[#6B7280]" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-28 rounded-xl border border-neutral-200 bg-white py-1 shadow-lg z-50 text-xs">
                <button
                  onClick={() => {
                    setCurrentLang('ID');
                    setIsLangOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-neutral-100 ${
                    currentLang === 'ID' ? 'font-bold text-[#2563EB]' : 'text-neutral-700'
                  }`}
                >
                  <span>🇮🇩</span>
                  <span>Indonesia</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentLang('EN');
                    setIsLangOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-neutral-100 ${
                    currentLang === 'EN' ? 'font-bold text-[#2563EB]' : 'text-neutral-700'
                  }`}
                >
                  <span>🇬🇧</span>
                  <span>English</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden rounded-lg p-1.5 text-[#374151] hover:bg-neutral-100"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-6 py-4 space-y-3 text-sm font-medium text-[#374151] shadow-md">
          <a
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-[#2563EB] font-semibold"
          >
            Beranda
          </a>
          <a
            href="#alur"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block hover:text-[#111827]"
          >
            Alur Refleksi
          </a>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onStartClick?.();
            }}
            className="block text-left w-full hover:text-[#111827]"
          >
            Kanvas Refleksi
          </button>
          <a
            href="#privasi"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block hover:text-[#111827]"
          >
            Ruang Pribadi
          </a>
          <a
            href="#krisis"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 text-rose-600 font-semibold"
          >
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            <span>Bantuan Krisis</span>
          </a>
        </div>
      )}
    </header>
  );
};
