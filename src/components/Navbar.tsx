import React, { useState } from 'react';
import { ChevronDown, Menu, X, ShieldCheck, User } from 'lucide-react';
import logoImg from '../assets/unmasked-logo-notext.png';

interface NavbarProps {
  onStartClick?: () => void;
  isLoading?: boolean;
  activePage?: 'home' | 'support' | 'journey' | 'canvas' | 'myspace';
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onStartClick, 
  isLoading = false,
  activePage = 'home'
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'ID' | 'EN'>('ID');

  const isSupportActive = activePage === 'support';
  const isHomeActive = activePage === 'home';

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
          <a
            href="/"
            className={`rounded-full px-4 py-1.5 transition-colors ${
              isHomeActive
                ? 'bg-[#E8EEFB] font-semibold text-[#2563EB]'
                : 'hover:text-[#111827] hover:bg-white/60'
            }`}
          >
            Beranda
          </a>
          <a
            href="/#alur"
            className="rounded-full px-3.5 py-1.5 hover:text-[#111827] hover:bg-white/60 transition-colors"
          >
            Alur Refleksi
          </a>
          <a
            href="/summary"
            className="rounded-full px-3.5 py-1.5 hover:text-[#111827] hover:bg-white/60 transition-colors cursor-pointer"
          >
            Kanvas Kejujuran
          </a>
          <a
            href="/#privasi"
            className="rounded-full px-3.5 py-1.5 hover:text-[#111827] hover:bg-white/60 transition-colors"
          >
            Ruang Pribadi
          </a>
          <a
            href="/support"
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 transition-colors ${
              isSupportActive
                ? 'bg-[#E8EEFB] font-semibold text-[#2563EB]'
                : 'hover:text-[#111827] hover:bg-white/60'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            <span>Bantuan Krisis</span>
          </a>
        </nav>

        {/* Right: Anonymity Pill, CTA, User icon & Language Selector */}
        <div className="flex items-center gap-2.5">
          {/* Anonymity Pill */}
          <div className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-[#DFE3EA] bg-white px-3 py-1.5 text-xs text-[#525F7F] shadow-2xs">
            <ShieldCheck size={14} className="text-[#10B981]" />
            <span className="font-medium">100% Anonim + Berjalan Lokal</span>
          </div>

          {/* Quick Start Reflection Pill */}
          <button
            onClick={onStartClick}
            disabled={isLoading}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#284B3E] hover:bg-[#1E3A30] text-white px-4 py-1.5 text-xs font-semibold shadow-xs transition active:scale-[0.98] cursor-pointer"
          >
            <span>Mulai Refleksi</span>
          </button>

          {/* User Icon Circle */}
          <button
            type="button"
            title="Profil Pengguna"
            className="hidden sm:flex h-8 w-8 rounded-full border border-[#E2E8F0] bg-white hover:bg-neutral-50 items-center justify-center text-[#475569] transition cursor-pointer"
          >
            <User size={15} />
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-2.5 py-1 text-xs font-medium text-[#374151] hover:bg-neutral-50 shadow-2xs transition"
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
            className={`block ${isHomeActive ? 'text-[#2563EB] font-bold' : 'hover:text-[#111827]'}`}
          >
            Beranda
          </a>
          <a
            href="/#alur"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block hover:text-[#111827]"
          >
            Alur Refleksi
          </a>
          <a
            href="/summary"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-left w-full hover:text-[#111827]"
          >
            Kanvas Kejujuran
          </a>
          <a
            href="/#privasi"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block hover:text-[#111827]"
          >
            Ruang Pribadi
          </a>
          <a
            href="/support"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-2 ${isSupportActive ? 'text-[#2563EB] font-bold' : 'text-rose-600 font-semibold'}`}
          >
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            <span>Bantuan Krisis</span>
          </a>
        </div>
      )}
    </header>
  );
};

