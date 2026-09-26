/* ================================================
   certificates.js — بيانات الشهادات
   ================================================

   ─── إزاي تضيف شهادة جديدة ──────────────────
   1. أضف Object في مصفوفة CERTIFICATES
   2. لو عندك صورة: ضع رابطها في imgUrl
   3. لو جارية: status: 'upcoming'
   4. لو خلصت:  status: 'done'

   خصائص كل شهادة:
     icon       → إيموجي
     nameEn/Ar  → اسم الشهادة
     issuerEn/Ar→ جهة الإصدار
     imgUrl     → رابط صورة الشهادة (null = بدون صورة)
     status     → 'done' | 'upcoming'
   ================================================ */

const CERTIFICATES = [

    /* ─── AUC English ─────────────────────────── */
    {
        icon: '🎓',
        nameEn: 'AUC English Certificate',
        nameAr: 'شهادة اللغة الإنجليزية — AUC',
        issuerEn: 'American University in Cairo',
        issuerAr: 'الجامعة الأمريكية بالقاهرة',
        imgUrl: 'https://i.postimg.cc/s2qPjQ97/Whats-App-Image-2026-02-14-at-3-21-55-PM.jpg',
        status: 'done',
    },


    /* ─── Microsoft Access ────────────────────── */
    {
        icon: '🗃️',
        nameEn: 'Microsoft Access Cert. (1)',
        nameAr: 'شهادة مايكروسوفت أكسس (1)',
        issuerEn: 'University / IT Course',
        issuerAr: 'جامعة / دورة IT',
        imgUrl: 'https://i.postimg.cc/cCs21nT3/access-1.png',
        status: 'done',
    },
    {
        icon: '🗃️',
        nameEn: 'Microsoft Access Cert. (2)',
        nameAr: 'شهادة مايكروسوفت أكسس (2)',
        issuerEn: 'University / IT Course',
        issuerAr: 'جامعة / دورة IT',
        imgUrl: 'https://i.postimg.cc/tg3B1gsS/access-2.png',
        status: 'done',
    },
    {
        icon: '🗃️',
        nameEn: 'Microsoft Access Cert. (3)',
        nameAr: 'شهادة مايكروسوفت أكسس (3)',
        issuerEn: 'University / IT Course',
        issuerAr: 'جامعة / دورة IT',
        imgUrl: 'https://i.postimg.cc/3NVXfMkV/access-3.png',
        status: 'done',
    },

    /* ─── Microsoft Excel ─────────────────────── */
    {
        icon: '📊',
        nameEn: 'Microsoft Excel Cert. (1)',
        nameAr: 'شهادة مايكروسوفت إكسل (1)',
        issuerEn: 'University / IT Course',
        issuerAr: 'جامعة / دورة IT',
        imgUrl: 'https://i.postimg.cc/rpjSXRdG/excel-1.png',
        status: 'done',
    },
    {
        icon: '📊',
        nameEn: 'Microsoft Excel Cert. (2)',
        nameAr: 'شهادة مايكروسوفت إكسل (2)',
        issuerEn: 'University / IT Course',
        issuerAr: 'جامعة / دورة IT',
        imgUrl: 'https://i.postimg.cc/ncmBVPjG/excel-2.png',
        status: 'done',
    },

    /* ─── IT Support ──────────────────────────── */
    {
        icon: '🔧',
        nameEn: 'IT Support & Fundamentals',
        nameAr: 'دعم تقني ومبادئ الحاسوب',
        issuerEn: 'University / ProProfs',
        issuerAr: 'جامعة / ProProfs',
        imgUrl: 'https://i.postimg.cc/Kz436qhb/it-support.png',
        status: 'done',
    },

    /* ─── PowerPoint ──────────────────────────── */
    {
        icon: '📽️',
        nameEn: 'PowerPoint Cert. (1)',
        nameAr: 'شهادة باوربوينت (1)',
        issuerEn: 'University / IT Course',
        issuerAr: 'جامعة / دورة IT',
        imgUrl: 'https://i.postimg.cc/TYbHbxHP/powerpoint-1.png',
        status: 'done',
    },
    {
        icon: '📽️',
        nameEn: 'PowerPoint Cert. (2)',
        nameAr: 'شهادة باوربوينت (2)',
        issuerEn: 'University / IT Course',
        issuerAr: 'جامعة / دورة IT',
        imgUrl: 'https://i.postimg.cc/nz50sS4R/powerpoint-2.png',
        status: 'done',
    },

    /* ─── Web Development ─────────────────────── */
    {
        icon: '🌐',
        nameEn: 'Web Development Basics',
        nameAr: 'أساسيات تطوير الويب',
        issuerEn: 'University / IT Course',
        issuerAr: 'جامعة / دورة IT',
        imgUrl: 'https://i.postimg.cc/3J2nRBdB/web-dev.png',
        status: 'done',
    },

    /* ─── Microsoft Word ──────────────────────── */
    {
        icon: '📄',
        nameEn: 'Microsoft Word Cert. (1)',
        nameAr: 'شهادة مايكروسوفت وورد (1)',
        issuerEn: 'University / IT Course',
        issuerAr: 'جامعة / دورة IT',
        imgUrl: 'https://i.postimg.cc/ydJTzhMD/word-1.png',
        status: 'done',
    },
    {
        icon: '📄',
        nameEn: 'Microsoft Word Cert. (2)',
        nameAr: 'شهادة مايكروسوفت وورد (2)',
        issuerEn: 'University / IT Course',
        issuerAr: 'جامعة / دورة IT',
        imgUrl: 'https://i.postimg.cc/bN098wBs/word-2.png',
        status: 'done',
    },

    /* ─── أضف شهادة جديدة هنا ─── */

];


    /* ─── AAA Core (Ghawy) ────────────────────── */
    {
        icon: '🧠',
        nameEn: 'AAA Core',
        nameAr: 'AAA Core',
        issuerEn: 'Ghawy AI Educational Platform',
        issuerAr: 'منصة Ghawy للتعليم بالذكاء الاصطناعي',
        imgUrl: 'assets/certs/aaa-core.png',
        status: 'done',
    },

    /* ─── AI Foundations (Ghawy) ─────────────────*/
    {
        icon: '🧠',
        nameEn: 'AI Foundations',
        nameAr: 'AI Foundations',
        issuerEn: 'Ghawy AI Educational Platform',
        issuerAr: 'منصة Ghawy للتعليم بالذكاء الاصطناعي',
        imgUrl: 'assets/certs/ai-foundations.png',
        status: 'done',
    },

    /* ─── AI Automation Lab (Ghawy) ──────────────*/
    {
        icon: '🧠',
        nameEn: 'AI Automation Lab',
        nameAr: 'AI Automation Lab',
        issuerEn: 'Ghawy AI Educational Platform',
        issuerAr: 'منصة Ghawy للتعليم بالذكاء الاصطناعي',
        imgUrl: 'assets/certs/ai-automation-lab.png',
        status: 'done',
    },

    /* ─── Digital Egypt Cubs Initiative ──────────*/
    {
        icon: '🇪🇬',
        nameEn: 'Digital Egypt Cubs Initiative — Level Two',
        nameAr: 'مبادرة Digital Egypt Cubs — المستوى الثاني',
        issuerEn: 'MCIT / Udacity',
        issuerAr: 'MCIT / Udacity',
        imgUrl: 'assets/certs/digital-egypt-cubs.png',
        status: 'done',
    },

    /* ─── ICPC ECPC Qualifications ────────────────*/
    {
        icon: '🏆',
        nameEn: 'ICPC ECPC Qualifications — 151st Place',
        nameAr: 'تصفيات ICPC ECPC — المركز 151',
        issuerEn: 'International Collegiate Programming Contest',
        issuerAr: 'مسابقة البرمجة التنافسية الدولية',
        imgUrl: 'assets/certs/icpc-2026.png',
        status: 'done',
    },

/* ================================================
   RENDER CERTIFICATES
   ─── بتبني الـ HTML في: #certsGrid
   ─── بتستدعي initCertModal من app.js تلقائياً
   ================================================ */
function renderCertificates(lang) {
    const isAr = (lang === 'ar');
    const gridEl = document.getElementById('certsGrid');
    if (!gridEl) return;

    gridEl.innerHTML = CERTIFICATES.map(c => `
    <div class="cert-card reveal"${c.imgUrl ? ` data-img="${c.imgUrl}"` : ''}>
      <div class="cert-icon">${c.icon}</div>
      ${c.status === 'upcoming'
            ? `<div class="cert-badge upcoming">${isAr ? 'جارٍ' : 'In Progress'}</div>`
            : ''}
      <div class="cert-name">${isAr ? c.nameAr : c.nameEn}</div>
      <div class="cert-issuer">${isAr ? c.issuerAr : c.issuerEn}</div>
    </div>`).join('');

    /* تفعيل المودال على الكروت الجديدة */
    if (typeof initCertModal === 'function') initCertModal();

    /* Reveal */
    if (typeof reObserveAll === "function") reObserveAll();
}