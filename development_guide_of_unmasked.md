# Development Guide

> **Project:** UNMASKED — Beyond "I'm Fine"  
> **Version:** 1.0.0  
> **Last Update:** September 2026

---

# 1. Introduction

Dokumen ini berisi standar pengembangan aplikasi **UNMASKED**, sebuah platform web refleksi kesehatan mental yang dirancang untuk mahasiswa universitas.

Panduan ini wajib dijadikan acuan oleh seluruh anggota tim agar proses pengembangan tetap konsisten, modular, aman, mudah dipelihara, dan sesuai dengan arah desain yang telah ditentukan.

Tujuan dibuatnya panduan ini adalah:

- Menjaga konsistensi struktur kode dan UI.
- Memastikan pengalaman pengguna tetap tenang, empatik, dan bebas distraksi.
- Mengurangi konflik saat pengembangan dan merge Git.
- Mempermudah maintenance dan pengembangan fitur lanjutan.
- Menjaga data refleksi pengguna tetap bersifat lokal dan privat.
- Memastikan setiap halaman memiliki perilaku responsif dan aksesibilitas yang baik.
- Mencegah fitur platform disalahartikan sebagai diagnosis atau terapi klinis.
- Mempermudah onboarding anggota tim baru.

---

# 2. Project Overview

**UNMASKED** merupakan platform refleksi mandiri untuk membantu mahasiswa memahami kondisi emosional mereka melalui perjalanan reflektif empat tahap:

1. **MASK** — Mengenali perbedaan antara persona yang ditampilkan dan perasaan sebenarnya.
2. **LOAD** — Mengidentifikasi serta mengelompokkan beban pikiran menggunakan Circle of Control.
3. **NEED** — Mengidentifikasi kebutuhan emosional mendasar melalui insight reflektif berbantuan AI.
4. **ACTION** — Memilih satu langkah mikro yang realistis dan dapat dilakukan dalam waktu kurang dari lima menit.

Platform terdiri dari lima halaman utama:

| Route | Halaman | Fungsi |
|---|---|---|
| `/` | Landing Page | Memperkenalkan platform dan mengarahkan pengguna memulai refleksi |
| `/journey` | Interactive Reflection Journey | Menjalankan proses refleksi empat langkah |
| `/canvas` | Reflection Canvas | Menampilkan rangkuman hasil refleksi |
| `/my-space` | My Private Space | Menyimpan dan menampilkan riwayat refleksi lokal |
| `/support` | Crisis & Emergency Support | Menyediakan informasi bantuan krisis dan grounding tool |

---

# 3. Development Principles

## 3.1 User-Centered and Empathetic

Seluruh keputusan desain dan implementasi harus memprioritaskan:

- Keamanan emosional pengguna.
- Bahasa yang tidak menghakimi.
- Pengalaman yang tidak membuat pengguna merasa gagal.
- Instruksi yang jelas dan mudah dipahami.
- Tidak memaksa pengguna mengungkapkan informasi pribadi.
- Pengguna tetap memiliki kendali atas data dan keputusan refleksinya.

Hindari:

- Bahasa yang menyalahkan pengguna.
- Notifikasi yang agresif.
- Animasi berlebihan.
- Gamifikasi yang membuat kondisi emosional terasa seperti kompetisi.
- Klaim bahwa AI mengetahui kondisi psikologis pengguna secara pasti.

---

## 3.2 Privacy by Design

Privasi bukan fitur tambahan, tetapi bagian inti dari arsitektur aplikasi.

Aturan utama:

- Tidak mewajibkan login untuk memulai refleksi.
- Data refleksi disimpan secara lokal pada browser.
- Jangan mengirim data refleksi ke server tanpa persetujuan pengguna yang jelas.
- Jangan menyimpan data sensitif di URL.
- Jangan mencetak isi refleksi ke console pada production.
- Sediakan kemampuan menghapus seluruh data lokal.
- Jelaskan dengan bahasa sederhana bagaimana data disimpan.
- Jangan menggunakan tracking atau surveillance yang tidak diperlukan.

Jika menggunakan AI:

