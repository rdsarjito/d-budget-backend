<h1 align="center">D‑Budget – Backend (Express + MongoDB)</h1>

<p align="center">
  REST API untuk autentikasi pengguna via Google OAuth, serta CRUD pemasukan, pengeluaran, dan kategori.
  <br/>
  <a href="#penggunaan"><strong>Lihat cara penggunaan »</strong></a>
  <br/>
  <br/>
  <a href="#instalasi">Instalasi</a>
  ·
  <a href="#endpoints">Endpoints</a>
  ·
  <a href="#kontribusi">Kontribusi</a>
  ·
  <a href="#lisensi">Lisensi</a>
</p>

---

## Daftar Isi
- [Deskripsi](#deskripsi)
- [Fitur](#fitur)
- [Tech Stack](#tech-stack)
- [Instalasi](#instalasi)
  - [Prasyarat](#1-prasyarat)
  - [Clone & Dependensi](#2-clone--dependensi)
  - [Variabel Lingkungan](#3-variabel-lingkungan-env)
  - [Konfigurasi](#4-konfigurasi)
  - [Jalankan Lokal](#5-jalankan-lokal)
- [Endpoints](#endpoints)
- [Struktur Proyek](#struktur-proyek)
- [Penggunaan](#penggunaan)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

## Deskripsi
Backend untuk D‑Budget menyediakan autentikasi Google OAuth dan API terproteksi JWT untuk mengelola pemasukan, pengeluaran, serta kategori pengguna. Secara default berjalan di `http://localhost:5001`.

## Fitur
- Google OAuth (tukar code menjadi token dan profil pengguna)
- Penerbitan JWT (`accesToken`) dengan `ACCES_TOKEN_SECRET`
- Proteksi endpoint via middleware bearer token
- CRUD: income, expense, category terikat ke `userId`
- Endpoint kesehatan `/health` untuk memeriksa status koneksi MongoDB

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Token
- googleapis (OAuth2)
- cors, body-parser, dotenv

## Instalasi

### 1) Prasyarat
- Node.js 14+ (disarankan 16/18)
- MongoDB instance (lokal atau layanan cloud)
- Google Cloud OAuth Client (OAuth 2.0) Web/Desktop

### 2) Clone & Dependensi
```bash
git clone https://github.com/<kamu>/d-budget.git
cd d-budget/d-budget-backend
npm install
```

### 3) Variabel Lingkungan (.env)
Buat file `.env` di `d-budget-backend/`:
```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/d_budget
ACCES_TOKEN_SECRET=ubah-ke-secret-yang-kuat
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 4) Konfigurasi
- File `config/keys.js` membaca `.env` dan mengekspor `mongoURI`, `googleClientID`, `googleClientSecret`, dan `accesTokenSecret`.
- `index.js` mengikat route pada base path: `/income`, `/expense`, `/category`, `/user` dan membuka port `process.env.PORT || 5001`.

### 5) Jalankan Lokal
```bash
npm run server
# Server: http://localhost:5001
```

## Endpoints

Autentikasi bearer: kirim header `Authorization: Bearer <accesToken>` untuk endpoint terproteksi.

- `POST /user`
  - Body: `{ "code": "<google oauth code>" }`
  - Res: `{ accesToken: string }`

- `GET /user`
  - Header: `Authorization: Bearer <accesToken>`
  - Res: payload JWT (profil singkat)

- `POST /income` (protected)
  - Body: `{ data: { description, amount, category } }`
  - Res: income yang tersimpan

- `GET /income` (protected) → daftar income milik user
- `DELETE /income/:id` (protected)

- `POST /expense` (protected)
  - Body: `{ data: { description, amount, category } }`
  - Res: expense yang tersimpan

- `GET /expense` (protected) → daftar expense milik user
- `DELETE /expense/:id` (protected)

- `POST /category` (protected)
  - Body: `{ data: { category, color, typeBalance } }`
- `GET /category` (protected)
- `DELETE /category/:id` (protected)

- `GET /health` → `{ dbReadyState: 0|1|2|3 }`

## Struktur Proyek
```
.
├─ config/
│  └─ keys.js               # Baca .env dan ekspor kredensial
├─ controllers/             # Logika endpoint (user, income, expense, category)
├─ middlewares/
│  └─ accesToken.js         # Verifikasi JWT dari header Authorization
├─ models/                  # Skema Mongoose (User, Income, Expense, Category)
├─ routes/                  # Route Express per resource
├─ index.js                 # Bootstrapping app dan koneksi MongoDB
└─ package.json             # Scripts & dependencies
```

## Penggunaan
1. Jalankan backend (`npm run server`).
2. Dari frontend, login dengan Google untuk mendapatkan `accesToken`.
3. Simpan `accesToken` di client dan sertakan pada header Authorization saat memanggil endpoint protected.

## Kontribusi
1. Fork repository dan buat branch baru.
2. Tambahkan perubahan dengan commit message yang jelas.
3. Jangan commit secret; gunakan `.env`.
4. Ajukan Pull Request dengan deskripsi singkat.

## Lisensi
MIT License.


