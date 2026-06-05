# Tugas Mata Kuliah: Pemrograman Web

## Aplikasi Manajemen Produk (Single Page Application)

Aplikasi ini adalah proyek web satu halaman (SPA) yang mensimulasikan manipulasi data CRUD (Create, Read, Update, Delete) secara dinamis menggunakan **Vanilla JavaScript**, **Fetch API (Async/Await)**, dan **DummyJSON API** sebagai _backend server_.

---

## 📂 Akses File Proyek

[![Buka index.html](https://img.shields.io/badge/Buka_File-index.html-blue?style=for-the-badge&logo=html5&logoColor=white)](index.html)
[![Buka style.css](https://img.shields.io/badge/Buka_File-style.css-darkgreen?style=for-the-badge&logo=css3&logoColor=white)](style.css)
[![Buka app.js](https://img.shields.io/badge/Buka_File-app.js-orange?style=for-the-badge&logo=javascript&logoColor=white)](app.js)

---

## 🌟 Fitur Utama Aplikasi

- **Menampilkan Data (GET):** Mengambil data produk awal dari API dan merendernya ke dalam bentuk Grid Card yang responsif.
- **Tambah Data (POST):** Menambahkan data baru melalui form input. dan menambahkan ke daftar yang sudah ada.
- **Edit Data (PUT):** Mengubah nama atau harga produk yang dipilih melalui form multifungsi dan memperbarui teks komponen DOM secara real-time.
- **Hapus Data (DELETE):** Menghapus element kartu produk secara instan dari layar tanpa memicu _reload_ halaman.
- **Error Handling:** Dilengkapi blok `try...catch` yang akan memunculkan kotak notifikasi merah informatif langsung di layar apabila koneksi internet terputus atau request gagal.

---

## 🚀 Cara Menjalankan Aplikasi Secara Lokal

**Clone Repositori Ini**

```bash
git clone git clone https://github.com/123ammar-sha/js-restfulapi-dummyjson.git
```

**Masuk Ke direktori hasil clone atau download repo**

<img width="1000" height="373" alt="image" src="https://github.com/user-attachments/assets/4d0c8c83-7432-4746-a7bb-b14c29ef5c44" />

**Jalankan File HTML**

Dobleclikc file index.html

<img width="1000" height="373" alt="image" src="https://github.com/user-attachments/assets/5aeff0ce-d57c-485b-a966-93c9d09be391" />


⚠️ Catatan Khusus: Karena DummyJSON merupakan Mock API, semua operasi data (Tambah/Ubah/Hapus) bersifat simulasi di sisi client dan tida
tersimpan permanen di database server mereka. Jika halaman di-refresh, daftar produk akan kembali ke data bawaan awal.

## 👨‍💻

Nama: Ammar Shafiy

NIM: IF0224009
