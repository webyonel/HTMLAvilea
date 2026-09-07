/* =============================================
   AVILEA · Admin · JS
   ============================================= */

const ADMIN_EMAIL = 'onelmartinezv@gmail.com';
const ADMIN_PASS  = 'onelito17';
const STORAGE_KEY = 'avilea_products';

/* ---------- Catálogo inicial (mismo que el público) ---------- */
const defaultProducts = [
  { id: 'p1',  name: 'Aria',                 category: 'femenino',   price: 1850, image: 'img/espejuelos_1.webp',                shape: 'round' },
  { id: 'p2',  name: 'Nora',                 category: 'femenino',   price: 2100, image: 'img/espejuelos_2.avif',                shape: 'cat' },
  { id: 'p3',  name: 'Onix',                 category: 'masculino',  price: 2300, image: 'img/espejuelos_3.jpeg',                shape: 'rect' },
  { id: 'p4',  name: 'Bruno',                category: 'masculino',  price: 2450, image: 'img/espejuelos_4.webp',                shape: 'square' },
  { id: 'p5',  name: 'Lumen',                category: 'unisex',     price: 1750, image: 'img/espejuelos_5.jpeg',                shape: 'round' },
  { id: 'p6',  name: 'Vento',                category: 'unisex',     price: 1900, image: 'img/espejulos_6.jpeg',                 shape: 'rimless' },
  { id: 'p7',  name: 'Solar Aventura',       category: 'unisex',     price: 2200, image: 'img/espejuelos_7.jpeg',                shape: 'aviator' },
  { id: 'p8',  name: 'Solar Tropico',        category: 'unisex',     price: 1980, image: 'img/espejuelos_8.jpeg',                shape: 'wayfarer' },
  { id: 'p9',  name: 'Estuche Rígido',       category: 'accesorios', price: 450,  image: 'img/estuche%3F1.jpg',                  shape: 'case' },
  { id: 'p10', name: 'Estuche Semirrígido',  category: 'accesorios', price: 280,  image: 'img/estuche%20_2.jpeg',                shape: 'case' },
  { id: 'p12', name: 'Cordón Deportivo',     category: 'accesorios', price: 220,  image: 'img/cordon%291.webp',                  shape: 'cord' },
  { id: 'p13', name: 'Cordón de Cuero',      category: 'accesorios', price: 320,  image: 'img/cordones_2.jpeg',                   shape: 'cord' },
  { id: 'p14', name: 'Líquido Limpiador',    category: 'accesorios', price: 280,  image: 'img/producto_limpieza_lentes.webp',    shape: 'bottle' },
  { id: 'p15', name: 'Estuche de Tela',      category: 'accesorios', price: 220,  image: 'img/estuche_3.jpg',                     shape: 'case' },
  { id: 'p17', name: 'Toallitas Limpiadoras x20', category: 'accesorios', price: 320, image: 'img/productos_limpieza_lentes.jpeg', shape: 'wipes' },
  { id: 'p19', name: 'Kit de Limpieza Completo', category: 'accesorios', price: 580, image: "img/kit_limpieza_lentes%27.jpeg",     shape: 'kit' },
  { id: 'p20', name: 'Cordón con Clip',      category: 'accesorios', price: 180,  image: 'img/cordones_3.jpeg',                   shape: 'cord' }
];

