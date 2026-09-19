import React, { useState } from 'react';
import { Heart, RotateCcw, ChevronLeft, ChevronRight, Sparkles, Smile } from 'lucide-react';

const DEFAULT_QUOTES = [
  {
    text: "“Kamu tidak harus selalu kuat di depan semua orang. Merasa lelah bukan tanda kegagalan — izinkan dirimu beristirahat tanpa rasa bersalah sejenak hari ini.”",
    author: "Ruang Aman • Pengingat Kasih Diri"
  },
  {
    text: "“Dunia tidak akan runtuh hanya karena kamu mengambil jeda satu jam untuk menarik napas dan merawat dirimu sendiri.”",
    author: "Izin Beristirahat • Napas Tenang"
  },
  {
    text: "“Beban ini terlalu berat untuk kamu tanggung sendirian dalam hening. Tuliskan apa adanya, setiap kata adalah pelepasan.”",
    author: "Kejujuran Radikal • Pelukan Kata"
  },
  {
    text: "“Marah, sedih, kecewa, atau hampa — semua perasaanmu sah dan berhak didengarkan tanpa penghakiman. Kamu manusia, bukan mesin.”",
    author: "Ruang Emosi • Validasi Perasaan"
  }
];

export function AffirmationCard() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isHugged, setIsHugged] = useState(false);

  const handleNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % DEFAULT_QUOTES.length);
  };
  const handlePrevQuote = () => {
    setQuoteIndex((prev) => (prev - 1 + DEFAULT_QUOTES.length) % DEFAULT_QUOTES.length);
  };

  const handleSelfHug = () => {
    setIsHugged(true);
    setTimeout(() => setIsHugged(false), 3000);
  };

  return (
    <section className="my-8 w-full">
      <div className="bg-[#FAF5F2] border border-[#FBE9E3] rounded-[20px] p-5 sm:p-7 shadow-[0_4px_20px_2px_rgba(30,41,59,0.04),0_12px_32px_4px_rgba(74,107,93,0.05)] relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#FBE9E3]">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-[#FBE9E3] text-[#C86D51] flex items-center justify-center">
              <Heart size={16} />
            </span>
            <span className="text-xs font-semibold text-[#C86D51] uppercase tracking-wider">
              Ungkapan Motivasi Untukmu
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevQuote}
                className="w-7 h-7 rounded-full bg-white hover:bg-neutral-100 text-[#64748B] flex items-center justify-center transition-colors cursor-pointer border border-[#E2E8F0]"
                title="Sebelumnya"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNextQuote}
                className="w-7 h-7 rounded-full bg-white hover:bg-neutral-100 text-[#64748B] flex items-center justify-center transition-colors cursor-pointer border border-[#E2E8F0]"
                title="Berikutnya"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="py-4 text-center flex flex-col items-center gap-3">
          <blockquote className="text-lg sm:text-xl text-[#1E293B] font-medium leading-relaxed italic max-w-2xl font-serif">
            {DEFAULT_QUOTES[quoteIndex].text}
          </blockquote>
          <p className="text-xs text-[#64748B] font-sans">
            {DEFAULT_QUOTES[quoteIndex].author}
          </p>

          <div className="flex items-center gap-1.5 mt-2">
            {DEFAULT_QUOTES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setQuoteIndex(idx)}
                className={`rounded-full transition-all ${
                  idx === quoteIndex ? 'w-6 h-1.5 bg-[#C86D51]' : 'w-1.5 h-1.5 bg-[#CBD5E1] hover:bg-[#C86D51]/50'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-[#FBE9E3] flex justify-center">
          <button
            onClick={handleSelfHug}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full font-medium text-xs transition-all cursor-pointer shadow-2xs ${
              isHugged
                ? 'bg-[#C86D51] text-white'
                : 'bg-[#FBE9E3] hover:bg-[#FBE9E3]/80 text-[#C86D51]'
            }`}
          >
            <Smile size={16} />
            <span>{isHugged ? 'Terima kasih sudah bertahan hari ini ♡' : 'Sentuh untuk Memeluk Diri'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
