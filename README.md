# Belia Connect

Website komuniti dan sistem internal Belia Connect.

**Slogan:** Ianya bermula dari kami!

## Fungsi
- Website komuniti dengan identiti Belia Connect.
- Borang penyertaan tiga langkah dengan Aku Janji dan persetujuan penggunaan maklumat.
- Rekod ahli, carian, status keahlian dan eksport CSV.
- Pengurusan program dan peluang: tambah, edit, draf dan terbitkan.

## Teknologi
React, TypeScript, Vinext / Vite, Cloudflare Workers, Cloudflare D1 dan Drizzle.

## Setup pembangunan
Gunakan Node.js 22.13 atau lebih baharu dan pnpm. Pasang dependencies dengan `pnpm install --frozen-lockfile`, kemudian jalankan `pnpm dev`.

Semakan TypeScript: `pnpm exec tsc --noEmit`.
Binaan: `pnpm build`.
Migrasi skema: `pnpm db:generate`.

Rujuk [panduan runtime](docs/runtime.md) untuk butiran binding, migrasi tempatan dan authentication.

## Hosting dan akses
Kod ini ialah aplikasi server, bukan static export. GitHub Pages sahaja tidak menyokong API atau pangkalan data aplikasi ini.

Deployment semasa menggunakan ChatGPT Sites dengan Cloudflare D1 (`DB`). Authentication disediakan oleh platform Sites. Endpoint internal bergantung pada akses owner-private Site dan identiti yang disahkan oleh platform. Kekalkan akses peribadi; sebelum dibuka kepada umum atau dipindahkan ke hosting lain, tambah authorization khusus admin di halaman dan API internal serta semak semula integrasi authentication.

`.openai/hosting.json` mengekalkan identiti deployment asal; ia tidak mengandungi token. Jangan salin identiti projek ini untuk mencipta Site lain.

## Data dan rahsia
Repository hanya mengandungi source code, aset dan migrasi skema. Data ahli, data ujian tempatan, credentials, node_modules dan output build tidak disertakan. Simpan rahsia melalui pengurusan environment hosting.

## Validasi versi ini
- Semakan TypeScript dan binaan production lulus.
- Paparan website dan aliran borang disemak dalam pelayar.
- Penyimpanan pendaftaran serta versi Aku Janji diuji pada pangkalan data tempatan.

## Design dan kategori program
Versi semasa mengikut Concept 02 (Komuniti Profesional), dengan kategori program **Networking**, **Pembangunan** dan **CSR**. Kategori diwajibkan bagi program baharu dan boleh ditapis pada website serta dashboard. Rekod lama dikekalkan tanpa kategori sehingga dikemas kini oleh urusetia.

Ujian kategori: `node scripts/test-program-categories.mjs`. Rujuk [nota reka bentuk dan aset](docs/design.md).
