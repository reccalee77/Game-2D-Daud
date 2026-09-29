# Daud & Goliat — Penjaga Kawanan

Prototipe browser yang memakai aset GPT yang sudah tersedia. Tidak ada generasi gambar baru untuk tahap ini. Semua font memakai fallback lokal; game tidak mengunduh pustaka atau aset dari internet.

## Mainkan

Di Mac, buka `Mainkan.command`. Atau jalankan `python3 start_game.py --open` dari folder proyek. Jika port dipakai, tambahkan `--port 8766`. Buka alamat yang ditampilkan. Jangan membuka `index.html` langsung sebagai file karena browser perlu memuat metadata animasi melalui server lokal.

## Kontrol

| Tombol | Aksi |
|---|---|
| A / D atau panah kiri / kanan | Gerak |
| J | Pukul; tekan lagi untuk kombo |
| K | Tendang dan dorong |
| Tahan / lepas L | Ayunan tongkat 25–60 damage, charge penuh 1 detik |
| Tahan / lepas Space | Charge / tembak umban |
| 1 / 2 / 3 | Shield / Hujan Panah / Kasut |
| Esc | Jeda |

Tombol item dapat diklik. Kontrol ikon transparan tampil otomatis pada smartphone dan perangkat sentuh tanpa pointer presisi. Desktop/laptop memakai keyboard secara default; menekan tombol keyboard mengalihkan mode ke keyboard. Tombol pengalih di atas arena tersedia untuk perangkat campuran. Suara efek sintetis opsional dapat diaktifkan dari bagian atas.

## Yang sudah bisa dimainkan

- Lima stage dengan komposisi wave mengikuti PRD, serigala, singa, beruang, dan Goliat.
- Lima domba sebagai nyawa, kekebalan kawanan bersama, stun Daud, ancang-ancang musuh, gerak dan empat jenis serangan.
- Shield 15 detik, Panah radius 280, Kasut +50% selama 8 detik, pickup serta batas dua charge per item.
- Boss dengan pertahanan badan, titik lemah untuk batu penuh, ayunan dan lempar batu bertanda.
- Jeda, retry, hasil, bintang, pembukaan stage dan penyimpanan progres lokal.
- Atlas transparan dan animasi dari paket aset, latar untuk tiga lingkungan, indikator ancaman serta efek serangan.

## Batas prototipe

Ini prototipe awal, bukan MVP final seluruh PRD. Gameplay memakai Canvas dan JavaScript tanpa proses build, sementara Phaser/TypeScript di PRD masih merupakan usulan. Migrasi tidak diperlukan untuk mencoba gameplay ini.

Animasi kalah singa memakai pose hurt yang memudar karena aset defeat belum tersedia. Langkah Goliat masih eksperimental. Skala antarpose, transisi, posisi tangan dan kontak kaki memerlukan playtest. Kepala boss diberi indikator emas saat rentan; helm pada gambar belum diubah.

Pola boss disederhanakan menjadi ayunan, lemparan dan jendela kelemahan yang bergantian menurut fase; combo dua ayunan fase akhir belum diterapkan. Pola terjangan singa belum memiliki cooldown khusus empat detik. Randomisasi belum memakai seed percobaan. Musik, remapping tombol, rekor waktu, tutorial modal bertahap, pengaturan volume terpisah dan fitur aksesibilitas penuh belum tersedia.

Pengujian otomatis aturan permainan lulus. Pemeriksaan visual dan playtest browser belum dilakukan karena akses pemeriksaan browser sebelumnya terhalang kebijakan. Hasil pengujian otomatis tidak membuktikan rasa kontrol atau kualitas gerak.

## Pengembangan dan pengujian

`game/core.mjs` berisi simulasi independen dari tampilan. `game/main.mjs` memuat aset, input, UI dan renderer. `game/style.css` mengatur tampilan. Jalankan `node --test game/tests/*.test.mjs` untuk menguji aturan inti.

`sources/` tidak diubah. PRD dan paket aset tetap tersedia terpisah.

## Pembaruan langkah

Daud dan Goliat kini memakai delapan pose per siklus. Penyelarasan torso mengurangi pergeseran horizontal dari kaki yang bergantian. Ritme di game mengikuti jarak tempuh, termasuk boost Kasut dan berhenti di batas arena. Preview GIF memakai FPS metadata; ritme gameplay menyesuaikan kecepatan aktual. Pemeriksaan kontak statis dilakukan; kualitas loop saat diputar tetap perlu playtest.

## Pesan Injil per stage

Ayat pembuka 1 Samuel 17:34–35 ditampilkan sekali saat memulai permainan dalam satu sesi halaman. Waktu permainan berhenti selama ayat terbuka. Renungan stage 1–5 hanya ditampilkan setelah kemenangan, sebelum layar hasil; tidak muncul lagi pada awal stage, saat kalah, atau saat retry. Memuat ulang halaman memulai sesi pembuka baru. Stage 5 menampilkan “Sang Juara yang Menang Menggantikan Kita” dalam tiga paragraf, beserta 1 Korintus 15:57. Konten tersimpan di `game/gospel.mjs`.

## Amunisi umban dan charge tongkat

Setiap stage/retry dimulai dengan 5 batu. Tembakan biasa maupun penuh memakai 1 batu saat dilepas. Pickup +1 batu muncul di lokasi acak setiap 5 detik waktu permainan dan bertahan 20 detik; berjalan mendekatinya untuk mengambilnya. Tidak ada batas simpan amunisi tambahan. Jeda dan layar pesan menghentikan timer.

Tekan singkat lalu lepas L untuk tongkat 25 damage; tahan 1 detik untuk 60 damage. Charge sebagian menaikkan damage secara bertahap. Terkena serangan atau menjeda permainan membatalkan charge. Pertahanan badan Goliat tetap mengurangi damage tongkat. HUD dalam arena menampilkan sisa batu dan bar charge senjata yang sedang ditahan.

## Adegan akhir stage

Sesudah musuh terakhir pada gelombang terakhir kalah, game menampilkan adegan kemenangan 5 detik. Kamera zoom menuju musuh yang kalah, lalu bergerak ke Daud. Animasi defeat memakai kecepatan 20%, dan animasi victory Daud memakai aset yang sudah ada. HUD disembunyikan; pertarungan, item dan timer gameplay berhenti. Sesudah adegan, renungan stage ditampilkan sekali, lalu layar hasil. Tombol stage berikutnya langsung memulai permainan stage berikutnya. Tidak ada aset baru yang dibuat.

## Mobile landscape dan kontrol sentuh

Arena mobile memenuhi ruang yang tersedia dengan rasio tetap 16:9, tanpa memotong aset. Dalam portrait, simulasi berhenti dan petunjuk memutar perangkat muncul. Ikon panah di kiri untuk bergerak; ikon tinju, tendang, tongkat dan umban di kanan untuk menyerang. Tahan dan lepas ikon tongkat/umban untuk charge. Beberapa jari dapat digunakan bersamaan. Item di tengah bawah memakai ikon dan jumlah persediaan.

Browser tidak menyediakan deteksi universal keberadaan keyboard fisik. Mode awal menggunakan identitas mobile serta jenis pointer; input keyboard aktual otomatis memilih mode keyboard. Pengalih manual tetap tersedia. Tombol layar penuh mencoba mengunci landscape bila didukung. Jika tidak didukung, putar perangkat secara manual; layar portrait tetap diblokir tanpa merusak ukuran arena. Dokumentasi platform: https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation/lock

27 pengujian otomatis lulus, termasuk mode input, pergantian orientasi dan multitouch/cancel. Playtest pada perangkat mobile fisik belum dilakukan.
