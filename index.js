
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };

  try {
    await fetch("https://script.google.com/macros/s/AKfycbwDY5oK6yuB_QenTNjRCVeIcnA3vnokZIAYyXx_Axohdf4dYR-d5k8KBsH6HvEr2JQOkg/exec", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    showToast('Message sent successfully! 🎉');
    document.getElementById('contactForm').reset();

  } catch (error) {
    showToast('Something went wrong. Please try again.');
  }

  btn.textContent = 'Send Message →';
  btn.disabled = false;
});

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

    // ---- About Section Enhancements ----
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const bioText = "I'm a Python Full Stack Developer and Data Science practitioner with over one year of freelancing experience, working with multiple clients on real-world web applications.";
        const typedEl = document.getElementById('typedBio');
        const cursorTyping = document.getElementById('cursorTyping');
        const bioP2 = document.getElementById('bioP2');
        const promptEnd = document.getElementById('promptEnd');
        const emailBtn = document.getElementById('emailBtn');
        const emailToast = document.getElementById('emailToast');
        const timerEl = document.getElementById('sessionTimer');

        function typeWriter(text, el, speed, onDone) {
            let i = 0;
            (function tick() {
                if (i < text.length) {
                    el.textContent += text.charAt(i);
                    i += 1;
                    setTimeout(tick, speed);
                } else if (onDone) {
                    onDone();
                }
            })();
        }

        if (typedEl && cursorTyping && bioP2 && promptEnd) {
            setTimeout(() => {
                typeWriter(bioText, typedEl, 14, () => {
                    cursorTyping.style.display = 'none';
                    bioP2.style.transition = 'opacity .6s ease';
                    bioP2.style.opacity = '1';
                    setTimeout(() => {
                        promptEnd.style.transition = 'opacity .6s ease';
                        promptEnd.style.opacity = '1';
                    }, 300);
                });
            }, 500);
        }

        if (timerEl) {
            const startTime = Date.now();
            setInterval(() => {
                const elapsed = Math.floor((Date.now() - startTime) / 1000);
                const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
                const s = String(elapsed % 60).padStart(2, '0');
                timerEl.textContent = `session ${m}:${s}`;
            }, 1000);
        }

        aboutSection.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                card.style.setProperty('--mx', `${x}%`);
                card.style.setProperty('--my', `${y}%`);
            });
        });

        if (emailBtn && emailToast) {
            emailBtn.addEventListener('click', async () => {
                const email = 'hello@andolsaketh.dev';
                try {
                    await navigator.clipboard.writeText(email);
                } catch (e) {
                    // clipboard may be unavailable in some embeds
                }
                emailToast.classList.add('show');
                setTimeout(() => emailToast.classList.remove('show'), 1600);
            });
        }

        aboutSection.querySelectorAll('#tagRow .tag').forEach((tag, i) => {
            tag.style.animationDelay = `${0.36 + i * 0.05}s`;
        });
    }

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

