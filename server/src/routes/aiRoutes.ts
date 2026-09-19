import express from 'express';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();

router.post('/analyze-burdens', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ success: false, message: 'Text input is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY not configured. Using intelligent heuristic reflection fallback.');
      const fallbackData = generateFallbackReflection(text);
      return res.status(200).json({
        success: true,
        data: fallbackData,
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
Anda adalah asisten refleksi empati untuk platform kesehatan mental mahasiswa bernama "UNMASKED" (Beyond "I'm Fine").
Prinsip utama: Bahasa hangat, menenangkan, tidak menghakimi, dan BUKAN diagnosis klinis medis.

Berikut adalah curhatan/beban pikiran yang dituliskan oleh mahasiswa:
"""
${text.trim()}
"""

Tugas Anda:
1. Ekstrak cerita tersebut menjadi 3 sampai 6 masalah konkret/spesifik yang ringkas (Actionable / Concrete).
2. Kelompokkan setiap masalah ke salah satu dari 3 kategori Circle of Control:
   - "within": Hal yang bisa dilakukan sendiri sekarang/hari ini atau sepenuhnya dalam kendali pribadi.
   - "influence": Hal yang memerlukan komunikasi, negosiasi, atau batasan dengan orang lain.
   - "outside": Hal di luar kendali diri (ekspektasi orang lain, masa lalu, sistem) yang perlu diikhlaskan/dilepaskan untuk saat ini.
3. Buatlah ringkasan (summary) empati 1-2 kalimat dari inti cerita.
4. Berikan saran empati (needInsight) 1-2 kalimat tentang kebutuhan penenang batin saat ini.
5. Buat 2-3 tag pendek (maksimal 3 kata per tag) untuk refleksi ini.
6. Buat kutipan reflektif batin ("quote") yang menangkap suara hati terdalam pengguna dengan format terbagi:
   - "before": Awal kalimat
   - "highlight": Kata-kata kunci emosional yang diakui dengan berani
   - "after": Akhir kalimat
7. Tentukan 1 "primaryNeed" (kebutuhan utama penenang batin, contoh: "Istirahat tanpa merasa bersalah & menjaga batasan sehat").
8. Tentukan 1 "bodyState" (kondisi tubuh yang mulai lega, contoh: "Bahu mulai rileks & napas terasa lebih lapang").
9. Buat 1 "microAction" realistis yang bisa dilakukan dalam waktu < 5 menit:
   - "categoryBadge": Nama kategori aksi (contoh: "Jangkar Hari Ini • Komunikasi Batasan")
   - "actionTitle": Judul langkah mikro (contoh: "Sampaikan Batasanmu dengan Tenang")
   - "actionScript": Draf pesan sopan singkat yang bisa disalin pengguna untuk menyampaikan batas diri ke rekan/tim.

KEMBALIKAN HANYA RESPONS BERUPA JSON MURNI (tanpa tag markdown \`\`\`json atau teks pembuka/penutup lainnya):
{
  "burdens": [
    { "text": "Teks beban 1", "category": "within" },
    { "text": "Teks beban 2", "category": "influence" },
    { "text": "Teks beban 3", "category": "outside" }
  ],
  "summary": "Ringkasan empati...",
  "needInsight": "Saran kebutuhan...",
  "tags": ["Jeda Sejenak", "Batasan Diri", "Refleksi"],
  "quote": {
    "before": "Aku bukan takut bekerja keras; ",
    "highlight": "aku hanya takut pada kesunyian",
    "after": " saat berhenti memaksakan diri tampil sempurna."
  },
  "primaryNeed": "Istirahat tanpa merasa bersalah & menjaga batasan sehat",
  "bodyState": "Bahu mulai rileks & napas terasa lebih lega",
  "microAction": {
    "categoryBadge": "Jangkar Hari Ini • Komunikasi Batasan",
    "actionTitle": "Sampaikan Batasanmu dengan Tenang",
    "actionScript": "Halo rekan-rekan tim, izin malam ini aku istirahat duluan ya untuk memulihkan kondisi..."
  }
}
`;

    let parsed;
    try {
      const primaryModel = process.env.GEMINI_MODEL || 'gemini-flash-latest';
      let response;
      try {
        response = await ai.models.generateContent({
          model: primaryModel,
          contents: prompt,
        });
      } catch (modelErr) {
        console.warn(`Primary model "${primaryModel}" failed, trying fallback to "gemini-3.6-flash"...`, modelErr);
        response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: prompt,
        });
      }

      const rawText = response.text || '';
      const cleanedJson = rawText
        .replace(/```json/gi, '')
        .replace(/```/gi, '')
        .trim();

      parsed = JSON.parse(cleanedJson);
    } catch (aiError) {
      console.warn('Gemini API call failed (likely quota or network). Using intelligent heuristic reflection fallback:', aiError);
      parsed = generateFallbackReflection(text);
    }

    return res.status(200).json({
      success: true,
      data: parsed,
    });
  } catch (error) {
    console.error('AI Analysis Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal menganalisis curhatan dengan AI. Silakan coba lagi atau gunakan mode manual.',
      error: error instanceof Error ? error.message : 'Unknown AI error',
    });
  }
});

// Heuristic fallback generator for seamless offline or high-demand developer experience
function generateFallbackReflection(text: string) {
  const parts = text.split(/[.\n,]+/).map(s => s.trim()).filter(s => s.length > 5);
  const burden1 = parts[0] || 'Menyelesaikan bagian tugas yang bisa dicicil hari ini';
  const burden2 = parts[1] || 'Komunikasi terbuka mengenai jadwal atau ekspektasi';
  const burden3 = parts[2] || 'Ekspektasi orang lain yang berada di luar kendali pribadi';

  return {
    burdens: [
      { text: burden1, category: 'within' as const },
      { text: burden2, category: 'influence' as const },
      { text: burden3, category: 'outside' as const },
    ],
    summary: 'Kamu sedang memikul banyak hal sekaligus. Wajar jika tubuh dan pikiranmu merasa lelah.',
    needInsight: 'Mungkin ada kebutuhan untuk beristirahat tanpa rasa bersalah dan membagikan batasan yang jelas.',
    tags: ['Refleksi Mandiri', 'Urai Beban', 'Jeda Sejenak'],
    quote: {
      before: 'Aku bukan menyerah; ',
      highlight: 'aku hanya butuh jeda sejenak',
      after: ' untuk menyadari bahwa aku tidak harus memikul segalanya sendirian hari ini.',
    },
    primaryNeed: 'Istirahat tanpa rasa bersalah & menjaga batasan sehat',
    bodyState: 'Bahu yang tadinya tegang mulai melunak & napas terasa lebih lapang',
    microAction: {
      categoryBadge: 'Jangkar Hari Ini • Komunikasi Batasan',
      actionTitle: 'Sampaikan Batasan Diri dengan Tenang',
      actionScript: '“Halo rekan-rekan, kondisi fisik dan pikiranku sedang butuh istirahat sebentar malam ini. Pembahasan kita lanjutkan besok ya. Terima kasih banyak atas pengertiannya 🙏”',
    },
  };
}

export default router;
