# Aset Daud vs Goliat

Paket menggunakan gambar GPT dan proses sprite-gen. Aset dalam `generated/bases`
adalah gambar karakter dasar; animasi runtime berada di `generated/sprites` bila
atlas dan manifest sudah tersedia. File rencana bukan bukti aset telah selesai.

## Status pengiriman — 27 September 2026

Tersedia 16 gambar statis dan 37 gerakan dengan 180 frame dari enam karakter.
PNG transparan, atlas, metadata Aseprite, PNG per frame dan preview GIF disertakan.
PRD berada di akar ZIP. Pemeriksaan jumlah frame, batas atlas, alpha tidak kosong
dan batas kanvas lulus; detail tersedia di `delivery-report.json`.

Paket ini untuk integrasi dan pengujian, belum seluruhnya lolos QA gerakan:

- Animasi kalah singa belum tersedia: layanan gambar menolak keluaran melalui pemeriksaan keamanan.
- Langkah Daud dan Goliat diperbarui menjadi delapan frame; QA playback tetap belum selesai.
- Animasi berjalan/berlari lainnya masih eksperimental. Seluruh playback dan transisi perlu diuji di engine karena pemeriksaan browser terhalang kebijakan.
- Serangan tombak Goliat telah dibuat ulang; tombak lengkap terlihat pada seluruh pose terbaru.

## Membuka hasil

- `preview.html`: galeri lokal karakter, item, latar, dan preview animasi.
- `asset-index.json`: daftar aset yang benar-benar tersedia.
- `generated/sprites/<karakter>/qa-notes.md`: status kualitas per animasi.
- `generated/sprites/<karakter>/sprite-sheet-alpha.png`: atlas transparan.
- `generated/sprites/<karakter>/manifest.json`: rectangle frame dan durasi.
- `generated/sprites/<karakter>/exports/aseprite.json`: metadata untuk loader Aseprite.
- `generated/sprites/<karakter>/curated/`: ekspor PNG setelah aturan kurasi diterapkan.

## Integrasi

Jangan menebak grid atlas. Baca rectangle dari manifest atau gunakan ekspor
Aseprite. Set loop eksplisit di engine: idle/run/walk/panic/escape/exhausted
berulang; pukul, tendang, serang, hurt, defeat, release dan victory sekali jalan.
Charge dihentikan pada pose terakhir saat pemain menahan tombol.

Gambar basis memiliki ukuran kanvas berbeda. Skala tampilan ditentukan berdasarkan
bounding box subjek dan target tinggi PRD, bukan hanya ukuran seluruh PNG.
Origin kaki, hitbox, jendela damage dan titik proyektil adalah data engine terpisah.
Flip horizontal boleh dipakai untuk arah kiri jika perubahan tangan/aksesori diterima.

Item dapat dipakai sebagai ikon HUD maupun pickup. Batu dipakai sebagai proyektil
umban; indikator ancaman dapat dibalik untuk sisi kiri. Durasi efek 15 detik Shield
dan 8 detik Kasut diatur engine, bukan dibakar dalam animasi panjang.

Latar berupa ilustrasi arena datar. Tiga lingkungan dasar dapat dipakai ulang untuk
lima stage. File ini belum merupakan parallax dengan layer terpisah. Tombol, teks,
bar HP dan penghitung waktu sebaiknya digambar sebagai UI engine agar skalabel.

## Bukti produksi

Setiap generasi menyimpan laporan provider. File `.raw.png`, direktori `raw`, dan
hasil ditolak dipertahankan di workspace untuk audit, tetapi dikeluarkan dari ZIP
pengiriman. Pemulihan alpha serigala dan singa tercatat di laporan native-recovery;
tidak ada penggambaran ulang manual atau penggantian ekstraksi dengan pemotongan grid.
