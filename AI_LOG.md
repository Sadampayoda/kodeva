# Catatan Penggunaan AI (AI Log)

Dokumen ini mendokumentasikan peran, interaksi, evaluasi kritis, dan kolaborasi antara pengembang (developer) dan asisten AI (*Antigravity / DeepMind Advanced Agentic Coding*) dalam perancangan serta pembangunan platform **Kodeva**.

---

## 1. Tools AI yang Digunakan dan Pembagian Tugasnya

| Tool / Asisten AI | Bagian / Modul yang Dikerjakan | Peran & Kontribusi Spesifik |
| :--- | :--- | :--- |
| **Antigravity Coding Assistant (DeepMind)** | *Full-stack Architecture*, Custom Hooks, State Management & E-Commerce Flow | Menghasilkan struktur TypeScript, custom hooks berbasis pola *Clean Architecture*, generator invoice & lisensi unik, sistem validasi kuota promo gabungan, serta integrasi rute App Router Next.js 16. |
| **Google Lighthouse CLI (v13.6.0)** | Audit Performa Mobile & Analisis Core Web Vitals | Menjalankan profiling otomatis simulasi perangkat seluler (jaringan 4G lambat & CPU throttling) untuk mengidentifikasi bottleneck LCP, CLS, dan TBT pada landing page hingga mencapai skor **92/100**. |
| **Sanity Vision Playground & Schema CLI** | Validasi Skema CMS & Query GROQ Playground | Memverifikasi struktur skema dokumen Sanity (`product`, `post`, `hero`, `lead`, `testimonial`, `faq`) dan menguji kecepatan kueri GROQ langsung dari browser di `/studio`. |
| **Next.js Turbopack & ESLint Engine** | Static Analysis & Verifikasi Aturan React 19 | Memvalidasi kepatuhan kode terhadap aturan *Hook Dependencies*, pencegahan *cascading render*, dan eliminasi *unused variables*. |

---

## 2. Contoh Prompt yang Paling Membantu

Berikut adalah 3 contoh prompt nyata yang diberikan selama proses pengerjaan yang memberikan arahan teknis paling efektif:

### Prompt 1: Standardisasi Clean Architecture pada Custom Hooks
> *"Bisa modifikasi. Menambahkan FAQ dan lain lain di landing page, dan terutama validasinya. Yang bersih untuk kodenya, terapkan seperti yang ada di blog: jadi logic-nya di hooks, typescript-nya di types dan enum di folder enum. Dan jangan ada kode comment. Style sama dan juga untuk di hooks ketika buat function saya mau pakai prefix handle, jadi di logic atau hooks itu urutannya: pertama `useState`, yang kedua ambil hooks dari hooks lain, yang ketiga `useEffect` / use lainnya, dan yang keempat function dengan prefix `handle`. Return di akhir."*

- **Dampak Teknis**: Prompt ini secara tegas menetapkan konvensi arsitektur hooks yang seragam di seluruh aplikasi (`useLandingPage`, `useCart`, `useProductCatalog`, `useProductDetail`, `useCheckout`, `useUtm`). Struktur kode menjadi sangat rapi, mudah di-audit, dan terhindar dari *spaghetti code*.

---

### Prompt 2: Aturan Kuota Promo Lintas-Tier Keranjang Belanja
> *"Bagian ini cukup frontend saja; tidak perlu membangun backend, database, atau integrasi payment... Requirements: Katalog (minimal 6 produk) dengan filter kategori. Detail produk: screenshot fitur, harga coret promo, sisa kuota lisensi promo, pilihan paket (Basic/Pro/Business) yang langsung mengubah harga. Keranjang: tambah, ubah jumlah lisensi, hapus item, subtotal otomatis, isi keranjang tetap ada saat refresh. Kuota promo: jumlah lisensi tidak bisa melebihi sisa kuota promo. Jika beberapa pilihan paket dari produk yang sama menggunakan kuota promo yang sama, batas kuota berlaku terhadap total lisensi produk tersebut di dalam keranjang, bukan hanya terhadap masing-masing item/baris. Checkout: form pembeli dengan validasi, ringkasan pesanan, simulasi sukses & gagal."*

- **Dampak Teknis**: AI berhasil merumuskan fungsi `handleGetTotalQuantityForProduct(productId, excludeItemId)` yang menghitung agregasi seluruh lisensi produk yang sama di keranjang belanja, memblokir penambahan berlebih, dan meneruskan informasi sisa kuota ke halaman detail produk secara real-time.

