// HAMBURGER MENU
const toggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    toggle.classList.toggle('active');
});


// SCROLL REVEAL
// SCROLL REVEAL PER ELEMENT
function revealSections() {
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;

    reveals.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementBottom = rect.bottom;

        // visible kapag kahit partially nakikita sa screen
        if (elementBottom > 0 && elementTop < windowHeight) {
            element.classList.add("active");
        } else {
            element.classList.remove("active");
        }
    });
}

// Run on scroll
window.addEventListener("scroll", revealSections);

// Run on page load
window.addEventListener("load", revealSections);

// **Optional:** run once after a short timeout para ma-catch agad unang elements
setTimeout(revealSections, 100);

// Select all nav links
const navItems = document.querySelectorAll('#nav-links a');

navItems.forEach(link => {
    link.addEventListener('click', () => {
        // close menu if open
        navLinks.classList.remove('show');
        toggle.classList.remove('active');
    });
});