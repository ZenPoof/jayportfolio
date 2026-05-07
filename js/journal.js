/* ══════════════════════════════════════════════
   JOURNAL.JS
   Modal open/close logic for Jayron's Journal page.
   Closing animation mirrors the pattern in services.js
   and skills.js — uses modal-closing class + animationend.
══════════════════════════════════════════════ */

(function () {

    /* ── DATA ── */
    const JOURNAL_DATA = {
        1: {
            entryNum: "Week #01",
            title: "Introduction to basic coding (CSS3, HTML5, JavaScript).",
            date: "April 20-24, 2026",
            tags: ["Basic Coding", "HTML5", "CSS3", "JavaScript"],
            body: `
                <p>This week marked the very beginning of my coding immersion. I spent time researching and studying the fundamental structure of the three core web technologies — HTML5, CSS3, and JavaScript.</p>
                <p>HTML5 gave me the skeleton: how to structure content with tags, semantic elements, and proper document hierarchy. I learned what headings, paragraphs, links, and divs actually do under the hood.</p>
                <p>CSS3 introduced me to the world of visual styling — how to control color, spacing, fonts, and layout. It was both exciting and overwhelming seeing how many properties exist.</p>
                <p>JavaScript was a glimpse into making things interactive. I understood variables, functions, and basic DOM manipulation at a surface level this week.</p>
                <p>Overall, Week 1 was about building a mental map of how these three languages work together to create everything we see on the web.</p>
            `
        },
        2: {
            entryNum: "Week #02",
            title: "Advanced CSS Layouts, HTML Structure, JavaScript Functions.",
            date: "April 27 - May 1, 2026",
            tags: ["Styling", "CSS Layouts", "Flexbox", "Grid", "JS Functions"],
            body: `
                <p>Week 2 pushed me deeper. Instead of just understanding what things are, I started actually <em>building</em> with them.</p>
                <p>On the CSS side, I dove into Flexbox and CSS Grid — two powerful layout systems. Flexbox helped me align items in rows and columns effortlessly, while Grid gave me control over two-dimensional page layouts.</p>
                <p>For HTML, I focused on proper semantic structure: using <code>section</code>, <code>article</code>, <code>nav</code>, and <code>header</code> correctly so that pages are both accessible and meaningful.</p>
                <p>With JavaScript, I started writing real functions — taking inputs, processing them, and returning outputs. Event listeners brought the page to life, letting me respond to clicks and user interactions.</p>
                <p>By the end of the week I had built a small, responsive webpage section on my own. Seeing it work on both desktop and mobile felt like a real milestone.</p>
            `
        }
    };

    /* ── ELEMENTS ── */
    const modal    = document.getElementById('journalModal');
    const closeBtn = document.getElementById('modalClose');

    if (!modal || !closeBtn) return;

    /* ── OPEN ── */
    function openModal(entryId) {
        const data = JOURNAL_DATA[entryId];
        if (!data) return;

        document.getElementById('modalEntryLabel').textContent = data.entryNum;
        document.getElementById('modalTitle').textContent      = data.title;
        document.getElementById('modalDate').textContent       = data.date;
        document.getElementById('modalBody').innerHTML         = data.body;

        const tagsRow = document.getElementById('modalTags');
        tagsRow.innerHTML = data.tags
            .map(t => `<span class="tag">${t}</span>`)
            .join('');

        modal.style.display = 'flex';
        modal.classList.remove('modal-closing');
        modal.classList.add('modal-opening');

        /* Completely disable scrolling on both body and html */
        document.body.style.overflow            = 'hidden';
        document.documentElement.style.overflow = 'hidden';
    }

    /* ── CLOSE (with animation) ── */
    function closeModal() {
        modal.classList.remove('modal-opening');
        modal.classList.add('modal-closing');

        modal.addEventListener('animationend', () => {
            modal.style.display = 'none';
            modal.classList.remove('modal-closing');

            /* Re-enable scrolling */
            document.body.style.overflow            = '';
            document.documentElement.style.overflow = '';
        }, { once: true }); /* once: true prevents listener stacking */
    }

    /* ── CARD CLICK LISTENERS ── */
    document.querySelectorAll('.journal-card').forEach(card => {
        card.addEventListener('click', () => {
            const entryId = parseInt(card.getAttribute('data-entry'));
            openModal(entryId);
        });
    });

    /* ── CLOSE TRIGGERS ── */
    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    /* ── SCROLL REVEAL for cards ── */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.journal-card').forEach(card => observer.observe(card));

    /* ── COUNT-UP STATS ── */
    function countUp(el, target) {
        if (!el) return;
        let count = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
            count = Math.min(count + step, target);
            el.textContent = count;
            if (count >= target) clearInterval(timer);
        }, 30);
    }

    countUp(document.getElementById('entry-count'), 2);
    countUp(document.getElementById('month-count'), 14);
    countUp(document.getElementById('word-count'),  2132);

})();
