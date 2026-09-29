# PRD — Daud vs Goliat 2D

**Versi:** 1.0 · **Tanggal:** 25 September 2026 · **Status:** rancangan siap ditinjau dan dijadikan dasar prototipe.

## 1. Ringkasan produk

Game aksi pertahanan 2D tampak samping. Pemain mengendalikan Daud untuk melindungi lima domba dari serigala, singa, dan beruang, lalu menghadapi Goliat pada stage terakhir. Daud bergerak ke kiri dan kanan, memukul, menendang, menyerang dengan tongkat gembala, serta menembakkan batu dengan slingshot/umban. Item terbatas membantu pemain menyelamatkan kawanan pada saat genting.

**Janji pengalaman:** pemain menang karena membaca ancaman, memilih posisi, dan menggunakan senjata serta item pada waktu yang tepat. Lima domba yang tampak di arena sekaligus menjadi indikator nyawa yang mudah dipahami.

Cerita merupakan adaptasi permainan yang terinspirasi tokoh Daud. Penempatan kawanan dalam pertarungan Goliat dan item panah merupakan kebebasan desain permainan, bukan klaim ketepatan kisah sumber.

### Kebutuhan tetap dari pengguna

- Tokoh utama Daud dengan tongkat gembala dan slingshot.
- Lima domba sebagai nyawa; tugas utama melindungi mereka.
- Gerak kiri/kanan; aksi pukul, tendang, tongkat, dan slingshot.
- Musuh serigala, singa, beruang; Goliat sebagai boss.
- Shield melindungi domba selama **15 detik**.
- Item Arrow langsung mengalahkan musuh di sekitar.
- Item kasut memberi peningkatan kecepatan sementara.
- Beberapa stage dengan komposisi wave berbeda.
- Produksi sprite dan animasi memakai alur sprite-gen.

### Keputusan desain usulan

Seluruh keputusan di luar kebutuhan tetap adalah usulan untuk prototipe: browser desktop sebagai platform pertama, arena satu layar, lima stage, gaya kartun ilustratif, aturan boss untuk Arrow, serta semua angka damage, durasi selain Shield, jumlah musuh, dan drop rate. Nilai tersebut belum tervalidasi melalui playtest.

## 2. Sasaran, platform, dan batas lingkup

**Pemain sasaran:** pemain kasual yang menyukai aksi singkat dan tema petualangan Daud. Presentasi tanpa darah; domba yang hilang melarikan diri dari arena dan musuh kalah melalui animasi jatuh/lari.

**Platform awal:** browser desktop/laptop, keyboard, landscape 16:9. Resolusi logis 1280 × 720; tampilan menyesuaikan ukuran jendela tanpa mengubah jarak gameplay. Target durasi satu stage 3–5 menit dan campaign 20–30 menit termasuk tutorial dan retry; ini sasaran pacing, bukan hasil pengukuran.

| Lingkup | Isi |
|---|---|
| Prototipe inti | Daud, lima domba, serigala, satu arena, satu wave, semua aksi dasar, tiga item wajib |
| Vertical slice | Stage 1 lengkap, tutorial, HUD, audio dasar, sprite-gen terintegrasi, win/lose/retry |
| MVP lengkap | Lima stage, tiga musuh biasa, boss Goliat, tiga item wajib, progres lokal, pengaturan |
| Setelah MVP | Item tambahan, touch/gamepad, mode endless, difficulty tambahan, variasi kosmetik |
| Di luar MVP | Multiplayer, akun, backend, monetisasi, skill tree, platforming/lompatan, dunia terbuka |

**Sasaran validasi awal:** sedikitnya 4 dari 5 peserta playtest baru memahami bahwa domba adalah nyawa setelah tutorial; sedikitnya 4 dari 5 dapat mengaktifkan Shield tanpa dibantu; sekurangnya 3 dari 5 menamatkan Stage 1 dalam dua percobaan. Catat hasil nyata sebelum mengubah target.

## 3. Arena dan siklus permainan

Arena memiliki satu jalur tempur horizontal. Kawanan berada di tengah, di sekitar x=560–720. Daud mulai di x=480. Musuh datang dari luar sisi kiri atau kanan; indikator sisi muncul 1 detik sebelum spawn. Semua jarak di dokumen ini menggunakan piksel dunia pada resolusi logis.

Domba bergerak dekoratif di area kawanan tanpa memengaruhi jarak interaksi. Musuh mengincar titik kawanan, sehingga posisi animasi domba tidak menimbulkan perubahan hitbox yang sulit diprediksi. Daud dan musuh dapat melewati area domba. Tidak ada tabrakan badan yang mengunci pemain; damage terjadi melalui aksi serangan.