const ASSETS = [
    {
        src: "https://images.unsplash.com/photo-1769921546096-7a648d953a3e?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Data Insight Dashboard",
        description: "A data science dashboard concept with charts, filters, and report snapshots.",
        repo: "",
        live: "",
        categories: ["all", "data-science"],
    },
    {
        src: "https://images.unsplash.com/photo-1777726515600-65be20641e1b?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Frontend Motion Gallery",
        description: "An interactive frontend project focused on smooth transitions and responsive layout.",
        repo: "",
        live: "",
        categories: ["all", "frontend"],
    },
    {
        src: "https://images.unsplash.com/photo-1776582929657-9710d9cfa46a?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Python Full Stack CRM",
        description: "A Python full stack client-management system with backend workflows and clean UI.",
        repo: "",
        live: "",
        categories: ["all", "python-full-stack"],
    },
    {
        src: "https://images.unsplash.com/photo-1776582929656-78ad8b515d75?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Freelance Landing Page",
        description: "A freelancing project landing page built for a polished client-facing presentation.",
        repo: "",
        live: "",
        categories: ["all", "freelancing", "frontend", "python-full-stack"],
    },
    {
        src: "https://images.unsplash.com/photo-1775990630948-3c1f696f4ab1?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Analytics Pipeline",
        description: "A data processing pipeline project that highlights cleaning, transforms, and insights.",
        repo: "",
        live: "",
        categories: ["all", "data-science"],
    },
    {
        src: "https://images.unsplash.com/photo-1775380744191-8fbff371c40b?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Client Portal UI",
        description: "A Python full stack style project for user accounts, dashboards, and service views.",
        repo: "",
        live: "",
        categories: ["all", "python-full-stack", "freelancing"],
    },
    {
        src: "https://images.unsplash.com/photo-1774775479879-082fd47d41e1?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Frontend Portfolio Block",
        description: "A modern frontend card layout with responsive spacing and visual rhythm.",
        repo: "",
        live: "",
        categories: ["all", "frontend"],
    },
    {
        src: "https://images.unsplash.com/photo-1773544517453-95c148cb42b7?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Freelance Business Site",
        description: "A freelance client website concept aimed at conversions and strong first impressions.",
        repo: "",
        live: "",
        categories: ["all", "freelancing", "frontend"],
    },
    {
        src: "https://images.unsplash.com/photo-1771385809377-9b0348e1f8dc?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "ML Experiment Board",
        description: "A data science experiments board for model tracking, notes, and results review.",
        repo: "",
        live: "",
        categories: ["all", "data-science"],
    },
    {
        src: "https://images.unsplash.com/photo-1775990631076-f6f208079475?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Full Stack Release Kit",
        description: "A deployment-ready Python full stack showcase with reusable sections and launch flow.",
        repo: "",
        live: "",
        categories: ["all", "python-full-stack", "freelancing"],
    },
];

const CHEVRON_LEFT = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>`;
const CHEVRON_RIGHT = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`;

let activeIndex = 0;
let activeCategory = 'all';
let currentAssets = ASSETS.slice();

const app = document.getElementById("app");
const projectFilters = document.getElementById('projectFilters');

