/* ================================================
   projects.js — بيانات المشاريع
   ================================================

   ─── إزاي تضيف مشروع جديد ───────────────────
   1. أضف Object في مصفوفة PROJECTS
   2. لو web مع preview: أضف previewUrl
   3. لو فئة جديدة: أضف فيلتر في PROJECT_FILTERS

   خصائص كل مشروع:
     cat        → فئة (web / cpp / sql / excel)
     tagLabel   → نص التاغ
     tagColor   → لون نص التاغ
     tagBg      → لون خلفية التاغ
     nameEn/Ar  → اسم المشروع
     descEn/Ar  → وصف المشروع
     link       → رابط المشروع (↗)
     previewUrl → رابط live preview (null = بدون preview)
     techs      → مصفوفة التقنيات
   ================================================ */

const PROJECTS = [

    /* ══════════════════════════════════════════
       PYTHON PROJECTS
    ══════════════════════════════════════════ */

    {
        cat: 'python',
        tagLabel: 'Python',
        tagColor: '#3572a5',
        tagBg: 'rgba(53,114,165,0.1)',
        nameEn: 'Adventure Game',
        nameAr: 'لعبة المغامرة',
        descEn: 'A text-based adventure game built in Python, featuring branching story paths, player choices, and game-state logic.',
        descAr: 'لعبة مغامرة نصية مبنية بلغة Python، تتضمن مسارات قصصية متفرعة، خيارات للاعب، ومنطق لحالة اللعبة.',
        link: '#',
        previewUrl: null,
        techs: ['Python', 'Game Logic'],
    },

    /* ─── أضف مشروع جديد هنا ─── */

]

/* ================================================
   PROJECT FILTERS CONFIG
   ─── لإضافة فئة جديدة:
       { cat:'docker', labelEn:'Docker', labelAr:'دوكر' }
   ─── cat:'all' لازم يبقى أول عنصر دايماً
   ================================================ */
const PROJECT_FILTERS = [
    { cat: 'all', labelEn: 'All', labelAr: 'الكل' },
    { cat: 'python', labelEn: 'Python', labelAr: 'Python' },
    /* ─── أضف فيلتر جديد هنا ─── */
];


/* ================================================
   RENDER PROJECTS
   ─── بتبني الـ HTML في:
       #projectFilters  ← أزرار الفيلتر
       #projectsGrid    ← كروت المشاريع
   ─── بتستدعي initLivePreviews من app.js تلقائياً
   ================================================ */
function renderProjects(lang) {
    const isAr = (lang === 'ar');
    const filtersEl = document.getElementById('projectFilters');
    const gridEl = document.getElementById('projectsGrid');

    /* ── أزرار الفيلتر ── */
    if (filtersEl) {
        filtersEl.innerHTML = PROJECT_FILTERS.map(f => `
      <button class="filter-btn${f.cat === 'all' ? ' active' : ''}" data-pfilter="${f.cat}">
        <span>${isAr ? f.labelAr : f.labelEn}</span>
      </button>`).join('');

        filtersEl.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                filtersEl.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const f = btn.dataset.pfilter;
                document.querySelectorAll('.proj-card').forEach(card => {
                    card.classList.toggle('hidden', f !== 'all' && card.dataset.pcat !== f);
                });
            });
        });
    }

    /* ── كروت المشاريع ── */
    if (!gridEl) return;

    gridEl.innerHTML = PROJECTS.map(p => `
    <div class="proj-card reveal" data-pcat="${p.cat}"${p.previewUrl ? ` data-preview="${p.previewUrl}"` : ''}>
      <div class="proj-card-top">
        <span class="proj-tag" style="background:${p.tagBg};color:${p.tagColor}">${p.tagLabel}</span>
        <a class="proj-link" href="${p.link}" target="_blank" rel="noopener noreferrer" aria-label="Open ${p.nameEn}">↗</a>
      </div>
      <div class="proj-name">${isAr ? p.nameAr : p.nameEn}</div>
      <p class="proj-desc">${isAr ? p.descAr : p.descEn}</p>
      <div class="proj-tech">
        ${p.techs.map(t => `<span class="proj-tech-tag">${t}</span>`).join('')}
      </div>
    </div>`).join('');

    /* Live Preview — بيتفعل بعد ما الكروت اتبنت */
    if (typeof initLivePreviews === 'function') initLivePreviews();

    /* Reveal */
    if (typeof reObserveAll === "function") reObserveAll();
}