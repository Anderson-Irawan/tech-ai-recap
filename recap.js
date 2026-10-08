// Tech & AI Recap: 8 October 2026
// Uses the shared master (../../presentation.js -> initPresentation) for
// keyboard, click, swipe, hash and speaker notes (N). This file only adds
// buttons, a progress bar and aria-hidden on off-screen slides.
document.addEventListener('DOMContentLoaded', () => {
  initPresentation();

  const press = key => document.dispatchEvent(new KeyboardEvent('keydown', { key }));
  document.getElementById('recapPrev').addEventListener('click', e => { e.stopPropagation(); press('ArrowLeft'); });
  document.getElementById('recapNext').addEventListener('click', e => { e.stopPropagation(); press('ArrowRight'); });

  const slides = [...document.querySelectorAll('#deck .slide')];
  const bar = document.getElementById('progressBar');

  const sync = () => {
    const i = slides.findIndex(s => s.classList.contains('active'));
    slides.forEach((s, n) => s.setAttribute('aria-hidden', String(n !== i)));
    bar.style.width = `${((i + 1) / slides.length) * 100}%`;
  };

  const observer = new MutationObserver(sync);
  slides.forEach(s => observer.observe(s, { attributes: true, attributeFilter: ['class'] }));
  sync();
});
