import React, { useState } from 'react';
import { ChevronDown, Menu, X, ShieldCheck, User } from 'lucide-react';
import logoImg from '../assets/unmasked-logo-notext.png';
import { useLanguage } from '../context/LanguageContext';

import { ID, GB } from 'country-flag-icons/react/3x2';

const FlagID = () => <ID className="w-4 h-3 border border-gray-200" />;
const FlagEN = () => <GB className="w-4 h-3 border border-gray-200" />;

interface NavbarProps {
  onStartClick?: () => void;
  isLoading?: boolean;
  activePage?: 'home' | 'journey' | 'canvas' | 'my-space' | 'myspace' | 'support' | 'load';
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onStartClick, 
  isLoading = false,
  activePage = 'home',
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const isHomeActive = activePage === 'home';
  const isJourneyActive = activePage === 'journey';
  const isCanvasActive = activePage === 'canvas';
  const isMySpaceActive = activePage === 'my-space' || activePage === 'myspace' || activePage === 'load';
  const isSupportActive = activePage === 'support';

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
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-[#E9E8E3] bg-[#FAF9F5]/70 p-1 text-xs font-medium text-[#5B6376] shadow-2xs">
          <a
            href="/"
            className={`rounded-full px-3.5 py-1.5 transition-colors ${
              isHomeActive
                ? 'bg-[#E8EFEA] font-bold text-[#284B3E]'
                : 'hover:text-[#111827] hover:bg-white/60'
            }`}
          >
            {t('nav.home')}
          </a>
          <a
            href="/#alur"
            className={`rounded-full px-3.5 py-1.5 transition-colors ${
              isJourneyActive
                ? 'bg-[#E8EFEA] font-bold text-[#284B3E]'
                : 'hover:text-[#111827] hover:bg-white/60'
            }`}
          >
            {t('nav.reflection_flow')}
          </a>
          <a
            href="/canvas"
            className={`rounded-full px-3.5 py-1.5 transition-colors ${
              isCanvasActive
                ? 'bg-[#E8EFEA] font-bold text-[#284B3E]'
                : 'hover:text-[#111827] hover:bg-white/60'
            }`}
          >
            {t('nav.reflection_canvas')}
          </a>
          <a
            href="/load"
            className={`rounded-full px-3.5 py-1.5 transition-colors ${
              isMySpaceActive
                ? 'bg-[#E8EFEA] font-bold text-[#284B3E]'
                : 'hover:text-[#111827] hover:bg-white/60'
            }`}
          >
            {t('nav.private_space')}
          </a>
          <a
            href="/support"
            className={`rounded-full px-3.5 py-1.5 transition-colors flex items-center gap-1.5 ${
              isSupportActive
                ? 'bg-[#FBE9E3] font-bold text-[#C86D51]'
                : 'hover:text-[#111827] hover:bg-white/60 text-[#C86D51]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#C86D51] inline-block animate-pulse" />
            <span>{t('nav.crisis_help')}</span>
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
          {onStartClick && (
            <button
              onClick={onStartClick}
              disabled={isLoading}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#284B3E] hover:bg-[#1E3A30] text-white px-4 py-1.5 text-xs font-semibold shadow-xs transition active:scale-[0.98] cursor-pointer"
            >
              <span>Mulai Refleksi</span>
            </button>
          )}

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
              className="flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs font-medium text-[#374151] hover:bg-neutral-50 shadow-2xs transition cursor-pointer"
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
                  className={`w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-neutral-100 cursor-pointer ${
                    language === 'ID' ? 'font-bold text-[#284B3E]' : 'text-neutral-700'
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
                  className={`w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-neutral-100 cursor-pointer ${
                    language === 'EN' ? 'font-bold text-[#284B3E]' : 'text-neutral-700'
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
            className="md:hidden rounded-lg p-1.5 text-[#374151] hover:bg-neutral-100 cursor-pointer"
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
            className={`block ${isHomeActive ? 'text-[#284B3E] font-bold' : 'hover:text-[#111827]'}`}
          >
            {t('nav.home')}
          </a>
          <a
            href="/#alur"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block ${isJourneyActive ? 'text-[#284B3E] font-bold' : 'hover:text-[#111827]'}`}
          >
            {t('nav.reflection_flow')}
          </a>
          <a
            href="/canvas"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block ${isCanvasActive ? 'text-[#284B3E] font-bold' : 'hover:text-[#111827]'}`}
          >
            {t('nav.reflection_canvas')}
          </a>
          <a
            href="/load"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block ${isMySpaceActive ? 'text-[#284B3E] font-bold' : 'hover:text-[#111827]'}`}
          >
            {t('nav.private_space')}
          </a>
          <a
            href="/support"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-2 ${isSupportActive ? 'text-[#C86D51] font-bold' : 'text-[#C86D51] font-semibold'}`}
          >
            <span className="h-2 w-2 rounded-full bg-[#C86D51] animate-pulse" />
            <span>{t('nav.crisis_help')}</span>
          </a>
        </div>
      )}
    </header>
  );
};
