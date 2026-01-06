  // 1. Theme Logic
        const html = document.documentElement;
        const themeToggle = document.getElementById('theme-toggle');
        const lightIcon = document.getElementById('theme-toggle-light-icon');
        const darkIcon = document.getElementById('theme-toggle-dark-icon');

        function updateIcons() {
            if (html.classList.contains('dark')) {
                lightIcon.classList.add('hidden'); darkIcon.classList.remove('hidden');
            } else {
                lightIcon.classList.remove('hidden'); darkIcon.classList.add('hidden');
            }
        }
        updateIcons();
        themeToggle.addEventListener('click', () => { html.classList.toggle('dark'); updateIcons(); });

        // 2. Mobile Menu Logic
        const menuBtn = document.getElementById('mobile-menu-toggle');
        const menu = document.getElementById('mobile-menu');
        const backdrop = document.getElementById('mobile-menu-backdrop');

        function toggleMenu() {
            menu.classList.toggle('active');
            backdrop.classList.toggle('hidden');
            menuBtn.classList.toggle('active');
        }
        menuBtn.addEventListener('click', toggleMenu);
        backdrop.addEventListener('click', toggleMenu);

        // 3. Optimized Text Animation (Preserves Internal Spans)
        function runReveal() {
            const elements = document.querySelectorAll('.reveal-text');
            let globalDelay = 0.4;

            elements.forEach(el => {
                const text = el.innerText;
                el.innerText = '';
                const speed = el.tagName === 'P' ? 0.015 : 0.04;

                text.split('').forEach(char => {
                    const span = document.createElement('span');
                    span.innerText = char === ' ' ? '\u00A0' : char;
                    span.classList.add('letter');
                    span.style.animationDelay = `${globalDelay}s`;
                    globalDelay += speed;
                    el.appendChild(span);
                });
                globalDelay += 0.2; // Pause between elements
            });
        }
        window.addEventListener('load', runReveal);