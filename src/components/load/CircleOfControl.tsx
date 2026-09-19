import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles, Circle, CheckCircle2, Trash2 } from 'lucide-react';

interface BurdenItem {
  id: string;
  text: string;
  category: 'within' | 'influence' | 'outside';
  createdAt: string;
}

interface CircleOfControlProps {
  burdens: BurdenItem[];
  onMoveCategory: (id: string, category: 'within' | 'influence' | 'outside') => void;
  onReleaseBurden: (id: string) => void;
}

export function CircleOfControl({ burdens, onMoveCategory, onReleaseBurden }: CircleOfControlProps) {
  return (
    <section className="my-8 w-full">
      <div className="bg-white border border-[#E2E8F0] rounded-[20px] p-5 sm:p-7 shadow-[0_4px_20px_2px_rgba(30,41,59,0.04),0_12px_32px_4px_rgba(74,107,93,0.05)] flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F1F5F9]">
          <div>
            <h2 className="text-base font-semibold text-[#1E293B] flex items-center gap-2">
              <Compass size={18} className="text-[#4A6B5D]" />
              Papan Lingkaran Kendali (Circle of Control)
            </h2>
            <p className="text-xs text-[#64748B] mt-1">Petakan bebanmu. Fokus pada apa yang bisa kamu ubah, lepaskan sisanya.</p>
          </div>
          <span className="text-[11px] px-2.5 py-1 bg-[#F1F5F9] text-[#475569] rounded-md font-medium border border-[#E2E8F0] self-start sm:self-auto">
            Total Beban: {burdens.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Column 1: Dalam Kendali */}
          <div className="bg-[#D1FAE5] border border-[#A7F3D0] rounded-[20px] p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#A7F3D0]/60">
              <span className="text-xs font-bold text-[#047857] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#047857]" />
                Bisa Dilakukan Sekarang (Dalam Kendali)
              </span>
            </div>
            <div className="flex flex-col gap-2.5 min-h-[120px]">
              <AnimatePresence>
                {burdens.filter(b => b.category === 'within').map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white p-3 rounded-lg border border-[#A7F3D0] shadow-2xs text-xs text-[#1E293B] flex flex-col gap-2 justify-between"
                  >
                    <p className="leading-relaxed font-medium">{item.text}</p>
                    <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-[11px] text-[#64748B]">
                      <button
                        onClick={() => onMoveCategory(item.id, 'influence')}
                        className="hover:text-[#B45309] transition-colors"
                      >
                        Bicarakan →
                      </button>
                      <button
                        onClick={() => onReleaseBurden(item.id)}
                        className="text-[#4A6B5D] hover:text-[#3D584C] font-medium transition-colors"
                        title="Selesai"
                      >
                        <CheckCircle2 size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {burdens.filter(b => b.category === 'within').length === 0 && (
                <p className="text-xs text-[#94A3B8] italic text-center py-6">Belum ada item di kategori ini</p>
              )}
            </div>
          </div>

          {/* Column 2: Pengaruh & Komunikasi */}
          <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-[20px] p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#FDE68A]/60">
              <span className="text-xs font-bold text-[#B45309] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#B45309]" />
                Perlu Dibicarakan ke Orang Lain
              </span>
            </div>
            <div className="flex flex-col gap-2.5 min-h-[120px]">
              <AnimatePresence>
                {burdens.filter(b => b.category === 'influence').map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white p-3 rounded-lg border border-[#FDE68A] shadow-2xs text-xs text-[#1E293B] flex flex-col gap-2 justify-between"
                  >
                    <p className="leading-relaxed font-medium">{item.text}</p>
                    <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-[11px] text-[#64748B]">
                      <button
                        onClick={() => onMoveCategory(item.id, 'within')}
                        className="hover:text-[#047857] transition-colors"
                      >
                        ← Lakukan Skrg
                      </button>
                      <button
                        onClick={() => onMoveCategory(item.id, 'outside')}
                        className="hover:text-[#475569] transition-colors"
                      >
                        Luar Kendali →
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {burdens.filter(b => b.category === 'influence').length === 0 && (
                <p className="text-xs text-[#94A3B8] italic text-center py-6">Belum ada item di kategori ini</p>
              )}
            </div>
          </div>

          {/* Column 3: Di Luar Kendali */}
          <div className="bg-[#F1F5F9] border border-[#CBD5E1] rounded-[20px] p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#CBD5E1]/60">
              <span className="text-xs font-bold text-[#475569] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#475569]" />
                Di Luar Kendaliku (Lepaskan)
              </span>
            </div>
            <div className="flex flex-col gap-2.5 min-h-[120px]">
              <AnimatePresence>
                {burdens.filter(b => b.category === 'outside').map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white p-3 rounded-lg border border-[#CBD5E1] shadow-2xs text-xs text-[#1E293B] flex flex-col gap-2 justify-between"
                  >
                    <p className="leading-relaxed font-medium">{item.text}</p>
                    <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-[11px] text-[#64748B]">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onMoveCategory(item.id, 'within')}
                          className="hover:text-[#047857] transition-colors"
                        >
                          ← Lakukan Skrg
                        </button>
                        <span>•</span>
                        <button
                          onClick={() => onMoveCategory(item.id, 'influence')}
                          className="hover:text-[#B45309] transition-colors"
                        >
                          ← Bicarakan
                        </button>
                      </div>
                      <button
                        onClick={() => onReleaseBurden(item.id)}
                        className="text-[#C86D51] hover:text-[#B75D45] font-semibold transition-colors flex items-center gap-1"
                        title="Let It Go"
                      >
                        <Sparkles size={12} />
                        <span>Lepaskan</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {burdens.filter(b => b.category === 'outside').length === 0 && (
                <p className="text-xs text-[#94A3B8] italic text-center py-6">Belum ada item di kategori ini</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
