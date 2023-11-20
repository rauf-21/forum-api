# Forum API

## Cara setup environment variable

- Copy file `.env.development.local.example` dan `.env.test.local.example`
- Rename file `.env.development.local.example` menjadi `.env.development.local`, dan `.env.test.local.example` menjadi `.env.test.local`
- Isi semua variabel yang ada di dalam 2 file tersebut

Anda bisa mengubah nama database di file `.env.development` dan `.env.test`.

## Cara setup database

### Migration up

Jalankan command `migration-up` dan `migration-up:test`.

### Migration down

Jalankan command `migration-down` dan `migration-down:test`.
