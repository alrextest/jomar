// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', false);
}));

// Lightbox
const shots = Array.from(document.querySelectorAll('.shot'));
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
let current = 0;

function show(i) {
  current = (i + shots.length) % shots.length;
  lbImg.src = shots[current].dataset.src;
  lbImg.alt = shots[current].querySelector('img').alt;
}
function openLb(i) {
  show(i);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeLb() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

shots.forEach((s, i) => s.addEventListener('click', () => openLb(i)));
document.getElementById('lbClose').addEventListener('click', closeLb);
document.getElementById('lbPrev').addEventListener('click', () => show(current - 1));
document.getElementById('lbNext').addEventListener('click', () => show(current + 1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLb(); });
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowLeft') show(current - 1);
  if (e.key === 'ArrowRight') show(current + 1);
});

// Content calendar (sample: November 2026)
(function () {
  const cal = document.getElementById('cal');
  if (!cal) return;
  const types = {
    promo:   { cls: 't-promo',   name: 'Promo / Sale' },
    product: { cls: 't-product', name: 'Product Spotlight' },
    life:    { cls: 't-life',    name: 'Lifestyle / Model' },
    engage:  { cls: 't-engage',  name: 'Engagement' }
  };
  document.getElementById('legend').innerHTML = Object.values(types)
    .map(t => `<span><i class="${t.cls}"></i>${t.name}</span>`).join('');

  const year = 2026, month = 10; // November
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const weekly = { 1: 'product', 3: 'life', 5: 'promo', 0: 'engage' };
  const labels = { product: 'New drop', life: 'Model feature', promo: 'Offer post', engage: 'Poll / Q&A' };
  const special = { 20: 'Early access', 24: 'Countdown', 25: 'Countdown', 26: 'Teaser', 27: 'BLACK FRIDAY', 28: 'Weekend sale', 30: 'Cyber Monday' };

  let html = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => `<div class="dow">${d}</div>`).join('');
  for (let i = 0; i < first; i++) html += '<div class="day empty"></div>';
  for (let d = 1; d <= days; d++) {
    const dow = new Date(year, month, d).getDay();
    let post = '';
    if (special[d]) post = `<span class="post t-promo">${special[d]}</span>`;
    else if (weekly[dow]) post = `<span class="post ${types[weekly[dow]].cls}">${labels[weekly[dow]]}</span>`;
    html += `<div class="day">${d}${post}</div>`;
  }
  cal.innerHTML = html;
})();