- Kirim hanya data yang benar-benar diperlukan.
- Jangan menyertakan identitas pribadi pengguna.
- Jangan menyimpan prompt atau respons AI secara permanen tanpa persetujuan.
- Tampilkan bahwa insight AI bersifat reflektif, bukan diagnosis profesional.

---

## 3.3 Separation of Concerns

Pisahkan tanggung jawab aplikasi menjadi beberapa lapisan:

```text
UI Components
    ↓
Page / Feature Components
    ↓
State Management / Application Logic
    ↓
Services
    ↓
Local Storage / IndexedDB / External API
```

Contoh pembagian:

- **Components** menangani tampilan.
- **Pages** menangani komposisi halaman.
- **Hooks / State** menangani state dan interaksi.
- **Services** menangani IndexedDB, localStorage, AI request, dan utility API.
- **Types / Models** mendefinisikan bentuk data.
- **Utils** berisi fungsi murni yang dapat digunakan kembali.

Jangan menempatkan seluruh logic, state, markup, dan API request dalam satu file halaman.

---

## 3.4 Reusable Component

Komponen yang digunakan lebih dari satu kali harus dibuat reusable.

Contoh komponen global:

- Navbar
- Footer
- Button
- Badge
- Card
- Modal
- Dialog
- Toast
- Tooltip
- Progress Stepper
- Section Header
- Empty State
- Loading State
- Confirmation Modal
- Emergency Banner

Contoh komponen khusus fitur:

- ComparisonSlider
- ReflectionTagSelector
- BrainDumpInput
- BurdenCard
- ControlCircleBoard
- InsightCard
- MicroActionCard
- BreathingCircle
- SessionHistoryCard
- PrivacyStatusCard

Jangan melakukan copy-paste komponen yang memiliki struktur dan perilaku sama.

---

## 3.5 Single Responsibility

Satu file, komponen, hook, atau service harus memiliki satu tanggung jawab utama.

Contoh yang benar:

```text
components/
  ui/
    Button.tsx
    Card.tsx
    Modal.tsx

features/
  journey/
    components/
      MaskStep.tsx
      LoadStep.tsx
      NeedStep.tsx
      ActionStep.tsx
    hooks/
      useReflectionJourney.ts
    services/
      journeyService.ts
```

Hindari:

```text
JourneyPage.tsx
```

yang berisi seluruh:

- Markup empat langkah.
- Logic drag-and-drop.
- Validasi.
- Penyimpanan data.
- Pemanggilan AI.
- Modal.
- Animasi.
- Semua styling.

---

# 4. Recommended Project Structure

Struktur berikut digunakan sebagai acuan modular:

```text
src/
├── app/
│   ├── routes/
│   │   ├── index
│   │   ├── journey
│   │   ├── canvas
│   │   ├── my-space
│   │   └── support
│   └── providers/
│
├── components/
│   ├── ui/
│   │   ├── Button
│   │   ├── Card
│   │   ├── Badge
│   │   ├── Modal
│   │   ├── Toast
│   │   └── ProgressStepper
│   ├── layout/
│   │   ├── Navbar
│   │   ├── Footer
│   │   └── PageContainer
│   └── shared/
│       ├── EmergencyBanner
│       ├── PrivacyNotice
│       ├── LoadingState
│       └── EmptyState
│
├── features/
│   ├── landing/
│   ├── journey/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   ├── canvas/
│   ├── my-space/
│   └── support/
│
├── services/
│   ├── storage/
│   │   ├── indexedDb.ts
│   │   └── sessionStorage.ts
│   ├── ai/
│   │   └── reflectionService.ts
│   └── export/
│       └── summaryCardService.ts
│
├── hooks/
├── lib/
├── types/
├── utils/
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
└── styles/
    ├── globals.css
    └── design-tokens.css
```

Nama folder dapat disesuaikan dengan framework yang digunakan, tetapi prinsip pemisahan tanggung jawab harus dipertahankan.

---

# 5. Page and Route Rules

## 5.1 Landing Page `/`

Landing page wajib mencakup:

- Navbar minimalis.
- Hero section.
- Headline dan subheadline.
- CTA utama dan sekunder.
- Badge anonimitas.
- Interactive comparison card.
- Preview empat langkah.
- Box breathing section.
- Privacy feature cards.
- Bottom CTA banner.
- Emergency hotline bar.
- Footer disclaimer.

