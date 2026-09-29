# Pemeriksaan aset daud

Frame dan atlas telah diekspor dengan sprite-gen. Koreksi skala per frame diterapkan melalui kurasi. Pemeriksaan kontak bersifat visual statis; pemutaran browser terhalang pemeriksaan kebijakan browser, sehingga kualitas loop dan kontak kaki belum terverifikasi dalam gerak.

| Gerakan | Status |
|---|---|
| idle | Pose telah ditinjau pada contact sheet; timing dalam engine belum diverifikasi. |
| run | Versi delapan frame: contact, down, passing dan up tersedia; torso disejajarkan untuk mengurangi pergeseran samping. Kandidat pertama ditolak karena pengulangan pose. Kandidat kedua dipakai sebagai best effort. Eksperimental: kontinuitas loop dan kontak kaki belum diverifikasi dalam pemutaran. |
| punch_1 | Pose telah ditinjau pada contact sheet; timing dalam engine belum diverifikasi. |
| punch_2 | Pose telah ditinjau pada contact sheet; timing dalam engine belum diverifikasi. |
| kick | Pose telah ditinjau pada contact sheet; timing dalam engine belum diverifikasi. |
| staff_attack | Pose telah ditinjau pada contact sheet; timing dalam engine belum diverifikasi. |
| sling_charge | Best effort: pose umban terbaca, tetapi putaran tali belum berupa siklus penuh. |
| sling_release | Pose telah ditinjau pada contact sheet; timing dalam engine belum diverifikasi. |
| hurt | Pose telah ditinjau pada contact sheet; timing dalam engine belum diverifikasi. |
| victory | Pose telah ditinjau pada contact sheet; timing dalam engine belum diverifikasi. |

Gunakan `qa/*-curated-contact.png` untuk hasil kurasi terbaru. Preview tanpa akhiran curated adalah hasil sebelum koreksi. Skala antargerakan, hitbox, origin dan waktu damage perlu diselaraskan saat integrasi.
