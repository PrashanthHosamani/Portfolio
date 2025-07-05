// Section fade-in on scroll and animated skill bars

document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('js-animate');

    // Section fade-in
    const sections = document.querySelectorAll('section');
    const observer = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });
    sections.forEach(section => observer.observe(section));

    // Animated skill bars
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        const skillBars = skillsSection.querySelectorAll('.bar-fill');
        const skillPercents = [85, 75, 80, 70, 75, 65, 80, 85, 75, 65, 90, 70];
        let animated = false;
        const animateBars = () => {
            if (!animated && skillsSection.classList.contains('visible')) {
                skillBars.forEach((bar, i) => {
                    bar.style.setProperty('--bar-width', skillPercents[i] + '%');
                });
                animated = true;
            }
        };
        // Listen for the visible class
        const skillsObserver = new window.MutationObserver(animateBars);
        skillsObserver.observe(skillsSection, { attributes: true, attributeFilter: ['class'] });
    }

    // Animated summary card numbers
    function animateSummaryNumbers() {
        document.querySelectorAll('.summary-card .summary-value').forEach(function(el) {
            const text = el.textContent.trim();
            const match = text.match(/(\d+)/);
            if (!match) return;
            const target = parseInt(match[1], 10);
            let prefix = text.replace(/(\d+).*/, '');
            let suffix = text.replace(/.*?(\d+)(.*)/, '$2');
            let current = 0;
            const duration = 1200;
            const step = Math.ceil(target / (duration / 16));
            function update() {
                current += step;
                if (current >= target) {
                    el.textContent = prefix + target + suffix;
                } else {
                    el.textContent = prefix + current + suffix;
                    requestAnimationFrame(update);
                }
            }
            el.textContent = prefix + '0' + suffix;
            update();
        });
    }
    // Trigger animation immediately on page load
    animateSummaryNumbers();
}); 