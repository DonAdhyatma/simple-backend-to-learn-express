# Simple Backend API with Express.js

Proyek ini adalah aplikasi backend sederhana menggunakan **Express.js** untuk tujuan pembelajaran. Aplikasi menyediakan beberapa endpoint untuk data statis dan data yang bisa dimodifikasi sementara di memori.

## 📦 Instalasi

1. Clone repository ini

```bash
git clone https://github.com/DonAdhyatma/simple-backend-to-learn-express.git
cd simple-backend-to-learn-express
```

2. Install dependencies

```bash
npm install
```

3. Install nodemon untuk development (jika belum ada)

```bash
npm install -g nodemon
```

4. Jalankan server

```bash
# Untuk development (dengan auto-restart)
npm run dev

# Atau jalankan langsung dengan node
node index.js
```

5. Server akan berjalan di:

```
http://localhost:4001
```

## 📚 Daftar Endpoint

### 1. Root Endpoint

**GET** `/`  
Menampilkan halaman HTML dengan daftar endpoint yang tersedia.

### 2. Data Owner App

**GET** `/data/owner-app`  
Response:

```json
{
  "owner": "Danni A. Rachman",
  "app": "Simple backend app to learn express",
  "version": "1.0.0"
}
```

### 3. Data Cuaca

**GET** `/data/weathers`  
Response: daftar tipe cuaca.

### 4. Data Bulan

- **GET** `/data/months` → daftar semua bulan dengan `id` dan `month`
- **GET** `/data/months/:id` → bulan sesuai ID (1–12)

Contoh: `/data/months/1`

```json
{
  "id": 1,
  "month": "Januari"
}
```

**Validasi:**

- Jika ID bukan angka → status `400` dengan pesan `"ID bulan harus berupa angka"`
- Jika ID di luar 1–12 → status `400` dengan pesan `"ID bulan harus antara 1-12"`

### 5. Visitors

- **GET** `/data/visitors` → menampilkan semua data visitor
- **POST** `/data/visitors` → menambahkan visitor baru

Payload:

```json
{
  "name": "John Doe",
  "visitDate": "2025-08-09"
}
```

### 6. Hobbies

- **GET** `/hobbies` → daftar hobi
- **POST** `/hobbies` → tambah hobi baru

Payload:

```json
{
  "hobby": "Bermain gitar"
}
```

### 7. Dream Jobs

- **GET** `/dream-jobs` → daftar pekerjaan impian
- **POST** `/dream-jobs` → tambah pekerjaan impian

Payload:

```json
{
  "job": "Software Engineer",
  "reason": "Suka memecahkan masalah dengan teknologi"
}
```

### 8. Daftar Endpoint Kategori Data

**GET** `/data`  
Menampilkan semua endpoint kategori data kecuali `/data` itu sendiri.

### 9. 404 Handler

Jika endpoint tidak ditemukan, response:

```json
{
  "error": "Endpoint tidak ditemukan",
  "message": "Endpoint '/path-yang-tidak-ada' tidak ada di API ini",
  "solve": "Silakan kembali ke root endpoint untuk melihat daftar endpoint yang tersedia"
}
```

## ⚙ Catatan

- Semua data disimpan di **memori sementara**. Saat server restart, data akan kembali ke kondisi awal.
- Cocok untuk latihan **REST API** dasar dengan Express.js.
- Menggunakan **nodemon** untuk development agar server otomatis restart saat ada perubahan code.
- Endpoint `/data/months/:id` sekarang memiliki validasi tambahan:
  - Memastikan ID adalah angka (`isNaN` check)
  - Memastikan angka antara 1–12

## 🚀 Scripts yang Tersedia

- `npm run dev` - Menjalankan server dengan nodemon (auto-restart)
- `node index.js` - Menjalankan server langsung dengan node

## 🛠 Dependencies

- **express** ^5.1.0 - Web framework untuk Node.js
- **nodemon** - Development tool untuk auto-restart server (global)

## 📌 Lisensi

Proyek ini bebas digunakan untuk keperluan pembelajaran.
