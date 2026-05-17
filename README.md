# TokoHappy 🛍️

Website e-Commerce modern dibuat dengan React.js + Tailwind CSS.

## Cara Menjalankan

### 1. Install dependencies
```bash
npm install
```

### 2. Jalankan development server
```bash
npm run dev
```

Buka browser ke `http://localhost:5173`

## Cara Login

| Username | Password | Role   |
|----------|----------|--------|
| admin    | admin    | Admin  |
| (apapun) | (apapun) | Member |

## Fitur

### Admin
- ✅ Lihat daftar produk (dari API)
- ✅ Tambah produk baru
- ✅ Edit produk
- ✅ Hapus produk

### Member
- ✅ About Page dengan animasi
- ✅ Products Page dengan pencarian
- ✅ Tambah produk ke keranjang (qty > 0, merge otomatis)
- ✅ Cart Page dengan daftar belanja
- ✅ Checkout form (username, nama, telepon, email, alamat, rekening)
- ✅ Popup sukses: "Transaction success by [nama] with total price [harga]"
- ✅ Redirect ke About Page & keranjang dikosongkan setelah checkout

## API
Menggunakan: https://api.escuelajs.co/api/v1/products

## Tech Stack
- React 18
- React Router v6
- Tailwind CSS v3
- Vite
