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
function crearIcono(t, precio) {
  const isVenta = t === 'venta';
  const bg = isVenta ? '#1565c0' : '#e65100';
  const label = isVenta ? 'VENTA' : 'ALQUILER';
  const precioFmt = Number(precio).toLocaleString();
  return L.divIcon({
    className: '',
    html: `<div style="
      background:${bg};
      color:#fff;
      border-radius:50px;
      padding:5px 13px;
      font-size:11px;
      font-weight:700;
      font-family:'DM Sans',sans-serif;
      white-space:nowrap;
      border:2.5px solid #fff;
      box-shadow:0 3px 12px rgba(0,0,0,0.25);
      letter-spacing:0.5px;
      display:flex;
      align-items:center;
      gap:5px;
    "><span style="font-size:9px;opacity:0.85">${label}</span> $${precioFmt}</div>`,
    iconAnchor: isVenta ? [50, 14] : [60, 14]
  });
}

// ── Inicializar mapa principal ──────────────────────────────
window.addEventListener('load', () => {
  map = L.map('map', {
    zoomControl: true,
    attributionControl: true
  }).setView([12.8654, -85.2072], 7);

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
    { lat: 12.1328, lng: -86.2954, tipo: 'venta',    precio: 95000,  tipoProp: 'Casa',        desc: 'Casa 3 hab, 2 baños, garaje. Barrio Altamira, Managua.', tel: '+505 8888 1234', foto: null },
    { lat: 12.1483, lng: -86.3180, tipo: 'alquiler', precio: 600,    tipoProp: 'Apartamento', desc: 'Apto moderno 2 hab, Las Colinas. Amueblado, agua incluida.', tel: '+505 8777 5566', foto: null },
    { lat: 12.4379, lng: -86.8779, tipo: 'venta',    precio: 45000,  tipoProp: 'Terreno',     desc: 'Lote 500 m² en León, zona residencial. Con escritura.', tel: '+505 8999 4422', foto: null },
    { lat: 13.0933, lng: -85.6560, tipo: 'alquiler', precio: 350,    tipoProp: 'Casa',        desc: 'Casa sencilla 2 hab cerca del mercado central de Juigalpa.', tel: '+505 8654 3210', foto: null },
    { lat: 12.9196, lng: -85.9194, tipo: 'venta',    precio: 130000, tipoProp: 'Casa',        desc: 'Casa 4 hab, piscina, jardín amplio. Boaco, zona residencial.', tel: '+505 8123 9900', foto: null },
    { lat: 11.9928, lng: -86.0942, tipo: 'alquiler', precio: 280,    tipoProp: 'Apartamento', desc: 'Habitación con baño propio en Granada, cerca del parque central.', tel: '+505 8345 6780', foto: null },
    { lat: 12.9246, lng: -85.9175, tipo: 'venta',    precio: 38000,  tipoProp: 'Finca',       desc: 'Finca 2 manzanas con árboles frutales. Agua propia. Matagalpa.', tel: '+505 8900 1122', foto: null },
  ];

  demos.forEach(p => {
    propiedades.push(p);
    const m = agregarMarcador(p);
    marcadores.push({ data: p, marker: m });
  });
}