Landing page tidak boleh terlalu padat. Prioritaskan:

- White space.
- Hierarki visual.
- Alur baca yang jelas.
- CTA yang mudah ditemukan.
- Animasi yang lembut.

---

## 5.2 Journey Page `/journey`

Journey page menggunakan wizard empat langkah:

```text
MASK → LOAD → NEED → ACTION
```

Aturan:

- Progress stepper harus selalu menunjukkan langkah aktif.
- Pengguna dapat mengetahui posisi mereka dalam proses.
- State antar-langkah harus tetap tersimpan selama sesi berjalan.
- Jangan menghapus input pengguna ketika berpindah langkah.
- Validasi dilakukan sebelum melanjutkan ke langkah berikutnya.
- Pengguna harus memilih tepat satu micro-action pada langkah ACTION.
- Loading state AI harus jelas dan tidak membuat pengguna mengira aplikasi rusak.

---

## 5.3 Canvas Page `/canvas`

Canvas page menampilkan hasil sintesis sesi:

- Topeng yang Kubuka.
- Beban yang Kutata.
- Kesadaran Intiku.
- Komitmen Mikroku.

Fitur:

- Tandai aksi sebagai selesai.
- Unduh kartu ringkasan PNG.
- Simpan ke ruang pribadi.
- Salin script ke clipboard jika tersedia.
- Tutup sesi dan hapus buffer.

Canvas tidak boleh menampilkan data yang belum tersedia seolah-olah sudah dianalisis.

---

## 5.4 My Space Page `/my-space`

My Space merupakan ruang penyimpanan lokal pengguna.

Fitur utama:

- Status privasi.
- Insight pola emosional.
- Riwayat sesi.
- Accordion detail sesi.
- Penghapusan seluruh data lokal.

Jika belum ada sesi:

- Tampilkan empty state yang ramah.
- Jangan menampilkan statistik palsu.
- Sediakan CTA untuk memulai refleksi.

---

## 5.5 Support Page `/support`

Support page harus dapat diakses secara langsung tanpa harus menyelesaikan journey.

Wajib mencakup:

- Pesan dukungan yang menenangkan.
- Kontak bantuan darurat.
- Informasi layanan konseling kampus.
- Tombol click-to-call pada perangkat mobile.
- Grounding tool mandiri.
- Disclaimer batasan platform.

Informasi bantuan krisis harus ditampilkan dengan jelas dan tidak disembunyikan di dalam menu yang sulit ditemukan.

---

# 6. Design System Rules

## 6.1 Design Direction

Arah visual UNMASKED:

- Calming.
- Human-centered.
- Minimalist.
- Empathetic.
- Modern.
- Distraction-free.
- Tidak terasa seperti rumah sakit.
- Tidak menggunakan ilustrasi kekanak-kanakan.

---

## 6.2 Color Tokens

Gunakan design tokens agar warna konsisten.

```css
:root {
  --color-background: #FAF9F6;
  --color-background-alt: #F4F5F0;
  --color-primary: #4A6B5D;
  --color-primary-dark: #365247;
  --color-accent: #C86D51;
  --color-surface: #FFFFFF;
  --color-border: #E2E8F0;
  --color-dark-slate: #0F172A;

  --color-communication: #F3C969;
  --color-out-of-control: #64748B;
  --color-in-control: #6B9B7A;
}
```

Jangan membuat warna baru secara sembarangan jika warna yang tersedia masih dapat digunakan.

---

## 6.3 Typography

Gunakan **Inter** sebagai font utama.

Fallback:

```css
font-family:
  'Inter',
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  sans-serif;
```

Aturan tipografi:

- Heading menggunakan weight yang tegas tetapi tidak berlebihan.
- Body text harus mudah dibaca.
- Gunakan line-height yang lapang.
- Hindari paragraf panjang tanpa pemisahan visual.
- Jangan menggunakan terlalu banyak jenis font.
- Jangan menggunakan all-caps untuk teks panjang.
- Pastikan kontras teks memenuhi standar aksesibilitas.

---

## 6.4 Border Radius and Shadows

Gunakan bentuk yang lembut dan konsisten:

