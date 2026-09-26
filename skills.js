/* ================================================
   skills.js — بيانات المهارات
   ================================================

   ─── إزاي تضيف Skill جديدة ───────────────────
   1. أضف Object في مصفوفة SKILLS
   2. أضف اللون في components.css (Section 3):
      .skill-card[data-cat="اسم"] { --card-accent: #لون; }
   3. أضف زرار فيلتر في SKILL_FILTERS
   ─────────────────────────────────────────────

   خصائص كل Skill:
     cat      → اسم الفئة  (لازم يتطابق مع CSS)
     icon     → إيموجي
     iconBg   → لون خلفية الأيقونة (اختياري)
     nameEn   → الاسم إنجليزي
     nameAr   → الاسم عربي
     catEn    → وصف الفئة إنجليزي
     catAr    → وصف الفئة عربي
     pct      → نسبة المهارة 0-100
     descEn   → وصف تفصيلي إنجليزي
     descAr   → وصف تفصيلي عربي
     tags     → تاغات إنجليزي
     tagsAr   → تاغات عربي
   ================================================ */

const SKILLS = [

    /* ─── C++ ─────────────────────────────────── */
    {
        cat: 'cpp',
        icon: '⚙️',
        nameEn: 'C++ / OOP',
        nameAr: 'C++ / OOP',
        catEn: 'Systems Programming',
        catAr: 'برمجة الأنظمة',
        pct: 80,
        descEn: 'Strong foundations in OOP: encapsulation, inheritance, abstraction, and modular code design.',
        descAr: 'أساس قوي في البرمجة الكائنية: التغليف، الوراثة، التجريد، وتصميم الكود المعياري.',
        tags: ['OOP', 'Data Structures', 'Problem Solving'],
        tagsAr: ['OOP', 'هياكل البيانات', 'حل المشكلات'],
    },

    /* ─── Python ──────────────────────────────── */
    {
        cat: 'python',
        icon: '🐍',
        nameEn: 'Python',
        nameAr: 'Python',
        catEn: 'General Purpose / AI',
        catAr: 'عام / ذكاء اصطناعي',
        pct: 60,
        descEn: 'Learning Python for scripting, automation, and AI/ML. Building foundational skills actively.',
        descAr: 'أتعلم Python للبرمجة النصية والأتمتة وتطوير AI/ML. أبني مهارات أساسية بشكل نشط.',
        tags: ['Scripting', 'Automation', 'AI/ML'],
        tagsAr: ['برمجة نصية', 'Automation', 'AI/ML'],
    },

    /* ─── SQL ─────────────────────────────────── */
    {
        cat: 'sql',
        icon: '🗄️',
        nameEn: 'SQL',
        nameAr: 'SQL',
        catEn: 'Database Querying',
        catAr: 'استعلامات قواعد البيانات',
        pct: 65,
        descEn: 'Proficient in SQL: SELECT, JOIN, GROUP BY, subqueries, and aggregate functions.',
        descAr: 'ملم باستعلامات SQL: SELECT وJOIN وGROUP BY والاستعلامات الفرعية ودوال التجميع.',
        tags: ['SELECT', 'JOIN', 'GROUP BY'],
        tagsAr: ['SELECT', 'JOIN', 'GROUP BY'],
    },

    /* ─── Oracle ──────────────────────────────── */
    {
        cat: 'oracle',
        icon: '🔴',
        nameEn: 'Oracle SQL',
        nameAr: 'Oracle SQL',
        catEn: 'Enterprise Database',
        catAr: 'قواعد بيانات المؤسسات',
        pct: 55,
        descEn: 'Basic Oracle SQL for project management, data handling, and academic contexts.',
        descAr: 'معرفة أساسية بـ Oracle SQL لإدارة المشاريع وإدارة البيانات والتعلم الأكاديمي.',
        tags: ['Oracle DB', 'DDL', 'DML'],
        tagsAr: ['Oracle DB', 'DDL', 'DML'],
    },

    /* ─── HTML ────────────────────────────────── */
    {
        cat: 'web',
        icon: '🌐',
        nameEn: 'HTML5',
        nameAr: 'HTML5',
        catEn: 'Web Structure',
        catAr: 'بنية الويب',
        pct: 85,
        descEn: 'Solid HTML5: semantic markup, accessibility, forms, and clean document architecture.',
        descAr: 'مهارات HTML5 قوية: ترميز دلالي، إمكانية الوصول، نماذج، وبنية وثيقة نظيفة.',
        tags: ['Semantic', 'Forms', 'Accessibility'],
        tagsAr: ['Semantic', 'Forms', 'إتاحة'],
    },

    /* ─── JavaScript ──────────────────────────── */
    {
        cat: 'js',
        icon: '⚡',
        nameEn: 'JavaScript',
        nameAr: 'JavaScript',
        catEn: 'Web Interactivity',
        catAr: 'تفاعلية الويب',
        pct: 70,
        descEn: 'DOM manipulation, event handling, animations, localStorage, and interactive experiences.',
        descAr: 'التعامل مع DOM، معالجة الأحداث، رسوم متحركة، localStorage، وتجارب تفاعلية.',
        tags: ['DOM', 'ES6+', 'Async'],
        tagsAr: ['DOM', 'ES6+', 'Async'],
    },

    /* ─── CSS ─────────────────────────────────── */
    {
        cat: 'css',
        icon: '🎨',
        nameEn: 'CSS3',
        nameAr: 'CSS3',
        catEn: 'Styling & Animation',
        catAr: 'التنسيق والرسوم المتحركة',
        pct: 82,
        descEn: 'Responsive design, Grid, Flexbox, animations, transitions, dark mode, CSS variables.',
        descAr: 'تصميم متجاوب، Grid، Flexbox، رسوم متحركة، انتقالات، وضع مظلم، متغيرات CSS.',
        tags: ['Flexbox', 'Grid', 'Responsive'],
        tagsAr: ['Flexbox', 'Grid', 'Responsive'],
    },

    /* ─── Networking ──────────────────────────── */
    {
        cat: 'network',
        icon: '🔌',
        nameEn: 'Networking',
        nameAr: 'الشبكات',
        catEn: 'IT Fundamentals',
        catAr: 'أساسيات IT',
        pct: 55,
        descEn: 'Network protocols, IP addressing, subnetting, and IT infrastructure fundamentals.',
        descAr: 'بروتوكولات الشبكات، عنونة IP، الشبكات الفرعية، وأساسيات البنية التحتية لـ IT.',
        tags: ['TCP/IP', 'Protocols', 'IT Support'],
        tagsAr: ['TCP/IP', 'بروتوكولات', 'IT Support'],
    },

    /* ─── Machine Learning ────────────────────── */
    {
        cat: 'ml',
        icon: '🤖',
        nameEn: 'Machine Learning',
        nameAr: 'تعلم الآلة',
        catEn: 'AI Development',
        catAr: 'تطوير الذكاء الاصطناعي',
        pct: 40,
        descEn: 'Learning ML concepts: supervised learning, model training, and data preprocessing.',
        descAr: 'أتعلم مفاهيم ML: التعلم الخاضع للإشراف، تدريب النماذج، وأساسيات معالجة البيانات.',
        tags: ['Supervised Learning', 'Python/ML'],
        tagsAr: ['تعلم موجّه', 'Python/ML'],
    },

    /* ─── Excel ───────────────────────────────── */
    {
        cat: 'excel',
        icon: '📊',
        nameEn: 'Microsoft Excel',
        nameAr: 'Microsoft Excel',
        catEn: 'Data & Analysis',
        catAr: 'بيانات وتحليل',
        pct: 75,
        descEn: 'SUM, COUNT, AVERAGE, IF, COUNTIF, charts, conditional formatting, pivot tables.',
        descAr: 'SUM، COUNT، AVERAGE، IF، COUNTIF، مخططات، تنسيق شرطي، جداول محورية.',
        tags: ['Formulas', 'Charts', 'Pivot Tables'],
        tagsAr: ['صيغ', 'مخططات', 'جداول محورية'],
    },

    /* ─── AI Agent ────────────────────────────── */
    {
        cat: 'ai',
        icon: '🧠',
        iconBg: 'rgba(124,58,237,0.1)',
        nameEn: 'AI Agent Usage',
        nameAr: 'استخدام وكلاء الذكاء الاصطناعي',
        catEn: 'Prompt Engineering & LLMs',
        catAr: 'هندسة البرومبت ونماذج اللغة',
        pct: 72,
        descEn: 'Using AI agents and LLMs (ChatGPT, Claude) for code assistance, problem solving, and workflow automation. Skilled in prompt engineering.',
        descAr: 'استخدام وكلاء الذكاء الاصطناعي ونماذج اللغة (ChatGPT، Claude) لمساعدة الكود وحل المشكلات وأتمتة سير العمل. ماهر في هندسة البرومبت.',
        tags: ['Prompt Engineering', 'ChatGPT', 'Claude', 'Automation'],
        tagsAr: ['هندسة البرومبت', 'ChatGPT', 'Claude', 'أتمتة'],
    },

    /* ─── أضف Skill جديدة هنا ───────────────── */

];


