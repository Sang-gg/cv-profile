document.addEventListener('DOMContentLoaded', () => {

  /* 1. Scroll reveal with stagger */
  const revealEls = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
      const delay = Math.max(0, siblings.indexOf(entry.target)) * 60;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  revealEls.forEach(el => obs.observe(el));

  /* 2. Active nav highlight */
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  const navObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting)
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`));
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => navObs.observe(s));

  /* 3. Smooth scroll */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  /* 4. Parallax orbs follow scroll subtly */
  const orbs = document.querySelectorAll('.orb');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY * 0.06;
      orbs.forEach((orb, i) => {
        orb.style.translate = `0 ${y * (i + 1) * 0.4}px`;
      });
      ticking = false;
    });
  }, { passive: true });

});