Siklus utama:

1. Pilih stage yang terbuka dan lihat ancaman/item yang dikenalkan.
2. Masuk dengan lima domba dan persediaan item awal stage.
3. Baca indikator spawn; cegat musuh memakai serangan yang sesuai.
4. Ambil item dan gunakan saat kawanan terancam.
5. Setelah semua musuh wave kalah dan antrean spawn kosong, berikan jeda 6 detik.
6. Selesaikan semua wave atau kalahkan Goliat dengan sedikitnya satu domba tersisa.
7. Lihat hasil, lanjut stage berikutnya atau ulangi untuk memperbaiki bintang.

Stage berikutnya selalu dimulai dengan lima domba baru. Kehilangan domba bertahan antargelombang dalam stage yang sama. Tidak ada regenerasi domba otomatis selama wave atau jeda dalam MVP.

## 4. Lima domba sebagai nyawa

Daud tidak memiliki bar HP terpisah. Serangan terhadap Daud memberikan knockback 40 piksel, stun 0,35 detik, dan kekebalan terhadap hit berikutnya selama 1 detik sejak hit. Daud tetap berada di batas arena dan tidak dapat jatuh keluar layar.

Musuh yang mencapai radius 70 piksel dari titik kawanan melakukan ancang-ancang yang terlihat selama minimal 1,2 detik. Jika tidak dibatalkan, kawanan kehilangan satu domba. Musuh tetap hidup dan dapat mengulangi ancang-ancang setelah jeda pemulihan 2 detik.

Serangan Daud yang menghasilkan stagger atau knockback membatalkan ancang-ancang. Setelah pembatalan, musuh kembali mengejar atau menyiapkan serangan baru; progres serangan lama tidak disimpan.

Untuk mencegah kehilangan semua nyawa dalam satu tumpukan musuh, kawanan mendapatkan kekebalan bersama selama 2 detik sesudah kehilangan satu domba. Serangan yang jatuh pada periode ini tidak mengurangi nyawa dan tetap masuk pemulihan. Maksimum kehilangan akibat serangan bersamaan adalah satu domba per jendela kekebalan tersebut.

**Game over:** jumlah domba menjadi nol. Simulasi pertarungan berhenti, lalu tampilkan hasil dan tombol Ulangi Stage. **Menang:** seluruh syarat stage selesai dan jumlah domba lebih dari nol. Jika boss kalah dan domba terakhir hilang pada tick yang sama, game over mendapat prioritas agar hasil deterministik.

## 5. Kontrol dan pertarungan

| Input awal | Aksi | Peran |
|---|---|---|
| A/D atau ←/→ | Bergerak dan mengubah arah hadap | Menutup jalur ancaman |
| J | Pukul; tekan berulang untuk kombo dua pukulan | Cepat untuk jarak dekat |
| K | Tendang | Mendorong musuh dari kawanan |
| Tahan/lepas L | Charge/ayunan tongkat | Jangkauan menengah dan kelompok; charge penuh 1 detik |
| Tahan/lepas Space | Isi/lepas slingshot | Serangan jarak jauh |
| 1 / 2 / 3 | Shield / Arrow / Kasut | Penggunaan langsung dari slot tetap |
| Esc | Pause/resume | Hentikan simulasi dan lihat kontrol |

HUD juga menyediakan tombol klik untuk ketiga item. Input dapat dipetakan ulang; pilihan mapping mencegah satu tombol terikat ke dua aksi. Fokus canvas mencegah Space/arah menggulir halaman selama permainan aktif.

### Angka awal combat

| Aksi | Damage | Jangkauan | Siklus minimum | Sifat |
|---|---:|---:|---:|---|
| Pukul pertama/kedua | 10 / 15 | 65 px | 0,3 dtk per pukulan | Target terdekat, stagger kecil |
| Tendang | 12 | 80 px | 0,65 dtk | Target terdekat, knockback 90 px |
| Tongkat | 25–60 (charge penuh 1 dtk) | 130 px | 0,8 dtk | Mengenai semua target di depan dalam jangkauan sekali per ayunan |
| Batu biasa | 20 | Maks. 650 px | 0,7 dtk antarpelepasan | Berhenti pada target pertama |
| Batu penuh | 45 | Maks. 650 px | Charge 0,8 dtk; jeda 0,7 dtk | Stagger kuat, penting untuk boss |

