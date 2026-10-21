/**
 * ==============================================================================
 * PORTOFOLIO APPLICATION ENGINE (Vanilla JS Modular)
 * ==============================================================================
 * Menangani perenderan data dinamis, filter kategori dokumen, instant search,
 * viewer dokumen interaktif, proteksi modal PIN, unduh vCard digital,
 * dan sakelar tema gelap/terang (Dark/Light Mode).
 */

document.addEventListener('DOMContentLoaded', () => {
  // Pastikan data portofolio tersedia
  const DATA = window.PORTFOLIO_DATA;
  if (!DATA) {
    console.error('Data portofolio (PORTFOLIO_DATA) tidak ditemukan!');
    return;
  }

  // State Session
  let activeCategory = 'Semua';
  let searchQuery = '';
  let unlockedDocs = new Set(); // Menyimpan ID dokumen yang berhasil dibuka PIN-nya pada sesi ini
  let currentTargetDoc = null; // Menyimpan objek dokumen yang sedang diminta aksesnya

  // ============================================================================
  // 1. TEMA DARK / LIGHT MODE
  // ============================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const iconMoon = document.getElementById('icon-moon');
  const iconSun = document.getElementById('icon-sun');
  const htmlEl = document.documentElement;

  // Baca preferensi tersimpan atau deteksi sistem
  const savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      iconMoon.style.display = 'none';
      iconSun.style.display = 'block';
    } else {
      iconMoon.style.display = 'block';
      iconSun.style.display = 'none';
    }
  }

  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme') || 'light';
    const nextTheme = current === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    showToast(nextTheme === 'dark' ? 'Mode Gelap diaktifkan' : 'Mode Terang diaktifkan');
  });

  // ============================================================================
  // 2. NAVIGASI MOBILE (HAMBURGER DRAWER)
  // ============================================================================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });

    // Tutup drawer saat link diklik
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
      });
    });
  }

  // Active link highlighter pada scroll
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // ============================================================================
  // 3. RENDER DATA HERO, STATS & PROFIL
  // ============================================================================
  const heroNameEl = document.getElementById('hero-name');
  const heroTitleEl = document.getElementById('hero-title');
  const heroTaglineEl = document.getElementById('hero-tagline');
  const heroStatusText = document.getElementById('hero-status-text');
  const heroAvatar = document.getElementById('hero-avatar');
  const statsContainer = document.getElementById('stats-container');

  if (heroNameEl) {
    heroNameEl.innerHTML = `Halo, Saya <span class="highlight">${escapeHTML(DATA.profile.name)}</span>`;
  }
  if (heroTitleEl) heroTitleEl.textContent = DATA.profile.title;
  if (heroTaglineEl) heroTaglineEl.textContent = DATA.profile.tagline;
  if (heroStatusText && DATA.profile.status) {
    heroStatusText.textContent = DATA.profile.status.text;
  }
  if (heroAvatar && DATA.profile.avatar) {
    heroAvatar.src = DATA.profile.avatar;
    heroAvatar.alt = DATA.profile.name;
  }

  // Render Stats Cards (Grid Responsif 4 Kolom)
  if (statsContainer && DATA.stats) {
    statsContainer.innerHTML = DATA.stats.map(stat => `
      <div class="stat-card">
        <div class="stat-value">${escapeHTML(stat.value)}</div>
        <div class="stat-label">${escapeHTML(stat.label)}</div>
        <div class="stat-desc">${escapeHTML(stat.description)}</div>
      </div>
    `).join('');
  }

  // ============================================================================
  // 4. RENDER TENTANG SAYA & KEAHLIAN (SKILLS)
  // ============================================================================
  const aboutBioContainer = document.getElementById('about-bio-container');
  const philosophyText = document.getElementById('philosophy-text');
  const skillsContainer = document.getElementById('skills-container');

  if (aboutBioContainer && DATA.profile.bio) {
    const bioHtml = DATA.profile.bio.map(p => `<p>${escapeHTML(p)}</p>`).join('');
    const philosophyBox = document.getElementById('philosophy-box');
    aboutBioContainer.innerHTML = bioHtml;
    if (philosophyBox) aboutBioContainer.appendChild(philosophyBox);
  }

  if (philosophyText && DATA.profile.workPhilosophy) {
    philosophyText.textContent = `"${DATA.profile.workPhilosophy}"`;
  }

  // Render Skill Categories
  if (skillsContainer && DATA.skills) {
    skillsContainer.innerHTML = DATA.skills.map(cat => `
      <div class="skill-category-card">
        <h4 class="skill-cat-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-primary);">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          <span>${escapeHTML(cat.category)}</span>
        </h4>
        <div class="skill-pills">
          ${cat.items.map(item => `<span class="skill-pill">${escapeHTML(item)}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  // ============================================================================
  // 5. RENDER PENGALAMAN KERJA (TIMELINE)
  // ============================================================================
  const experienceTimeline = document.getElementById('experience-timeline');
  if (experienceTimeline && DATA.experience) {
    experienceTimeline.innerHTML = DATA.experience.map(exp => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div class="timeline-header">
            <div>
              <h3 class="timeline-role">${escapeHTML(exp.role)}</h3>
              <div class="timeline-company">${escapeHTML(exp.company)} • ${escapeHTML(exp.location)}</div>
            </div>
            <span class="timeline-period">${escapeHTML(exp.period)}</span>
          </div>
          <p class="timeline-desc">${escapeHTML(exp.description)}</p>
          <ul class="timeline-highlights">
            ${exp.highlights.map(h => `<li>${escapeHTML(h)}</li>`).join('')}
          </ul>
          <div class="timeline-tags">
            ${exp.technologies.map(t => `<span class="badge badge-blue">${escapeHTML(t)}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  // ============================================================================
  // 6. RENDER PROYEK UNGGULAN (METODE STAR)
  // ============================================================================
  const projectsContainer = document.getElementById('projects-container');
  if (projectsContainer && DATA.projects) {
    projectsContainer.innerHTML = DATA.projects.map(prj => `
      <div class="project-card">
        <div>
          <div class="project-badge-bar">
            <span class="badge badge-emerald">${escapeHTML(prj.period)}</span>
            <span class="badge badge-blue">${escapeHTML(prj.role)}</span>
          </div>
          <h3 class="project-title">${escapeHTML(prj.title)}</h3>
          <p class="project-summary">${escapeHTML(prj.summary)}</p>

          <div class="star-details">
            <div class="star-row">
              <span class="star-label">Tantangan:</span>
              <span class="star-val">${escapeHTML(prj.starMethod.situation)}</span>
            </div>
            <div class="star-row">
              <span class="star-label">Tindakan:</span>
              <span class="star-val">${escapeHTML(prj.starMethod.action)}</span>
            </div>
            <div class="star-row">
              <span class="star-label">Hasil Nyata:</span>
              <span class="star-val" style="color: var(--accent-emerald); font-weight: 600;">${escapeHTML(prj.starMethod.result)}</span>
            </div>
          </div>
        </div>

        <div class="project-footer">
          <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
            ${prj.tags.slice(0, 3).map(tag => `<span class="skill-pill" style="font-size: 0.75rem; padding: 0.2rem 0.5rem;">${escapeHTML(tag)}</span>`).join('')}
          </div>
          <a href="#dokumen" class="btn btn-secondary btn-sm" onclick="filterDocsByProject('${escapeHTML(prj.title)}');">
            <span>Bukti Dokumen</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    `).join('');
  }

  // ============================================================================
  // 7. RENDER DOKUMEN PENDUKUNG & SISTEM FILTER/SEARCH
  // ============================================================================
  const categoryFilters = document.getElementById('category-filters');
  const documentsContainer = document.getElementById('documents-container');
  const searchInput = document.getElementById('search-docs');

  // Render Kategori Pills
  if (categoryFilters && DATA.categories) {
    categoryFilters.innerHTML = DATA.categories.map(cat => `
      <button type="button" class="filter-btn ${cat === activeCategory ? 'active' : ''}" data-category="${escapeHTML(cat)}">
        ${escapeHTML(cat)}
      </button>
    `).join('');

    categoryFilters.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      activeCategory = btn.dataset.category;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderDocumentsList();
    });
  }

  // Pencarian Instan (Real-time Search)
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderDocumentsList();
    });
  }

  // Fungsi Render Kartu Dokumen
  function renderDocumentsList() {
    if (!documentsContainer || !DATA.documents) return;

    const filtered = DATA.documents.filter(doc => {
      const matchCat = activeCategory === 'Semua' || doc.category === activeCategory;
      const matchSearch = searchQuery === '' ||
        doc.title.toLowerCase().includes(searchQuery) ||
        doc.issuer.toLowerCase().includes(searchQuery) ||
        doc.category.toLowerCase().includes(searchQuery) ||
        doc.description.toLowerCase().includes(searchQuery);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      documentsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem; background: var(--card-bg); border: 1px dashed var(--border-color); border-radius: var(--radius-lg);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5" style="margin-bottom: 1rem;">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h4 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 0.5rem;">Tidak Ada Dokumen Ditemukan</h4>
          <p style="font-size: 0.875rem; color: var(--text-muted);">Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
        </div>
      `;
      return;
    }

    documentsContainer.innerHTML = filtered.map(doc => {
      const isLocked = doc.isProtected && !unlockedDocs.has(doc.id);
      const badgeStyle = doc.badgeColor ? `badge-${doc.badgeColor}` : 'badge-blue';

      return `
        <div class="doc-card" id="card-${doc.id}">
          <div class="doc-preview-thumb">
            <span class="watermark-subtle">SALINAN RESMI • PRIVACY VERIFIED</span>
            <div class="doc-thumb-content">
              <div class="doc-thumb-icon" style="${isLocked ? 'color: var(--accent-rose);' : ''}">
                ${isLocked ? `
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                ` : `
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                `}
              </div>
              <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary);">${escapeHTML(doc.category)}</span>
            </div>
          </div>

          <div class="doc-body">
            <div class="doc-meta-top">
              <span class="badge ${badgeStyle}">${escapeHTML(doc.category)}</span>
              <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted);">${escapeHTML(doc.issueYear)}</span>
            </div>

            <h3 class="doc-title">${escapeHTML(doc.title)}</h3>
            <div class="doc-issuer">Penerbit: <strong>${escapeHTML(doc.issuer)}</strong></div>

            <div class="doc-redaction-badge ${isLocked ? 'lock' : ''}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>${isLocked ? 'Dilindungi PIN / Izin Khusus' : escapeHTML(doc.redactionStatus)}</span>
            </div>

            <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.5;">
              ${escapeHTML(doc.description)}
            </p>

            <div class="doc-actions">
              <button type="button" class="btn btn-primary btn-sm btn-open-doc" style="flex: 1;" data-doc-id="${doc.id}">
                ${isLocked ? `
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <span>Buka PIN</span>
                ` : `
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <span>Lihat Dokumen</span>
                `}
              </button>

              <button type="button" class="btn btn-secondary btn-sm btn-download-single" data-doc-id="${doc.id}" title="Unduh Versi Resmi">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Pasang Event Listeners pada tombol kartu
    document.querySelectorAll('.btn-open-doc').forEach(btn => {
      btn.addEventListener('click', () => {
        const docId = btn.dataset.docId;
        const targetDoc = DATA.documents.find(d => d.id === docId);
        if (targetDoc) handleDocumentClick(targetDoc);
      });
    });

    document.querySelectorAll('.btn-download-single').forEach(btn => {
      btn.addEventListener('click', () => {
        const docId = btn.dataset.docId;
        const targetDoc = DATA.documents.find(d => d.id === docId);
        if (targetDoc) handleDocumentDownload(targetDoc);
      });
    });
  }

  // Render awal dokumen
  renderDocumentsList();

  // Helper filter dari klik Proyek
  window.filterDocsByProject = function (projectTitle) {
    activeCategory = 'Semua';
    searchQuery = 'sertifikasi';
    if (searchInput) searchInput.value = searchQuery;
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.category === 'Semua');
    });
    renderDocumentsList();
    const docSection = document.getElementById('dokumen');
    if (docSection) docSection.scrollIntoView({ behavior: 'smooth' });
  };

  // ============================================================================
  // 8. LOGIKA EMBEDDED DOCUMENT VIEWER & MODAL PIN
  // ============================================================================
  const docViewerModal = document.getElementById('doc-viewer-modal');
  const btnModalClose = document.getElementById('btn-modal-close');
  const btnModalDownload = document.getElementById('btn-modal-download');
  const modalDocTitle = document.getElementById('modal-doc-title');
  const modalDocMeta = document.getElementById('modal-doc-meta');
  const sheetInstitution = document.getElementById('sheet-institution-name');
  const sheetCredentialId = document.getElementById('sheet-credential-id');
  const sheetDocumentTitle = document.getElementById('sheet-document-title');
  const sheetRecipient = document.getElementById('sheet-recipient-name');
  const sheetStatement = document.getElementById('sheet-statement-desc');
  const sheetRedaction = document.getElementById('sheet-redaction-preview');

  // PIN Modal Elements
  const pinModal = document.getElementById('pin-modal');
  const pinDialogCard = document.getElementById('pin-dialog-card');
  const pinInputs = document.querySelectorAll('.pin-digit-input');
  const pinErrorMsg = document.getElementById('pin-error-msg');
  const btnVerifyPin = document.getElementById('btn-verify-pin');
  const btnCancelPin = document.getElementById('btn-cancel-pin');
  const btnRequestPinWa = document.getElementById('btn-request-pin-wa');

  function handleDocumentClick(doc) {
    currentTargetDoc = doc;
    // Cek apakah dokumen butuh PIN dan belum dibuka
    if (doc.isProtected && !unlockedDocs.has(doc.id)) {
      openPinModal(doc);
    } else {
      openDocViewer(doc);
    }
  }

  function handleDocumentDownload(doc) {
    if (doc.isProtected && !unlockedDocs.has(doc.id)) {
      currentTargetDoc = doc;
      openPinModal(doc);
      return;
    }
    triggerFileDownload(doc.downloadName || `${doc.id}.pdf`, doc.title);
  }

  // Buka Modal Viewer
  function openDocViewer(doc) {
    currentTargetDoc = doc;
    if (modalDocTitle) modalDocTitle.textContent = doc.title;
    if (modalDocMeta) modalDocMeta.textContent = `Penerbit: ${doc.issuer} | Periode: ${doc.issueYear}`;
    if (sheetInstitution) sheetInstitution.textContent = doc.issuer.toUpperCase();
    if (sheetCredentialId) sheetCredentialId.textContent = `NOMOR KREDENSIAL: ${doc.credentialId || 'TERVERIFIKASI'}`;
    if (sheetDocumentTitle) sheetDocumentTitle.textContent = doc.title.toUpperCase();
    if (sheetRecipient) sheetRecipient.textContent = DATA.profile.name;
    if (sheetStatement) sheetStatement.textContent = doc.description;
    if (sheetRedaction) {
      sheetRedaction.textContent = doc.redactionDetails
        ? `██ [SENSOR PRIVASI: ${doc.redactionDetails}] ██`
        : '██ DATA PRIBADI & NIK TELAH DISENSOR SESUAI STANDAR PRIVASI ██';
    }

    if (btnModalDownload) {
      btnModalDownload.onclick = () => {
        triggerFileDownload(doc.downloadName || `${doc.id}.pdf`, doc.title);
      };
    }

    docViewerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDocViewer() {
    docViewerModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (btnModalClose) btnModalClose.addEventListener('click', closeDocViewer);
  if (docViewerModal) {
    docViewerModal.addEventListener('click', (e) => {
      if (e.target === docViewerModal) closeDocViewer();
    });
  }

  // Logika Modal PIN
  function openPinModal(doc) {
    currentTargetDoc = doc;
    pinErrorMsg.textContent = '';
    pinInputs.forEach(input => input.value = '');

    // Siapkan tombol WA request dengan template pesan otomatis
    if (btnRequestPinWa) {
      const waNumber = DATA.profile.contact.whatsapp;
      const waMsg = encodeURIComponent(`Halo Mas ${DATA.profile.name.split(' ')[0]}, saya tertarik meninjau dokumen portofolio "${doc.title}". Boleh minta 4-digit PIN aksesnya? Terima kasih.`);
      btnRequestPinWa.href = `https://wa.me/${waNumber}?text=${waMsg}`;
    }

    pinModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      if (pinInputs[0]) pinInputs[0].focus();
    }, 150);
  }

  function closePinModal() {
    pinModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (btnCancelPin) btnCancelPin.addEventListener('click', closePinModal);
  if (pinModal) {
    pinModal.addEventListener('click', (e) => {
      if (e.target === pinModal) closePinModal();
    });
  }

  // Interaksi PIN Input Boxes (Auto Next & Backspace)
  pinInputs.forEach((input, idx) => {
    input.addEventListener('input', (e) => {
      if (e.target.value.length === 1 && idx < pinInputs.length - 1) {
        pinInputs[idx + 1].focus();
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !e.target.value && idx > 0) {
        pinInputs[idx - 1].focus();
      }
      if (e.key === 'Enter') {
        verifyPinInput();
      }
    });
  });

  if (btnVerifyPin) {
    btnVerifyPin.addEventListener('click', verifyPinInput);
  }

  function verifyPinInput() {
    if (!currentTargetDoc) return;
    const enteredPin = Array.from(pinInputs).map(i => i.value).join('');

    if (enteredPin.length < 4) {
      pinErrorMsg.textContent = 'Silakan masukkan 4 angka PIN lengkap.';
      triggerShake();
      return;
    }

    const correctPin = currentTargetDoc.accessPin || '1234';

    if (enteredPin === correctPin) {
      // PIN Benar!
      unlockedDocs.add(currentTargetDoc.id);
      closePinModal();
      showToast('Kunci berhasil dibuka! Membuka dokumen...', 'success');
      renderDocumentsList(); // Update ikon gembok pada kartu
      setTimeout(() => {
        openDocViewer(currentTargetDoc);
      }, 250);
    } else {
      // PIN Salah
      pinErrorMsg.textContent = 'Kode PIN salah. Silakan coba kembali atau minta akses.';
      triggerShake();
      pinInputs.forEach(i => i.value = '');
      if (pinInputs[0]) pinInputs[0].focus();
    }
  }

  function triggerShake() {
    pinDialogCard.classList.remove('shake');
    void pinDialogCard.offsetWidth; // Trigger reflow
    pinDialogCard.classList.add('shake');
  }

  // ============================================================================
  // 9. DOWNLOAD RESMI & SIMULASI PENAMAAN BERKAS RAPI
  // ============================================================================
  function triggerFileDownload(filename, docTitle) {
    // Buat file Blob PDF dummy yang valid dengan header dan nama yang rapi
    const pdfBlobContent = `%PDF-1.4\n%âãÏÓ\n1 0 obj\n<< /Title (${docTitle}) /Author (${DATA.profile.name}) /Subject (Portofolio Resmi 2026) >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF`;
    const blob = new Blob([pdfBlobContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast(`Mengunduh berkas resmi: ${filename}`, 'success');
  }

  // Unduh CV
  const btnDownloadCv = document.getElementById('btn-download-cv');
  if (btnDownloadCv) {
    btnDownloadCv.addEventListener('click', () => {
      triggerFileDownload(DATA.profile.cvFilename || 'CV_Ahmad_Rizky_Pratama_2026.pdf', 'Curriculum Vitae Resmi');
    });
  }

  // ============================================================================
  // 10. GENERATE & UNDUH VCARD (KARTU KONTAK DIGITAL SMARTPHONE)
  // ============================================================================
  const btnDownloadVcard = document.getElementById('btn-download-vcard');
  if (btnDownloadVcard) {
    btnDownloadVcard.addEventListener('click', () => {
      const p = DATA.profile;
      const vcardData = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${p.name}`,
        `TITLE:${p.title}`,
        `EMAIL;TYPE=INTERNET,WORK:${p.contact.email}`,
        `TEL;TYPE=CELL,VOICE:${p.contact.phone}`,
        `URL:${window.location.href}`,
        `NOTE:${p.tagline}`,
        'END:VCARD'
      ].join('\r\n');

      const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Kontak_${p.name.replace(/[^a-zA-Z0-9]/g, '_')}.vcf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showToast('Kartu kontak digital (vCard) siap disimpan ke ponsel Anda!', 'success');
    });
  }

  // ============================================================================
  // 11. FORMULIR KONTAK INTERAKTIF
  // ============================================================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const subject = document.getElementById('form-subject').value || 'Pesan dari Website Portofolio';
      const message = document.getElementById('form-message').value;

      // Berikan umpan balik instan
      showToast(`Pesan berhasil dikirim! Terima kasih, ${name}. Saya akan segera menghubungi Anda.`, 'success');

      // Siapkan fallback mailto
      const mailtoLink = `mailto:${DATA.profile.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`)}`;

      contactForm.reset();

      // Buka email client setelah delay halus
      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 1000);
    });
  }

  // ============================================================================
  // 12. TOAST NOTIFICATION UTILITY
  // ============================================================================
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';

    let iconSvg = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    `;

    if (type === 'success') {
      iconSvg = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;
    }

    toast.innerHTML = `
      ${iconSvg}
      <span>${escapeHTML(message)}</span>
    `;

    container.appendChild(toast);

    // Animasi muncul
    setTimeout(() => toast.classList.add('show'), 10);

    // Hapus setelah 3.5 detik
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3500);
  }

  // Sanitasi string sederhana untuk keamanan DOM
  function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Keyboard shortcut ESC untuk menutup modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDocViewer();
      closePinModal();
    }
  });
});
