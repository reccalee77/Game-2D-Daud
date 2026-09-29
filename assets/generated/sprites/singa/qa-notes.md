# Pemeriksaan aset singa

Contact sheet seluruh gerakan di bawah telah ditinjau. Tidak terlihat potongan badan atau komponen lepas. Timing dan sambungan loop belum diverifikasi dalam pemutaran: akses browser terhalang pemeriksaan kebijakan.

| Gerakan | Status |
|---|---|
| idle | Pose awal, tengah dan akhir terbaca. QA gerak saat diputar belum selesai. |
| run | Eksperimental: fase kaki tersedia; kontak dan kelancaran gait masih perlu diuji dalam engine. |
| roar | Pose awal, tengah dan akhir terbaca. QA gerak saat diputar belum selesai. |
| pounce | Pose awal, tengah dan akhir terbaca. QA gerak saat diputar belum selesai. Gerak vertikal lompatan ditentukan engine; frame disejajarkan ke baseline. |
| hurt | Pose awal, tengah dan akhir terbaca. QA gerak saat diputar belum selesai. |

Belum tersedia: defeat (5 frame). Dua percobaan ditolak pemeriksaan keamanan keluaran layanan gambar; tidak dicoba ulang. State ini tidak dimasukkan ke atlas.

Lihat `qa/*-curated-contact.png` dan `exports/*.gif`. Periksa skala lintas state, origin, hitbox dan waktu serang sebelum penggunaan produksi.