Kecepatan Daud 240 px/detik. Setiap stage dan retry dimulai dengan 5 batu. Setiap pelepasan umban memakai 1 batu, baik biasa maupun penuh; charge yang dibatalkan tidak memakai batu. Setiap 5 detik waktu permainan muncul pickup +1 batu di posisi acak yang dapat dijangkau Daud. Pickup bertahan 20 detik dan diambil dengan mendekatinya; tidak ada batas simpan tambahan. Saat amunisi habis, pemain perlu memakai pukul, tendang, atau tongkat sambil mengambil batu. Timer berhenti saat pause dan layar pesan. Tongkat dapat ditahan hingga 1 detik: damage meningkat dari 25 hingga 60, lalu dilepas untuk menyerang. Hit atau pause membatalkan charge tongkat. Charge kurang dari 0,8 detik menghasilkan batu biasa; charge penuh tidak terus menambah damage. Saat charge, kecepatan Daud menjadi 60%; terkena hit membatalkan charge tanpa melepas batu.

Kombo pukul kedua diterima jika J ditekan dalam 0,45 detik setelah pukulan pertama dimulai; hanya satu input berikutnya ditampung. Tidak ada kombo tersembunyi yang wajib dipelajari. Setiap aksi terdiri atas ancang-ancang, periode hit aktif, dan pemulihan; damage tidak berjalan pada semua frame animasi. Satu target tidak boleh terkena berulang oleh satu ayunan yang sama.

Pemain dapat bergerak 60% kecepatan selama aksi melee. Arah serangan dikunci saat mulai; input gerak tetap mengubah posisi. Serangan biasa tidak dapat saling membatalkan. Item boleh digunakan saat menyerang, charge, atau stun; hanya pause, transisi, menang, dan game over yang memblokirnya.

Slingshot menembak mengikuti arah hadap. Dalam kondisi normal lintasan mendatar mengenai badan musuh. Saat Goliat membuka titik lemah dan berada di depan Daud dalam jangkauan, tembakan penuh otomatis diarahkan ke kepala agar tidak memerlukan kontrol bidik vertikal tambahan.

## 6. Musuh

| Musuh | HP | Kecepatan | Perilaku utama | Respons pemain |
|---|---:|---:|---|---|
| Serigala | 40 | 145 px/dtk | Berlari menuju kawanan; menyerang Daud bila Daud berada ≤70 px di depannya | Dua batu biasa, pukulan, atau cegat dengan tongkat |
| Singa | 90 | 110 px/dtk | Mengaum 0,8 dtk lalu menerjang 220 px; cooldown 4 dtk | Keluar lintasan atau gunakan tendang sebelum terjangan |
| Beruang | 180 | 60 px/dtk | Mendekat lambat, sapuan cakar berjangkauan 120 px dengan ancang-ancang 1 dtk | Serang dari jauh lalu dorong saat mendekat |
| Goliat | 900 | Sesuai fase | Boss dengan serangan bertanda dan titik lemah | Kenali pola, lindungi kawanan, pakai batu penuh |

Singa tidak dapat melewati area kawanan tanpa pemeriksaan: jika terjangan mencapai kawanan, singa berhenti dan harus memulai ancang-ancang serangan domba selama 1,2 detik. Beruang menerima 50% knockback dan hanya stagger dari tendang atau batu penuh; pukul/tongkat tetap memberi damage. Dengan demikian pemain perlu memilih alat untuk membatalkan serangannya.

AI musuh biasa: spawn → mendekat → menyerang Daud bila berada dalam jangkauan depan; jika tidak, menyerang kawanan saat sudah dekat → pemulihan → ulangi. Prioritas target hanya dievaluasi di luar serangan yang sedang berlangsung. Serigala memberi tanda 0,5 detik sebelum serangan ke Daud. Telegraph lebih penting daripada tambahan variasi animasi.

## 7. Item

Slot 1–3 permanen; masing-masing menyimpan maksimal dua charge. Menyentuh pickup menambah satu charge. Saat slot penuh, pickup tetap di tanah hingga kedaluwarsa 12 detik. Tidak ada pemilihan inventaris di tengah pertarungan.

| Item | Efek dan batas | Presentasi |
|---|---|---|
| Shield Kawanan | Semua domba kebal selama **15 detik waktu permainan**; tidak melindungi Daud | Kubah, angka detik, kedip saat sisa ≤3 detik |
| Arrow / Hujan Panah | Mengalahkan seketika seluruh serigala, singa, dan beruang yang hidup dalam radius 280 px dari Daud, kedua arah | Radius terlihat saat hover/fokus; panah jatuh dan target kalah |
| Kasut Gembala | Kecepatan gerak +50% selama 8 detik; tidak menambah damage/kecepatan serang | Jejak kaki dan penghitung durasi |