- Kartu utama: `rounded-2xl` atau `rounded-3xl`.
- Button pill: `rounded-full`.
- Input: `rounded-xl` atau `rounded-2xl`.
- Shadow: gunakan shadow lembut seperti `shadow-sm` atau `shadow-md`.

Hindari:

- Border radius yang terlalu kecil dan kaku.
- Shadow terlalu gelap.
- Efek glassmorphism berlebihan.
- Efek 3D yang mengganggu ketenangan visual.

---

## 6.5 Spacing

Gunakan sistem spacing yang konsisten.

Prioritas:

- White space yang luas.
- Jarak antar-section yang proporsional.
- Padding kartu yang nyaman.
- Jangan menumpuk terlalu banyak elemen dalam satu area.

---

# 7. Component Rules

## 7.1 Button

Button harus memiliki:

- Label yang jelas.
- State default.
- Hover state.
- Active/pressed state.
- Disabled state.
- Loading state jika melakukan proses asynchronous.
- Focus state yang terlihat.

Gunakan variasi:

- Primary.
- Secondary.
- Ghost.
- Destructive.
- Icon button.

Jangan menggunakan button hanya berdasarkan warna tanpa label atau konteks yang jelas.

---

## 7.2 Card

Semua card harus:

- Memiliki hierarki konten yang jelas.
- Tidak terlalu banyak teks.
- Memiliki padding konsisten.
- Memiliki state hover hanya jika interaktif.
- Tidak menggunakan dekorasi yang mengganggu keterbacaan.

---

## 7.3 Modal and Confirmation

Modal wajib digunakan untuk tindakan destruktif seperti:

- Menghapus seluruh data lokal.
- Menghapus sesi.
- Menutup sesi sebelum data tersimpan.

Modal harus menjelaskan:

- Apa yang akan terjadi.
- Apakah tindakan dapat dibatalkan.
- Tombol konfirmasi dan pembatalan.

---

## 7.4 Loading State

Gunakan loading state yang tenang:

- Breathing pulse.
- Skeleton.
- Progress indicator.
- Pesan singkat dan informatif.

Jangan menggunakan spinner agresif atau animasi yang terlalu cepat.

---

# 8. State Management Rules

State journey harus dipisahkan berdasarkan tahap:

```text
maskState
loadState
needState
actionState
sessionState
```

Contoh data sesi:

```ts
type ReflectionSession = {
  id: string;
  createdAt: string;
  mask: {
    publicPersona: string[];
    internalFeelings: string[];
    customPublicPersona?: string;
    customInternalFeeling?: string;
  };
  load: {
    brainDump: string;
    burdens: Burden[];
  };
  need: {
    insights: Insight[];
    selectedInsight?: string;
  };
  action: {
    selectedAction?: MicroActionType;
    completed: boolean;
  };
};
```

Aturan:

- Jangan menyimpan state penting hanya di komponen visual jika diperlukan oleh halaman lain.
- Jangan mengubah state secara langsung.
- Gunakan immutable update.
- Hindari state duplikat yang dapat menimbulkan inkonsistensi.
- Pisahkan temporary session state dan persisted history state.

---

# 9. Storage Rules

## 9.1 Temporary Session Data

Data sementara selama journey dapat disimpan menggunakan:

- React state.
- Context.
- Session storage.
- State management library jika diperlukan.

Temporary data harus dapat dihapus ketika pengguna memilih:

```text
Tutup Sesi & Hapus Buffer
```

---

## 9.2 Persistent Local Data

Riwayat refleksi disimpan menggunakan IndexedDB atau mekanisme local storage yang sesuai.

Data yang dapat disimpan:

- ID sesi.
- Tanggal sesi.
- Ringkasan kebutuhan utama.
- Micro-action yang dipilih.
- Status penyelesaian.
- Data ringkasan yang diperlukan untuk riwayat.

Hindari menyimpan data mentah yang tidak diperlukan.

---

## 9.3 Clear Data

Fitur penghapusan data harus:

- Menghapus seluruh sesi lokal.
- Memerlukan confirmation modal.
- Menjelaskan bahwa tindakan tidak dapat dibatalkan.
- Tidak menghapus data di luar aplikasi.
- Menampilkan feedback setelah berhasil.

