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

const heroImage = document.querySelector('.hero-image');
const img = heroImage.querySelector('img');

heroImage.addEventListener('mousemove', (e) => {
  const rect = heroImage.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  // max tilt pinalaki mula 10° -> 20°
  const rotateX = ((y - centerY) / centerY) * 20;
  const rotateY = ((x - centerX) / centerX) * 20;

  // scale pinalaki for popping effect
  img.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
  img.style.boxShadow = `${rotateY}px ${-rotateX}px 30px rgba(0,255,247,0.5)`; // dynamic glow
});

heroImage.addEventListener('mouseleave', () => {
  img.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  img.style.boxShadow = '0 0 15px rgba(0,255,247,0.3)'; // default glow
});

const interactiveElements = document.querySelectorAll('.interactive-glow');

interactiveElements.forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // calculate distance from center para mas natural
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const dx = x - centerX;
    const dy = y - centerY;

    // intensity ng glow base sa distance from center
    const distance = Math.sqrt(dx*dx + dy*dy);
    const maxDist = Math.sqrt(centerX*centerX + centerY*centerY);
    const intensity = 1 - distance / maxDist; // 0-1

    // resize & position glow
    const glow = el.querySelector('::before'); // pseudo element, will need CSS variable approach
    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);
    el.style.setProperty('--glow-opacity', intensity);
  });

  el.addEventListener('mouseleave', () => {
    el.style.setProperty('--glow-opacity', 0);
  });
});

const projects = document.querySelectorAll('.interactive-project');

projects.forEach(project => {
  const img = project.querySelector('img');

  project.addEventListener('mousemove', (e) => {
    const rect = project.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10; // tilting angle
    const rotateY = ((x - centerX) / centerX) * 10;

    img.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    project.classList.add('glow');
  });

  project.addEventListener('mouseleave', () => {
    img.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    project.classList.remove('glow');
  });
});

const mario = document.querySelector('.mario-run');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;                      // current scroll
  const docHeight = document.body.scrollHeight - window.innerHeight; // total scrollable distance

  const scrollPercent = scrollY / docHeight;           // 0 - 1
  const maxX = window.innerWidth - mario.offsetWidth;  // max horizontal move

  mario.style.left = `${scrollPercent * maxX}px`;
});