**Usulan pengecualian boss:** Arrow memberi 90 damage tetap kepada Goliat jika ia berada dalam radius, tanpa membunuh seketika atau membatalkan pola serangannya. Aturan ditulis pada tooltip dan tutorial boss. Ini menjaga pertarungan boss tetap bermakna; bisa diubah jika pengguna menginginkan instant kill berlaku tanpa pengecualian.

Shield atau Kasut yang sedang aktif tidak dapat diaktifkan ulang, sehingga charge tidak terbuang dan durasi tidak menumpuk. Kedua efek boleh aktif bersamaan. Arrow tanpa target valid tidak menghabiskan charge; tampilkan pesan singkat. Satu aktivasi hanya memotong satu charge meskipun tombol ditahan. Terdapat jeda 0,5 detik antarpenggunaan item untuk mencegah aktivasi ganda tak sengaja.

Saat Shield habis, semua musuh di kawanan harus memulai ancang-ancang baru; tidak ada hit tertunda yang langsung menembus pada frame berikutnya. Pause menghentikan durasi Shield, Kasut, pickup, cooldown, dan wave.

### Persediaan dan drop

- Stage 1 dimulai dengan satu Shield; Kasut dijamin jatuh dari musuh terakhir wave 1, Arrow dari musuh terakhir wave 2. Tutorial pengambilan menggunakan jeda wave.
- Stage 2–5 dimulai dengan masing-masing satu Shield, Arrow, dan Kasut.
- Musuh biasa memiliki peluang drop awal 15%: dari drop tersebut, Shield 40%, Arrow 25%, Kasut 35%. Semua peluang merupakan parameter balancing.
- Drop acak hanya berlaku pada musuh yang tidak memiliki drop wajib. Musuh yang dikalahkan Arrow tidak menghasilkan drop acak, untuk mencegah rantai Arrow.
- Persediaan tidak terbawa ke stage berikutnya. Retry mengembalikan persediaan awal stage; item tidak bisa ditimbun dengan retry.

### Usulan item setelah MVP

| Item | Manfaat | Batas agar tetap seimbang |
|---|---|---|
| Peluit Gembala | Memancing semua musuh biasa dalam 400 px untuk mengejar Daud selama 5 detik | Tidak membatalkan serangan yang sudah aktif; boss kebal |
| Kantong Batu Pilihan | Tiga tembakan berikutnya menembus maksimal tiga musuh | Tidak menambah pengali titik lemah boss |
| Domba Tersesat | Mengembalikan satu domba, maksimum lima | Hanya hadiah antargelombang; maksimal sekali per stage |
| Minyak Penguat | Daud kebal knockback/stun selama 5 detik | Tidak memberi perlindungan pada kawanan |

## 8. Stage dan wave

Notasi W=serigala, L=singa, B=beruang. Jumlah di tabel adalah total per wave, bukan semua muncul bersamaan. Stage dibuka berurutan; stage terbuka dapat dimainkan ulang.

| Stage | Tema dan pelajaran | Wave 1 | Wave 2 | Wave 3 | Wave 4 | Maks. musuh biasa aktif |
|---|---|---|---|---|---|---:|
| 1. Padang Gembala | Kontrol, domba, tiga item | 3W, kiri | 4W, kanan | 6W, dua sisi | — | 3 |
| 2. Senja di Perbukitan | Singa dan serangan dua arah | 4W | 3W+1L | 4W+2L | — | 4 |
| 3. Jalur Berbatu | Beruang dan prioritas target | 4W+1B | 2L+1B | 4W+1L+2B | — | 5 |
| 4. Lembah Penjagaan | Kombinasi seluruh kemampuan | 6W+1L | 2L+2B | 6W+2L+1B | 4W+2L+2B | 6 |
| 5. Hadapan Goliat | Ujian akhir | 4W+1L | 1L+1B | Goliat | — | 4 sebelum boss; 0 selama boss |

Pada stage 2–5, musuh biasa masuk bergantian kiri/kanan, dimulai dari kiri pada wave ganjil dan kanan pada wave genap. Urutan tipe diacak dengan seed per percobaan, kecuali pengenalan pertama singa dan beruang yang selalu dimunculkan lebih dahulu agar telegraph dapat dipelajari.

Jarak antarspawn awal: Stage 1=2,5 detik; Stage 2=2,2; Stage 3=2,0; Stage 4=1,8; Stage 5=2,0. Bila batas musuh aktif tercapai, antrean menunggu dan timer spawn tidak menumpuk. Musuh berikutnya tetap mendapat indikator 1 detik sebelum masuk. Antarwave ada jeda 6 detik; boss mendapat pengantar 3 detik setelah jeda. Wave tidak memakai batas waktu yang memaksa kalah.

