/* ============================================================
   LUMIÈRE BEAUTY — Main JavaScript
   ============================================================ */

// ---------- Navbar ----------
const navbar  = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveLink();
});

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ---------- Active nav link on scroll ----------
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = navMenu.querySelector(`[href="#${id}"]`);

    if (link) {
      link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
    }
  });
}

// ---------- Scroll animations (lightweight AOS alternative) ----------
const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.aosDelay || 0;
      setTimeout(() => {
        entry.target.classList.add('aos-animate');
      }, parseInt(delay));
      aosObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-aos]').forEach(el => aosObserver.observe(el));

// ---------- Product filter ----------
const filterBtns   = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    productCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.opacity = '0';
      card.style.transform = 'scale(0.95)';

      setTimeout(() => {
        card.classList.toggle('hidden', !match);
        if (match) {
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          });
        }
      }, 200);
    });
  });
});

// Ensure smooth transition on cards
productCards.forEach(card => {
  card.style.transition = 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease';
});

// ---------- Contact form ----------
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.textContent;

  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Simulate async submission
  setTimeout(() => {
    contactForm.innerHTML = `
      <div class="form-success show">
        <div class="success-icon">✨</div>
        <h3>Message Sent!</h3>
        <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
      </div>
    `;
  }, 1200);
});

// ---------- Smooth scroll for anchor links ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 16;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

// ---------- Initial call ----------
updateActiveLink();