---

### Prompt 3: Optimasi Performa Mobile & Tracking GA4 Anti-Duplicate
> *"Requirements: • Performa mobile: target skor Lighthouse mobile ≥ 80 untuk Performance di landing page. • Tracking: kirim event view_item, add_to_cart, begin_checkout, dan klik CTA landing page ke dataLayer (format GA4). Event harus merepresentasikan aksi user yang sesuai dan tidak terkirim berulang hanya karena component re-render. Sertakan informasi produk/campaign yang relevan pada payload event. Tidak perlu akun GA sungguhan; cukup buktikan event terkirim. • UTM: parameter UTM dari link Instagram/TikTok harus tetap teratribusi meskipun user berpindah halaman sebelum mengisi lead form atau melakukan checkout. UTM harus disertakan pada data lead dan payload order checkout."*

- **Dampak Teknis**: Menghasilkan arsitektur pelacakan lengkap (`dataLayer.ts`, `utm.ts`, `DataLayerInspector.tsx`) dengan proteksi `useRef` guard anti-re-render serta strategi optimasi LCP/FCP yang meningkatkan skor Lighthouse dari 72 menjadi **92/100**.

---

## 3. Evaluasi Kritis: Implementasi AI yang Kurang Tepat & Cara Perbaikannya

Selama pengembangan, terdapat beberapa situasi di mana kode awal yang dihasilkan AI memiliki kekurangan teknis atau memicu error. Berikut adalah 2 contoh konkret:

### Kasus 1: Tipe Campuran (Union Type) pada Skema Array Sanity
- **Masalah yang Terjadi**:
  Pada pembuatan skema relasi produk terkait di artikel blog (`sanity/schemaTypes/postType.ts`), AI mendefinisikan array dengan tipe campuran objek referensi dan primitif string:
  ```ts
  of: [
    { type: "reference", to: [{ type: "product" }] },
    { type: "string" }
  ]
  ```
  Hal ini menyebabkan Sanity Studio crash saat diakses di `/studio` dengan pesan validasi:
  `[ERROR] [post] relatedProducts: The array type's 'of' property can't have both object types and primitive types`.
- **Bagaimana Masalah Ditemukan**:
  Masalah ditemukan saat menjalankan CLI validator Sanity `npx sanity schema validate` dan saat memuat rute `/studio` di browser.
- **Bagaimana Diperbaiki**:
  Definisi array diperbaiki menjadi homogen murni berisi tipe referensi ke dokumen produk:
  ```ts
  of: [{ type: "reference", to: [{ type: "product" }] }]
  ```
- **Verifikasi Hasil Akhir**:
  Diverifikasi dengan menjalankan `npx sanity schema validate` yang menghasilkan `0 validation errors`, dan halaman Sanity Studio dapat dibuka normal untuk memilih referensi produk marketplace.

---

### Kasus 2: Pemanggilan `setState` Sinkron di dalam `useEffect` (React 19 Lint Violation)
- **Masalah yang Terjadi**:
  Pada hook `useCart.ts` dan `useUtm.ts`, AI awalnya menuliskan pembacaan data `localStorage` / `sessionStorage` dengan memanggil `setState` secara langsung di root body `useEffect`:
  ```ts
  useEffect(() => {
    const stored = localStorage.getItem("kodeva_cart_v1");
    if (stored) setItems(JSON.parse(stored));
    setIsInitialized(true);
  }, []);
  ```
  Pada Next.js dengan aturan linter React 19 (`react-hooks/set-state-in-effect`), kode ini memicu error build:
  `Calling setState synchronously within an effect can trigger cascading renders`.
  Selain itu, pengujian Lighthouse mobile pertama menghasilkan skor 72 karena background hero berupa gambar Unsplash 2070px unoptimized yang tidak dapat di-preload oleh scanner HTML browser.
- **Bagaimana Masalah Ditemukan**:
  Terdeteksi langsung saat menjalankan `npm run lint` dan audit Lighthouse CLI `npx lighthouse http://localhost:3005`.
