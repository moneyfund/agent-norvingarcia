// ── Estado global ──────────────────────────────────────────
let map, miniMap;
let selectedLat = null, selectedLng = null;
let miniMarker = null;
let tipo = 'venta';
let fotoBase64 = null;
let propiedades = [];
let marcadores = [];
let filtroActivo = 'todos';

// ── Iconos personalizados ───────────────────────────────────
function crearIcono(t) {
  const color = t === 'venta' ? '#185FA5' : '#BA7517';
  const label = t === 'venta' ? 'VENTA' : 'ALQUILER';
  return L.divIcon({
    className: '',
    html: `<div style="
      background:${color};
      color:#fff;
      border-radius:50px;
      padding:5px 12px;
      font-size:11px;
      font-weight:600;
      font-family:'Inter',sans-serif;
      white-space:nowrap;
      border:2px solid #fff;
      box-shadow:0 3px 10px rgba(0,0,0,0.25);
      letter-spacing:0.3px;
    ">${label}</div>`,
    iconAnchor: t === 'venta' ? [32, 14] : [42, 14]
  });
}

// ── Inicializar mapa principal ──────────────────────────────
window.addEventListener('load', () => {
  map = L.map('map', { zoomControl: true }).setView([12.8654, -85.2072], 7);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(map);

  cargarDemoData();
  actualizarContador();
  iniciarFiltros();
  iniciarModal();
});

// ── Datos de ejemplo ────────────────────────────────────────
function cargarDemoData() {
  const demos = [
    {
      lat: 12.1328, lng: -86.2954,
      tipo: 'venta', precio: 95000,
      desc: 'Casa 3 hab, 2 baños, garaje, barrio Altamira, Managua',
      tel: '+505 8888 1234', foto: null
    },
    {
      lat: 12.1483, lng: -86.3180,
      tipo: 'alquiler', precio: 600,
      desc: 'Apto moderno 2 hab, Las Colinas. Amueblado, agua y luz incluidos',
      tel: '+505 8777 5566', foto: null
    },
    {
      lat: 12.4379, lng: -86.8779,
      tipo: 'venta', precio: 45000,
      desc: 'Lote 500 m² en León, zona residencial tranquila con escritura',
      tel: '+505 8999 4422', foto: null
    },
    {
      lat: 13.0933, lng: -85.6560,
      tipo: 'alquiler', precio: 350,
      desc: 'Casa sencilla 2 hab cerca del mercado central de Juigalpa',
      tel: '+505 8654 3210', foto: null
    },
    {
      lat: 12.9196, lng: -85.9194,
      tipo: 'venta', precio: 130000,
      desc: 'Casa grande 4 hab, piscina, jardín. Boaco, zona residencial',
      tel: '+505 8123 9900', foto: null
    },
    {
      lat: 11.9928, lng: -86.0942,
      tipo: 'alquiler', precio: 280,
      desc: 'Habitación con baño propio en Granada, cerca del parque central',
      tel: '+505 8345 6780', foto: null
    }
  ];

  demos.forEach(p => {
    propiedades.push(p);
    const m = agregarMarcador(p);
    marcadores.push({ data: p, marker: m });
  });
}

// ── Agregar marcador al mapa ────────────────────────────────
function agregarMarcador(p) {
  const icon = crearIcono(p.tipo);
  const marker = L.marker([p.lat, p.lng], { icon }).addTo(map);

  const unidad = p.tipo === 'alquiler' ? '/mes' : '';
  const badgeClass = p.tipo === 'venta' ? 'badge-venta' : 'badge-alquiler';
  const label = p.tipo === 'venta' ? 'Venta' : 'Alquiler';
  const imgHTML = p.foto
    ? `<img src="${p.foto}" alt="Propiedad" />`
    : '';
  const waLink = p.tel.replace(/\s+/g, '').replace('+', '');

  marker.bindPopup(`
    <div class="popup-card">
      ${imgHTML}
      <span class="popup-badge ${badgeClass}">${label}</span>
      <div class="popup-precio">$${Number(p.precio).toLocaleString()}${unidad}</div>
      <div class="popup-desc">${p.desc}</div>
      <div class="popup-tel">
        📞 <a href="https://wa.me/${waLink}" target="_blank">${p.tel}</a>
      </div>
    </div>
  `, { maxWidth: 240 });

  return marker;
}

