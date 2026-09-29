# Pemeriksaan aset serigala

Frame dan atlas telah diekspor dengan sprite-gen. Koreksi skala per frame diterapkan melalui kurasi. Pemeriksaan kontak bersifat visual statis; pemutaran browser terhalang pemeriksaan kebijakan browser, sehingga kualitas loop dan kontak kaki belum terverifikasi dalam gerak.

| Gerakan | Status |
|---|---|
| idle | Pose telah ditinjau pada contact sheet; timing dalam engine belum diverifikasi. |
| run | Eksperimental: perlu pemeriksaan gait, kontak kaki dan sambungan loop dalam engine. |
| attack | Pose telah ditinjau pada contact sheet; timing dalam engine belum diverifikasi. |
| hurt | Pose telah ditinjau pada contact sheet; timing dalam engine belum diverifikasi. |
| defeat | Pose telah ditinjau pada contact sheet; timing dalam engine belum diverifikasi. |

Gunakan `qa/*-curated-contact.png` untuk hasil kurasi terbaru. Preview tanpa akhiran curated adalah hasil sebelum koreksi. Skala antargerakan, hitbox, origin dan waktu damage perlu diselaraskan saat integrasi.