// ── Agregar marcador al mapa ────────────────────────────────
function agregarMarcador(p) {
  const icon = crearIcono(p.tipo, p.precio);
  const marker = L.marker([p.lat, p.lng], { icon }).addTo(map);

  const unidad = p.tipo === 'alquiler' ? '<span style="font-size:13px;color:#888">/mes</span>' : '';
  const badgeClass = p.tipo === 'venta' ? 'badge-venta' : 'badge-alquiler';
  const badgeLabel = p.tipo === 'venta' ? '🏷️ Venta' : '🔑 Alquiler';
  const imgHTML = p.foto ? `<img src="${p.foto}" alt="Propiedad" />` : '';
  const waLink = p.tel.replace(/\s+/g, '').replace('+', '');
  const tipoPropHTML = p.tipoProp ? `<div class="popup-tipo">📌 ${p.tipoProp}</div>` : '';

  marker.bindPopup(`
    <div class="popup-card">
      ${imgHTML}
      <span class="popup-badge ${badgeClass}">${badgeLabel}</span>
      <div class="popup-precio">$${Number(p.precio).toLocaleString()}${unidad}</div>
      ${tipoPropHTML}
      <div class="popup-desc">${p.desc}</div>
      <div class="popup-tel">
        <a href="https://wa.me/${waLink}" target="_blank">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          ${p.tel}
        </a>
      </div>
    </div>
  `, { maxWidth: 250 });

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

// ── Modal ──────────────────────────────────────────────────
function iniciarModal() {
  document.getElementById('btnAbrir').addEventListener('click', abrirModal);
  document.getElementById('btnCerrar').addEventListener('click', cerrarModal);
  document.getElementById('btnCancelar').addEventListener('click', cerrarModal);

  document.getElementById('overlay').addEventListener('click', function(e) {
    if (e.target === this) cerrarModal();
  });

  document.getElementById('foto').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      fotoBase64 = e.target.result;
      const img = document.getElementById('preview-img');
      img.src = fotoBase64;
      img.style.display = 'block';
      document.getElementById('upload-label').innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        <span>Foto seleccionada</span>`;
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

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(miniMap);

      miniMap.on('click', function (e) {
        selectedLat = e.latlng.lat;
        selectedLng = e.latlng.lng;
        if (miniMarker) miniMap.removeLayer(miniMarker);
        miniMarker = L.marker([selectedLat, selectedLng]).addTo(miniMap);
        document.getElementById('map-hint').innerHTML = '<span>✅</span> Ubicación seleccionada';
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
  selectedLat = null; selectedLng = null; fotoBase64 = null;
  if (miniMarker) { miniMap.removeLayer(miniMarker); miniMarker = null; }
  document.getElementById('map-hint').innerHTML = '<span>📍</span> Toca el mapa para marcar la propiedad';
  document.getElementById('map-hint').className = 'map-hint';
  document.getElementById('precio').value = '';
  document.getElementById('descripcion').value = '';
  document.getElementById('telefono').value = '';
  document.getElementById('foto').value = '';
  document.getElementById('preview-img').style.display = 'none';
  document.getElementById('upload-label').innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>
    <span>Seleccionar foto</span>`;
  setTipo('venta');
}

function setTipo(t) {
  tipo = t;
  document.getElementById('btn-venta').className = 'tipo-btn' + (t === 'venta' ? ' active' : '');
  document.getElementById('btn-alquiler').className = 'tipo-btn' + (t === 'alquiler' ? ' active' : '');
}

// ── Publicar ───────────────────────────────────────────────
function publicar() {
  if (!selectedLat || !selectedLng) { mostrarToast('⚠️ Selecciona una ubicación en el mapa'); return; }
  const precio = document.getElementById('precio').value.trim();
  const desc = document.getElementById('descripcion').value.trim();
  const tel = document.getElementById('telefono').value.trim();
  const tipoProp = document.getElementById('tipo-prop').value;

  if (!precio || !desc || !tel) { mostrarToast('⚠️ Completa todos los campos requeridos'); return; }

  const p = { lat: selectedLat, lng: selectedLng, tipo, precio, tipoProp, desc, tel, foto: fotoBase64 };
  propiedades.push(p);
  const m = agregarMarcador(p);
  marcadores.push({ data: p, marker: m });

  if (filtroActivo !== 'todos' && filtroActivo !== p.tipo) map.removeLayer(m);

  map.setView([selectedLat, selectedLng], 14);
  cerrarModal();
  actualizarContador();
  mostrarToast('🏡 Propiedad publicada correctamente');
}

// ── Contador ───────────────────────────────────────────────
function actualizarContador() {
  document.getElementById('num').textContent = propiedades.length;
}

// ── Toast ──────────────────────────────────────────────────
function mostrarToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}
