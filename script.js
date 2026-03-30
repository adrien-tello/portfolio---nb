// ── Theme ──────────────────────────────────────────────
function initTheme() {
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
}

// ── Hamburger ──────────────────────────────────────────
function toggleMenu() {
    document.querySelector('.menu-links').classList.toggle('open');
    document.querySelector('.hamburger-icon').classList.toggle('open');
}

document.addEventListener('click', (e) => {
    const menu = document.querySelector('.menu-links');
    const hamburger = document.querySelector('.hamburger-menu');
    if (menu?.classList.contains('open') && !hamburger?.contains(e.target)) toggleMenu();
});

// ── Scroll to Top ──────────────────────────────────────
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Navbar scroll effects ──────────────────────────────
function initNavbar() {
    const desktopNav = document.getElementById('desktop-nav');
    const hamburgerNav = document.getElementById('hamburger-nav');
    const scrollBtn = document.getElementById('scrollTop');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Scrolled class
        [desktopNav, hamburgerNav].forEach(n => n?.classList.toggle('scrolled', scrollY > 50));

        // Scroll-to-top visibility
        scrollBtn?.classList.toggle('visible', scrollY > 400);

        // Active nav link
        let current = '';
        sections.forEach(sec => {
            if (scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    });
}

// ── Typed text effect ──────────────────────────────────
function initTypedText() {
    const el = document.getElementById('typed-text');
    if (!el) return;
    const phrases = ['Software Engineering Student', 'Full-Stack Developer', 'Problem Solver', 'Open Source Enthusiast'];
    let phraseIndex = 0, charIndex = 0, deleting = false;

    function type() {
        const phrase = phrases[phraseIndex];
        el.textContent = deleting ? phrase.slice(0, charIndex--) : phrase.slice(0, charIndex++);

        if (!deleting && charIndex === phrase.length + 1) {
            deleting = true;
            setTimeout(type, 1800);
        } else if (deleting && charIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, 400);
        } else {
            setTimeout(type, deleting ? 60 : 100);
        }
    }
    setTimeout(type, 800);
}

// ── Fade-in on scroll ──────────────────────────────────
function initFadeIn() {
    const targets = document.querySelectorAll(
        'section, .details-container, article, .color-container, .contact-info-container, .contact-form'
    );
    targets.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => observer.observe(el));
}

// ── Contact Form ───────────────────────────────────────
function handleFormSubmit(e) {
    e.preventDefault();
    const status = document.getElementById('formStatus');
    const btn = e.target.querySelector('.form-submit-btn');

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    // Simulate sending (replace with real API call)
    setTimeout(() => {
        status.textContent = '✓ Message sent! I\'ll get back to you soon.';
        status.className = 'form-status success';
        e.target.reset();
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        setTimeout(() => { status.textContent = ''; status.className = 'form-status'; }, 5000);
    }, 1500);
}

// ── Init ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    initTypedText();
    initFadeIn();
});