// ── Filtros ────────────────────────────────────────────────
function iniciarFiltros() {
  document.querySelectorAll('.filtro').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filtro').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filtroActivo = btn.dataset.tipo;
      aplicarFiltro();
    });
  });
}

function aplicarFiltro() {
  marcadores.forEach(({ data, marker }) => {
    if (filtroActivo === 'todos' || data.tipo === filtroActivo) {
      map.addLayer(marker);
    } else {
      map.removeLayer(marker);
    }
  });
}

// ── Modal ─────────────────────────────────────────────────
function iniciarModal() {
  document.getElementById('btnAbrir').addEventListener('click', abrirModal);
  document.getElementById('btnCerrar').addEventListener('click', cerrarModal);
  document.getElementById('btnCancelar').addEventListener('click', cerrarModal);

  document.getElementById('foto').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      fotoBase64 = e.target.result;
      const img = document.getElementById('preview-img');
      img.src = fotoBase64;
      img.style.display = 'block';
      document.getElementById('upload-label').textContent = '✓ Foto seleccionada';
    };
    reader.readAsDataURL(file);
  });
}

function abrirModal() {
  document.getElementById('overlay').classList.add('visible');
  setTimeout(() => {
    if (!miniMap) {
      miniMap = L.map('mini-map', {
        zoomControl: false,
        attributionControl: false
      }).setView([12.8654, -85.2072], 6);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(miniMap);

      miniMap.on('click', function (e) {
        selectedLat = e.latlng.lat;
        selectedLng = e.latlng.lng;
        if (miniMarker) miniMap.removeLayer(miniMarker);
        miniMarker = L.marker([selectedLat, selectedLng]).addTo(miniMap);
        document.getElementById('map-hint').textContent = '✓ Ubicación seleccionada';
        document.getElementById('map-hint').className = 'map-hint ok';
      });
    } else {
      miniMap.invalidateSize();
    }
  }, 120);
}

function cerrarModal() {
  document.getElementById('overlay').classList.remove('visible');
  resetForm();
}

function resetForm() {
  selectedLat = null;
  selectedLng = null;
  fotoBase64 = null;
  if (miniMarker) { miniMap.removeLayer(miniMarker); miniMarker = null; }
  document.getElementById('map-hint').textContent = '📍 Toca el mapa para seleccionar la ubicación';
  document.getElementById('map-hint').className = 'map-hint';
  document.getElementById('precio').value = '';
  document.getElementById('descripcion').value = '';
  document.getElementById('telefono').value = '';
  document.getElementById('foto').value = '';
  document.getElementById('preview-img').style.display = 'none';
  document.getElementById('upload-label').textContent = '📷 Seleccionar foto';
  setTipo('venta');
}

// ── Tipo venta / alquiler ──────────────────────────────────
function setTipo(t) {
  tipo = t;
  document.getElementById('btn-venta').className = 'tipo-btn' + (t === 'venta' ? ' active' : '');
  document.getElementById('btn-alquiler').className = 'tipo-btn' + (t === 'alquiler' ? ' active' : '');
}

// ── Publicar ───────────────────────────────────────────────
function publicar() {
  if (!selectedLat || !selectedLng) {
    mostrarToast('⚠️ Selecciona una ubicación en el mapa');
    return;
  }
  const precio = document.getElementById('precio').value.trim();
  const desc = document.getElementById('descripcion').value.trim();
  const tel = document.getElementById('telefono').value.trim();

  if (!precio || !desc || !tel) {
    mostrarToast('⚠️ Completa todos los campos requeridos');
    return;
  }

  const p = { lat: selectedLat, lng: selectedLng, tipo, precio, desc, tel, foto: fotoBase64 };
  propiedades.push(p);
  const m = agregarMarcador(p);
  marcadores.push({ data: p, marker: m });

  if (filtroActivo !== 'todos' && filtroActivo !== p.tipo) {
    map.removeLayer(m);
  }

  map.setView([selectedLat, selectedLng], 14);
  cerrarModal();
  actualizarContador();
  mostrarToast('✓ Propiedad publicada correctamente');
}

// ── Contador ───────────────────────────────────────────────
function actualizarContador() {
  const total = propiedades.length;
  document.getElementById('contador').textContent =
    total === 1 ? '1 propiedad' : `${total} propiedades`;
}

// ── Toast ──────────────────────────────────────────────────
function mostrarToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
