
    // ---- Theme Toggle ----
    const themeToggle = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const html = document.documentElement;

    function updateThemeIcons() {
        const isDark = html.classList.contains('dark');
        lightIcon.classList.toggle('hidden', isDark);
        darkIcon.classList.toggle('hidden', !isDark);
    }
    updateThemeIcons();

    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        updateThemeIcons();
        localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    });

    if (localStorage.getItem('theme') === 'light') {
        html.classList.remove('dark');
        updateThemeIcons();
    }

    // ---- Mobile Menu ----
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const backdrop = document.getElementById('mobile-menu-backdrop');

    function closeMobileMenu() {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        backdrop.classList.add('hidden');
    }

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        backdrop.classList.toggle('hidden');
    });

    backdrop.addEventListener('click', closeMobileMenu);
    document.querySelectorAll('.mobile-menu-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // ---- Header scroll style ----
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            header.classList.add('bg-white/90', 'dark:bg-dark/90', 'backdrop-blur-md', 'shadow-sm', 'py-3');
            header.classList.remove('py-5', 'bg-transparent');
        } else {
            header.classList.remove('bg-white/90', 'dark:bg-dark/90', 'backdrop-blur-md', 'shadow-sm', 'py-3');
            header.classList.add('py-5', 'bg-transparent');
        }
    }, { passive: true });

    // ---- Back to Top Button ----
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.style.opacity = '1';
            backToTop.style.pointerEvents = 'auto';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.pointerEvents = 'none';
        }
    }, { passive: true });

    // ---- Cursor Glow ----
    const cursorGlow = document.getElementById('cursorGlow');
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    }, { passive: true });

    // ---- Active Nav Link on scroll ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) current = section.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.remove('nav-active');
            if (link.getAttribute('href') === '#' + current) link.classList.add('nav-active');
        });
    }, { passive: true });

    // ---- Scroll Reveal ----
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('revealed'), 100);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right').forEach(el => {
        revealObserver.observe(el);
    });

    // ---- Progress Bars ----
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.progress-bar-fill');
                bars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                    const label = bar.closest('div').previousElementSibling?.querySelector('[data-target]');
                    if (label) {
                        const target = parseInt(label.getAttribute('data-target'));
                        let count = 0;
                        const interval = setInterval(() => {
                            count += 2;
                            label.textContent = count + '%';
                            if (count >= target) { label.textContent = target + '%'; clearInterval(interval); }
                        }, 20);
                    }
                });
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) progressObserver.observe(skillsSection);

    // ---- Projects Filter ----
    function filterProjects(category) {
        const items = document.querySelectorAll('.project-item');
        const btns = document.querySelectorAll('.filter-btn');

        btns.forEach(btn => {
            const isActive = btn.getAttribute('data-filter') === category;
            btn.classList.toggle('active-filter', isActive);
            btn.classList.toggle('border-primary', isActive);
            btn.classList.toggle('text-primary', isActive);
            btn.classList.toggle('border-gray-300', !isActive);
            btn.classList.toggle('dark:border-gray-700', !isActive);
            btn.classList.toggle('text-gray-500', !isActive);
            btn.classList.toggle('dark:text-gray-400', !isActive);
        });

        items.forEach(item => {
            const cat = item.getAttribute('data-category');
            const show = category === 'all' || cat === category;
            item.style.transition = 'all 0.4s ease';
            item.style.opacity = show ? '1' : '0';
            item.style.transform = show ? 'scale(1)' : 'scale(0.95)';
            item.style.pointerEvents = show ? 'auto' : 'none';
            setTimeout(() => { item.style.display = show ? '' : 'none'; if (show) { item.style.opacity = '1'; item.style.transform = 'scale(1)'; } }, show ? 0 : 400);
        });
    }

    // ---- Contact Form ----
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) { showToast('Please fill all required fields.', false); return; }
        if (!/\S+@\S+\.\S+/.test(email)) { showToast('Please enter a valid email.', false); return; }

        btn.textContent = 'Sending...';
        btn.disabled = true;

        // Replace this with your backend/emailJS integration
        setTimeout(() => {
            showToast('Message sent! I\'ll reply soon. 🎉', true);
            this.reset();
            btn.textContent = 'Send Message →';
            btn.disabled = false;
        }, 1500);
    });

    function showToast(msg, success = true) {
        const toast = document.getElementById('toast');
        const toastMsg = document.getElementById('toastMsg');
        const dot = toast.querySelector('span.rounded-full');
        toastMsg.textContent = msg;
        dot.className = `w-2 h-2 rounded-full ${success ? 'bg-green-400' : 'bg-red-400'}`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
    }

    // ---- Letter Reveal Animation ----
    function animateLetters() {
        const texts = document.querySelectorAll('.reveal-text');
        texts.forEach((el, idx) => {
            const text = el.textContent;
            el.innerHTML = '';
            [...text].forEach((char, i) => {
                const span = document.createElement('span');
                span.className = 'letter';
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.animationDelay = `${(idx * 0.3) + (i * 0.04)}s`;
                el.appendChild(span);
            });
        });
    }
    animateLetters();

    // ---- Footer Year ----
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // ---- GSAP Scroll Animations (if GSAP loaded) ----
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from('.section-number', {
            scrollTrigger: { trigger: '.section-number', start: 'top 80%' },
            opacity: 0, x: 40, duration: 1, ease: 'power3.out'
        });
    }