---

# 10. AI Integration Rules

AI hanya berfungsi sebagai alat bantu refleksi, bukan sebagai tenaga profesional kesehatan mental.

Aturan:

- Gunakan bahasa yang tentatif, bukan diagnosis.
- Hindari pernyataan absolut seperti "Kamu mengalami depresi".
- Gunakan frasa seperti:
  - "Mungkin ada kebutuhan..."
  - "Hal ini dapat mengarah pada..."
  - "Apakah ini terasa sesuai dengan pengalamanmu?"
- Pengguna harus dapat menolak atau mengedit insight AI.
- Jangan menganggap hasil AI selalu benar.
- Sediakan fallback jika AI gagal.
- Jangan membuat pengguna terjebak ketika API tidak tersedia.
- Jangan menampilkan API key di client-side code.

Contoh fallback:

```text
Kami belum dapat menyusun insight secara otomatis.
Kamu tetap dapat menuliskan kebutuhanmu sendiri secara manual.
```

---

# 11. Interaction Rules

## 11.1 Interactive Comparison Slider

Comparison slider harus:

- Dapat digunakan dengan mouse.
- Dapat digunakan dengan touch.
- Memiliki keyboard accessibility jika memungkinkan.
- Memiliki handle yang mudah ditemukan.
- Tidak menghalangi keterbacaan konten.
- Menampilkan perubahan secara halus.

---

## 11.2 Drag and Drop Burden Cards

Drag-and-drop harus memiliki alternatif non-drag:

- Tombol pindahkan ke kategori.
- Menu pilihan kategori.
- Dukungan keyboard jika memungkinkan.

Kategori:

1. Dalam Kendaliku.
2. Perlu Dikomunikasikan.
3. Di Luar Kendaliku.

---

## 11.3 Breathing Tool

Animasi pernapasan harus:

- Memiliki ritme yang konsisten.
- Tidak terlalu cepat.
- Dapat dijeda.
- Memiliki instruksi teks.
- Tidak hanya mengandalkan warna atau gerakan.
- Menghormati `prefers-reduced-motion`.

---

# 12. Responsive Design Rules

Aplikasi harus optimal pada:

- Desktop.
- Laptop.
- Tablet.
- Mobile.

Aturan:

- Jangan menggunakan fixed width yang menyebabkan horizontal scrolling.
- Grid harus berubah menjadi stack pada layar kecil.
- Navbar desktop harus memiliki versi mobile yang jelas.
- Tombol CTA harus tetap mudah disentuh.
- Drag-and-drop harus memiliki fallback mobile.
- Comparison card harus tetap terbaca pada mobile.
- Emergency contact harus mudah diakses pada mobile.
- Hindari teks terlalu kecil.

Breakpoint harus mengikuti kebutuhan layout, bukan sekadar mengikuti perangkat tertentu.

---

# 13. Accessibility Rules

Wajib memperhatikan:

- Kontras warna yang memadai.
- Focus indicator.
- Semantic HTML.
- Label pada input.
- Alt text untuk gambar bermakna.
- Keyboard navigation.
- ARIA hanya jika diperlukan.
- Jangan mengandalkan warna saja untuk membedakan status.
- Semua modal dapat ditutup dengan aman.
- Animasi menghormati `prefers-reduced-motion`.
- Teks tombol harus menjelaskan tindakan.

Contoh:

```text
Kurang baik:
Klik di sini

Lebih baik:
Simpan Refleksi
```

---

# 14. Error Handling

Semua proses asynchronous harus memiliki:

- Loading state.
- Success state.
- Error state.
- Retry atau fallback jika relevan.

Kasus yang harus ditangani:

- AI request gagal.
- IndexedDB tidak tersedia.
- Browser storage penuh.
- Clipboard tidak diizinkan.
- Export PNG gagal.
- Data sesi tidak ditemukan.
- Pengguna membuka `/canvas` tanpa sesi aktif.
- Pengguna menghapus data ketika halaman masih terbuka.

Pesan error harus:

- Ramah.
- Tidak teknis bagi pengguna umum.
- Tidak menyalahkan pengguna.
- Memberikan langkah berikutnya.

