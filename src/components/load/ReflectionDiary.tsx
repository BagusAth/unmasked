import React, { useState } from 'react';
import { History as HistoryIcon, Lock, Lightbulb, FolderOpen, Eye, EyeOff } from 'lucide-react';

interface ReflectionEntry {
  id: string;
  date: string;
  durationMinutes: number;
  tags: string[];
  summary: string;
  needInsight: string;
}

const INITIAL_REFLECTIONS: ReflectionEntry[] = [
  {
    id: '1',
    date: 'Kemarin, 21:15 WIB',
    durationMinutes: 8,
    tags: ['Kelelahan Ekstrem', 'Cemas Sidang'],
    summary: 'Semalam merasa sangat kewalahan karena menanggung semua tugas kelompok sendirian tanpa berani bilang tidak. Ada ketakutan dihakimi jika aku tidak perfeksionis.',
    needInsight: 'Berhenti sejenak, menetapkan batas yang jelas, dan mengakui bahwa kemampuan serta energimu memiliki batas yang wajar.'
  }
];

export function ReflectionDiary() {
  const [isMasked, setIsMasked] = useState(true);
  const [reflections] = useState<ReflectionEntry[]>(INITIAL_REFLECTIONS);

  return (
    <section className="my-8 w-full" id="refleksi-terakhir">
      <div className="bg-[#F8F9FA] border border-[#CBD5E1] rounded-[20px] p-5 sm:p-7 shadow-[0_4px_20px_2px_rgba(30,41,59,0.04),0_12px_32px_4px_rgba(74,107,93,0.05)] flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-[#E8EFEA] text-[#4A6B5D] flex items-center justify-center">
              <HistoryIcon size={18} />
            </span>
            <div>
              <h2 className="text-base text-[#1E293B] font-semibold">Buku Harian: Refleksi Terakhirmu</h2>
              <p className="text-xs text-[#64748B]">Cermin perbandingan kondisi batinmu sebelum memulai refleksi baru</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#64748B] text-xs font-medium border border-[#E2E8F0] self-start sm:self-auto">
            <Lock size={14} className="text-[#4A6B5D]" />
            Tersimpan di Perangkatmu
          </div>
        </div>

        <div className="bg-[#E8EFEA]/50 border border-[#A7F3D0] rounded-xl p-3.5 flex items-start gap-3 text-xs text-[#475569]">
          <Lightbulb size={18} className="text-[#4A6B5D] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#4A6B5D] font-semibold">Gunakan sebagai cermin pembanding: </strong>
            Bacalah intisari perasaanmu kemarin sebelum kamu menulis beban hari ini di Kanvas Pelepasan di atas. Apakah rasa sesaknya mulai mereda, atau justru ada hal baru yang perlu dilepaskan?
          </div>
        </div>

        {reflections.map((item) => (
          <div key={item.id} className="bg-white border border-[#E2E8F0] rounded-xl p-5 flex flex-col gap-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#64748B]">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 font-semibold text-[#4A6B5D]">
                  <HistoryIcon size={14} />
                  {item.date}
                </span>
                <span>•</span>
                <span>Durasi hening {item.durationMinutes} menit</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded-full bg-[#FBE9E3] text-[#C86D51] text-[11px] font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#FAF9F6] rounded-xl p-4 border border-[#E2E8F0] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#475569] flex items-center gap-1.5">
                  <FolderOpen size={15} className="text-[#4A6B5D]" />
                  Intisari Refleksi Sebelumnya
                </span>
                <button
                  onClick={() => setIsMasked(!isMasked)}
                  className="inline-flex items-center gap-1 text.xs font-medium text-[#4A6B5D] hover:text-[#3D584C] px-2 py-1 rounded-md hover:bg-white transition-colors cursor-pointer"
                >
                  {isMasked ? <Eye size={15} /> : <EyeOff size={15} />}
                  <span>{isMasked ? 'Tampilkan Teks' : 'Samarkan Teks'}</span>
                </button>
              </div>

              <p className={`text-sm text-[#1E293B] leading-relaxed transition-all ${isMasked ? 'blur-xs select-none' : ''}`}>
                “{item.summary}”
              </p>

              <div className="bg-white rounded-lg p-3 text-xs text-[#475569] flex items-start gap-2 border border-[#E2E8F0]">
                <Lightbulb size={16} className="text-[#4A6B5D] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1E293B] font-semibold">Apa yang kamu butuhkan saat itu: </strong>
                  <span>{item.needInsight}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