/* ---------- Persistence ---------- */
function loadProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
      return [...defaultProducts];
    }
    const parsed = JSON.parse(raw);
    let dirty = false;

    // Migración 1: reclasificar productos antiguos 'sol' → 'unisex' (categoría eliminada)
    parsed.forEach(p => {
      if (p.category === 'sol') { p.category = 'unisex'; dirty = true; }
    });

    // Migración 2: añadir productos nuevos del default que aún no estén por id,
    // y rellenar imágenes en productos existentes (por si quedaron en null tras una migración anterior)
    defaultProducts.forEach(dp => {
      const existing = parsed.find(p => p.id === dp.id);
      if (!existing) {
        parsed.push({ ...dp });
        dirty = true;
      } else if (!existing.image && dp.image) {
        existing.image = dp.image;
        dirty = true;
      }
    });

    if (dirty) localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    return parsed;
  } catch (e) {
    return [...defaultProducts];
  }
}
function saveProducts(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

/* ---------- Auth ---------- */
const AUTH_KEY = 'avilea_admin_auth';
function isAuthenticated() {
  return sessionStorage.getItem(AUTH_KEY) === '1';
}
function login(email, pass) {
  if (email.trim().toLowerCase() === ADMIN_EMAIL && pass === ADMIN_PASS) {
    sessionStorage.setItem(AUTH_KEY, '1');
    return true;
  }
  return false;
}
function logout() {
  sessionStorage.removeItem(AUTH_KEY);
}

/* ---------- Toast ---------- */
function toast(message, type = 'success') {
  const wrap = document.getElementById('toastWrap');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  const icons = {
    success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    error:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
  };
  el.innerHTML = `${icons[type] || icons.success}<span>${message}</span>`;
  wrap.appendChild(el);
  setTimeout(() => {
    el.classList.add('leaving');
    setTimeout(() => el.remove(), 300);
  }, 3000);
}

/* ---------- Format ---------- */
const fmtPrice = (n) => Number(n).toLocaleString('es-CU', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
const catLabel = { femenino: 'Femenino', masculino: 'Masculino', unisex: 'Unisex', accesorios: 'Accesorios' };

/* =============================================
   LOGIN
   ============================================= */
function setupLogin() {
  const form = document.getElementById('loginForm');
  const error = document.getElementById('loginError');
  const toggle = document.getElementById('togglePass');
  const passInput = document.getElementById('loginPassword');

  toggle?.addEventListener('click', () => {
    const showing = passInput.type === 'text';
    passInput.type = showing ? 'password' : 'text';
    toggle.style.color = showing ? '' : 'var(--primary)';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const pass = passInput.value;
    if (login(email, pass)) {
      error.hidden = true;
      enterPanel();
    } else {
      error.hidden = false;
      form.classList.remove('shake');
      void form.offsetWidth;
      form.style.animation = 'none';
      setTimeout(() => form.style.animation = '', 10);
    }
  });
}

function enterPanel() {
  document.getElementById('loginScreen').hidden = true;
  document.getElementById('adminShell').hidden = false;
  bootPanel();
  window.scrollTo({ top: 0, behavior: 'instant' });
}
function exitToLogin() {
  logout();
  document.getElementById('adminShell').hidden = true;
  document.getElementById('loginScreen').hidden = false;
  document.getElementById('loginForm').reset();
}

/* =============================================
   PANEL
   ============================================= */
let products = [];
let currentImage = null;

function bootPanel() {
  products = loadProducts();
  renderAll();
  bindPanelEvents();
}

function bindPanelEvents() {
  // nav
  document.querySelectorAll('.admin-link[data-view]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      switchView(link.dataset.view);
    });
  });

  // data-go shortcuts
  document.querySelectorAll('[data-go]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      switchView(el.dataset.go);
    });
  });

  // logout
  document.getElementById('logoutBtn').addEventListener('click', () => {
    exitToLogin();
    toast('Sesión cerrada');
  });

  // sidebar mobile
  document.getElementById('sidebarToggle').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('adminShell').classList.toggle('menu-open');
  });
  document.querySelector('.admin-main')?.addEventListener('click', () => {
    document.getElementById('adminShell').classList.remove('menu-open');
  });

  // search/filter
  document.getElementById('searchProduct').addEventListener('input', renderTable);
  document.getElementById('filterCategory').addEventListener('change', renderTable);

  // form
  const form = document.getElementById('productForm');
  form.addEventListener('submit', onCreateProduct);
  document.getElementById('cancelBtn').addEventListener('click', resetForm);

  // upload
  setupUpload();
}

/* ---------- View switching ---------- */
function switchView(view) {
  document.querySelectorAll('.admin-link').forEach(l => l.classList.remove('active'));
  document.querySelector(`.admin-link[data-view="${view}"]`)?.classList.add('active');

  document.querySelectorAll('.view').forEach(v => v.hidden = v.dataset.view !== view);

  const titles = { dashboard: 'Dashboard', productos: 'Productos', nuevo: 'Nuevo producto' };
  document.getElementById('topTitle').textContent = titles[view] || 'Dashboard';

  document.getElementById('adminShell').classList.remove('menu-open');
}

/* ---------- Render all ---------- */
function renderAll() {
  renderKPIs();
  renderRecent();
  renderTable();
  updateBadges();
}

function updateBadges() {
  document.getElementById('totalBadge').textContent = products.length;
}

/* ---------- KPIs ---------- */
function renderKPIs() {
  document.getElementById('kpiTotal').textContent = products.length;
  const avg = products.length ? products.reduce((s, p) => s + Number(p.price), 0) / products.length : 0;
  document.getElementById('kpiAvg').textContent = '$' + fmtPrice(avg) + ' MN';
  const cats = new Set(products.map(p => p.category)).size;
  document.getElementById('kpiCats').textContent = cats;
  const max = products.length ? Math.max(...products.map(p => Number(p.price))) : 0;
  document.getElementById('kpiMax').textContent = '$' + fmtPrice(max) + ' MN';
}

/* ---------- Recent ---------- */
function renderRecent() {
  const list = document.getElementById('recentList');
  const recent = [...products].reverse().slice(0, 5);
  if (!recent.length) {
    list.innerHTML = '<p style="color:var(--ink-mute);font-size:14px;text-align:center;padding:24px">Sin productos todavía.</p>';
    return;
  }
  list.innerHTML = recent.map(p => `
    <div class="recent-item">
      <div class="recent-thumb">
        ${p.image ? `<img src="${p.image}" alt="${p.name}">` : fallbackThumb(p)}
      </div>
      <div class="recent-info">
        <strong>${p.name}</strong>
        <span>${catLabel[p.category] || p.category}</span>
      </div>
      <span class="recent-price">$${fmtPrice(p.price)}<small> MN</small></span>
    </div>
  `).join('');
}