---

# 15. Security and Privacy

Developer dilarang:

- Menyimpan API key di repository.
- Menyimpan API key di frontend.
- Mencetak isi refleksi ke console production.
- Mengirim data pribadi tanpa persetujuan.
- Menggunakan tracking yang tidak diperlukan.
- Menyimpan data sensitif di URL.
- Menggunakan dependency yang tidak terpercaya.
- Mengabaikan validasi input.
- Menganggap local storage sebagai tempat penyimpanan yang sepenuhnya aman dari akses pengguna lain pada perangkat yang sama.

Gunakan:

- Environment variables untuk secret.
- Sanitasi input.
- Validasi data.
- Dependency yang diperbarui.
- Confirmation sebelum penghapusan.
- Informasi privasi yang transparan.

---

# 16. Performance Rules

Prioritaskan:

- Komponen reusable.
- Lazy loading halaman atau fitur yang berat.
- Optimasi gambar.
- Penggunaan SVG untuk ikon sederhana.
- Menghindari re-render yang tidak diperlukan.
- Menghindari dependency besar tanpa alasan.
- Debounce untuk input atau pencarian jika diperlukan.
- Animasi menggunakan transform dan opacity jika memungkinkan.
- Tidak menjalankan proses berat pada main thread tanpa kebutuhan.

Jangan:

- Memuat seluruh asset sekaligus jika tidak diperlukan.
- Menggunakan video atau gambar berukuran besar tanpa optimasi.
- Menjalankan animasi terus-menerus tanpa alasan.
- Membuat efek visual yang mengurangi performa perangkat low-end.

---

# 17. Naming Convention

## 17.1 Folder

Gunakan `kebab-case` atau aturan konsisten yang disepakati tim.

Contoh:

```text
my-space/
reflection-canvas/
micro-actions/
```

## 17.2 Component

Gunakan `PascalCase`.

```text
Navbar.tsx
ComparisonSlider.tsx
InsightCard.tsx
```

## 17.3 Function and Variable

Gunakan `camelCase`.

```ts
getReflectionSession()
saveSession()
selectedAction
```

## 17.4 Constants

Gunakan `UPPER_SNAKE_CASE`.

```ts
MAX_BREATHING_DURATION
REFLECTION_STEPS
STORAGE_KEY
```

## 17.5 Types and Interfaces

Gunakan `PascalCase`.

```ts
type ReflectionSession = {};
interface BurdenCardProps {}
```

---

# 18. Git Workflow

Gunakan alur berikut:

```text
Issue
  ↓
Create Branch
  ↓
Development
  ↓
Local Testing
  ↓
Commit
  ↓
Push
  ↓
Pull Request
  ↓
Code Review
  ↓
Merge
  ↓
Integration Testing
```

Contoh branch:

```text
feature/landing-page
feature/reflection-journey
feature/reflection-canvas
feature/my-space
feature/support-page
fix/storage-error
fix/mobile-navbar
refactor/reusable-cards
```

---

# 19. Commit Convention

Gunakan conventional commits.

Format:

```text
type(scope): description
```

Contoh:

```text
feat(landing): add hero comparison slider
feat(journey): implement mask reflection step
feat(storage): add IndexedDB session persistence
fix(canvas): handle missing session state
fix(support): improve mobile hotline layout
refactor(ui): extract reusable card component
style(navbar): adjust desktop spacing
docs: update development guide
test(journey): add action selection validation
```

Jenis commit:

- `feat`
- `fix`
- `refactor`
- `style`
- `docs`
- `test`
- `chore`
- `perf`

---

# 20. Testing Requirements

Sebelum Pull Request, developer wajib memastikan:

## Functional Testing

- Semua route dapat dibuka.
- CTA mengarah ke halaman yang benar.
- Wizard dapat berpindah langkah.
- Input dapat disimpan.
- Validasi berjalan.
- Burden card dapat dikategorikan.
- Pengguna hanya dapat memilih satu micro-action.
- Canvas menampilkan data sesi yang benar.
- Data dapat disimpan ke ruang pribadi.
- Data dapat dihapus.
- Tombol clipboard bekerja atau menampilkan fallback.
- Breathing tool dapat dimulai, dijeda, dan diselesaikan.
- Hotline link bekerja pada perangkat yang mendukungnya.

