# Pemeriksaan aset Goliat

Delapan gerakan tersedia, 41 frame. Seluruh frame ditinjau lewat contact sheet, bukan pemutaran real-time. Akses browser terhalang pemeriksaan kebijakan sehingga QA playback belum selesai.

| Gerakan | Hasil pemeriksaan |
|---|---|
| idle | Siluet dan tombak utuh; variasi napas kecil. Loop belum terverifikasi. |
| walk | Versi delapan frame: contact, down, passing dan up tersedia; torso disejajarkan untuk mengurangi pergeseran samping. Kandidat pertama ditolak karena pengulangan pose. Kandidat kedua dipakai sebagai best effort. Eksperimental: kontinuitas loop dan kontak kaki belum diverifikasi dalam pemutaran. |
| swing | Dibuat ulang karena ujung tombak hilang. Versi terbaru memiliki tombak lengkap di semua enam pose; serangan dan pemulihan terbaca. |
| throw | Batu menempel di tangan pada antisipasi, tangan kosong sesudah lemparan. Proyektil terpisah ditambahkan engine. |
| taunt | Gestur mengejek terbaca; perlu penyesuaian area lemah dahi di engine. |
| exhausted | Bahu dan kepala bergerak menurun, loop belum terverifikasi. Helm masih menutup sebagian dahi. |
| hurt | Membungkuk dan kembali berdiri terbaca. |
| defeat | Urutan tersandung, berlutut dan berbaring terbaca; tombak tetap utuh. |

Skala relatif dalam tiap gerakan dikoreksi melalui kurasi. Ukuran badan antargerakan, origin, hitbox, transisi, timing damage dan area lemah boss tetap perlu ditata di engine. Lihat `qa/*-curated-contact.png` dan `exports/*.gif`. Versi sebelum koreksi hanya bukti diagnosis.
