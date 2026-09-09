const $ = (s, p = document) => p.querySelector(s);

// A small, dependency-free "video-like" field behind the hero.
const canvas = $('#starfield');
const ctx = canvas.getContext('2d');
let stars = [], mouse = { x: -1000, y: -1000 };
function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  stars = Array.from({ length: Math.max(55, Math.floor(rect.width / 17)) }, () => ({
    x: Math.random() * rect.width, y: Math.random() * rect.height,
    r: Math.random() * 1.6 + .25, speed: Math.random() * .17 + .03, phase: Math.random() * 6.28
  }));
}
function drawStars(t = 0) {
  const rect = canvas.getBoundingClientRect(); ctx.clearRect(0, 0, rect.width, rect.height);
  stars.forEach(s => {
    s.y -= s.speed; if (s.y < -4) { s.y = rect.height + 4; s.x = Math.random() * rect.width; }
    const distance = Math.hypot(s.x - mouse.x, s.y - mouse.y);
    const glow = distance < 130 ? (130 - distance) / 130 : 0;
    ctx.beginPath(); ctx.arc(s.x, s.y, s.r + glow * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(23,32,44,${.18 + Math.sin(t / 700 + s.phase) * .12 + glow * .5})`; ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
resizeCanvas(); drawStars(); window.addEventListener('resize', resizeCanvas);
window.addEventListener('pointermove', e => { mouse.x = e.clientX; mouse.y = e.clientY; $('.cursor-glow').style.left = `${e.clientX}px`; $('.cursor-glow').style.top = `${e.clientY}px`; });

const revealObserver = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: .16 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const journeyObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  document.querySelectorAll('.journey-card').forEach(card => card.classList.toggle('active', card === entry.target));
  $('#scene-status').textContent = entry.target.dataset.status;
  const index = [...document.querySelectorAll('.journey-card')].indexOf(entry.target);
  const points = [['65%','20%'], ['33%','72%'], ['83%','54%']];
  $('.scene-cursor').style.left = points[index][0]; $('.scene-cursor').style.top = points[index][1];
}, { threshold: .58 }));
document.querySelectorAll('.journey-card').forEach(el => journeyObserver.observe(el));

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  $('.progress span').style.width = `${max ? scrollY / max * 100 : 0}%`;
}, { passive: true });

$('.theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  $('.theme-toggle span').textContent = document.body.classList.contains('dark') ? '☾' : '☼';
});

document.querySelectorAll('.skill').forEach(skill => skill.addEventListener('click', () => {
  $('.skill-tooltip').textContent = skill.dataset.skill;
  document.querySelectorAll('.skill').forEach(s => s.setAttribute('aria-pressed', 'false'));
  skill.setAttribute('aria-pressed', 'true');
}));

document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('pointermove', e => { const r = card.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5; const y = (e.clientY - r.top) / r.height - .5; card.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-5px)`; });
  card.addEventListener('pointerleave', () => { card.style.transform = ''; });
});

$('.copy-email').addEventListener('click', async event => {
  const email = event.currentTarget.dataset.email;
  try { await navigator.clipboard.writeText(email); event.currentTarget.textContent = 'Copied!'; }
  catch { event.currentTarget.textContent = email; }
  setTimeout(() => { event.currentTarget.textContent = 'Copy email'; }, 1900);
});
$('#year').textContent = new Date().getFullYear();
