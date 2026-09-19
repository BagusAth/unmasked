import React, { useState } from 'react';
import { Phone, X, HeartHandshake } from 'lucide-react';

export const Footer: React.FC = () => {
  const [showHotlineModal, setShowHotlineModal] = useState(false);

  return (
    <>
      {/* FOOTER */}
      <footer className="w-full border-t border-[#ECEBE6] bg-[#FAF9F5] py-8 text-xs text-[#6B7280]">
        <div className="mx-auto flex max-w-5xl flex-col sm:flex-row items-center justify-between gap-6 px-4 sm:px-6 text-center sm:text-left">
          
          <div className="flex flex-col gap-2 max-w-xl mx-auto sm:mx-0">
            {/* CRISIS HOTLINE */}
            <p id="krisis" className="font-medium text-[#9A3412]">
              Sedang menghadapi situasi darurat? <span className="font-bold">Hotline Kemenkes: 119</span>
            </p>
            {/* Medical disclaimer note */}
            <p className="leading-relaxed">
              UNMASKED merupakan ruang untuk memahami diri, bukan pengganti penanganan medis profesional.
            </p>
          </div>

          {/* Copyright */}
          <div className="shrink-0 font-medium">
            © 2026 UNMASKED.
          </div>
        </div>
      </footer>

      {/* HOTLINE MODAL */}
      {showHotlineModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-neutral-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-base">
                <HeartHandshake size={20} />
                <span>Bantuan Krisis & Darurat</span>
              </div>
              <button
                onClick={() => setShowHotlineModal(false)}
                className="rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mt-3 text-xs text-neutral-600 leading-relaxed">
              Jika kamu atau orang di sekitarmu sedang mengalami krisis emosional, pikiran menyakiti diri, atau situasi genting, jangan ragu untuk menghubungi layanan berikut:
            </p>

            <div className="mt-4 space-y-2.5">
              <div className="rounded-xl border border-rose-100 bg-rose-50/60 p-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-xs text-rose-950">Layanan SEJIWA (Kemenkes)</div>
                  <div className="text-[11px] text-rose-700">Krisis kesehatan jiwa 24 jam</div>
                </div>
                <a
                  href="tel:119"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-rose-700"
                >
                  <Phone size={12} />
                  <span>119 ext 8</span>
                </a>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-xs text-neutral-900">LISA Suicide Prevention Helpline</div>
                  <div className="text-[11px] text-neutral-600">Dukungan krisis mental via WhatsApp / Telp</div>
                </div>
                <a
                  href="tel:08113855472"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#284B3E] px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#1E3A30]"
                >
                  <Phone size={12} />
                  <span>0811-3855-472</span>
                </a>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-xs text-neutral-900">Halo Kemenkes</div>
                  <div className="text-[11px] text-neutral-600">Layanan informasi kesehatan nasional</div>
                </div>
                <a
                  href="tel:1500567"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-800 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-neutral-900"
                >
                  <Phone size={12} />
                  <span>1500-567</span>
                </a>
              </div>
            </div>

            <button
              onClick={() => setShowHotlineModal(false)}
              className="mt-5 w-full rounded-xl bg-neutral-100 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-200 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
};
