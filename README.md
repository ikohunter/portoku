# Portfolio — Hendra Agus Loriko

Website portofolio pribadi statis (HTML, CSS, JavaScript murni — tanpa
build process, tanpa backend) untuk personal branding profesional.
Dirancang agar dapat langsung di-hosting di **GitHub Pages**.

---

## 1. Struktur Folder

```
portfolio/
│
├── index.html              → Struktur & konten seluruh halaman
├── style.css                → Seluruh styling, tema warna, animasi, responsive
├── script.js                 → Interaksi: loader, dark/light mode, navbar,
│                                scroll reveal, render proyek & galeri, dsb.
├── README.md                 → Dokumen ini
│
├── assets/
│   ├── img/
│   │   ├── README.md         → Petunjuk mengganti foto profil & sampul
│   │   ├── projects/         → Thumbnail proyek (lihat README di dalamnya)
│   │   └── creative/          → Karya fotografi/videografi/desain
│   │
│   ├── cv/
│   │   └── README.md         → Petunjuk menambahkan file CV (PDF)
│   │
│   └── favicon/
│       └── favicon.svg       → Ikon tab browser (monogram "HL")
│
└── screenshots/               → Folder opsional, tidak dipakai oleh website
```

## 2. Penjelasan Fungsi Setiap File

- **`index.html`** — Menyusun seluruh section: Hero, About, Experience,
  Leadership, Projects, Creative Works, Skills, Achievements, Education,
  Contact, dan Footer. Semua konten diambil langsung dari data yang
  tersedia; tidak ada data yang dikarang.
- **`style.css`** — Sistem desain berbasis CSS custom properties (token
  warna, tipografi, spacing) agar mode gelap/terang konsisten. Berisi
  seluruh animasi (reveal saat scroll, hover, loader) dan media query
  responsive (1200px, 992px, 768px, 576px, 480px).
- **`script.js`** — Semua logika interaktif ditulis dengan JavaScript
  vanilla (tanpa framework/dependency eksternal):
  - Loading animation saat halaman pertama dibuka
  - Toggle dark/light mode (tersimpan di `localStorage`)
  - Navbar: efek saat scroll, menu hamburger di mobile, penanda link aktif
  - Scroll reveal menggunakan `IntersectionObserver`
  - Render kartu **proyek** dan **galeri kreatif** dari data JavaScript
    (lihat bagian 3 di bawah untuk menambah data baru)
  - Filter galeri (All / Photography / Videography / Design)
  - Tombol back-to-top
  - Partikel halus di hero section (dimatikan otomatis jika sistem
    pengguna mengaktifkan `prefers-reduced-motion`)

## 3. Menambahkan Konten Baru

**Proyek baru** — buka `script.js`, cari `var projects = [...]` di bagian
paling atas, lalu tambahkan objek baru mengikuti contoh yang sudah
disediakan di dalam komentar.

**Karya kreatif baru** — buka `script.js`, cari `var creativeWorks = [...]`,
lalu tambahkan objek baru (`category` harus `"photography"`,
`"videography"`, atau `"design"`).

**Foto profil, thumbnail proyek, foto galeri, CV** — belum disertakan
karena belum tersedia saat website dibuat. Setiap folder di `assets/`
memiliki `README.md` sendiri yang menjelaskan persis file apa yang perlu
ditambahkan dan baris kode mana yang perlu diaktifkan/diubah.

## 4. Menjalankan Secara Lokal

Tidak memerlukan server atau instalasi apa pun. Cukup buka file
`index.html` dengan double click, atau jalankan server statis sederhana
(opsional, agar path lebih konsisten):

```bash
# Python
python -m http.server 8000

# atau Node.js
npx serve .
```

Lalu buka `http://localhost:8000` di browser.

## 5. Deploy ke GitHub Pages

Ikuti langkah berikut dari dalam folder `portfolio/`:

### a. Buat repository di GitHub
Buat repository baru (misalnya bernama `portfolio`) melalui
[github.com/new](https://github.com/new). Boleh publik, jangan centang
opsi "Initialize with README" agar tidak bentrok.

### b. Inisialisasi Git & push kode

```bash
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
git remote add origin https://github.com/USERNAME/portfolio.git
git push -u origin main
```

Ganti `USERNAME` dengan username GitHub Anda, dan `portfolio` dengan nama
repository yang dibuat jika berbeda.

### c. Aktifkan GitHub Pages
1. Buka repository di GitHub → tab **Settings**.
2. Pilih menu **Pages** di sidebar kiri.
3. Pada **Build and deployment → Source**, pilih **Deploy from a branch**.
4. Pada **Branch**, pilih `main` dan folder `/ (root)`, lalu **Save**.
5. Tunggu beberapa menit, lalu website dapat diakses di:
   `https://USERNAME.github.io/portfolio/`

Karena seluruh path pada `index.html`, `style.css`, dan `script.js`
menggunakan **relative path** (contoh: `assets/img/profile.jpg`, bukan
`/assets/img/profile.jpg`), website akan tetap berfungsi normal baik
diakses dari root domain maupun dari subfolder seperti
`username.github.io/portfolio/`.

## 6. Teknologi

- HTML5 (semantic markup, satu `<h1>` utama, `alt` text, `aria-label`)
- CSS3 (custom properties, Grid & Flexbox, tanpa framework)
- JavaScript vanilla (tanpa build process)
- Google Fonts: **Fraunces** (display) & **Inter** (UI/body) via CDN
- Font Awesome (ikon) via CDN

Tidak ada dependensi PHP, Laravel, MySQL, Node.js server, maupun database
— 100% kompatibel dengan GitHub Pages sebagai static hosting.

## 7. Aksesibilitas & Performa

- Navigasi keyboard & `focus-visible` state pada semua elemen interaktif
- Menghormati preferensi `prefers-reduced-motion` (animasi dinonaktifkan
  otomatis jika pengguna mengaktifkannya di sistem)
- Kontras warna dijaga pada mode gelap maupun terang
- Tidak ada library berat maupun autoplay video
- Gambar memakai placeholder ringan (CSS/ikon) selagi aset asli belum
  tersedia, sehingga tidak ada broken image link

---

© 2026 Hendra Agus Loriko — Technology × Leadership × Creativity