/* ================================================
   SKILL FILTERS CONFIG
   ─── لإضافة فيلتر جديد:
       { cat:'اسم', color:'#لون', labelEn:'EN', labelAr:'AR' }
   ─── cat:'all' لازم يبقى أول عنصر دايماً
   ================================================ */
const SKILL_FILTERS = [
    { cat: 'all', color: null, labelEn: 'All', labelAr: 'الكل' },
    { cat: 'cpp', color: '#1e4fd8', labelEn: 'C++', labelAr: 'C++' },
    { cat: 'python', color: '#3572a5', labelEn: 'Python', labelAr: 'Python' },
    { cat: 'sql', color: '#e48900', labelEn: 'SQL', labelAr: 'SQL' },
    { cat: 'oracle', color: '#c74634', labelEn: 'Oracle', labelAr: 'Oracle' },
    { cat: 'web', color: '#e34c26', labelEn: 'HTML', labelAr: 'HTML' },
    { cat: 'js', color: '#c8a800', labelEn: 'JS', labelAr: 'JS' },
    { cat: 'css', color: '#264de4', labelEn: 'CSS', labelAr: 'CSS' },
    { cat: 'network', color: '#1a7a8c', labelEn: 'Network', labelAr: 'شبكات' },
    { cat: 'ml', color: '#6b35a8', labelEn: 'Machine Learning', labelAr: 'تعلم الآلة' },
    { cat: 'excel', color: '#1a8c4e', labelEn: 'Excel', labelAr: 'Excel' },
    { cat: 'ai', color: '#7c3aed', labelEn: 'AI Agent', labelAr: 'وكيل الذكاء' },
    /* ─── أضف فيلتر جديد هنا ─── */
];


