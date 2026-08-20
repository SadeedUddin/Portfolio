/* ===================================================================
 * Custom Interactive JavaScript Enhancements
 * Sadeed Uddin Portfolio
 * =================================================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* -------------------------------------------------------------------
     * 1. Dynamic Typing Effect in Hero Section
     * ------------------------------------------------------------------- */
    const typeTarget = document.querySelector('.hero-typewriter');
    if (typeTarget) {
        const words = [
            "Google Ads & PPC Campaigns",
            "High-Converting Meta Ads",
            "Technical SEO & Core Web Vitals",
            "Bespoke WordPress & Web Apps",
            "Conversion Rate Optimization"
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 80;

        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typeTarget.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 40;
            } else {
                typeTarget.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 80;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 400; // Pause before typing next word
            }

            setTimeout(typeEffect, typeSpeed);
        }

        typeEffect();
    }

    /* -------------------------------------------------------------------
     * 2. Portfolio Category Filtering
     * ------------------------------------------------------------------- */
    const filterBtns = document.querySelectorAll('.folio-filter-btn');
    const folioItems = document.querySelectorAll('.folio-list .entry');

    if (filterBtns.length > 0 && folioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                folioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            if (item.style.opacity === '0') {
                                item.style.display = 'none';
                            }
                        }, 300);
                    }
                });
            });
        });
    }

    /* -------------------------------------------------------------------
     * 3. Number Counter Animation on Scroll
     * ------------------------------------------------------------------- */
    const statNumbers = document.querySelectorAll('.stat-card__number');
    let animated = false;

    function animateStats() {
        const statsSection = document.querySelector('.stats-grid');
        if (!statsSection) return;

        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2;

        if (sectionPos < screenPos && !animated) {
            animated = true;
            statNumbers.forEach(stat => {
                const targetText = stat.getAttribute('data-count') || stat.textContent;
                const targetNum = parseFloat(targetText.replace(/[^0-9.]/g, ''));
                const prefix = targetText.match(/^[^\d]*/) ? targetText.match(/^[^\d]*/)[0] : '';
                const suffix = targetText.replace(/^[^\d]*[\d.]+/, '');
                let startNum = 0;
                const duration = 1500;
                const stepTime = 30;
                const steps = duration / stepTime;
                const increment = targetNum / steps;

                const counter = setInterval(() => {
                    startNum += increment;
                    if (startNum >= targetNum) {
                        stat.textContent = prefix + (targetNum % 1 === 0 ? targetNum : targetNum.toFixed(1)) + suffix;
                        clearInterval(counter);
                    } else {
                        stat.textContent = prefix + (startNum % 1 === 0 ? Math.floor(startNum) : startNum.toFixed(1)) + suffix;
                    }
                }, stepTime);
            });
        }
    }

    window.addEventListener('scroll', animateStats);
    animateStats(); // Run on initial load if in view
});
