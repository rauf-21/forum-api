# Forum API

## Cara Setup

- Jalankan command `npm install`.
- Buat 2 database untuk **development** dan **test** environment.
- Copy file `.env.development.local.example` dan `.env.test.local.example`.
- Ubah name file yang telah di-copy menjadi `.env.development.local` dan `.env.test.local`.
- Isi semua variabel pada kedua file tersebut.
- Jalankan command `migrate-up` dan `migrate-up:test` untuk **migration up**. Gunakan command `migrate-down` dan `migrate-down:test` untuk **migration down**.
- Jalankan command `generate-db-types` untuk men-**generate database types**.