HUD menampilkan wave dan jumlah musuh tersisa termasuk antrean spawn. Variasi visual stage dapat memakai tiga set lingkungan dasar dengan pencahayaan berbeda: padang, perbukitan berbatu, dan lembah boss.

## 9. Boss Goliat

Goliat muncul dari kanan dan bergerak mengikuti pola, tanpa musuh tambahan selama pertarungan MVP. Domba tetap ada di tengah. Kehilangan seluruh domba tetap menyebabkan kalah.

| Fase | Rentang HP | Pola dan kesempatan menyerang |
|---|---|---|
| 1 — Mengukur kekuatan | >60% | Dua langkah mendekat, ayunan senjata dengan tanda 1 dtk, pemulihan 1,5 dtk |
| 2 — Tekanan kawanan | >30%–60% | Bergantian ayunan dan lempar batu ke kawanan; sasaran tanah ditandai 2 dtk |
| 3 — Amarah terakhir | ≤30% | Dua ayunan berurutan, lempar batu, lalu kelelahan dan kepala terbuka 3 dtk |

Pada akhir satu siklus fase 1 atau 2, Goliat mengejek selama 2,5 detik dan membuka titik lemah. Batu penuh yang mengenai kepala saat jendela terbuka memberi 3× damage, yaitu 135. Serangan biasa mengenai tubuh dengan 50% damage dasar; damage dihitung dengan presisi internal dan HP ditampilkan membulat. Arrow selalu 90 damage sesuai aturan item.

Satu batu penuh ke titik lemah membatalkan lemparan yang sedang disiapkan jika jendela kepala terbuka bersamaan, atau memberikan stagger 1,2 detik pada kondisi lainnya. Untuk memberi peluang mencegat lemparan fase 2–3, kepala juga terbuka selama tanda lempar batu 2 detik. Batu biasa tidak membatalkan lemparan.

Lemparan yang mengenai kawanan menghilangkan satu domba, tunduk pada Shield dan kekebalan kawanan. Ayunan yang mengenai Daud memberi stun/knockback sesuai aturan umum; ayunan yang menjangkau kawanan juga maksimal menghilangkan satu domba per jendela kekebalan. Transisi fase terjadi sesudah aksi aktif selesai, tidak memunculkan hit tanpa telegraph.

Pertarungan berakhir ketika HP Goliat nol. Animasi tumbang diikuti perayaan kawanan; tidak ada kewajiban memakai finishing move tertentu. Target durasi boss 90–150 detik diuji melalui playtest, lalu HP/panjang pemulihan disesuaikan.

## 10. Antarmuka, audio, dan progres

Layar utama: Main, Pilih Stage, Cara Bermain, Pengaturan. Stage terkunci menampilkan alasan. Pause menyediakan Lanjut, Ulangi Stage, Pengaturan, dan Kembali ke Menu; ulangi/keluar dari stage memakai konfirmasi karena membuang percobaan aktif.

HUD: lima ikon domba beserta angka tersisa; stage/wave; tiga slot item beserta jumlah dan shortcut; timer buff; bar charge batu; bar HP boss saat diperlukan. Indikator ancaman menggunakan bentuk/arah serta warna. Sediakan pengurangan screen shake, volume musik/SFX terpisah, dan kontrol yang dapat dibaca kembali dari pause.

Tutorial Stage 1 memperkenalkan gerak dan serangan sebelum wave pertama, Shield saat ancaman pertama, lalu pickup Kasut dan Arrow pada jeda yang dijamin. Instruksi pertama dapat menghentikan simulasi sampai ditutup. Petunjuk boss menjelaskan kepala terbuka dan pengecualian Arrow.

Audio wajib: pukulan, tendangan, ayunan tongkat, lepas/kena batu, suara ancang-ancang tiap musuh, domba hilang, pickup, tiga aktivasi item, awal wave, menang/kalah; musik arena dan boss. Musik/SFX diproduksi terpisah dari sprite-gen.

Bintang stage berdasarkan domba akhir: 5 domba=3 bintang; 3–4=2; 1–2=1. Waktu penyelesaian dicatat sebagai rekor terpisah tanpa memaksa gaya bermain cepat. Simpan lokal stage terbuka, bintang terbaik, waktu terbaik, dan pengaturan. Tidak ada penyimpanan tengah wave; memuat ulang halaman memulai ulang stage. Jika penyimpanan gagal, game tetap bisa dimainkan dan menampilkan bahwa progres tidak tersimpan.

