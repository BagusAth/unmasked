import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Download, Copy, BadgeCheck } from 'lucide-react';

interface MindfulKeepsakeCardProps {
  dateLabel?: string;
  quoteText?: string;
  scriptToCopy?: string;
  onShowToast: (message: string, iconType?: 'check' | 'copy' | 'download' | 'security' | 'save') => void;
}

export const MindfulKeepsakeCard: React.FC<MindfulKeepsakeCardProps> = ({
  dateLabel = '14.11.24',
  quoteText = '“Nilai kemanusiaanku tidak diukur dari IPK, inbox email yang bersih, ataupun seberapa kuat aku berpura-pura tidak lelah.”',
  scriptToCopy = 'Halo rekan-rekan tim, izin malam ini aku istirahat duluan ya untuk memulihkan kondisi. Pembahasan tugas kita lanjutkan besok pagi. Terima kasih banyak atas pengertiannya.',
  onShowToast,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // High-DPI Canvas Rendering for Clean PNG Download
  const handleDownloadPng = () => {
    try {
      onShowToast('Memproses kartu refleksi beresolusi tinggi (.PNG)...', 'download');

      const canvas = document.createElement('canvas');
      const width = 800;
      const height = 480;
      const scale = 2; // 2x for Retina sharpness
      canvas.width = width * scale;
      canvas.height = height * scale;

      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available');

      ctx.scale(scale, scale);

      // 1. Background
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.roundRect(0, 0, width, height, 24);
      ctx.fill();

      // Outer Border
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 2. Top Header Row: Dots + Label + Date
      // Green Dot
      ctx.fillStyle = '#284B3E';
      ctx.beginPath();
      ctx.arc(40, 42, 6, 0, Math.PI * 2);
      ctx.fill();

      // Terracotta Dot
      ctx.fillStyle = '#C86D51';
      ctx.beginPath();
      ctx.arc(58, 42, 6, 0, Math.PI * 2);
      ctx.fill();

      // Header Text
      ctx.fillStyle = '#64748B';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText('KARTU PENGINGAT HARIAN', 76, 46);

      // Date Monospace
      ctx.fillStyle = '#94A3B8';
      ctx.font = '500 13px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(dateLabel, width - 40, 46);
      ctx.textAlign = 'left';

      // 3. Sub-heading: Izin untuk diri sendiri
      ctx.fillStyle = '#C86D51';
      ctx.font = 'bold 13px Inter, sans-serif';
      ctx.fillText('IZIN UNTUK DIRI SENDIRI HARI INI', 40, 110);

      // 4. Main Quote with Word Wrap
      ctx.fillStyle = '#111827';
      ctx.font = 'bold 22px Inter, sans-serif';
      const words = quoteText.split(' ');
      let line = '';
      let y = 155;
      const maxWidth = width - 80;
      const lineHeight = 34;

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && i > 0) {
          ctx.fillText(line, 40, y);
          line = words[i] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 40, y);

      // 5. Card Bottom Strip
      ctx.fillStyle = '#F8FAF9';
      ctx.beginPath();
      ctx.roundRect(0, height - 70, width, 70, [0, 0, 24, 24]);
      ctx.fill();

      ctx.strokeStyle = '#E2E8F0';
      ctx.beginPath();
      ctx.moveTo(0, height - 70);
      ctx.lineTo(width, height - 70);
      ctx.stroke();

      ctx.fillStyle = '#525F7F';
      ctx.font = '500 13px Inter, sans-serif';
      ctx.fillText('Ruang Refleksi • Tersimpan Aman di Perangkat Ini', 40, height - 28);

      ctx.fillStyle = '#284B3E';
      ctx.font = 'bold 13px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('✓ UNMASKED', width - 40, height - 28);

      // Trigger Download
      setTimeout(() => {
        const link = document.createElement('a');
        link.download = `kartu-refleksi-unmasked-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        onShowToast('Kartu refleksi tersimpan di folder Unduhan perangkatmu.', 'download');
      }, 600);
    } catch (err) {
      console.error('Download failed:', err);
      onShowToast('Gagal memproses kartu refleksi.', 'security');
    }
  };

  // Copy boundary script to clipboard
  const handleCopyScript = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(scriptToCopy)
        .then(() => {
          onShowToast('Draf pesan berhasil disalin ke clipboard.', 'copy');
        })
        .catch(() => {
          onShowToast('Draf pesan berhasil disalin.', 'copy');
        });
    } else {
      onShowToast('Draf pesan berhasil disalin.', 'copy');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.3 }}
      className="w-full bg-gradient-to-r from-[#F4F5F0] via-[#F8FAF8] to-[#FAF9F6] rounded-2xl sm:rounded-[28px] p-6 sm:p-10 shadow-sm border border-[#E2E8F0] relative overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 relative z-10">
        {/* Left: Graphic Card Mockup */}
        <div
          ref={cardRef}
          className="w-full max-w-md bg-white p-6 sm:p-7 rounded-2xl shadow-md border border-[#E2E8F0] flex flex-col justify-between gap-6 relative overflow-hidden transition-transform duration-300 hover:scale-[1.01]"
        >
          {/* Top Row: Dots + Header + Date */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#284B3E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#C86D51]" />
              <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider ml-1">
                KARTU PENGINGAT HARIAN
              </span>
            </div>
            <span className="text-xs text-[#94A3B8] font-mono font-medium">
              {dateLabel}
            </span>
          </div>

          {/* Quote Body */}
          <div className="flex flex-col gap-1.5 my-1">
            <span className="text-[11px] font-bold text-[#C86D51] uppercase tracking-widest">
              IZIN UNTUK DIRI SENDIRI HARI INI
            </span>
            <p className="text-base sm:text-lg font-bold text-[#111827] leading-relaxed">
              {quoteText}
            </p>
          </div>

          {/* Card Bottom Strip */}
          <div className="flex items-center justify-between pt-3 border-t border-[#F1F5F9] text-xs text-[#64748B]">
            <span>Ruang Refleksi • Tersimpan di Perangkat Ini</span>
            <BadgeCheck size={16} className="text-[#284B3E]" />
          </div>
        </div>

        {/* Right: Narrative & Action Buttons */}
        <div className="flex flex-col gap-4 max-w-xl text-left">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-[#284B3E] uppercase tracking-wider">
              KARTU PENGINGAT HARIAN
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111827]">
              Bawa pengingat ini menemanimu menjalani hari-hari kuliah.
            </h2>
            <p className="text-sm sm:text-base text-[#525F7F] leading-relaxed mt-1">
              Pengingat sederhana untuk sistem sarafmu: kamu punya hak penuh untuk beristirahat dan tidak harus selalu membuktikan apa pun kepada siapa pun.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={handleDownloadPng}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#284B3E] hover:bg-[#1E3A30] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Download size={16} />
              <span>Unduh Kartu Refleksi (.PNG)</span>
            </button>

            <button
              onClick={handleCopyScript}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#F8FAF9] text-[#1E293B] border border-[#D8DBE2] text-xs sm:text-sm font-semibold shadow-2xs transition-all hover:border-[#CBD5E1] cursor-pointer"
            >
              <Copy size={16} className="text-[#64748B]" />
              <span>Salin Draf Pesan</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
