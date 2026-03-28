/* ════════════════════════════════════════
   PAGE LOADER
════════════════════════════════════════ */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('done');
  }, 1200);
});


/* ════════════════════════════════════════
   CUSTOM CURSOR
════════════════════════════════════════ */
const cur  = document.getElementById('cur');
const curT = document.getElementById('curT');

let mx = 0, my = 0; // mouse position
let tx = 0, ty = 0; // trail position (lagged)

// Move main cursor instantly with mouse
document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

// Laggy trail using RAF loop
(function loop() {
  tx += (mx - tx) * 0.18;
  ty += (my - ty) * 0.18;
  curT.style.left = tx + 'px';
  curT.style.top  = ty + 'px';
  requestAnimationFrame(loop);
})();

// Morph cursor to pill on interactive elements
document.querySelectorAll('a, button, .pill, .pj-tg, .edp-pill').forEach(el => {
  el.addEventListener('mouseenter', () => cur.classList.add('pill'));
  el.addEventListener('mouseleave', () => cur.classList.remove('pill'));
});


/* ════════════════════════════════════════
   PARALLAX ORBS — Mouse Move
════════════════════════════════════════ */
document.addEventListener('mousemove', e => {
  const cx = (e.clientX / window.innerWidth  - 0.5);
  const cy = (e.clientY / window.innerHeight - 0.5);

  document.querySelectorAll('.orb').forEach((orb, i) => {
    const speed = ((i % 5) + 1) * 6;
    const rect  = orb.closest('section')?.getBoundingClientRect();

    // Only move orbs in visible sections
    if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
      orb.style.transform = `translate(${cx * speed}px, ${cy * speed}px)`;
    }
  });
});


/* ════════════════════════════════════════
   SCROLL REVEAL
════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('vis'), i * 80);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.rev, .rev-l, .rev-r, .rev-s').forEach(el => {
  revealObserver.observe(el);
});


/* ════════════════════════════════════════
   SKILL BAR ANIMATION
════════════════════════════════════════ */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Animate each skill bar width from 0 to its data-w value
      entry.target.querySelectorAll('.sk-f').forEach(bar => {
        const targetWidth = bar.dataset.w;
        bar.style.width = '0';
        setTimeout(() => { bar.style.width = targetWidth; }, 400);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);


/* ════════════════════════════════════════
   3D CARD TILT
════════════════════════════════════════ */
document.querySelectorAll('.tilt3d').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const cx   = (e.clientX - rect.left) / rect.width  - 0.5;
    const cy   = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateX(${-cy * 12}deg) rotateY(${cx * 12}deg) scale(1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


/* ════════════════════════════════════════
   MAGNETIC BUTTONS
════════════════════════════════════════ */
document.querySelectorAll('.btn-dark, .btn-soft, .btn-orange, .n-cta, .soc').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const dx   = e.clientX - (rect.left + rect.width  / 2);
    const dy   = e.clientY - (rect.top  + rect.height / 2);
    btn.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px) scale(1.06)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});


