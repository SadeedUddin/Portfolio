(function () {
    'use strict';

    /* ---------- course data ---------- */
    var COURSES = {
        m1: {
            level: 'Highfield · RQF Level 3',
            title: 'Diploma in Management (RQF)',
            sub: 'Highfield Qualifications · Regulated Qualifications Framework',
            facts: [['6–12', 'Months'], ['100%', 'Online'], ['RQF', 'Framework']],
            units: [
                'Principles of Management &amp; Leadership',
                'Managing a Team to Achieve Results',
                'Business Communication Strategies',
                'Personal Development as a Manager',
                'Managing Workplace Wellbeing'
            ]
        },
        m2: {
            level: 'Highfield · RQF Level 5',
            title: 'Diploma for Operations &amp; Departmental Managers',
            sub: 'Highfield Qualifications · RQF Level 5',
            facts: [['12–18', 'Months'], ['100%', 'Online'], ['5', 'RQF Level']],
            units: [
                'Strategic Leadership &amp; Organisational Direction',
                'Financial Management for Senior Managers',
                'Operations Planning, Monitoring &amp; Review',
                'Leading &amp; Developing High-Performance Teams',
                'Change Management &amp; Innovation'
            ]
        },
        m3: {
            level: 'Highfield · RQF Level 3',
            title: 'Award in Education &amp; Training (AET)',
            sub: 'Highfield Qualifications · RQF Regulated',
            facts: [['3–6', 'Months'], ['100%', 'Online'], ['AET', 'Qualification']],
            units: [
                'Roles, Responsibilities &amp; Relationships in Education',
                'Planning to Meet the Needs of Learners',
                'Delivering Inclusive Sessions that Motivate Learners',
                'Assessing Learning in Education &amp; Training'
            ]
        },
        m4: {
            level: 'RQF Level 4',
            title: 'Certificate in Education &amp; Training (CET)',
            sub: 'RQF Level 4 · Part-time teachers &amp; trainers',
            facts: [['6–12', 'Months'], ['100%', 'Online'], ['4', 'RQF Level']],
            units: [
                'Teaching, Learning &amp; Assessment in Education',
                'Theories, Principles and Models of Learning',
                'Developing Teaching, Learning &amp; Assessment in Practice',
                'Inclusive Practice in Education &amp; Training'
            ]
        },
        m5: {
            level: 'RQF Level 5',
            title: 'Certified Professional Trainer (CPT)',
            sub: 'Advanced workplace trainer qualification',
            facts: [['6–9', 'Months'], ['100%', 'Online'], ['CPT', 'Qualification']],
            units: [
                'Designing Effective Training Programmes',
                'Facilitating Learning &amp; Group Dynamics',
                'Coaching &amp; Mentoring Techniques',
                'Evaluating Training Effectiveness &amp; ROI'
            ]
        },
        m6: {
            level: 'RQF Level 3',
            title: 'Award in Health &amp; Safety in the Workplace',
            sub: 'Essential for supervisors, team leaders &amp; managers',
            facts: [['1–3', 'Months'], ['100%', 'Online'], ['Award', 'Qualification']],
            units: [
                'Legal Framework for Health &amp; Safety',
                'Risk Assessment in the Workplace',
                'Hazard Identification &amp; Control Measures',
                'Accident Investigation &amp; Reporting'
            ]
        }
    };

    var $  = function (s, c) { return (c || document).querySelector(s); };
    var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

    /* ---------- nav shadow ---------- */
    var nav = $('#nav');
    var toTop = $('#toTop');
    window.addEventListener('scroll', function () {
        nav.classList.toggle('stuck', window.scrollY > 8);
        toTop.classList.toggle('show', window.scrollY > 700);
    }, { passive: true });

    /* ---------- mobile menu ---------- */
    var toggle = $('#navToggle');
    var menu = $('#mobileMenu');
    toggle.addEventListener('click', function () {
        var open = menu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
    });
    $$('#mobileMenu a').forEach(function (a) {
        a.addEventListener('click', function () {
            menu.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });

    /* ---------- active section in nav ---------- */
    var links = $$('.nav-links a');
    var targets = $$('#top, #about, #why, #courses, #online, #voices, #contact');
    if ('IntersectionObserver' in window) {
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (!e.isIntersecting) return;
                links.forEach(function (l) {
                    l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id);
                });
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        targets.forEach(function (t) { obs.observe(t); });
    }

    /* ---------- discipline filter ---------- */
    var filters = $$('.filter');
    var courses = $$('.course');
    var blocks  = $$('.level-block');
    var noResults = $('#noResults');

    filters.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var want = btn.dataset.filter;
            filters.forEach(function (f) { f.setAttribute('aria-pressed', String(f === btn)); });

            courses.forEach(function (c) {
                var cats = c.dataset.cat.split(' ');
                c.hidden = !(want === 'all' || cats.indexOf(want) !== -1);
            });

            var anyVisible = false;
            blocks.forEach(function (b) {
                var visible = $$('.course', b).some(function (c) { return !c.hidden; });
                b.hidden = !visible;
                if (visible) anyVisible = true;
            });
            noResults.hidden = anyVisible;
        });
    });

    /* ---------- course modal ---------- */
    var scrim = $('#scrim');
    var lastFocus = null;

    function openModal(key) {
        var c = COURSES[key];
        if (!c) return;
        lastFocus = document.activeElement;

        $('#modalLevel').textContent = c.level;
        $('#modalTitle').innerHTML = c.title;
        $('#modalSub').innerHTML = c.sub;
        $('#modalFacts').innerHTML = c.facts.map(function (f) {
            return '<div class="fact"><div class="fact-val">' + f[0] + '</div><div class="fact-key">' + f[1] + '</div></div>';
        }).join('');
        $('#modalUnits').innerHTML = c.units.map(function (u) { return '<li><span>' + u + '</span></li>'; }).join('');

        scrim.hidden = false;
        document.body.style.overflow = 'hidden';
        $('#modalClose').focus();
    }

    function closeModal() {
        scrim.hidden = true;
        document.body.style.overflow = '';
        if (lastFocus) lastFocus.focus();
    }

    courses.forEach(function (c) {
        c.addEventListener('click', function () { openModal(c.dataset.course); });
    });
    $('#modalClose').addEventListener('click', closeModal);
    $('#modalCta').addEventListener('click', closeModal);
    scrim.addEventListener('click', function (e) { if (e.target === scrim) closeModal(); });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !scrim.hidden) closeModal();
    });

    /* ---------- enquiry form ---------- */
    var toast = $('#toast');
    $('#enquiry').addEventListener('submit', function (e) {
        e.preventDefault();
        e.target.reset();
        toast.classList.add('show');
        setTimeout(function () { toast.classList.remove('show'); }, 4200);
    });

    /* ---------- SUPER SMOOTH SCROLL & REVEAL ENGINE ---------- */
    document.addEventListener('DOMContentLoaded', function () {
        // 1. Comprehensive Multi-Page Scroll & Section Reveal Engine
        var selectors = [
            'section',
            'header.hero',
            '.banner-card',
            '.banner-content',
            '.section-header',
            '.about-card',
            '.why-card',
            '.course-card',
            '.stat-box',
            '.expert-feature-card',
            '.expert-team-accordion',
            '.hero-stats-card',
            '.accred-item',
            '.contact-card',
            'article.course-card',
            '.footer-grid > div'
        ].join(', ');

        var revealElements = document.querySelectorAll(selectors);
        
        revealElements.forEach(function (el) {
            el.classList.add('scroll-reveal');
            
            // Auto-assign staggered delays to siblings within containers
            if (el.parentElement) {
                var children = Array.from(el.parentElement.children);
                var childIndex = children.indexOf(el);
                if (childIndex >= 0) {
                    var delayNum = (childIndex % 6) + 1;
                    el.classList.add('scroll-reveal-delay-' + delayNum);
                }
            }
        });

        if ('IntersectionObserver' in window) {
            var observerOptions = {
                root: null,
                rootMargin: '0px 0px -50px 0px',
                threshold: 0.08
            };

            var revealObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            revealElements.forEach(function (el) {
                revealObserver.observe(el);
            });
        } else {
            // Fallback for older browsers
            revealElements.forEach(function (el) {
                el.classList.add('is-visible');
            });
        }

        // 2. Smooth Offset Anchor Navigation
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                var targetId = this.getAttribute('href');
                if (targetId && targetId !== '#') {
                    var targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        var headerOffset = 80;
                        var elementPosition = targetElement.getBoundingClientRect().top;
                        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    });

})();
