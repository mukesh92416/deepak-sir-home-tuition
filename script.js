/* ===================================================================
   Deepak Sir Home Tuition — Interactions
   =================================================================== */

/* ---- Loading screen ---- */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hide'), 600);
});

/* ---- Sticky navbar ---- */
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 30);
  backToTop.classList.toggle('show', y > 500);
});

/* ---- Back to top ---- */
backToTop.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

/* ---- Mobile menu ---- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  })
);

/* ---- Dark mode toggle (remembers choice) ---- */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const savedTheme = localStorage.getItem('ds-theme');
if (savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeIcon.className = 'fa-solid fa-sun';
}
themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    themeIcon.className = 'fa-solid fa-moon';
    localStorage.setItem('ds-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.className = 'fa-solid fa-sun';
    localStorage.setItem('ds-theme', 'dark');
  }
});

/* ---- Scroll reveal ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  revealObserver.observe(el);
});

/* ---- Animated counters ---- */
const counters = document.querySelectorAll('.counter');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.target;
    const duration = 1800;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      el.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach((c) => countObserver.observe(c));

/* ---- FAQ accordion ---- */
document.querySelectorAll('.faq-item').forEach((item) => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach((other) => {
      other.classList.remove('open');
      other.querySelector('.faq-a').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

/* ---- 3D tilt on hero banner (follows mouse) ---- */
const bannerCard = document.getElementById('bannerCard');
if (bannerCard && window.matchMedia('(min-width:980px)').matches) {
  const maxTilt = 9;
  bannerCard.addEventListener('mousemove', (e) => {
    const r = bannerCard.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    bannerCard.style.transform =
      `perspective(900px) rotateY(${px * maxTilt}deg) rotateX(${-py * maxTilt}deg) scale(1.02)`;
  });
  bannerCard.addEventListener('mouseleave', () => {
    bannerCard.style.transform = '';
  });
}

/* ---- Contact form -> WhatsApp ---- */
function sendWhatsApp(e) {
  e.preventDefault();
  const name = document.getElementById('cfName').value.trim();
  const phone = document.getElementById('cfPhone').value.trim();
  const cls = document.getElementById('cfClass').value.trim();
  const msg = document.getElementById('cfMsg').value.trim();
  const text =
    `Hello Deepak Sir, I'd like to book a free demo class.%0A%0A` +
    `*Name:* ${name}%0A` +
    `*Phone:* ${phone}%0A` +
    (cls ? `*Class & Subject:* ${cls}%0A` : '') +
    (msg ? `*Message:* ${msg}` : '');
  window.open(`https://wa.me/919304336590?text=${text}`, '_blank');
  return false;
}
