# DOKUMEN REVISI (revisi.md)
================================================================================
STATUS      : SELESAI DITERAPKAN (RESOLVED & VERIFIED)
KODE REVISI : REV-202610-007 (v2.4.0)
TANGGAL     : 21 Oktober 2026
ARSITEK     : ZettBOT by Zettbos
================================================================================

## Laporan Perbaikan 5 Kendala dari Tangkapan Layar Pengguna:

1. **Gambar 1: Modul/Banner Admin Lama Masih Muncul di `index.html`**
   - *Akar Masalah:* `#admin-toolbar-card` ("Mode Pengelola Aktif") dan modal admin lama masih tersisa di kode `index.html`. Ketika `isAdmin = true` tersimpan di browser, banner lama ini muncul mengambang dan merusak estetika antarmuka.
   - *Solusi Selesai:* `#admin-toolbar-card` telah dihapus sepenuhnya dari `index.html`. Tombol navigasi "Portal Admin ↗" kini membuka `admin.html` di tab baru secara mandiri dan profesional.

2. **Gambar 2: Form Hubungi Saya Tidak Berfungsi Email atau WA**
   - *Akar Masalah:* Form hanya memicu `window.location.href = mailto:...`, yang macet di komputer Windows tanpa aplikasi email desktop bawaan (seperti Outlook). Tidak ada tombol/aksi langsung ke WhatsApp.
   - *Solusi Selesai:* Form kontak di `index.html` kini dilengkapi tombol aksi ganda terpadu:
     - `[🟢 Kirim via WhatsApp]` (`#btn-send-wa`): Membuka chat WhatsApp resmi Mas Erwin (`https://wa.me/6285754165965?text=...`) dengan pesan terformat rapi dan terverifikasi.
     - `[✉️ Kirim via Email / Gmail]` (`#btn-send-email`): Membuka komposer web Gmail (`https://mail.google.com/mail/?view=cm&fs=1&to=...`) di tab baru dengan fallback otomatis ke `mailto:` jika aplikasi lokal tersedia.

3. **Gambar 3: Penunjuk Menu Navigasi (Navbar) Tidak Berfungsi / Tidak Sinkron**
   - *Akar Masalah:* Menu navbar hanya memiliki class `.active` yang statis di "Beranda" tanpa adanya ScrollSpy atau pelacak scroll posisi layar.
   - *Solusi Selesai:* Menambahkan sistem ScrollSpy pintar yang memantau pergerakan scroll pengunjung secara mulus (60fps) dan otomatis memindahkan garis penunjuk biru aktif (`.active`) pada desktop maupun mobile menu mengikuti bagian yang sedang dilihat (`#beranda`, `#tentang`, `#pengalaman`, `#proyek`, `#dokumen`, `#kontak`).

4. **Gambar 4: Dokumen/Deskripsi Kosong & Gambar Sertifikat Upload Tidak Muncul**
   - *Akar Masalah:* 
     a. Kotak input pencarian `#search-docs` terisi otomatis oleh autofill browser dengan username GitHub (`erwinardinurcahyo3-rgb`) akibat adanya tag form login lama di halaman, sehingga dokumen terfilter menjadi 0.
     b. Pratinjau kartu dokumen (`doc-preview-thumb`) dan modal penampil dokumen (`#doc-viewer-modal`) belum memiliki logika rendering gambar untuk menampilkan lampiran asli yang diunggah (`customFileData`).
   - *Solusi Selesai:*
     a. Menambahkan `autocomplete="off"` pada `#search-docs` dan membersihkan sisa form password dari `index.html` agar browser tidak meng-autofill username.
     b. Memperbarui `renderDocumentsList()` sehingga jika dokumen memiliki lampiran gambar (`customFileData`), kartu dokumen langsung menampilkan thumbnail foto sertifikat asli dengan badge "Foto Dokumen ✓".
     c. Memperbarui `#doc-viewer-modal` dan fungsi `openDocViewer(doc)` dengan kontainer `#viewer-attachment-container` untuk menampilkan foto sertifikat secara utuh saat tombol "Lihat Dokumen" ditekan.

5. **Gambar 5: Berkas CV Hasil Unduh Error / Tidak Bisa Dibuka (Adobe Acrobat Error 14)**
   - *Akar Masalah:* Tombol unduh CV sebelumnya memicu pembuatan blob PDF kosong/dummy (150 byte) dan berkas fisik `docs/CV_Erwin_Ardi_Nurcahyo_2026.pdf` belum tersedia di folder repositori, sehingga Adobe Acrobat menolaknya dengan error "damaged/unsupported file type (Error 14)".
   - *Solusi Selesai:* Berkas PDF asli otentik milik Mas Erwin (`media_1792583641366.pdf` ukuran 299 KB) telah disalin dan ditempatkan ke `docs/CV_Erwin_Ardi_Nurcahyo_2026.pdf`. Tombol `btn-download-cv` dan fungsi `triggerFileDownload()` kini langsung mengunduh berkas PDF fisik asli tersebut. Berkas 100% valid, lengkap, dan langsung terbuka sempurna di Adobe Acrobat maupun browser viewer.
