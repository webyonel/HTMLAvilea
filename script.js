/* =============================================
   AVILEA · Interactividad
   ============================================= */

/* ---------- Catálogo con SVGs de armaduras ---------- */
const products = [
  {
    id: 1,
    name: 'Aria',
    category: 'femenino',
    catLabel: 'Femenino',
    price: 1850,
    shape: 'round',
    color: '#1c4d6e'
  },
  {
    id: 2,
    name: 'Nora',
    category: 'femenino',
    catLabel: 'Femenino',
    price: 2100,
    shape: 'cat',
    color: '#c89968'
  },
  {
    id: 3,
    name: 'Onix',
    category: 'masculino',
    catLabel: 'Masculino',
    price: 2300,
    shape: 'rect',
    color: '#0a1a26'
  },
  {
    id: 4,
    name: 'Bruno',
    category: 'masculino',
    catLabel: 'Masculino',
    price: 2450,
    shape: 'square',
    color: '#2a2a2a'
  },
  {
    id: 5,
    name: 'Lumen',
    category: 'unisex',
    catLabel: 'Unisex',
    price: 1750,
    shape: 'round',
    color: '#7a8a99'
  },
  {
    id: 6,
    name: 'Vento',
    category: 'unisex',
    catLabel: 'Unisex',
    price: 1900,
    shape: 'rimless',
    color: '#41566a'
  },
  {
    id: 7,
    name: 'Solar Aventura',
    category: 'sol',
    catLabel: 'Sol',
    price: 2200,
    shape: 'aviator',
    color: '#1c4d6e'
  },
  {
    id: 8,
    name: 'Solar Tropico',
    category: 'sol',
    catLabel: 'Sol',
    price: 1980,
    shape: 'wayfarer',
    color: '#0a1a26'
  }
];

/* ---------- Generadores SVG por forma ---------- */
const frameShapes = {
  // Round classic
  round: (color) => `
    <svg viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="60" x2="60" y2="60" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="180" y1="60" x2="220" y2="60" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="85" cy="60" r="25" fill="none" stroke="${color}" stroke-width="3.5"/>
      <circle cx="155" cy="60" r="25" fill="none" stroke="${color}" stroke-width="3.5"/>
      <path d="M110 60 Q120 58 130 60" fill="none" stroke="${color}" stroke-width="3.5"/>
    </svg>`,
  // Cat-eye
  cat: (color) => `
    <svg viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="58" x2="62" y2="50" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="178" y1="50" x2="220" y2="58" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <path d="M60 56 Q80 38 110 50 Q108 70 90 72 Q66 72 60 56 Z" fill="none" stroke="${color}" stroke-width="3.5"/>
      <path d="M180 56 Q160 38 130 50 Q132 70 150 72 Q174 72 180 56 Z" fill="none" stroke="${color}" stroke-width="3.5"/>
    </svg>`,
  // Rectangular
  rect: (color) => `
    <svg viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="60" x2="60" y2="60" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="180" y1="60" x2="220" y2="60" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <rect x="60" y="40" width="55" height="40" rx="6" fill="none" stroke="${color}" stroke-width="3.5"/>
      <rect x="125" y="40" width="55" height="40" rx="6" fill="none" stroke="${color}" stroke-width="3.5"/>
      <line x1="115" y1="60" x2="125" y2="60" stroke="${color}" stroke-width="3.5"/>
    </svg>`,
  // Square
  square: (color) => `
    <svg viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="62" x2="58" y2="62" stroke="${color}" stroke-width="4" stroke-linecap="round"/>
      <line x1="182" y1="62" x2="220" y2="62" stroke="${color}" stroke-width="4" stroke-linecap="round"/>
      <path d="M55 50 L118 48 L116 75 L60 75 Z" fill="none" stroke="${color}" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M122 48 L185 50 L180 75 L124 75 Z" fill="none" stroke="${color}" stroke-width="3.5" stroke-linejoin="round"/>
      <line x1="118" y1="62" x2="122" y2="62" stroke="${color}" stroke-width="3.5"/>
    </svg>`,
  // Rimless
  rimless: (color) => `
    <svg viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="60" x2="60" y2="60" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="180" y1="60" x2="220" y2="60" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
      <ellipse cx="85" cy="60" rx="25" ry="22" fill="rgba(28,77,110,0.04)" stroke="${color}" stroke-width="1" stroke-dasharray="2 2"/>
      <ellipse cx="155" cy="60" rx="25" ry="22" fill="rgba(28,77,110,0.04)" stroke="${color}" stroke-width="1" stroke-dasharray="2 2"/>
      <circle cx="60" cy="60" r="3" fill="${color}"/>
      <circle cx="180" cy="60" r="3" fill="${color}"/>
      <circle cx="110" cy="60" r="3" fill="${color}"/>
      <circle cx="130" cy="60" r="3" fill="${color}"/>
      <line x1="110" y1="60" x2="130" y2="60" stroke="${color}" stroke-width="2"/>
    </svg>`,
  // Aviator (sol)
  aviator: (color) => `
    <svg viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="50" x2="55" y2="55" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="185" y1="55" x2="220" y2="50" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <path d="M55 56 Q60 38 85 40 Q108 42 112 60 Q108 76 85 76 Q60 76 55 56 Z" fill="rgba(28,77,110,0.15)" stroke="${color}" stroke-width="3.5"/>
      <path d="M185 56 Q180 38 155 40 Q132 42 128 60 Q132 76 155 76 Q180 76 185 56 Z" fill="rgba(28,77,110,0.15)" stroke="${color}" stroke-width="3.5"/>
      <line x1="112" y1="52" x2="128" y2="52" stroke="${color}" stroke-width="2.5"/>
    </svg>`,
  // Wayfarer (sol)
  wayfarer: (color) => `
    <svg viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="58" x2="55" y2="55" stroke="${color}" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="185" y1="55" x2="220" y2="58" stroke="${color}" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M55 50 L110 50 L112 75 L62 75 Z" fill="rgba(10,26,38,0.7)" stroke="${color}" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M130 50 L185 50 L178 75 L128 75 Z" fill="rgba(10,26,38,0.7)" stroke="${color}" stroke-width="3.5" stroke-linejoin="round"/>
      <line x1="112" y1="62" x2="128" y2="62" stroke="${color}" stroke-width="3.5"/>
    </svg>`
};

