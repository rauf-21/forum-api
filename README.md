# Forum API

## Cara setup environment variable

- Copy file `.env.development.local.example` dan `.env.test.local.example`
- Rename file-file yang telah di-copy tadi menjadi `.env.development.local` dan `.env.test.local`.
- Isi semua variabel yang ada di dalam 2 file tersebut

Anda bisa mengubah nama database di file `.env.development` dan `.env.test`.

## Cara setup database

### Migration up

Jalankan command `migrate-up` dan `migrate-up:test`.

### Migration down

Jalankan command `migrate-down` dan `migrate-down:test`.
