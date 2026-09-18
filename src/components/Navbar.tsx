import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import logoImg from '../assets/unmasked-logo-notext.png';
import { useLanguage } from '../context/LanguageContext';

import { ID, GB } from 'country-flag-icons/react/3x2';

const FlagID = () => <ID className="w-4 h-3 border border-gray-200" />;
const FlagEN = () => <GB className="w-4 h-3 border border-gray-200" />;

interface NavbarProps {
  onStartClick?: () => void;
  isLoading?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartClick, isLoading = false }) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

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
            {t('nav.home')}
          </a>
          <a
            href="#alur"
            className="rounded-full px-3.5 py-1.5 hover:text-[#111827] hover:bg-white/60 transition-colors"
          >
            {t('nav.reflection_flow')}
          </a>
          <button
            onClick={onStartClick}
            disabled={isLoading}
            className="rounded-full px-3.5 py-1.5 hover:text-[#111827] hover:bg-white/60 transition-colors cursor-pointer"
          >
            {t('nav.reflection_canvas')}
          </button>
          <a
            href="#privasi"
            className="rounded-full px-3.5 py-1.5 hover:text-[#111827] hover:bg-white/60 transition-colors"
          >
            {t('nav.private_space')}
          </a>
          <a
            href="#krisis"
            className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 hover:text-[#111827] hover:bg-white/60 transition-colors"
          >
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            <span>{t('nav.crisis_help')}</span>
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
              <div className="flex items-center justify-center w-5">
                {language === 'ID' ? <FlagID /> : <FlagEN />}
              </div>
              <span>{language}</span>
              <ChevronDown size={13} className="text-[#6B7280]" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-28 rounded-xl border border-neutral-200 bg-white py-1 shadow-lg z-50 text-xs">
                <button
                  onClick={() => {
                    setLanguage('ID');
                    setIsLangOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-neutral-100 ${
                    language === 'ID' ? 'font-bold text-[#2563EB]' : 'text-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-center w-5">
                    <FlagID />
                  </div>
                  <span>Indonesia</span>
                </button>
                <button
                  onClick={() => {
                    setLanguage('EN');
                    setIsLangOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-neutral-100 ${
                    language === 'EN' ? 'font-bold text-[#2563EB]' : 'text-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-center w-5">
                    <FlagEN />
                  </div>
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
            {t('nav.home')}
          </a>
          <a
            href="#alur"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block hover:text-[#111827]"
          >
            {t('nav.reflection_flow')}
          </a>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onStartClick?.();
            }}
            className="block text-left w-full hover:text-[#111827]"
          >
            {t('nav.reflection_canvas')}
          </button>
          <a
            href="#privasi"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block hover:text-[#111827]"
          >
            {t('nav.private_space')}
          </a>
          <a
            href="#krisis"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 text-rose-600 font-semibold"
          >
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            <span>{t('nav.crisis_help')}</span>
          </a>
        </div>
      )}
    </header>
  );
};
