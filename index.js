document.addEventListener('DOMContentLoaded', () => {

  /* 1. Typewriter effect on #typewriter-name */
  const el = document.getElementById('typewriter-name');
  if (el) {
    const text = 'pham-thanh-sang';
    let i = 0;
    const cursor = document.createElement('span');
    cursor.className = 'term-cursor';
    el.appendChild(cursor);
    const type = () => {
      if (i < text.length) {
        cursor.insertAdjacentText('beforebegin', text[i++]);
        setTimeout(type, 60 + Math.random() * 40);
      }
    };
    setTimeout(type, 400);
  }

  /* 2. Scroll reveal with stagger */
  const revealEls = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
      const delay = Math.max(0, siblings.indexOf(entry.target)) * 55;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  revealEls.forEach(el => obs.observe(el));

  /* 3. Active nav highlight */
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  const navObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting)
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`));
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => navObs.observe(s));

  /* 4. Smooth scroll */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  /* 5. Project card left-border on hover (CSS handles most, JS adds keyboard support) */
  document.querySelectorAll('.project-item').forEach(card => {
    card.setAttribute('tabindex', '0');
  });

});
