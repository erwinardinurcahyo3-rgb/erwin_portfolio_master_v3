/**
 * ==============================================================================
 * PORTFOLIO DATA CONFIGURATION: ERWIN ARDI NURCAHYO (Single Source of Truth)
 * ==============================================================================
 * Seluruh data profil, keahlian, riwayat kerja, proyek, dan dokumen resmi diatur
 * terpusat di berkas ini sesuai dengan dokumen CV resmi Erwin Ardi Nurcahyo.
 */

const PORTFOLIO_DATA = {
  // 1. DATA PROFIL PRIBADI & PENDIDIKAN
  profile: {
    name: "Erwin Ardi Nurcahyo",
    title: "Safety Officer | S1 Sistem Informasi",
    tagline: "Safety Officer lulusan S1 Sistem Informasi (IPK 3,44) dengan fokus pada pekerjaan lapangan di site tambang PT Borneo Indobara (BIB): inspeksi harian, observasi hazard dan near miss, serta sidak mingguan ke 19 mitra kerja. Mengawal tindak lanjut temuan dan pelaporan K3 melalui Link Tracker OHS Support, Zero Harm 2.0, dan PICA. Didukung kemampuan data dan sistem (Excel, KNIME, Looker Studio) serta pengalaman sekitar 2 tahun sebagai Admin Commercial dengan SAP.",
    location: "Tanah Bumbu, Kalimantan Selatan",
    status: {
      available: true,
      text: "Safety Officer di PT ERM (Site BIB) • Terbuka untuk Kolaborasi Profesional"
    },
    bio: [
      "Safety Officer lulusan S1 Sistem Informasi STMIK Indonesia Banjarmasin (IPK 3,44) dengan fokus pada pekerjaan lapangan di site tambang PT Borneo Indobara (BIB): memimpin inspeksi harian, observasi hazard dan near miss, asesmen kondisi keselamatan, serta sidak mingguan langsung ke 19 mitra kerja di area kerja mereka untuk memastikan kepatuhan K3.",
      "Mengawal tindak lanjut temuan dan pelaporan K3 melalui Link Tracker OHS Support, Zero Harm 2.0, dan PICA. Didukung kemampuan data dan sistem (Excel, KNIME, Looker Studio, PHP, MySQL) serta pengalaman sekitar 2 tahun sebagai Admin Commercial dengan ERP SAP dalam pengelolaan distribusi, logistik, dan rekonsiliasi data stok inventaris."
    ],
    education: [
      {
        degree: "S1 Sistem Informasi",
        institution: "STMIK Indonesia Banjarmasin",
        period: "2019 – 2023",
        score: "IPK 3,44 (Sangat Memuaskan)"
      },
      {
        degree: "Jurusan Multimedia",
        institution: "SMKN 1 Sungai Loban",
        period: "2015 – 2018",
        score: "Lulus Kompetensi Multimedia"
      }
    ],
    workPhilosophy: "Keselamatan kerja tercapai melalui konsistensi pengawasan lapangan, ketegasan sidak mitra kerja, serta transparansi pelaporan data K3 (Zero Harm 2.0 & PICA) yang akurat dan real-time.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    cvUrl: "docs/CV_Erwin_Ardi_Nurcahyo_2026.pdf",
    cvFilename: "CV_Erwin_Ardi_Nurcahyo_2026.pdf",
    contact: {
      email: "erwinardinurcahyo3@gmail.com",
      phone: "+62 857-5416-5965",
      whatsapp: "6285754165965",
      linkedin: "https://linkedin.com/in/erwin-ardi-nurcahyo",
      github: "https://github.com/erwinardinurcahyo"
    }
  },

  // 2. METRIK RINGKASAN
  stats: [
    { label: "Pengalaman Kerja", value: "2+ Thn", description: "Safety Officer & Admin Commercial" },
    { label: "Sidak Mitra Kerja", value: "19 Mitra", description: "Inspeksi mingguan langsung di site BIB" },
    { label: "Sertifikasi Resmi", value: "7+", description: "BNSP, FMS & Pelatihan Internal BIB" },
    { label: "Indeks Prestasi", value: "3.44", description: "S1 Sistem Informasi STMIK Banjarmasin" }
  ],

  // 3. DAFTAR KEAHLIAN TERSTRUKTUR (7 KATEGORI RESMI CV)
  skills: [
    {
      category: "Keselamatan Lapangan",
      items: [
        "Inspeksi Harian Tambang",
        "Sidak Mitra Kerja (19 Mitra)",
        "Observasi Hazard & Near Miss",
        "Asesmen Kondisi Keselamatan",
        "Identifikasi Bahaya & Penilaian Risiko (IBPR)",
        "Analisis Kerja Aman (PWP)",
        "Izin Kerja Khusus (PKK)"
      ]
    },
    {
      category: "Pelaporan & Tindak Lanjut K3",
      items: [
        "Link Tracker OHS Support",
        "Zero Harm 2.0",
        "PICA (Plan Do Check Action)",
        "Pelaporan Hazard Kritikal & Near Miss",
        "Weekly Report",
        "Koordinasi Mitra Support"
      ]
    },
    {
      category: "Data & Analisis Pelaporan",
      items: [
        "Microsoft Excel (Formula & Tabulasi)",
        "Google Spreadsheets",
        "KNIME Analytics",
        "Looker Studio"
      ]
    },
    {
      category: "Sistem ERP & Bisnis",
      items: [
        "SAP (ERP)",
        "Microsoft Office (Word, PowerPoint, Excel)",
        "Pencatatan Distribusi & Logistik",
        "Pengawasan Stok & Inventaris"
      ]
    },
    {
      category: "IT, Database & Web",
      items: [
        "HTML & CSS",
        "PHP & MySQL",
        "Aplikasi Pengarsipan Berbasis Web",
        "Validasi Database Internal BPS",
        "Troubleshooting Hardware & Software"
      ]
    },
    {
      category: "Desain & Multimedia",
      items: [
        "CorelDraw",
        "Adobe Photoshop",
        "Multimedia Visual & Layout"
      ]
    },
    {
      category: "Soft Skills Profesional",
      items: [
        "Analisis & Pemecahan Masalah",
        "Koordinasi Lintas Tim",
        "Manajemen Waktu",
        "Ketelitian Tinggi",
        "Adaptif di Lingkungan Lapangan"
      ]
    }
  ],

  // 4. RIWAYAT PENGALAMAN KERJA (3 POSISI RESMI)
  experience: [
    {
      role: "Safety Officer",
      company: "PT Equipment Reliability Management (ERM), penempatan di Site PT Borneo Indobara (BIB)",
      period: "Desember 2025 – Sekarang",
      location: "Tanah Bumbu, Kalimantan Selatan",
      description: "Bertanggung jawab atas pengawasan kepatuhan K3 operasional tambang batubara, inspeksi harian, koordinasi mitigasi hazard dengan 19 mitra kerja, serta pelaporan digital OHS.",
      highlights: [
        "Melaksanakan inspeksi harian di area operasional tambang untuk memastikan kepatuhan terhadap standar K3.",
        "Melakukan observasi kondisi dan perilaku kerja di lapangan untuk mengidentifikasi potensi bahaya (hazard) dan near miss.",
        "Melakukan asesmen kondisi keselamatan di area kerja, mencatat temuan, dan menyampaikannya kepada pihak terkait untuk ditindaklanjuti.",
        "Melaksanakan inspeksi mendadak (sidak) kepada mitra kerja BIB dengan mengunjungi 19 mitra kerja setiap minggu langsung di area kerja mereka untuk memeriksa kepatuhan K3.",
        "Berkoordinasi dengan Mitra Support dan mengirimkan pengingat tindak lanjut temuan serta pelaporan Hazard Kritikal dan Near Miss.",
        "Menginput hasil inspeksi dan memperbarui checklist pada Link Tracker OHS Support, Zero Harm 2.0, dan PICA.",
        "Merekap weekly report dan Excel Zero Harm 2.0 setiap akhir bulan."
      ],
      technologies: ["K3 Pertambangan", "Sidak 19 Mitra Kerja", "Link Tracker OHS", "Zero Harm 2.0", "PICA", "IBPR", "Weekly Report"]
    },
    {
      role: "Admin Commercial, Divisi Sales & Operations",
      company: "PT Aviko, penempatan di PT SSB (Sepinggan)",
      period: "Oktober 2023 – Oktober 2025",
      location: "Balikpapan / Site Operasional",
      description: "Mengoperasikan sistem SAP untuk pencatatan distribusi dan logistik alat berat, memantau pergerakan stok inventaris, serta menyusun format laporan performa operasional.",
      highlights: [
        "Mengoperasikan SAP untuk pencatatan distribusi dan logistik, serta menjaga kesesuaian data stok dan inventaris.",
        "Memantau pergerakan barang dan inventaris untuk meminimalkan selisih data dan keterlambatan distribusi.",
        "Menyusun laporan performa penjualan dan operasional untuk departemen terkait.",
        "Menyusun format pelaporan yang lebih terstruktur untuk mengurangi kesalahan input data."
      ],
      technologies: ["SAP (ERP)", "Distribusi Logistik", "Stok Inventaris", "Sales & Ops", "Microsoft Excel"]
    },
    {
      role: "Staf Magang Pengarsipan & IT",
      company: "Badan Pusat Statistik (BPS) Banjarmasin",
      period: "2023",
      location: "Banjarmasin, Kalimantan Selatan",
      description: "Mendukung pengelolaan data survei lapangan sensus, kearsipan dokumen fisik, troubleshooting teknis IT, serta pengembangan aplikasi web pengarsipan.",
      highlights: [
        "Membantu entri dan validasi data hasil survei lapangan ke database internal.",
        "Mengklasifikasi, memberi label, dan menata arsip fisik (dokumen sensus dan survei).",
        "Memberikan dukungan teknis IT dasar kepada staf, seperti pemecahan masalah perangkat lunak dan perangkat keras sederhana.",
        "Membantu pengolahan dan tabulasi data sederhana dengan Microsoft Excel dan software statistik.",
        "Mengerjakan proyek aplikasi pengarsipan berbasis web menggunakan PHP dan MySQL."
      ],
      technologies: ["PHP & MySQL", "Database Sensus", "Pengarsipan BPS", "Data Validation", "IT Support"]
    }
  ],

  // 5. PROYEK UNGGULAN (METODE STAR)
  projects: [
    {
      id: "PRJ-EAN-001",
      title: "Digitalisasi Pelaporan K3 & Sidak Mingguan 19 Mitra Kerja Site BIB",
      role: "Safety Officer & Inisiator Pelaporan",
      period: "2025 – 2026",
      summary: "Pengawalan pengawasan kepatuhan K3 operasional lapangan dengan sidak langsung ke 19 mitra kerja mingguan dan integrasi pelaporan via Link Tracker OHS Support, Zero Harm 2.0, dan PICA.",
      starMethod: {
        situation: "Tingginya jumlah mitra kerja (19 mitra) di site BIB menuntut pengawasan kepatuhan K3 yang konsisten dan tindak lanjut temuan bahaya yang tidak boleh tertunda.",
        task: "Memastikan seluruh mitra kerja diawasi secara langsung setiap minggu dan seluruh temuan hazard kritikal segera ditindaklanjuti serta terekam di sistem.",
        action: "Melakukan sidak mingguan langsung ke area kerja 19 mitra, menginput hasil checklist ke Link Tracker OHS Support, Zero Harm 2.0, dan PICA, serta mengirimkan pengingat tindak lanjut berkala ke Mitra Support.",
        result: "Seluruh temuan bahaya tertutup tuntas (close-out) secara tepat waktu, dan rekapitulasi weekly report serta Excel Zero Harm 2.0 tercapai 100% setiap akhir bulan."
      },
      tags: ["K3 Tambang", "Sidak 19 Mitra", "Zero Harm 2.0", "Link Tracker OHS", "PICA"],
      isFeatured: true
    },
    {
      id: "PRJ-EAN-002",
      title: "Optimasi Pencatatan Logistik & Rekonsiliasi Stok via SAP ERP",
      role: "Admin Commercial & Inventory Analyst",
      period: "2023 – 2025",
      summary: "Standardisasi prosedur input dan rekonsiliasi data inventaris di sistem SAP untuk menekan discrepancy stok serta mempercepat distribusi suku cadang alat berat di PT SSB.",
      starMethod: {
        situation: "Pergerakan barang dan distribusi yang padat berisiko memicu selisih pencatatan antara gudang fisik dan modul SAP.",
        task: "Menjaga kesesuaian data stok dan inventaris serta meminimalkan keterlambatan distribusi logistik.",
        action: "Mengoperasikan SAP secara disiplin untuk pencatatan distribusi, menyusun format pelaporan terstruktur, dan memantau pergerakan stok harian.",
        result: "Tercapai akurasi data stok 99.4%, selisih data terminimalisir, dan laporan performa penjualan tersaji tepat waktu kepada departemen terkait."
      },
      tags: ["SAP ERP", "Logistik Tambang", "Rekonsiliasi Stok", "Sales & Ops", "Excel"],
      isFeatured: true
    },
    {
      id: "PRJ-EAN-003",
      title: "Aplikasi Pengarsipan Dokumen Survei & Sensus Berbasis Web",
      role: "Staf Magang IT & Web Developer",
      period: "2023",
      summary: "Pengembangan aplikasi web mandiri berbasis PHP dan MySQL untuk penataan, pencarian cepat, dan klasifikasi ribuan dokumen sensus di BPS Banjarmasin.",
      starMethod: {
        situation: "Pencarian arsip fisik dokumen survei dan sensus membutuhkan waktu lama saat dibutuhkan untuk verifikasi silang data statistik.",
        task: "Membangun sistem pengarsipan berbasis web yang memudahkan staf menemukan lokasi fisik dokumen sensus secara instan.",
        action: "Merancang database dan aplikasi pengarsipan berbasis web menggunakan PHP dan MySQL, dilengkapi modul klasifikasi rak dan label arsip.",
        result: "Pencarian dokumen sensus terpangkas dari puluhan menit menjadi hitungan detik, memperlancar operasional tim statistik BPS."
      },
      tags: ["PHP & MySQL", "Aplikasi Web", "Database Sensus", "Kearsipan BPS", "Data Entry"],
      isFeatured: true
    }
  ],

  // 6. DOKUMEN PENDUKUNG & 7 SERTIFIKASI RESMI (OTENTIK SESUAI CV)
  documents: [
    {
      id: "DOC-EAN-001",
      title: "Sertifikat BNSP Junior Microsoft Office",
      category: "Sertifikasi BNSP",
      issuer: "LSP Telematika (BNSP)",
      issueYear: "2023",
      credentialId: "BNSP-JMO-EAN-2023",
      downloadName: "Sertifikat_BNSP_Junior_Microsoft_Office_Erwin.pdf",
      badgeColor: "blue",
      isProtected: false,
      accessPin: null,
      redactionStatus: "Verified & Redacted for Privacy",
      description: "Sertifikasi kompetensi kerja standar nasional Indonesia (BNSP) untuk pengoperasian aplikasi perkantoran, pengolahan dokumen, dan komputasi spreadsheet profesional."
    },
    {
      id: "DOC-EAN-002",
      title: "Sertifikat Production Operations Control and Fleet Management Systems",
      category: "Sertifikasi Operasional",
      issuer: "FMS Miners Education, Online",
      issueYear: "2025",
      credentialId: "POC-FMS-EAN-2025",
      downloadName: "Sertifikat_Production_Operations_Fleet_Management_Erwin.pdf",
      badgeColor: "indigo",
      isProtected: false,
      accessPin: null,
      redactionStatus: "Verified & Redacted for Privacy",
      description: "Sertifikasi profesional pemantauan kontrol operasional produksi pertambangan, manajemen armada alat berat/logistik (Fleet Management), dan efisiensi rantai pasok."
    },
    {
      id: "DOC-EAN-003",
      title: "Sertifikat PKK K3 Pertambangan",
      category: "Sertifikasi K3",
      issuer: "Pelatihan Internal PT Borneo Indobara (BIB)",
      issueYear: "2026",
      credentialId: "PKK-K3P-BIB-2026",
      downloadName: "Sertifikat_PKK_K3_Pertambangan_Erwin.pdf",
      badgeColor: "emerald",
      isProtected: false,
      accessPin: null,
      redactionStatus: "Verified & Redacted for Privacy",
      description: "Sertifikasi kompetensi keselamatan dan kesehatan kerja pertambangan mineral dan batubara, standar kepatuhan inspeksi lapangan, dan regulasi K3 site BIB."
    },
    {
      id: "DOC-EAN-004",
      title: "Sertifikat PKK Izin Kerja Khusus",
      category: "Lisensi Kerja",
      issuer: "Pelatihan Internal PT Borneo Indobara (BIB)",
      issueYear: "2026",
      credentialId: "PKK-IKK-BIB-2026",
      downloadName: "Sertifikat_PKK_Izin_Kerja_Khusus_Erwin.pdf",
      badgeColor: "amber",
      isProtected: false,
      accessPin: null,
      redactionStatus: "Verified & Redacted for Privacy",
      description: "Sertifikasi kewenangan penerbitan, verifikasi, dan pengawasan Izin Kerja Khusus (Permit to Work) untuk pekerjaan berisiko tinggi di area site BIB."
    },
    {
      id: "DOC-EAN-005",
      title: "Sertifikat PWP Analisis Kerja Aman",
      category: "Sertifikasi K3",
      issuer: "Pelatihan Internal PT Borneo Indobara (BIB)",
      issueYear: "2026",
      credentialId: "PWP-AKA-BIB-2026",
      downloadName: "Sertifikat_PWP_Analisis_Kerja_Aman_Erwin.pdf",
      badgeColor: "emerald",
      isProtected: false,
      accessPin: null,
      redactionStatus: "Verified & Redacted for Privacy",
      description: "Kompetensi penyusunan Prosedur Wajib Kerja Aman (PWP) / Job Safety Analysis (JSA), identifikasi bahaya langkah kerja, dan mitigasi kecelakaan di tambang."
    },
    {
      id: "DOC-EAN-006",
      title: "Sertifikat PWP Pertemuan Keselamatan",
      category: "Sertifikasi K3",
      issuer: "Pelatihan Internal PT Borneo Indobara (BIB)",
      issueYear: "2026",
      credentialId: "PWP-PK-BIB-2026",
      downloadName: "Sertifikat_PWP_Pertemuan_Keselamatan_Erwin.pdf",
      badgeColor: "emerald",
      isProtected: false,
      accessPin: null,
      redactionStatus: "Verified & Redacted for Privacy",
      description: "Kualifikasi dalam memimpin pertemuan keselamatan harian (Toolbox Meeting / Safety Talk), briefing pra-kerja, dan koordinasi kepatuhan APD lintas mitra kerja."
    },
    {
      id: "DOC-EAN-007",
      title: "Sertifikat PWP Identifikasi Bahaya dan Penilaian Risiko (IBPR)",
      category: "Manajemen Risiko",
      issuer: "Pelatihan Internal PT Borneo Indobara (BIB)",
      issueYear: "2026",
      credentialId: "PWP-IBPR-BIB-2026",
      downloadName: "Sertifikat_PWP_IBPR_Erwin.pdf",
      badgeColor: "rose",
      isProtected: true, // Dilindungi PIN untuk demonstrasi keamanan
      accessPin: "1234",
      redactionStatus: "Protected Document (PIN Required)",
      description: "Keahlian teknis penyusunan matriks IBPR (HIRADC), evaluasi tingkat keparahan risiko bahaya kerja, serta penetapan hierarki pengendalian risiko di site tambang BIB."
    },
    {
      id: "DOC-EAN-008",
      title: "Ijazah S1 Sistem Informasi - STMIK Indonesia Banjarmasin",
      category: "Ijazah",
      issuer: "STMIK Indonesia Banjarmasin",
      issueYear: "2019 – 2023",
      credentialId: "IJZ-S1-SI-STMIK-2023",
      downloadName: "Ijazah_S1_Sistem_Informasi_Erwin_Ardi_Nurcahyo.pdf",
      badgeColor: "teal",
      isProtected: false,
      accessPin: null,
      redactionStatus: "Verified & Redacted for Privacy",
      description: "Gelar Sarjana Sistem Informasi dengan IPK 3,44 (Predikat Sangat Memuaskan). Fokus pada Analisis Data, Rekayasa Basis Data, dan Manajemen Sistem Informasi."
    },
    {
      id: "DOC-EAN-009",
      title: "Ijazah SMKN 1 Sungai Loban - Jurusan Multimedia",
      category: "Ijazah",
      issuer: "SMKN 1 Sungai Loban",
      issueYear: "2015 – 2018",
      credentialId: "IJZ-SMK-MM-2018",
      downloadName: "Ijazah_SMKN1_Multimedia_Erwin_Ardi_Nurcahyo.pdf",
      badgeColor: "teal",
      isProtected: false,
      accessPin: null,
      redactionStatus: "Verified & Redacted for Privacy",
      description: "Pendidikan kejuruan Multimedia dengan penguasaan desain grafis, CorelDraw, Photoshop, pengolahan visual digital, dan dasar pemrograman."
    }
  ],

  // 7. KATEGORI FILTER DOKUMEN
  categories: [
    "Semua",
    "Sertifikasi K3",
    "Sertifikasi BNSP",
    "Sertifikasi Operasional",
    "Manajemen Risiko",
    "Lisensi Kerja",
    "Ijazah"
  ]
};

// Export ke window untuk kemudahan akses di runtime browser
window.PORTFOLIO_DATA = PORTFOLIO_DATA;
