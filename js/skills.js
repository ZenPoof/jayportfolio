document.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.skill-card');

    const skillObserverOptions = {
        threshold: 0.2 // Triggers when 20% of the card is visible
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const fill = card.querySelector('.liquid-fill');
                const targetLevel = card.getAttribute('data-level');
                
                if (fill) {
                    // This triggers the smooth CSS transition
                    fill.style.width = targetLevel;
                }
                
                // Stop watching this card once the animation has started
                skillObserver.unobserve(card);
            }
        });
    }, skillObserverOptions);

    skillCards.forEach(card => skillObserver.observe(card));
});

/* --- STANDALONE SKILLS MODAL LOGIC --- */
(function() {
    // 1. Data for the Skills "Details"
    const skillContent = {
        'HTML5': {
            title: 'Semantic Architecture',
            body: `I architect web structures that are not just visual, but meaningful. 
            <div class="insane-grid">
                <div class="insane-item"><i class="fa-solid fa-universal-access"></i><span>ARIA Roles</span></div>
                <div class="insane-item"><i class="fa-solid fa-magnifying-glass"></i><span>SEO Metadata</span></div>
                <div class="insane-item"><i class="fa-solid fa-code"></i><span>Validation</span></div>
                <div class="insane-item"><i class="fa-solid fa-shield-halved"></i><span>Structure</span></div>
            </div>`
        },
        'CSS3': {
            title: 'Stylistic Engineering',
            body: `Mastering the visual engine. From complex animations to modern layout systems.
            <div class="insane-grid">
                <div class="insane-item"><i class="fa-solid fa-layer-group"></i><span>Grid/Flex</span></div>
                <div class="insane-item"><i class="fa-solid fa-wand-sparkles"></i><span>Animations</span></div>
                <div class="insane-item"><i class="fa-solid fa-droplet"></i><span>Glassmorphism</span></div>
                <div class="insane-item"><i class="fa-solid fa-mobile-screen"></i><span>Responsive</span></div>
            </div>`
        },
        'JavaScript': {
            title: 'Back-end Logic',
            body: `Harnessing the power of Object-Oriented Programming to build scalable systems.
            <div class="insane-grid">
                <div class="insane-item"><i class="fa-solid fa-cube"></i><span>OOP Patterns</span></div>
                <div class="insane-item"><i class="fa-solid fa-database"></i><span>Data Structures</span></div>
                <div class="insane-item"><i class="fa-solid fa-microchip"></i><span>Memory Mgmt</span></div>
                <div class="insane-item"><i class="fa-solid fa-bug-slash"></i><span>Unit Testing</span></div>
            </div>`
        }
    };

    // 2. Select the elements specifically for Skills
    const skillOverlay = document.getElementById('serviceModal');
    const skillTitle = document.getElementById('modalTitle');
    const skillDesc = document.getElementById('modalDesc');

    // 3. Add Event Listeners to the .btn-mini buttons
    document.querySelectorAll('.btn-mini').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Find the skill name from the H3 in the same card
            const card = this.closest('.skill-card');
            const name = card.querySelector('h3').innerText.trim();
            const data = skillContent[name];

            if (data) {
                skillTitle.innerText = data.title;
                skillDesc.innerHTML = data.body; // Injects the insane grid
                
                // Open with animation
                skillOverlay.style.display = 'flex';
                skillOverlay.classList.remove('modal-closing');
                document.body.style.overflow = 'hidden';
            }
        });
    });
})();