## 11. Arahan visual dan daftar aset sprite-gen

Usulan gaya: ilustrasi kartun 2D dengan siluet jelas, warna bumi hangat, latar lebih rendah kontras daripada karakter. Daud mengenakan pakaian gembala sederhana; tongkat dan umban memiliki bentuk yang mudah dikenali. Istilah slingshot pada gameplay diwujudkan sebagai umban tali dalam konsep visual usulan. Gaya dan bentuk senjata perlu ditinjau lewat satu gambar karakter dasar sebelum produksi massal.

Proporsi tinggi tampilan: Daud 110 px; domba 55; serigala 65; singa 85; beruang 120; Goliat 240. Ukuran kanvas sumber harus menampung ayunan penuh tanpa memotong senjata; jangan menyamakan ukuran kanvas dengan tinggi tubuh.

| Aset | Animasi yang diperlukan | Target frame per state awal |
|---|---|---|
| Daud | idle, run, punch_1, punch_2, kick, staff_attack, sling_charge, sling_release, hurt, victory | 6, 8, 5, 5, 6, 8, 6, 6, 4, 6 |
| Domba, satu basis + 5 penanda identitas | idle, walk, panic, escape | 4, 6, 4, 6 |
| Serigala | idle, run, attack, hurt, defeat | 4, 8, 6, 3, 5 |
| Singa | idle, run, roar, pounce, hurt, defeat | 4, 8, 5, 6, 3, 6 |
| Beruang | idle, walk, swipe, hurt, defeat | 4, 8, 8, 3, 6 |
| Goliat | idle, walk, swing, throw, taunt, exhausted, hurt, defeat | 6, 8, 8, 8, 6, 6, 4, 10 |
| Item/VFX | 3 ikon, 3 pickup, kubah, hujan panah, jejak kasut, batu, hit spark, tanda ancaman | Ikon statis; efek ditetapkan saat prototipe |
| Lingkungan/UI | 3 set latar berlapis, 5 variasi stage, ground strip, HUD, tombol, panel hasil | Statis atau animasi dekoratif ringan |

Frame count adalah target produksi yang disimpan dalam request resmi, bukan hasil generasi yang sudah tersedia. Idle/run/walk berulang; attack/hurt/defeat/release sekali jalan. Charge ditahan pada pose siap ketika penuh. Mesin game menetapkan loop setiap state secara eksplisit.

### Alur produksi

1. Pilih provider melalui panduan sprite-gen dan preferensi tersimpan ketika produksi dimulai. Jangan mengasumsikan provider berbayar atau beralih ke API berbayar tanpa pilihan eksplisit.
2. Buat dan tinjau satu base image full-body per karakter; kunci identitas, proporsi, arah hadap kanan, dan palet.
3. Simpan ukuran kanvas, margin, chroma, state, frame count, serta timing dalam `sprite-request.json`.
4. Jalankan prepare, generasi per baris dengan referensi identitas dan layout guide, ekstraksi komponen kanonis, compose atlas, lalu pemeriksaan.
5. Periksa motion preview: kontinuitas tubuh, tangan/senjata, kaki, arah hadap, pose serangan, tepi transparansi, dan objek terpotong. Generasi grid satu kali dan potong sel tetap bukan pengganti alur ekstraksi sprite-gen.
6. Ekspor atlas PNG transparan, manifest, JSON kompatibel Aseprite bila diperlukan, serta preview dan catatan QA. Ekspor final berasal dari hasil kurasi final.
7. Uji satu karakter lengkap di mesin game sebelum memproduksi semua karakter.

Facing kiri dapat memakai flip horizontal di runtime jika hasilnya diterima secara visual. Bila posisi tangan/aksesori harus konsisten secara anatomis, produksi directional anchor terpisah. Jangan membalik urutan frame untuk mengubah arah gerak.

Hitbox, hurtbox, titik keluar batu, dan waktu damage didefinisikan di data gameplay terpisah; tidak disimpulkan otomatis dari warna piksel. Origin kaki harus stabil. Atlas dibaca melalui rectangle manifest, bukan ditebak sebagai grid. Kualitas animasi harus diperiksa pada kecepatan permainan sebenarnya.

**Definition of done aset:** file dapat dimuat, seluruh state tersedia, durasi frame sesuai manifest, tidak ada frame kosong/chroma bocor/anggota tubuh terpotong, gerakan sudah ditinjau, dan serangan visual cocok dengan jendela hit di game. Aset yang gagal tidak diberi status final hanya karena atlas berhasil dibuat.

