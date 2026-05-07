const menu = document.getElementById("menu");

function toggleMenu() {
    const menu = document.getElementById('menu');
    // This adds the 'active' class if it's missing, and removes it if it's there
    menu.classList.toggle('active');
}

// close ONLY when mouse leaves AND menu is open
menu.addEventListener("mouseleave", () => {
    if (menu.classList.contains("active")) {
        menu.classList.remove("active");
    }
});


// 🔥 ADD THIS: close when clicking outside the menu
document.addEventListener("click", (e) => {
    const isClickInsideMenu = menu.contains(e.target);
    const isClickOnButton = e.target.closest(".top-left-btn");

    if (!isClickInsideMenu && !isClickOnButton) {
        menu.classList.remove("active");
    }
});