import express from 'express';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();

// Parse JSON directly in this route if needed, but it's handled globally in index.ts
router.post('/analyze-burdens', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, message: 'Text is required' });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `
Anda adalah asisten AI psikologis yang bertugas menganalisis keluh kesah pengguna dari aplikasi kesehatan mental "UNMASKED".
Berikut adalah curhatan pengguna:
"${text}"

Tugas Anda:
1. Ekstrak cerita tersebut menjadi masalah-masalah spesifik yang kecil (Actionable / Concrete).
2. Kelompokkan setiap masalah ke salah satu dari 3 kategori ini:
   - "within": Hal yang bisa dilakukan sekarang atau sepenuhnya dalam kendali pengguna.
   - "influence": Hal yang perlu dibicarakan ke orang lain / bisa dipengaruhi tapi butuh komunikasi.
   - "outside": Hal yang di luar kendali dan harus diikhlaskan/dilepaskan.
3. Buatlah sebuah ringkasan (summary) empati 1-2 kalimat dari inti cerita.
4. Berikan saran (needInsight) 1-2 kalimat tentang apa yang sebaiknya dilakukan pengguna sekarang untuk merasa lebih baik secara instan (contoh: tarik napas, istirahat dari layar).
5. Buat 2-3 tag pendek (maksimal 3 kata per tag).

Kembalikan HANYA respons murni dalam format JSON (tanpa tag markdown \`\`\`json) dengan struktur yang valid secara sintaksis:
{
  "burdens": [
    { "text": "Masalah 1", "category": "within" },
    { "text": "Masalah 2", "category": "outside" }
  ],
  "summary": "Ringkasan cerita...",
  "needInsight": "Saran untuk pengguna...",
  "tags": ["Tag 1", "Tag 2"]
}
`;

    const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
    });

    const resultText = response.text || '';
    
    // Clean up if it contains markdown formatting by accident
    const jsonStr = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const parsedData = JSON.parse(jsonStr);

    res.json({ success: true, data: parsedData });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ success: false, message: 'Gagal menganalisis teks dengan AI' });
  }
});

export default router;