## UI Testing

- Tidak ada layout overflow.
- Tidak ada elemen bertumpuk.
- Tidak ada teks terpotong.
- Hover dan focus state tersedia.
- Dark mode jika diimplementasikan tetap terbaca.
- Mobile layout tetap nyaman digunakan.

## Technical Testing

- Tidak ada syntax error.
- Tidak ada console error.
- Tidak ada warning penting.
- Build berhasil.
- Tidak ada secret dalam repository.
- Tidak ada API key yang terekspos.
- Storage error ditangani.
- AI failure memiliki fallback.

---

# 21. Pull Request Checklist

Sebelum membuat Pull Request:

- [ ] Fitur sesuai issue.
- [ ] Tidak mengubah fitur di luar scope.
- [ ] Komponen reusable digunakan jika relevan.
- [ ] Tidak ada duplikasi kode yang tidak perlu.
- [ ] Tidak ada console error.
- [ ] Tidak ada secret atau API key.
- [ ] Responsive pada desktop dan mobile.
- [ ] Loading, empty, error, dan success state tersedia.
- [ ] Accessibility dasar telah diperiksa.
- [ ] Privacy behavior telah diperiksa.
- [ ] Build berhasil.
- [ ] Screenshot atau screen recording disertakan.
- [ ] Dokumentasi diperbarui jika diperlukan.

---

# 22. Code Review

Reviewer akan memeriksa:

- Struktur folder.
- Separation of concern.
- Reusability.
- Naming convention.
- Konsistensi design system.
- Responsiveness.
- Accessibility.
- Performance.
- Security.
- Privacy.
- Error handling.
- Kesesuaian dengan scope issue.
- Tidak adanya perubahan business logic yang tidak diminta.

Pull Request dapat diminta untuk diperbaiki apabila:

- Mengandung duplikasi besar.
- Menyebabkan regresi.
- Mengabaikan privacy requirement.
- Tidak memiliki error handling.
- Mengubah komponen global tanpa alasan jelas.
- Menghasilkan UI yang tidak konsisten.
- Tidak dapat dijalankan atau di-build.

---

# 23. Content and Ethical Guidelines

UNMASKED bukan platform diagnosis atau terapi klinis.

Seluruh copywriting harus:

- Empatik.
- Tidak menghakimi.
- Tidak bersifat memerintah secara agresif.
- Tidak menjanjikan kesembuhan.
- Tidak mengklaim AI dapat menentukan diagnosis.
- Mengarahkan pengguna ke bantuan profesional jika diperlukan.

Gunakan:

```text
Mungkin kamu sedang membutuhkan ruang untuk beristirahat.
```

Hindari:

```text
Kamu pasti mengalami burnout berat.
```

Gunakan:

```text
Apakah insight ini terasa sesuai dengan pengalamanmu?
```

Hindari:

```text
AI telah menemukan masalah psikologismu.
```

---

# 24. Documentation Rules

Dokumentasi wajib diperbarui jika terdapat perubahan pada:

- Route.
- Struktur folder.
- State management.
- IndexedDB schema.
- Format data sesi.
- Integrasi AI.
- Design tokens.
- Komponen global.
- Privacy behavior.
- Alur journey.
- Dependency utama.

Dokumentasi minimal untuk fitur baru:

- Tujuan fitur.
- Route atau lokasi fitur.
- Struktur data.
- State yang digunakan.
- Kondisi error.
- Screenshot.
- Cara melakukan testing.

---

# 25. Project Goal

UNMASKED dikembangkan agar menjadi platform yang:

- Tenang dan nyaman digunakan.
- Empatik dan tidak menghakimi.
- Privat dan transparan.
- Modular.
- Reusable.
- Responsif.
- Accessible.
- Mudah dipelihara.
- Aman untuk pengembangan lanjutan.
- Tidak mengaburkan batas antara alat refleksi dan layanan klinis.

Setiap keputusan teknis dan desain harus mendukung prinsip utama:

> **UNMASKED membantu pengguna memahami dirinya, bukan mendefinisikan siapa dirinya.**
