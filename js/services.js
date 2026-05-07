// Function to show details when a service card is clicked
function revealDetails(type) {
    const messages = {
        'web': "I specialize in creating custom HTML structures with modular CSS.",
        'ui': "I love working with blur effects, gradients, and dark-mode aesthetics.",
        'prog': "I can help with fundamental logic and simple automation scripts."
    };

    alert(messages[type] || "More information coming soon!");
}

console.log("Services module loaded with Liquid Glass effects.");

let isScrolling;
window.addEventListener('scroll', function (event) {
    window.clearTimeout(isScrolling);
    
    document.body.classList.add('is-scrolling');
    document.body.style.pointerEvents = 'none'; 

    isScrolling = setTimeout(function() {
        document.body.classList.remove('is-scrolling');
        document.body.style.pointerEvents = 'all'; 
    }, 10);
}, false);

document.addEventListener('DOMContentLoaded', () => {
    const serviceDetails = {
        'web-dev': {
            title: 'Web Development',
            description: 'Programming is the engine room of innovation, and I approach it with a focus on logic, efficiency, and scalability. As a self-taught developer, I have cultivated a deep understanding of algorithmic thinking and functional scriptwriting. I offer custom programming solutions designed to automate repetitive tasks, handle complex data logic, and solve technical challenges. Whether it is building back-end scripts to manage information or creating interactive front-end features, I provide clean, maintainable code. My goal is to build robust software foundations that are easy to update and built to handle the demands of future expansion.'
        },
        'ui-ux': {
            title: 'UI/UX Design',
            description: 'User experience is where psychology meets technology. I specialize in crafting immersive interfaces that prioritize the user\'s journey without sacrificing visual impact. My design philosophy centers on glassmorphism and fluid layouts, creating a sense of depth and modernism that keeps users engaged. I offer comprehensive UI/UX services including wireframing, interactive prototyping, and visual storytelling. By analyzing user behavior and modern design trends, I ensure that every button, transition, and layout is placed with intention resulting in a digital product that is as effortless to use as it is beautiful to look at.'
        },
        'programming': {
            title: 'Programming',
            description: 'In the modern digital landscape, a website is more than just an online business card, it is a high-performance tool that must balance speed, accessibility, and aesthetics. Through self-directed immersion and rigorous practice, I have perfected a design system focused on fluidity and visual depth, creating sophisticated digital spaces that respond intuitively to any screen I offer the development of clean, semantic HTML structures paired with advanced CSS techniques and dynamic JavaScript logic. My focus is on creating seamless cross-platform experiences, ensuring that every site I build is optimized for performance, SEO-friendly, and scales perfectly from mobile devices to ultra-wide monitors.'
        }
    };

    const modalOverlay = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalDesc');
    const closeBtn = document.querySelector('.close-btn');
    const readMoreBtns = document.querySelectorAll('#services .btn');

    // ✅ OPEN — mirrors skills.js exactly
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceKey = btn.getAttribute('data-service');
            const data = serviceDetails[serviceKey];

            if (data) {
                modalTitle.innerText = data.title;
                modalBody.innerText = data.description;

                modalOverlay.style.display = 'flex';
                modalOverlay.classList.remove('modal-closing');  // clear close state
                modalOverlay.classList.add('modal-opening');     // trigger open animation
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // ✅ CLOSE — uses animationend + { once: true } so it never stacks
    const closeModal = () => {
        modalOverlay.classList.remove('modal-opening');
        modalOverlay.classList.add('modal-closing');

        modalOverlay.addEventListener('animationend', () => {
            modalOverlay.style.display = 'none';
            modalOverlay.classList.remove('modal-closing'); // reset for next open
            document.body.style.overflow = 'auto';
        }, { once: true }); // ✅ prevents listener from stacking on repeated closes
    };

    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
});