# 🌊 Pandeglang Explore

> "Tempat di mana birunya samudra bertemu dengan hijaunya pegunungan. Keajaiban abadi menanti langkah Anda."

**Pandeglang Explore** adalah platform web interaktif yang dirancang untuk mempromosikan pariwisata dan kekayaan budaya Kabupaten Pandeglang, Banten. Aplikasi ini menyajikan informasi destinasi wisata, kuliner, budaya, dan event lokal dengan antarmuka yang modern, imersif, dan responsif.

![Pandeglang Explore Preview](public/og-image.png)

## ✨ Fitur Unggulan

- **🗺️ Peta Interaktif**: Jelajahi destinasi wisata, kuliner, dan spot tersembunyi (*Hidden Gems*) melalui peta yang terintegrasi dengan filter kategori.
- **🍛 Wisata Kuliner**: Direktori kuliner lokal lengkap dengan deskripsi, harga, dan lokasi terbaik.
- **📅 Kalender Event**: Informasi terkini mengenai festival budaya, acara musik, dan kegiatan komunitas di Pandeglang.
- **📚 Cerita Budaya (Discovery Story)**: Pengalaman bercerita imersif (*scrollytelling*) yang memperkenalkan pengguna pada sejarah dan legenda lokal.
- **📸 Galeri Foto**: Koleksi visual berkualitas tinggi yang menampilkan keindahan alam Pandeglang.
- **⚠️ Sistem Peringatan Dini**: Integrasi data *real-time* dari BMKG dan MAGMA Indonesia untuk status cuaca dan aktivitas vulkanik (Anak Krakatau).
- **♿ Aksesibilitas**: Antarmuka ramah pengguna dengan dukungan navigasi keyboard dan *screen reader*.
- **🌐 Dukungan Multi-bahasa**: Tersedia dalam Bahasa Indonesia dan Bahasa Inggris.

## 🛠️ Teknologi yang Digunakan

Aplikasi ini dibangun menggunakan teknologi web modern untuk menjamin performa, keamanan, dan pengalaman pengguna terbaik:

- **Frontend Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/) - Untuk performa cepat dan *developer experience* yang optimal.
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Menjamin keamanan tipe data dan mengurangi bug.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Framework CSS *utility-first* untuk desain responsif yang cepat.
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) - Komponen aksesibel dan mudah dikustomisasi.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Untuk animasi antarmuka yang halus dan interaktif.
- **Map Integration**: [Leaflet](https://leafletjs.com/) / [React-Leaflet](https://react-leaflet.js.org/) - Peta interaktif.
- **State Management**: React Context API & Hooks.
- **Routing**: [React Router](https://reactrouter.com/).

## 🚀 Panduan Instalasi & Menjalankan Proyek

Pastikan Anda memiliki [Node.js](https://nodejs.org/) (versi 18 atau terbaru) terinstal di komputer Anda.

### 1. Clone Repository

```bash
git clone https://github.com/Rifallll/pandeglangexplore.git
cd pandeglangexplore
```

### 2. Instalasi Dependensi

```bash
npm install
```

### 3. Jalankan Mode Pengembangan (Local)

```bash
npm run dev
```

Buka browser dan akses `http://localhost:5173` (atau port yang ditampilkan di terminal).

### 4. Build untuk Production

```bash
npm run build
```

File hasil build akan tersimpan di folder `dist/`.

### 5. Preview Hasil Build

```bash
npm run preview
```

## 📂 Struktur Proyek

```
pandeglangexplore/
├── public/              # Aset statis (gambar, ikon, dll)
├── src/
│   ├── components/      # Komponen UI (Atomic & Molekul)
│   │   ├── ui/          # Komponen dasar (shadcn/ui)
│   ├── context/         # React Context (State, Auth, Theme)
│   ├── data/            # Data statis (JSON/TS)
│   ├── hooks/           # Custom React Hooks
│   ├── lib/             # Utilitas & Helper functions
│   ├── pages/           # Halaman utama aplikasi (Routing)
│   ├── services/        # Integrasi API (BMKG, Magma, dll)
│   ├── styles/          # File CSS global
│   ├── App.tsx          # Root Component
│   └── main.tsx         # Entry Point
├── package.json         # Konfigurasi dependensi
├── tailwind.config.ts   # Konfigurasi Tailwind CSS
├── tsconfig.json        # Konfigurasi TypeScript
└── vite.config.ts       # Konfigurasi Vite
```

## 🤝 Kontribusi

Kontribusi sangat diterima! Jika Anda ingin berkontribusi:

1. *Fork* repository ini.
2. Buat *branch* fitur baru (`git checkout -b fitur-keren`).
3. *Commit* perubahan Anda (`git commit -m 'Menambahkan fitur keren'`).
4. *Push* ke branch (`git push origin fitur-keren`).
5. Buat *Pull Request*.

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

Dibuat dengan ❤️ oleh Tim Pengembang **Pandeglang Explore**.
Semoga aplikasi ini dapat memajukan pariwisata Banten! 🇮🇩