/* ════════════════════════════════════════
   NAV — Scroll Style Change
════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  const scrolled = window.scrollY > 60;

  nav.style.background  = scrolled ? 'rgba(240,232,222,0.96)' : 'rgba(240,232,222,0.82)';
  nav.style.boxShadow   = scrolled
    ? '0 4px 24px rgba(180,140,110,0.16)'
    : '0 2px 20px rgba(180,140,110,0.1)';
});


/* ════════════════════════════════════════
   EXPERIENCE TABS
════════════════════════════════════════ */
const expData = [
  {
    co:    'Self Learning',
    role:  '// Frontend Development',
    per:   '📅 2023 – Present · Ongoing',
    desc:  'Started my development journey learning HTML, CSS and JavaScript from scratch. Focused on building real-world projects to solidify concepts and gain hands-on experience.',
    items: [
      'Mastered core frontend technologies — HTML5, CSS3, JavaScript ES6+',
      'Built responsive websites with mobile-first design approach',
      'Learned React fundamentals — components, hooks, state management',
      'Practiced DOM manipulation through 10+ mini JavaScript projects'
    ],
    pills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Responsive Design']
  },
  {
    co:    'Open Source',
    role:  '// GitHub Projects',
    per:   '📅 2024 – Present · Active',
    desc:  'Actively contributing to open source by building and sharing public projects on GitHub. Exploring codebases, learning collaborative workflows, and preparing for hackathons.',
    items: [
      'Published 14+ repositories on GitHub covering various web projects',
      'Most starred project — Coffee Website — received 3 stars and 6 forks',
      'Learning how to write readable, maintainable open-source code',
      'Exploring MLH programs and beginner-friendly contribution opportunities'
    ],
    pills: ['Git', 'GitHub', 'Open Source', 'HTML', 'CSS', 'JavaScript']
  },
  {
    co:    'Freelance / Projects',
    role:  '// Web Developer',
    per:   '📅 2024 – Present · Building',
    desc:  'Working on client and personal projects to sharpen real-world development skills. Delivering responsive, performant web applications from concept to deployment.',
    items: [
      'Built Auraa — a fully responsive e-commerce website deployed on Netlify',
      'Created Restaurant Web — open-source project with clean UI/UX',
      'Designed and developed Coffee Website with modern dark theme & animations',
      'Focused on clean code, performance and cross-browser compatibility'
    ],
    pills: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Netlify', 'GitHub Pages']
  }
];

/**
 * Switches the active experience tab and updates the detail panel.
 * @param {number} index - Index of the tab to show (0, 1, or 2)
 */
function selExp(index) {
  // Toggle active class on tabs
  document.querySelectorAll('.exp-tab').forEach((tab, i) => {
    tab.classList.toggle('active', i === index);
  });

  const data  = expData[index];
  const panel = document.getElementById('epanel');

  // Animate out
  panel.style.opacity   = '0';
  panel.style.transform = 'translateY(14px) scale(0.97)';

  setTimeout(() => {
    // Build items HTML
    const itemsHTML = data.items
      .map(item => `<li>${item}</li>`)
      .join('');

    // Build pills HTML
    const pillsHTML = data.pills
      .map(pill => `<span class="edp-pill">${pill}</span>`)
      .join('');

    panel.innerHTML = `
      <div class="edp-co">${data.co}</div>
      <div class="edp-role">${data.role}</div>
      <div class="edp-per">${data.per}</div>
      <p class="edp-desc">${data.desc}</p>
      <ul class="edp-ul">${itemsHTML}</ul>
      <div class="edp-pills">${pillsHTML}</div>
    `;

    // Stagger list item animations
    panel.querySelectorAll('.edp-ul li').forEach((li, j) => {
      li.style.animationDelay = `${j * 0.1}s`;
    });

    // Animate in
    panel.style.opacity   = '1';
    panel.style.transform = 'translateY(0) scale(1)';
  }, 250);
}

// Set panel transition and show first tab by default
document.getElementById('epanel').style.transition = 'all 0.4s cubic-bezier(.23,1,.32,1)';


/* ════════════════════════════════════════
   COUNTER ANIMATION — Scroll Triggered
════════════════════════════════════════ */

/**
 * Animates a number from 0 to target.
 * @param {HTMLElement} el     - Element to update
 * @param {number}      target - Final number value
 * @param {string}      suffix - Appended suffix e.g. '+' or '%'
 */
function animateCount(el, target, suffix = '') {
  let current = 0;
  const duration = 1800;
  const stepTime  = duration / target;

  const timer = setInterval(() => {
    current++;
    el.textContent = current + suffix;
    if (current >= target) clearInterval(timer);
  }, stepTime);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.hsv').forEach(el => {
        const text = el.textContent;
        if (text.includes('+'))      animateCount(el, parseInt(text), '+');
        else if (text.includes('%')) animateCount(el, parseInt(text), '%');
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.hc-stats');
if (statsEl) statsObserver.observe(statsEl);