## 12. Rancangan implementasi usulan

**Mesin yang diusulkan: Phaser dengan TypeScript**, untuk build browser desktop dan integrasi atlas. Pilihan ini bukan hasil tool_recommend GTPlanner. Dokumentasi resmi Phaser menyediakan loader Aseprite dan `createFromAseprite`, yang cocok untuk mencoba ekspor sprite-gen; kecocokan aset nyata tetap harus dibuktikan dalam vertical slice. Versi engine dipilih dan dikunci saat prototipe, bukan mengikuti versi terbaru otomatis.

Referensi teknis: [Phaser AnimationManager — createFromAseprite](https://docs.phaser.io/api-documentation/class/animations-animationmanager) dan [Phaser Loader](https://docs.phaser.io/phaser/concepts/loader).

| Komponen | Tanggung jawab |
|---|---|
| Game state | Menu, tutorial, bermain, jeda wave, pause, hasil; satu status akhir yang deterministik |
| Player combat | Gerak, kombo, charge, jendela hit, arah, stun |
| Flock | Jumlah domba, perlindungan, satu pintu pengurangan nyawa |
| Enemy/Boss | State machine, target, telegraph, serangan, fase |
| Wave director | Antrean spawn, sisi, batas aktif, seed, kondisi selesai |
| Item system | Inventaris, pickup, aktivasi, durasi, efek dan drop |
| Presentation | Sprite, VFX, HUD, audio, tanpa menjadi sumber keputusan damage |
| Save/settings | Progres dan opsi lokal dengan versi skema |

Stage, enemy, attack, dan item disimpan sebagai data yang dapat disetel tanpa mengubah logika. Minimal data stage: ID, lingkungan, persediaan awal, wave berisi tipe/jumlah/sisi/interval/batas aktif, drop wajib, dan syarat selesai. Minimal data attack: damage, range, startup, active, recovery, knockback, serta perilaku stagger.

Satu jam simulasi mengendalikan seluruh timer gameplay. Tab kehilangan fokus memicu pause; kembali ke tab meminta pemain menekan Lanjut. Gunakan gerak berbasis waktu agar kecepatan tidak mengikuti frame rate, dan pemeriksaan lintasan proyektil agar batu cepat tidak melewati target tanpa hit.

Target awal performa: 60 fps pada laptop acuan yang dicatat saat vertical slice, resolusi logis 720p, enam musuh biasa aktif dan efek item bersamaan. Kriteria profil: median frame time ≤16,7 ms dan persentil ke-95 ≤25 ms selama sesi uji 5 menit. Muatan awal ditargetkan ≤20 MB; ukur setelah kompresi aset. Target ini belum merupakan jaminan pada semua perangkat.

## 13. Kriteria penerimaan

| ID | Skenario uji | Hasil yang harus terjadi |
|---|---|---|
| AC-01 | Mulai atau retry stage | Lima domba, persediaan awal benar, tidak ada buff/antrean percobaan lama |
| AC-02 | Serangan biasa musuh mengenai Daud | Stun/knockback terjadi; jumlah domba tidak berubah karena hit ke Daud |
| AC-03 | Tiga musuh menyelesaikan serangan kawanan bersamaan | Hanya satu domba hilang; kekebalan bersama aktif 2 detik |
| AC-04 | Aktifkan Shield, lalu serang kawanan berulang | Tidak ada domba hilang selama 15 detik waktu simulasi |
| AC-05 | Pause 10 detik ketika Shield tersisa 5 detik | Setelah resume tetap tersisa 5 detik; serangan baru wajib setelah Shield habis |
| AC-06 | Arrow dengan musuh pada jarak 279 dan 281 px | Musuh 279 kalah seketika; musuh 281 tidak terkena; berlaku ke kedua arah |
| AC-07 | Arrow di dekat Goliat / tanpa target | Boss menerima 90 damage / charge tidak terpakai |
| AC-08 | Kasut aktif lalu kedaluwarsa | Kecepatan 360 px/dtk selama 8 detik, kembali 240, tanpa stacking |
| AC-09 | Satu ayunan tongkat overlap target selama beberapa frame | Setiap target hanya menerima satu damage per ayunan |
| AC-10 | Tekan item saat slot kosong atau buff yang sama aktif | Tidak ada jumlah negatif, tidak ada konsumsi/pembaruan durasi |
| AC-11 | Musuh terakhir kalah tetapi antrean belum kosong | Wave belum selesai; batas musuh aktif tetap dipatuhi |
| AC-12 | Goliat berpindah fase | Tidak ada damage tanpa telegraph; kepala penuh menerima 135 damage |
| AC-13 | Domba terakhir hilang bersamaan dengan boss kalah | Satu layar game over; kemenangan tidak ikut dipicu |
| AC-14 | Selesaikan stage lalu muat ulang aplikasi | Stage berikutnya dan hasil terbaik tersimpan; tidak menurunkan rekor lama |
| AC-15 | Uji aset final dan satu sesi penuh | Tidak ada frame kosong, senjata terpotong, arah keliru, atau animasi serang yang loop terus |

Gunakan pengujian otomatis untuk aturan damage, timer, inventaris, progres, dan transisi akhir; gunakan playtest untuk keterbacaan telegraph, rasa kontrol, animasi, kesulitan, dan pacing. Uji integrasi browser setidaknya pada Chrome, Safari, dan Firefox desktop yang tersedia saat rilis.

## 14. Tahapan pengerjaan dan gerbang selesai

| Tahap | Hasil | Syarat melanjutkan |
|---|---|---|
| 1. Graybox | Arena sederhana, lima domba, semua aksi, serigala dan tiga item | Mekanik hidup/mati dan AC-01–10 terbukti |
| 2. Vertical slice | Stage 1, tutorial, HUD/audio, Daud dan serigala dari sprite-gen | Target pemahaman playtest tercapai; impor dan timing aset lolos |
| 3. Variasi musuh | Singa/beruang dan Stage 2–4 | Telegraph terbaca; antrean dan batas aktif benar |
| 4. Boss | Stage 5 dan tiga fase Goliat | Ada peluang respons pada setiap serangan; aturan Arrow jelas |
| 5. Penyelesaian MVP | Menu, save, mapping kontrol, aset/audio final, balancing | Seluruh AC lolos dan profil performa dicatat |

Estimasi waktu dan biaya belum ditetapkan karena kapasitas tim, provider aset, serta tingkat revisi animasi belum diketahui. Dahulukan vertical slice untuk mengukur waktu produksi satu karakter sebelum menghitung seluruh aset.

## 15. Risiko dan keputusan yang perlu ditinjau

| Risiko/keputusan | Penanganan dalam rancangan |
|---|---|
| Domba terasa hilang tanpa kesempatan menolong | Telegraph 1,2 detik, kekebalan kawanan, batas musuh aktif |
| Terlalu banyak tombol untuk pemain baru | Tutorial bertahap, slot tetap, remapping; evaluasi playtest sebelum touch |
| Pemain hanya mengandalkan slingshot | Ancaman dua sisi, charge memperlambat gerak, melee menjangkau kelompok |
| Arrow menghapus tantangan boss | Pengecualian 90 damage pada boss sebagai usulan eksplisit |
| Identitas/animasi AI berubah antarframe | Base terkunci, generasi per state, QA motion, integrasi awal satu karakter |
| Produksi aset membesar | Tiga lingkungan dasar, lima variasi; item tambahan ditunda |
| Platform/gaya belum dipilih pengguna | Browser desktop dan kartun adalah asumsi; konfirmasi sebelum produksi aset massal |

Prioritas tinjauan: bentuk umban vs slingshot bercabang, gaya kartun vs pixel art, platform awal, dan pengecualian Arrow terhadap boss. Tidak perlu menunggu keputusan tersebut untuk menguji graybox mekanik inti.

## 16. Catatan penyusunan dan sumber

PRD ditulis langsung dalam bahasa Indonesia dengan kerangka kebutuhan → lingkup → desain dari skill GTPlanner. Instalasi lokal yang diperiksa hanya berisi SKILL.md dan referensi; runtime `agent.function_calling.agent_tools` tidak ditemukan di direktori skill/plugin yang diperiksa dan `CLAUDE_PLUGIN_ROOT` tidak tersedia. Karena itu, dokumen ini **bukan keluaran eksekusi API GTPlanner**.

Rencana aset mengacu pada skill sprite-gen lokal, khususnya panduan atlas-workflow dan engine-export. Sprite-gen berperan menghasilkan/menyiapkan aset; mekanik permainan tetap diimplementasikan dalam engine. Belum ada sprite, game, atau playtest yang dibuat dalam pekerjaan PRD ini.

Referensi lokal: `/Users/martin/.codex/skills/gtplanner/SKILL.md`, `/Users/martin/.codex/skills/sprite-gen/SKILL.md`, `/Users/martin/.codex/skills/sprite-gen/docs/atlas-workflow.md`, dan `/Users/martin/.codex/skills/sprite-gen/docs/engine-export.md`.