const WA_PHONE = '5354519124';
const waLink = (model, price) => {
  const text = encodeURIComponent(
    `Hola Avilea, me interesa la armadura "${model}" (${price} MN). ¿Está disponible?`
  );
  return `https://wa.me/${WA_PHONE}?text=${text}`;
};

/* ---------- Render ---------- */
function renderCatalog(filter = 'all') {
  const grid = document.getElementById('catalog');
  if (!grid) return;
  const items = products.filter(p => filter === 'all' || p.category === filter);

  grid.innerHTML = items.map(p => `
    <article class="product-card reveal" data-cat="${p.category}">
      <div class="product-image">
        ${frameShapes[p.shape] ? frameShapes[p.shape](p.color) : ''}
      </div>
      <div class="product-body">
        <span class="product-category">${p.catLabel}</span>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-footer">
          <div class="product-price">
            <span class="label">Precio</span>
            <span><span class="currency">$</span><span class="value">${p.price.toLocaleString('es-CU')}</span> MN</span>
          </div>
          <a href="${waLink(p.name, p.price.toLocaleString('es-CU'))}"
             class="product-btn"
             target="_blank"
             rel="noopener"
             aria-label="Consultar ${p.name} por WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          </a>
        </div>
      </div>
    </article>
  `).join('');

  // animate
  requestAnimationFrame(() => {
    grid.querySelectorAll('.reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('in'), i * 60);
    });
  });
}

/* ---------- Filtros ---------- */
function setupFilters() {
  const buttons = document.querySelectorAll('.filter');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCatalog(btn.dataset.filter);
    });
  });
}

/* ---------- Navbar scroll ---------- */
function setupNavbar() {
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 24) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- Mobile menu ---------- */
function setupMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const navbar = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-links a');

  toggle?.addEventListener('click', () => {
    navbar.classList.toggle('menu-open');
  });
  links.forEach(l => l.addEventListener('click', () => navbar.classList.remove('menu-open')));
}

/* ---------- Smooth scroll for anchor links ---------- */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - 76;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });
}

/* ---------- Intersection observer for reveals ---------- */
function setupReveal() {
  const els = document.querySelectorAll('.info-row, .map-card, .section-head');
  els.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  setupFilters();
  setupNavbar();
  setupMobileMenu();
  setupSmoothScroll();
  setupReveal();
});
