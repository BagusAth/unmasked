# 🌿 UNMASKED — Beyond "I'm Fine"
> Platform Refleksi Kesehatan Mental Mandiri untuk Mahasiswa Universitas.

Dokumen ini adalah **Panduan Kolaborasi & Onboarding Cepat** untuk seluruh anggota tim pengembang.

---

## 🚀 Panduan Setup Cepat untuk Rekan Tim

### 1. Instalasi Dependensi (Frontend & Backend)
Proyek ini memiliki dua bagian: Frontend (Vite React) dan Backend Proxy (Express). Jalankan perintah berikut di root folder untuk menginstal seluruh dependensi sekaligus:

```bash
npm run install:all
```

---

### 2. Setup Environment Variables (.env)

#### A. Frontend (Root)
Salin template `.env.example` ke `.env`:
```bash
# Windows PowerShell
copy .env.example .env
```
Pastikan isinya:
```env
VITE_API_URL=http://localhost:5000
```

#### B. Backend (`server/`)
Salin template `server/.env.example` ke `server/.env`:
```bash
# Windows PowerShell
copy server\.env.example server\.env
```
Buka `server/.env` dan masukkan API Key Gemini Anda:
```env
PORT=5000
GEMINI_API_KEY=masukkan_api_key_gemini_di_sini
GEMINI_MODEL=gemini-flash-latest
```
> 💡 **Cara mendapatkan Gemini API Key (Gratis):**
> 1. Kunjungi [Google AI Studio](https://aistudio.google.com/app/apikey).
> 2. Klik **Create API Key**.
> 3. Salin key tersebut ke `server/.env`.
> 
> *Catatan: Backend sudah dilengkapi sistem **dual-fallback otomatis** (jika model utama sedang antre 503, otomatis beralih ke model cadangan atau refleksi heuristik, sehingga alur pengujian tidak akan pernah crash/terhenti).*

---

### 3. Menjalankan Aplikasi

Buka dua tab terminal di VS Code / Terminal Anda:

* **Terminal 1 — Backend Server (Port 5000):**
  ```bash
  npm run server
  ```
  *(Server akan berjalan di `http://localhost:5000` dengan fitur auto-reload)*

* **Terminal 2 — Frontend Client (Port 5173):**
  ```bash
  npm run dev
  ```
  *(Frontend akan berjalan di `http://localhost:5173`)*

---

## 🔄 Alur Integrasi Antar Halaman (Journey Bridge)

Agar pekerjaan Anda di halaman **Mask**, **Load**, **Need**, dan **Action** langsung terhubung otomatis ke backend AI dan langsung muncul sempurna di Halaman **Canvas**, Anda cukup memanggil helper yang sudah disiapkan di:
👉 [`src/utils/sessionJourney.ts`](src/utils/sessionJourney.ts)

### 🎭 1. Halaman Mask (`/mask`)
Saat pengguna selesai memilih persona dan kenyataan batin, simpan datanya:
```ts
import { sessionJourney } from '../utils/sessionJourney';

// Panggil saat navigasi ke /load
sessionJourney.saveMaskStep({
  publicPersonaText: 'Mahasiswa yang selalu aktif dan tenang',
  publicTags: ['Produktif', 'Bisa Diandalkan'],
  innerFeelingText: 'Kelelahan batin yang tidak pernah diceritakan',
  innerTags: ['Kewalahan', 'Butuh Jeda'],
  validationMessage: 'Terima kasih sudah berani jujur pada diri sendiri.',
});
```

---

### ⚖️ 2. Halaman Load (`/load`) — Integrasi AI
Saat pengguna menuliskan curhatan/beban pikiran (*brain dump*), panggil backend AI lalu simpan hasilnya:
```ts
import { aiService } from '../services/aiService';
import { sessionJourney } from '../utils/sessionJourney';

async function handleAnalyze(curhatanUser: string) {
  // 1. Panggil backend AI Gemini
  const result = await aiService.analyzeBurdens(curhatanUser);

  if (result.success && result.data) {
    // 2. Simpan otomatis ke alur sesi
    // (Fungsi ini otomatis memetakan burdens ke Circle of Control & menyiapkan draf Need + Action!)
    sessionJourney.saveLoadWithAi(curhatanUser, result.data);
  }
}
```

---

### 💡 3. Halaman Need (`/need`)
Pengguna dapat menyesuaikan atau mengonfirmasi kebutuhan inti:
```ts
import { sessionJourney } from '../utils/sessionJourney';

sessionJourney.saveNeedStep({
  quoteBefore: 'Aku bukan menyerah, ',
  quoteHighlight: 'aku hanya butuh jeda',
  quoteAfter: ' untuk bernapas hari ini.',
  primaryNeed: 'Istirahat tanpa rasa bersalah',
  bodyState: 'Bahu mulai rileks & napas terasa lebih lapang',
});
```

---

### 🌱 4. Halaman Action (`/action`) — Finalisasi
Saat pengguna memilih 1 komitmen mikro kecil, finalisasi sesi dan arahkan ke Kanvas:
```ts
import { useNavigate } from 'react-router-dom';
import { sessionJourney } from '../utils/sessionJourney';

const navigate = useNavigate();

function handleCompleteAction() {
  // Finalisasi sesi aktif
  sessionJourney.finalizeSession({
    categoryBadge: 'Jangkar Hari Ini • Batasan Diri',
    actionTitle: 'Sampaikan Batasan ke Rekan Tim',
    actionScript: '“Izin malam ini saya istirahat duluan ya teman-teman...”',
    helperNote: 'Kamu bisa melakukannya saat sudah siap.',
    isCompleted: false,
  });

  // Arahkan ke Kanvas Refleksi
  navigate('/canvas');
}
```

---

## 📡 Daftar Endpoint Backend API

| Method | Endpoint | Deskripsi | Status |
|---|---|---|---|
| `GET` | `/api/health` | Cek status server | Siap |
| `POST` | `/api/ai/analyze-burdens` | Analisis teks curhatan via Gemini AI | Siap (Dual-fallback) |
| `POST` | `/api/sessions` | Inisialisasi ID sesi refleksi | Siap |
| `GET` | `/api/sessions/:id` | Ambil data sesi tersimpan | Siap |

---

## 🎨 Panduan Desain & Style Token
Seluruh komponen mengikuti filosofi **Warm Humanist Minimalism**. Silakan merujuk ke [`design.md`](design.md) untuk pedoman warna resmi:
* **Primary (Sage):** `#4A6B5D` (hover `#3D584C`, subtle `#E8EFEA`)
* **Accent (Terracotta):** `#C86D51` (hover `#B75D45`, subtle `#FBE9E3`)
* **Perlu Dikomunikasikan (Warm Amber):** `#FEF3C7` (teks `#B45309`, border `#FDE68A`)
* **Background:** `#FAF9F6` | **Surface:** `#FFFFFF` | **Borders:** `#E2E8F0` / `#E8E8E2`
* **Typography:** `Plus Jakarta Sans` (Heading) & `Inter` (Body)
