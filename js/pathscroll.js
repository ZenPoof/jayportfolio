document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Only trigger for links that start with #
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();

            const targetID = this.getAttribute('href');
            const targetElement = document.querySelector(targetID);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

