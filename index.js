        // Theme Toggle
        const themeToggle = document.getElementById('theme-toggle');
        const html = document.documentElement;
        const lightIcon = document.getElementById('theme-toggle-light-icon');
        const darkIcon = document.getElementById('theme-toggle-dark-icon');

        function updateThemeIcons() {
            if (html.classList.contains('dark')) {
                lightIcon.classList.add('hidden');
                darkIcon.classList.remove('hidden');
            } else {
                lightIcon.classList.remove('hidden');
                darkIcon.classList.add('hidden');
            }
        }

        themeToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            updateThemeIcons();
            localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
        });

        // Initialize theme from localStorage
        if (localStorage.getItem('theme') === 'light') {
            html.classList.remove('dark');
        }
        updateThemeIcons();

        // Mobile Menu
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            mobileMenuBackdrop.classList.toggle('hidden');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileMenuBackdrop.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenuBackdrop.classList.add('hidden');
            document.body.style.overflow = '';
        });

        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileMenuBackdrop.classList.add('hidden');
                document.body.style.overflow = '';
            });
        });

        // Text Reveal Animation
        function revealText() {
            const elements = document.querySelectorAll('.reveal-text');
            elements.forEach((el, i) => {
                const text = el.textContent;
                el.innerHTML = '';
                text.split('').forEach((char, j) => {
                    const span = document.createElement('span');
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    span.className = 'letter';
                    span.style.animationDelay = `${(i * 0.1) + (j * 0.03)}s`;
                    el.appendChild(span);
                });
            });
        }

        document.addEventListener('DOMContentLoaded', revealText);