/* ==========================================================================
   MOHAMMED RAYYAN - MODERN DEVELOPER PORTFOLIO JAVASCRIPT
   Features: Typed Subtitle, Theme Switcher, Modal Lightbox, Scroll Reveal, Active Nav
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Set Footer Current Year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* ----------------------------------------------------------------------
     * 1. TYPING TEXT ANIMATION FOR HERO SUBTITLE
     * ---------------------------------------------------------------------- */
    const typingElement = document.getElementById('typing-text');
    const phrases = [
        "AI & Machine Learning Engineer",
        "Python & Full-Stack Developer",
        "Data Analytics Specialist",
        "Intelligent Systems Creator"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeEffect() {
        if (!typingElement) return;

        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at end of sentence
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();

    /* ----------------------------------------------------------------------
     * 2. LIGHT / DARK THEME SWITCHER
     * ---------------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('rayyan_portfolio_theme') || 'dark';

    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('rayyan_portfolio_theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('rayyan_portfolio_theme', 'light');
            }
        });
    }

    /* ----------------------------------------------------------------------
     * 3. NAVBAR SCROLL EFFECT & MOBILE MENU TOGGLE
     * ---------------------------------------------------------------------- */
    const navbarHeader = document.querySelector('.navbar-header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksList = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbarHeader?.classList.add('scrolled');
        } else {
            navbarHeader?.classList.remove('scrolled');
        }
    });

    if (mobileMenuBtn && navLinksList) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinksList.classList.remove('active');
            });
        });
    }

    /* ----------------------------------------------------------------------
     * 4. ACTIVE NAVBAR LINK HIGHLIGHTING ON SCROLL
     * ---------------------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

    /* ----------------------------------------------------------------------
     * 5. CERTIFICATE PREVIEW MODAL / LIGHTBOX
     * ---------------------------------------------------------------------- */
    const certCards = document.querySelectorAll('.cert-card');
    const certModal = document.getElementById('certModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const backdrop = document.querySelector('.cert-modal-backdrop');

    function openModal(imgSrc, title) {
        if (!certModal || !modalImg || !modalTitle) return;
        modalImg.src = imgSrc;
        modalImg.alt = title;
        modalTitle.textContent = title;
        certModal.classList.add('active');
        certModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!certModal) return;
        certModal.classList.remove('active');
        certModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    certCards.forEach(card => {
        card.addEventListener('click', () => {
            const imgSrc = card.getAttribute('data-cert-img');
            const title = card.getAttribute('data-cert-title');
            if (imgSrc && title) {
                openModal(imgSrc, title);
            }
        });
    });

    closeModalBtn?.addEventListener('click', closeModal);
    backdrop?.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certModal?.classList.contains('active')) {
            closeModal();
        }
    });

    /* ----------------------------------------------------------------------
     * 6. COPY EMAIL BUTTON INTERACTION
     * ---------------------------------------------------------------------- */
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = "rayyan0954@gmail.com";
            navigator.clipboard.writeText(email).then(() => {
                copyEmailBtn.innerHTML = '<i data-lucide="check" style="color:var(--accent-emerald);"></i>';
                if (typeof lucide !== 'undefined') lucide.createIcons();
                setTimeout(() => {
                    copyEmailBtn.innerHTML = '<i data-lucide="copy"></i>';
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy email:', err);
            });
        });
    }

    /* ----------------------------------------------------------------------
     * 7. SCROLL REVEAL ANIMATIONS
     * ---------------------------------------------------------------------- */
    const elementsToReveal = document.querySelectorAll(
        '.bento-card, .timeline-card, .skill-category-card, .cert-card, .contact-card-glass, .projects-placeholder-banner'
    );

    elementsToReveal.forEach(el => el.classList.add('reveal-on-scroll'));

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elementsToReveal.forEach(el => revealObserver.observe(el));
});
