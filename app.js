/* ================================================
   app.js — Main Application Logic
   Portfolio: Logina Ahmed Alian
   ================================================

   TABLE OF CONTENTS:
   01. STATE
   02. THEME
   03. LANGUAGE
   04. LOADING SCREEN
   05. SCROLL PROGRESS BAR
   06. BACK TO TOP
   07. SMOOTH SCROLL + ACTIVE NAV
   08. MOBILE NAV
   09. SCROLL REVEAL OBSERVER
   10. ANIMATED STATS COUNTER
   11. TYPING ANIMATION
   12. LIVE PREVIEW
   13. CERTIFICATE MODAL
   14. PRINT / PDF
   15. INIT
   ================================================ */


/* ── 01. STATE ────────────────────────────────── */
let theme = localStorage.getItem('ktheme') || 'light';
let lang = localStorage.getItem('klang') || 'en';


/* ── 02. THEME ────────────────────────────────── */
function applyTheme(t) {
    document.body.classList.toggle('dark', t === 'dark');
    const btn = document.getElementById('themeBtn');
    if (btn) btn.textContent = (t === 'dark') ? '☀️' : '🌙';
    localStorage.setItem('ktheme', t);
    theme = t;
}
function initTheme() {
    applyTheme(theme);
    const btn = document.getElementById('themeBtn');
    if (btn) btn.addEventListener('click', () => applyTheme(theme === 'light' ? 'dark' : 'light'));
}


/* ── 03. LANGUAGE ─────────────────────────────── */
function applyLang(l) {
    const isAr = (l === 'ar');

    /* اتجاه الصفحة */
    document.documentElement.lang = l;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.body.dir = isAr ? 'rtl' : 'ltr';

    /* زرار اللغة */
    const btn = document.getElementById('langBtn');
    if (btn) btn.textContent = isAr ? 'EN' : 'AR';

    /* النصوص الثابتة في HTML فقط */
    document.querySelectorAll('[data-en][data-ar]').forEach(el => {
        if (el.closest('#skillsGrid,#projectsGrid,#certsGrid,#skillFilters,#projectFilters')) return;
        el.textContent = isAr ? el.dataset.ar : el.dataset.en;
    });

    localStorage.setItem('klang', l);
    lang = l;

    /* أعد بناء الأقسام الديناميكية */
    if (typeof renderSkills === 'function') renderSkills(lang);
    if (typeof renderProjects === 'function') renderProjects(lang);
    if (typeof renderCertificates === 'function') renderCertificates(lang);

    /* أعد تشغيل reveal على كل العناصر الجديدة */
    reObserveAll();
}

function initLang() {
    applyLang(lang);
    const btn = document.getElementById('langBtn');
    if (btn) btn.addEventListener('click', () => applyLang(lang === 'en' ? 'ar' : 'en'));
}


/* ── 04. LOADING SCREEN ───────────────────────── */
function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    window.addEventListener('load', () => setTimeout(() => loader.classList.add('hidden'), 1700));
}


/* ── 05. SCROLL PROGRESS ──────────────────────── */
function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (total > 0) ? ((window.scrollY / total) * 100) + '%' : '0%';
    }, { passive: true });
}


/* ── 06. BACK TO TOP ──────────────────────────── */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400), { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}


/* ── 07. SMOOTH SCROLL + ACTIVE NAV ──────────── */
function initNav() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href');
            if (!href || href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => { if (window.scrollY >= s.offsetTop - 110) current = s.id; });
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
    }, { passive: true });
}


/* ── 08. MOBILE NAV ───────────────────────────── */
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    if (!hamburger || !mobileNav) return;
    hamburger.addEventListener('click', () => mobileNav.classList.toggle('open'));
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));
    document.addEventListener('click', e => {
        if (!mobileNav.contains(e.target) && !hamburger.contains(e.target)) mobileNav.classList.remove('open');
    });
}


/* ── 09. SCROLL REVEAL OBSERVER ───────────────── */
/*
   مُعرَّف كـ let (مش const) عشان يتعرّف في scope عام
   وتقدر data files تستخدمه باستخدام reObserveAll()
*/
let revealObserver = null;

function initRevealObserver() {
    revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');

            /* تحريك skill bar */
            const bar = entry.target.querySelector('.skill-bar[data-width]');
            if (bar) {
                bar.style.width = '0%';
                requestAnimationFrame(() => setTimeout(() => { bar.style.width = bar.dataset.width; }, 60));
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
}

/* بتشيّل كل العناصر للـ observer */
function reObserveAll() {
    if (!revealObserver) return;
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

function initReveal() {
    reObserveAll();
}


/* ── 10. ANIMATED STATS COUNTER ───────────────── */
function animateCounter(el) {
    if (el._counted) return;
    el._counted = true;
    const target = parseInt(el.dataset.count, 10);
    const steps = 80;
    let i = 0;
    const timer = setInterval(() => {
        i++;
        el.textContent = Math.round(target * (1 - Math.pow(1 - i / steps, 3))) + '+';
        if (i >= steps) { el.textContent = target + '+'; clearInterval(timer); }
    }, 18);
}

function initCounters() {
    const el = document.querySelector('.hero-stats');
    if (!el) return;
    new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            e.target.querySelectorAll('.stat-num[data-count]').forEach(animateCounter);
        });
    }, { threshold: 0.6 }).observe(el);
}