function fallbackThumb(p) {
  const colors = { femenino: '#fce7f3', masculino: '#dbeafe', unisex: '#d1fae5', accesorios: '#ede9fe' };
  return `<svg viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="120" fill="${colors[p.category] || '#f6f8fb'}"/>
    <circle cx="85" cy="60" r="22" fill="none" stroke="#1c4d6e" stroke-width="3" opacity="0.4"/>
    <circle cx="155" cy="60" r="22" fill="none" stroke="#1c4d6e" stroke-width="3" opacity="0.4"/>
    <line x1="107" y1="60" x2="133" y2="60" stroke="#1c4d6e" stroke-width="3" opacity="0.4"/>
  </svg>`;
}

/* ---------- Table ---------- */
function renderTable() {
  const tbody = document.getElementById('productTableBody');
  const empty = document.getElementById('emptyState');
  const search = document.getElementById('searchProduct').value.toLowerCase();
  const cat = document.getElementById('filterCategory').value;

  const list = products.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search);
    const matchCat = cat === 'all' || p.category === cat;
    return matchSearch && matchCat;
  });

  if (!list.length) {
    tbody.innerHTML = '';
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  tbody.innerHTML = list.map(p => `
    <tr>
      <td>
        <div class="row-product">
          <div class="row-thumb">
            ${p.image ? `<img src="${p.image}" alt="${p.name}">` : fallbackThumb(p)}
          </div>
          <div>
            <span class="row-name">${escapeHtml(p.name)}</span>
            <span class="row-id">#${p.id}</span>
          </div>
        </div>
      </td>
      <td><span class="cat-chip cat-${p.category}">${catLabel[p.category] || p.category}</span></td>
      <td><span class="row-price">$${fmtPrice(p.price)}<small> MN</small></span></td>
      <td class="td-actions">
        <button class="btn-icon" title="Ver imagen" onclick="window.open('${p.image || '#'}','_blank')" ${!p.image ? 'disabled style="opacity:.3;cursor:not-allowed"' : ''}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
        <button class="btn-icon danger" title="Eliminar" data-delete="${p.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </td>
    </tr>
  `).join('');

  tbody.querySelectorAll('[data-delete]').forEach(btn => {
    btn.addEventListener('click', () => deleteProduct(btn.dataset.delete));
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* ---------- Create ---------- */
function onCreateProduct(e) {
  e.preventDefault();
  const name = document.getElementById('pName').value.trim();
  const category = document.getElementById('pCategory').value;
  const price = parseFloat(document.getElementById('pPrice').value);

  if (!name || !category || isNaN(price) || price < 0) {
    toast('Completa todos los campos correctamente', 'error');
    return;
  }

  const product = {
    id: 'p' + Date.now().toString(36),
    name,
    category,
    price,
    image: currentImage,
    shape: null
  };

  products.push(product);
  saveProducts(products);
  renderAll();
  resetForm();
  toast('Producto creado correctamente');
  switchView('productos');
}

function deleteProduct(id) {
  if (!confirm('¿Eliminar este producto?')) return;
  products = products.filter(p => p.id !== id);
  saveProducts(products);
  renderAll();
  toast('Producto eliminado');
}

function resetForm() {
  document.getElementById('productForm').reset();
  currentImage = null;
  const zone = document.getElementById('uploadZone');
  const preview = document.getElementById('uploadPreview');
  const content = document.getElementById('uploadContent');
  zone.classList.remove('has-image', 'drag');
  preview.hidden = true;
  content.hidden = false;
}

/* ---------- Upload ---------- */
function setupUpload() {
  const zone = document.getElementById('uploadZone');
  const input = document.getElementById('pImage');
  const preview = document.getElementById('uploadPreview');
  const content = document.getElementById('uploadContent');

  zone.addEventListener('click', () => input.click());

  ;['dragenter', 'dragover'].forEach(ev =>
    zone.addEventListener(ev, e => { e.preventDefault(); zone.classList.add('drag'); })
  );
  ;['dragleave', 'drop'].forEach(ev =>
    zone.addEventListener(ev, e => { e.preventDefault(); zone.classList.remove('drag'); })
  );
  zone.addEventListener('drop', e => {
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  });
  input.addEventListener('change', () => {
    if (input.files[0]) handleFile(input.files[0]);
  });

  function handleFile(file) {
    if (!file.type.startsWith('image/')) {
      toast('El archivo debe ser una imagen', 'error');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast('La imagen no debe superar 2MB', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      // Compress slightly with canvas to keep localStorage healthy
      compressImage(ev.target.result, 800, (dataUrl) => {
        currentImage = dataUrl;
        preview.src = dataUrl;
        preview.hidden = false;
        content.hidden = true;
        zone.classList.add('has-image');
        updatePreview();
      });
    };
    reader.readAsDataURL(file);
  }
}

function compressImage(src, maxW, cb) {
  const img = new Image();
  img.onload = () => {
    const ratio = Math.min(1, maxW / img.width);
    const w = img.width * ratio;
    const h = img.height * ratio;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, w, h);
    cb(canvas.toDataURL('image/jpeg', 0.85));
  };
  img.src = src;
}

/* =============================================
   INIT
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  setupLogin();
  if (isAuthenticated()) {
    enterPanel();
  }
});