/* ================================================
   RENDER SKILLS
   ─── بتبني الـ HTML تلقائياً في:
       #skillFilters  ← أزرار الفيلتر
       #skillsGrid    ← كروت المهارات
   ─── بتتشغّل من applyLang في app.js
   ================================================ */
function renderSkills(lang) {
    const isAr = (lang === 'ar');
    const filtersEl = document.getElementById('skillFilters');
    const gridEl = document.getElementById('skillsGrid');

    /* ── بناء أزرار الفيلتر ── */
    if (filtersEl) {
        filtersEl.innerHTML = SKILL_FILTERS.map(f => `
      <button class="filter-btn${f.cat === 'all' ? ' active' : ''}" data-filter="${f.cat}">
        ${f.color ? `<span class="skill-dot" style="background:${f.color}"></span>` : ''}
        <span>${isAr ? f.labelAr : f.labelEn}</span>
      </button>`).join('');

        /* Listeners الفيلتر */
        filtersEl.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                filtersEl.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const f = btn.dataset.filter;
                document.querySelectorAll('.skill-card').forEach(card => {
                    card.classList.toggle('hidden', f !== 'all' && card.dataset.cat !== f);
                });
            });
        });
    }

    /* ── بناء كروت المهارات ── */
    if (!gridEl) return;

    gridEl.innerHTML = SKILLS.map(s => `
    <div class="skill-card reveal" data-cat="${s.cat}">
      <div class="skill-card-head">
        <div class="skill-icon"${s.iconBg ? ` style="background:${s.iconBg}"` : ''}>${s.icon}</div>
        <div>
          <div class="skill-name">${isAr ? s.nameAr : s.nameEn}</div>
          <div class="skill-cat">${isAr ? s.catAr : s.catEn}</div>
        </div>
      </div>
      <div class="skill-level">
        <span class="skill-pct">${s.pct}%</span>
      </div>
      <div class="skill-bar-wrap">
        <div class="skill-bar" style="width:0%" data-width="${s.pct}%"></div>
      </div>
      <p class="skill-desc">${isAr ? s.descAr : s.descEn}</p>
      <div class="skill-tags">
        ${(isAr ? s.tagsAr : s.tags).map(t => `<span class="skill-tag">${t}</span>`).join('')}
      </div>
    </div>`).join('');

    /* أضف الكروت الجديدة للـ revealObserver */
    if (typeof reObserveAll === "function") reObserveAll();
}