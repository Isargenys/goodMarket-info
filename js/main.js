/* ================================================
   NAVBAR SCROLL EFFECT
================================================ */
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

/* ================================================
   FADE-IN ON SCROLL (Intersection Observer)
================================================ */
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  }),
  { threshold: 0.12 }
);

document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

/* ================================================
   iOS WAITLIST COUNTER ANIMATION
================================================ */
const countEl = document.getElementById('waitlistCount');
if (countEl) {
  const target   = 127;
  const duration = 1800;
  const step     = Math.ceil(duration / target);
  let current    = 0;

  const counter = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const timer = setInterval(() => {
          current += 1;
          countEl.textContent = current;
          if (current >= target) clearInterval(timer);
        }, step);
        counter.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counter.observe(countEl);
}

/* ================================================
   ACTIVE NAV LINK HIGHLIGHT
================================================ */
(function () {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#mainNav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();