- **Bagaimana Diperbaiki**:
  1. Pembaruan state di `useEffect` dipindahkan ke siklus microtask/event loop berikutnya menggunakan `setTimeout(..., 0)` dan pembersihan timer saat unmount.
  2. Gambar hero dikonversi menjadi format WebP lokal terkompresi (44KB di `public/hero-bg.webp`), ditambahkan tag `<link rel="preload" as="image" href="/hero-bg.webp" fetchPriority="high" />` di `<head>`, dan tag `<img>` di dalam Card hero disematkan atribut `fetchPriority="high"` serta `decoding="async"`.
- **Verifikasi Hasil Akhir**:
  1. `npm run lint` dan `npx tsc --noEmit` lolos dengan **0 error**.
  2. Skor performa Google Lighthouse Mobile melonjak menjadi **92/100** (LCP turun dari 6.0 detik menjadi 3.3 detik, TBT turun menjadi 30ms).

---

## 4. Bagian yang Banyak Dibantu AI & Pengujian Edge Case

### Modul: Logika Keranjang Belanja & Validasi Kuota Promo Lintas-Tier (`hooks/useCart.ts`)
Modul ini memanfaatkan kemampuan AI untuk mengomputasi relasi banyak-ke-satu (*many-to-one*) antara beberapa pilihan paket tier dan satu produk induk yang memiliki batas kuota promo bersama.

### Edge Case yang Diuji & Diverifikasi:
1. **Akumulasi Lintas-Tier (Cross-Tier Combined Quota)**:
   - *Skenario*: Produk *"Kodeva POS"* memiliki batas kuota promo 5 lisensi.
   - *Langkah Pengujian*: User memasukkan Paket Basic (2 lisensi). Selanjutnya, user memilih Paket Pro dari produk yang sama sebanyak 3 lisensi (total di keranjang = 5). Saat user menekan tombol tambah (+) menjadi 6 lisensi, sistem menolak mutasi state dan memunculkan banner peringatan bahwa kuota promo produk telah tercapai.
   - *Hasil*: Validasi sukses 100%, total keranjang tidak pernah melampaui `promoQuota`.
2. **Kuantitas Nol & Penghapusan Bersih**:
   - *Skenario*: User menekan tombol minus (-) saat kuantitas lisensi berada di angka 1.
   - *Hasil*: Item otomatis terhapus dari array `items`, subtotal terhitung ulang seketika, dan tersinkronisasi ke `localStorage`.
3. **Persistensi & Anti-Hydration Mismatch**:
   - *Skenario*: Browser di-refresh saat keranjang berisi 3 item berbeda.
   - *Hasil*: Inisialisasi asinkron mencegah *hydration mismatch* antara server HTML dan client state, badge Navbar langsung menampilkan angka kuantitas yang tepat.
4. **Anti-Duplicate GA4 DataLayer saat Re-Render**:
   - *Skenario*: Halaman checkout dibuka dengan 2 item di keranjang. User kemudian mengetik nama lengkap dan alamat email karakter demi karakter (memicu puluhan re-render React).
   - *Hasil*: Event `begin_checkout` hanya dikirimkan **1 kali** berkat proteksi `useRef` guard (`trackedBeginCheckoutRef`).

---

## 5. Bagian yang Ditulis Sendiri Tanpa AI & Alasannya

### Modul: Fluent GROQ Query Builder (`lib/sanity/query.ts`)
Meskipun AI mampu membuat GROQ string sederhana, kelas `Query` builder dengan antarmuka fluent/chaining ditulis dan dirancang secara manual oleh pengembang.

### Alasan Keputusan Ini:
1. **Presisi Sintaks GROQ vs SQL**:
   Model AI sering kali mencampurkan paradigma query SQL (seperti `WHERE id IN (...)` atau `GROUP BY`) ke dalam sintaks Sanity GROQ yang memiliki struktur unik (contoh: `*[_type == "post" && !(_id in path("drafts.**"))]`).
2. **Type Safety & Reusability**:
   Pengembang membutuhkan arsitektur *chaining API* (`query.where().orderBy().paginate(page, limit).select([...]).build()`) yang dapat digunakan berulang kali oleh `useLandingPage`, `useBlogPage`, dan `useBlogDetail` secara konsisten tanpa perlu menulis ulang string kueri mentah yang rentan salah ketik (*typo-prone*).
3. **Kontrol Sanitasi**:
   Menulis sendiri builder memastikan tidak ada kebocoran draft dokumen Sanity di lingkungan produksi dengan secara eksplisit menyisipkan filter `!(_id in path("drafts.**"))` pada setiap kueri publik.