/* ── 11. TYPING ANIMATION ─────────────────────── */
/* لإضافة كلمة: أضفها في المصفوفتين */
const TYPING_WORDS_EN = ['C++', 'Python', 'HTML & CSS', 'JavaScript', 'SQL', 'Oracle', 'Machine Learning', 'Git & GitHub', 'AI Agents'];
const TYPING_WORDS_AR = ['C++', 'Python', 'HTML و CSS', 'JavaScript', 'SQL', 'Oracle', 'تعلم الآلة', 'Git و GitHub', 'وكلاء الذكاء الاصطناعي'];

function initTyping() {
    const el = document.getElementById('typedText');
    if (!el) return;
    let wi = 0, ci = 0, del = false;
    function tick() {
        const words = (lang === 'ar') ? TYPING_WORDS_AR : TYPING_WORDS_EN;
        const word = words[wi % words.length];
        if (!del) {
            el.textContent = word.slice(0, ++ci);
            if (ci >= word.length) { del = true; setTimeout(tick, 1800); return; }
            setTimeout(tick, 90);
        } else {
            el.textContent = word.slice(0, --ci);
            if (ci <= 0) { del = false; wi++; setTimeout(tick, 400); return; }
            setTimeout(tick, 50);
        }
    }
    setTimeout(tick, 1400);
}


/* ── 12. LIVE PREVIEW ─────────────────────────── */
function initLivePreviews() {
    document.querySelectorAll('.proj-card[data-preview]').forEach(card => {
        if (card.querySelector('.proj-preview-btn')) return;
        const url = card.dataset.preview;
        const techDiv = card.querySelector('.proj-tech');
        if (!techDiv) return;

        const btn = document.createElement('button');
        btn.className = 'proj-preview-btn';
        btn.type = 'button';
        btn.innerHTML = `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg><span class="preview-label">${lang === 'ar' ? 'معاينة مباشرة' : 'Live Preview'}</span>`;

        const frame = document.createElement('div');
        frame.className = 'proj-preview-frame';
        frame.innerHTML = `<div class="proj-preview-overlay"><div class="preview-spinner"></div><span>${lang === 'ar' ? 'جارٍ التحميل...' : 'Loading preview...'}</span></div>`;

        let loaded = false;
        btn.addEventListener('click', () => {
            const open = frame.classList.toggle('open');
            const label = btn.querySelector('.preview-label');
            const ar = (lang === 'ar');
            if (label) label.textContent = open ? (ar ? 'إخفاء المعاينة' : 'Hide Preview') : (ar ? 'معاينة مباشرة' : 'Live Preview');
            if (open && !loaded) {
                loaded = true;
                const iframe = document.createElement('iframe');
                iframe.src = url;
                iframe.loading = 'lazy';
                iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms');
                iframe.setAttribute('title', 'Project live preview');
                iframe.addEventListener('load', () => {
                    const ov = frame.querySelector('.proj-preview-overlay');
                    if (ov) ov.style.display = 'none';
                });
                frame.appendChild(iframe);
            }
        });

        card.insertBefore(btn, techDiv);
        card.insertBefore(frame, techDiv);
    });
}


/* ── 13. CERTIFICATE MODAL ────────────────────── */
function initCertModal() {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.getElementById('modalClose');
    if (!modal || !modalImg) return;

    document.querySelectorAll('.cert-card[data-img]').forEach(card => {
        const fresh = card.cloneNode(true);
        card.replaceWith(fresh);
        fresh.addEventListener('click', () => {
            if (!fresh.dataset.img) return;
            modalImg.src = fresh.dataset.img;
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => { modalImg.src = ''; }, 300);
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

    /* منع إضافة keydown listener أكتر من مرة */
    if (!document._escBound) {
        document._escBound = true;
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
    }
}


/* ── 14. PRINT / PDF ──────────────────────────── */
function initPrint() {
    const btn = document.getElementById('printBtn');
    if (btn) btn.addEventListener('click', () => window.print());
}


/* ════════════════════════════════════════════════
   15. INIT — نقطة البداية
   ════════════════════════════════════════════════

   الترتيب الصح:
   1. initRevealObserver()  ← لازم أول حاجة (قبل render)
   2. initTheme()           ← قبل أي render عشان الثيم يبقى صح
   3. initLang()            ← بيعمل render للـ 3 sections
                              كل section بتضيف .reveal للـ observer
   4. UI utilities
   5. initReveal()          ← بيشغّل observer على العناصر الثابتة
   6. Interactive features

   ════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

    /* 1. Observer أولاً (قبل أي render) */
    initRevealObserver();

    /* 2. الثيم واللغة */
    initTheme();
    initLang(); /* ← بيبني Skills + Projects + Certs */

    /* 3. UI */
    initLoader();
    initScrollProgress();
    initBackToTop();
    initNav();
    initMobileNav();
    initPrint();

    /* 4. Reveal على العناصر الثابتة (timeline, about, contact) */
    initReveal();

    /* 5. Interactive */
    initCounters();
    initTyping();
    initCertModal();
    initLivePreviews();
});