if (app) {
    app.innerHTML = `
        <div class="relative p-2 text-neutral-800 select-none flex flex-col items-center gap-10">
            <div class="w-full mt-8 flex justify-center">
                <div id="track" class="flex w-fit"></div>
            </div>

            <div id="projectDetails" class="max-w-4xl mx-auto text-center opacity-0 transform translate-y-6 transition-all duration-500">
                <h3 id="detailTitle" class="font-soria text-2xl text-black dark:text-white mb-2"></h3>
                <p id="detailDesc" class="text-gray-700 dark:text-gray-300"></p>
                <div id="detailLinks" class="mt-3 flex items-center justify-center gap-3"></div>
            </div>

            <div id="carouselControls" class="px-2 mx-auto flex items-center gap-4 justify-center text-neutral-700 rounded-full bg-neutral-200/50 backdrop-blur-xs border border-neutral-200/80 shadow-sm z-50">
                <button id="prevBtn" class="p-2 cursor-pointer" aria-label="Previous slide">${CHEVRON_LEFT}</button>
                <div id="dots" class="w-[180px] flex justify-center items-center gap-2"></div>
                <button id="nextBtn" class="p-2 cursor-pointer" aria-label="Next slide">${CHEVRON_RIGHT}</button>
            </div>
        </div>
    `;

    const track = document.getElementById("track");
    const dotsEl = document.getElementById("dots");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    function getFilteredAssets(category) {
        if (category === 'all') return ASSETS.slice();
        return ASSETS.filter((item) => (item.categories || []).includes(category));
    }

    function setActiveFilterButton(category) {
        if (!projectFilters) return;
        projectFilters.querySelectorAll('.project-filter-btn').forEach((btn) => {
            const isActive = btn.dataset.category === category;
            btn.classList.toggle('active-filter-btn', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });
    }

    function setCategory(category) {
        activeCategory = category;
        currentAssets = getFilteredAssets(category);
        activeIndex = 0;
        setActiveFilterButton(category);
        buildSlides();
        update();
    }

    function buildSlides() {
        if (!currentAssets.length) {
            track.innerHTML = '<div class="text-center text-gray-400 font-soria text-lg py-10">No projects in this category yet.</div>';
            dotsEl.innerHTML = '';
            return;
        }

        track.innerHTML = currentAssets.map(
            (item, i) => `
            <div class="perspective-midrange">
                <div class="slide-card w-30 md:w-50 aspect-3/4 flex flex-col items-center gap-2" data-index="${i}">
                    <img src="${item.src}" alt="${item.title}" class="w-full h-full object-cover rounded-lg cursor-pointer" data-index="${i}" />
                    <div class="slide-title text-xs md:text-sm whitespace-nowrap">${item.title}</div>
                </div>
            </div>
        `
        ).join("");

        dotsEl.innerHTML = currentAssets.map(
            (_, i) => `<div class="dot rounded-full cursor-pointer h-2" data-index="${i}"></div>`
        ).join("");
    }

    function update() {
        if (!currentAssets.length) return;
        track.style.transform = `translateX(${(-activeIndex * 100) / currentAssets.length}%)`;

        track.querySelectorAll(".slide-card").forEach((card, i) => {
            const isActive = i === activeIndex;
            const rotate = (activeIndex - i) * 60;
            const scale = isActive ? 1 : 0.85;
            card.style.transform = `rotateY(${rotate}deg) scale(${scale})`;

            const title = card.querySelector(".slide-title");
            title.style.opacity = isActive ? "1" : "0";
            title.style.filter = isActive ? "blur(0px)" : "blur(2px)";
        });

        dotsEl.querySelectorAll(".dot").forEach((dot, i) => {
            const isActive = i === activeIndex;
            dot.classList.toggle("w-7", isActive);
            dot.classList.toggle("bg-current", isActive);
            dot.classList.toggle("w-2", !isActive);
            dot.classList.toggle("bg-current/30", !isActive);
        });

        // update details pane for the active slide
        renderDetails();
    }

    function toPrev() {
        activeIndex = Math.max(0, activeIndex - 1);
        update();
    }

    function toNext() {
        activeIndex = Math.min(currentAssets.length - 1, activeIndex + 1);
        update();
    }

    function toSlide(i) {
        activeIndex = i;
        update();
    }

    function renderDetails() {
        const detailsEl = document.getElementById('projectDetails');
        const titleEl = document.getElementById('detailTitle');
        const descEl = document.getElementById('detailDesc');
        const linksEl = document.getElementById('detailLinks');
        if (!detailsEl || !titleEl || !descEl || !linksEl) return;
        const item = currentAssets[activeIndex] || {};
        titleEl.textContent = item.title || '';
        descEl.textContent = item.description || item.title || '';
        linksEl.innerHTML = '';
        if (item.repo) {
            linksEl.innerHTML += `<a href="${item.repo}" target="_blank" rel="noopener noreferrer" class="nav-3d px-4 py-2 bg-white dark:bg-dark border-2 border-black dark:border-primary text-black dark:text-white">View Repo</a>`;
        }
        if (item.live) {
            linksEl.innerHTML += `<a href="${item.live}" target="_blank" rel="noopener noreferrer" class="nav-3d px-4 py-2 bg-primary text-white border-2 border-primary">View Live</a>`;
        }

        // animate details into view in the normal vertical flow
        detailsEl.style.opacity = '1';
        detailsEl.style.transform = 'translateY(0)';
    }

    prevBtn.addEventListener("click", toPrev);
    nextBtn.addEventListener("click", toNext);

    track.addEventListener("click", (e) => {
        const img = e.target.closest("img[data-index]");
        if (img) toSlide(Number(img.dataset.index));
    });

    dotsEl.addEventListener("click", (e) => {
        const dot = e.target.closest(".dot[data-index]");
        if (dot) toSlide(Number(dot.dataset.index));
    });

    if (projectFilters) {
        projectFilters.addEventListener('click', (e) => {
            const button = e.target.closest('.project-filter-btn[data-category]');
            if (!button) return;
            setCategory(button.dataset.category);
        });
    }

    setCategory(activeCategory);
    buildSlides();
    update();
}

    