// app.js — NICASA con Firebase
// Espera a que firebase-init.js exponga window.NICASA_FB

let map, miniMap, miniMarker;
let selectedLat = null, selectedLng = null;
let tipo = 'venta';
let plan = 'gratis';
let fotoFile = null;
let fotoBase64 = null;
let marcadores = {};   // id -> leaflet marker
let filtroActivo = 'todos';
let currentUser = null;
let userPubCount = 0;
const LIMITE_GRATIS = 3;

// ── Esperar Firebase ────────────────────────────────────────
function esperarFirebase(cb) {
  if (window.NICASA_FB) { cb(window.NICASA_FB); return; }
  setTimeout(() => esperarFirebase(cb), 100);
}

// ── Init ────────────────────────────────────────────────────
window.addEventListener('load', () => {
  esperarFirebase(({ auth, onAuthStateChanged }) => {
    onAuthStateChanged(auth, user => {
      if (user) {
        currentUser = user;
        mostrarApp();
      } else {
        currentUser = null;
        mostrarLogin();
      }
    });

    // Botón Google login
    document.getElementById('btnGoogle').addEventListener('click', () => {
      const { signInWithPopup, provider } = window.NICASA_FB;
      signInWithPopup(auth, provider).catch(err => {
        mostrarToast('❌ Error al iniciar sesión: ' + err.message);
      });
    });

    // Avatar → logout
    document.getElementById('userAvatar').addEventListener('click', () => {
      if (confirm('¿Cerrar sesión?')) {
        window.NICASA_FB.signOut(auth);
      }
    });
  });
});

// ── Mostrar login / app ─────────────────────────────────────
function mostrarLogin() {
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('app').style.display = 'none';
}

function mostrarApp() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app').style.display = 'block';

  // Foto de perfil
  if (currentUser.photoURL) {
    document.getElementById('userPhoto').src = currentUser.photoURL;
  }

  if (!map) iniciarMapa();
  iniciarModal();
  iniciarFiltros();
  escucharPropiedades();
  contarMisPubs();
}

// ── Mapa ────────────────────────────────────────────────────
function iniciarMapa() {
  map = L.map('map', { zoomControl: true }).setView([12.8654, -85.2072], 7);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(map);
}

// ── Escuchar Firestore en tiempo real ───────────────────────
function escucharPropiedades() {
  const { db, collection, onSnapshot, query, orderBy } = window.NICASA_FB;
  const q = query(collection(db, 'propiedades'), orderBy('creadoEn', 'desc'));

  onSnapshot(q, snapshot => {
    snapshot.docChanges().forEach(change => {
      const id = change.doc.id;
      const p  = { id, ...change.doc.data() };

      if (change.type === 'added') {
        const m = agregarMarcador(p);
        marcadores[id] = { data: p, marker: m };
        aplicarFiltroSolo(id);
      }
      if (change.type === 'removed' && marcadores[id]) {
        map.removeLayer(marcadores[id].marker);
        delete marcadores[id];
      }
    });
    actualizarContador();
  });
}

// ── Contar publicaciones del usuario ───────────────────────
async function contarMisPubs() {
  const { db, collection, query, where, getDocs } = window.NICASA_FB;
  const q = query(
    collection(db, 'propiedades'),
    where('uid', '==', currentUser.uid),
    where('plan', '==', 'gratis')
  );
  const snap = await getDocs(q);
  userPubCount = snap.size;
}

// ── Icono marcador ─────────────────────────────────────────
function crearIcono(p) {
  const isVenta     = p.tipo === 'venta';
  const isVerif     = p.plan === 'verificado';
  const bg          = isVenta ? '#1565c0' : '#e65100';
  const label       = isVenta ? 'VENTA' : 'ALQUILER';
  const precioFmt   = Number(p.precio).toLocaleString();
  const estrella    = isVerif ? '<span style="margin-right:3px">⭐</span>' : '';
  const border      = isVerif ? '2.5px solid #ffd93d' : '2.5px solid #fff';
  const shadow      = isVerif
    ? '0 3px 14px rgba(255,217,61,0.5), 0 2px 6px rgba(0,0,0,0.2)'
    : '0 3px 10px rgba(0,0,0,0.22)';

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
      border:${border};
      box-shadow:${shadow};
      letter-spacing:0.4px;
      display:flex;align-items:center;gap:4px;
    ">${estrella}<span style="font-size:9px;opacity:0.8">${label}</span> $${precioFmt}</div>`,
    iconAnchor: [55, 14]
  });
}

// ── Agregar marcador ────────────────────────────────────────
function agregarMarcador(p) {
  const icon   = crearIcono(p);
  const marker = L.marker([p.lat, p.lng], { icon }).addTo(map);

  const unidad     = p.tipo === 'alquiler' ? '<span style="font-size:12px;color:#888">/mes</span>' : '';
  const badgeClass = p.tipo === 'venta' ? 'badge-venta' : 'badge-alquiler';
  const badgeLabel = p.tipo === 'venta' ? '🏷️ Venta' : '🔑 Alquiler';
  const verifBadge = p.plan === 'verificado'
    ? '<div class="popup-verif">⭐ Propiedad Verificada NICASA</div>' : '';
  const imgHTML    = p.fotoURL ? `<img src="${p.fotoURL}" alt="Propiedad" />` : '';
  const waLink     = (p.telefono || '').replace(/\s+/g, '').replace('+', '');
  const tipoProp   = p.tipoProp ? `<div class="popup-tipo">📌 ${p.tipoProp}</div>` : '';
  const userName   = p.userName ? `<div class="popup-usuario">👤 ${p.userName}</div>` : '';

  marker.bindPopup(`
    <div class="popup-card">
      ${imgHTML}
      ${verifBadge}
      <span class="popup-badge ${badgeClass}">${badgeLabel}</span>
      <div class="popup-precio">$${Number(p.precio).toLocaleString()}${unidad}</div>
      ${tipoProp}
      <div class="popup-desc">${p.descripcion || ''}</div>
      ${userName}
      <div class="popup-tel">
        <a href="https://wa.me/${waLink}" target="_blank">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          ${p.telefono}
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
      Object.keys(marcadores).forEach(id => aplicarFiltroSolo(id));
    });
  });
}

function aplicarFiltroSolo(id) {
  const { data, marker } = marcadores[id];
  const visible =
    filtroActivo === 'todos' ||
    (filtroActivo === 'verificado' && data.plan === 'verificado') ||
    (filtroActivo !== 'verificado' && data.tipo === filtroActivo);
  visible ? map.addLayer(marker) : map.removeLayer(marker);
}

// ── Modal ──────────────────────────────────────────────────
function iniciarModal() {
  document.getElementById('btnAbrir').addEventListener('click', abrirModal);
  document.getElementById('btnCerrar').addEventListener('click', cerrarModal);
  document.getElementById('btnCancelar').addEventListener('click', cerrarModal);
  document.getElementById('overlay').addEventListener('click', e => {
    if (e.target.id === 'overlay') cerrarModal();
  });

  document.getElementById('foto').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;
    fotoFile = file;
    const reader = new FileReader();
    reader.onload = e => {
      fotoBase64 = e.target.result;
      document.getElementById('preview-img').src = fotoBase64;
      document.getElementById('preview-img').style.display = 'block';
      document.getElementById('upload-label').innerHTML =
        `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span>Foto lista</span>`;
    };
    reader.readAsDataURL(file);
  });
}

function abrirModal() {
  // Verificar límite
  if (userPubCount >= LIMITE_GRATIS && plan === 'gratis') {
    document.getElementById('limiteBanner').style.display = 'block';
    document.getElementById('modalBody').style.opacity = '0.4';
    document.getElementById('modalBody').style.pointerEvents = 'none';
    document.getElementById('btnPublicar').disabled = true;
  }
  document.getElementById('overlay').classList.add('visible');
  setTimeout(() => {
    if (!miniMap) {
      miniMap = L.map('mini-map', { zoomControl: false, attributionControl: false })
        .setView([12.8654, -85.2072], 6);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(miniMap);
      miniMap.on('click', e => {
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
  document.getElementById('limiteBanner').style.display = 'none';
  document.getElementById('modalBody').style.opacity = '1';
  document.getElementById('modalBody').style.pointerEvents = 'auto';
  document.getElementById('btnPublicar').disabled = false;
  resetForm();
}

function resetForm() {
  selectedLat = null; selectedLng = null; fotoFile = null; fotoBase64 = null;
  if (miniMarker) { miniMap.removeLayer(miniMarker); miniMarker = null; }
  document.getElementById('map-hint').innerHTML = '<span>📍</span> Toca el mapa para marcar la propiedad';
  document.getElementById('map-hint').className = 'map-hint';
  document.getElementById('precio').value = '';
  document.getElementById('descripcion').value = '';
  document.getElementById('telefono').value = '';
  document.getElementById('foto').value = '';
  document.getElementById('preview-img').style.display = 'none';
  document.getElementById('upload-label').innerHTML =
    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg><span>Seleccionar foto</span>`;
  setTipo('venta');
  setPlan('gratis');
}

window.setTipo = function(t) {
  tipo = t;
  document.getElementById('btn-venta').className   = 'tipo-btn' + (t === 'venta'    ? ' active' : '');
  document.getElementById('btn-alquiler').className = 'tipo-btn' + (t === 'alquiler' ? ' active' : '');
};

window.setPlan = function(p) {
  plan = p;
  document.getElementById('btn-gratis').className    = 'plan-btn' + (p === 'gratis'     ? ' active' : '');
  document.getElementById('btn-verificado').className = 'plan-btn premium' + (p === 'verificado' ? ' active' : '');
  document.getElementById('verificadoInfo').style.display = p === 'verificado' ? 'block' : 'none';
};

// ── Publicar ───────────────────────────────────────────────
window.publicar = async function() {
  if (!selectedLat || !selectedLng) { mostrarToast('⚠️ Selecciona la ubicación en el mapa'); return; }
  const precio     = document.getElementById('precio').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();
  const telefono   = document.getElementById('telefono').value.trim();
  const tipoProp   = document.getElementById('tipo-prop').value;

  if (!precio || !descripcion || !telefono) { mostrarToast('⚠️ Completa los campos requeridos'); return; }
  if (plan === 'gratis' && userPubCount >= LIMITE_GRATIS) { mostrarToast('⚠️ Límite de publicaciones gratuitas alcanzado'); return; }

  const btn = document.getElementById('btnPublicar');
  btn.textContent = 'Publicando...';
  btn.disabled = true;

  try {
    const { db, storage, collection, addDoc, ref, uploadBytes, getDownloadURL } = window.NICASA_FB;

    // Subir foto si existe
    let fotoURL = null;
    if (fotoFile) {
      const storageRef = ref(storage, `propiedades/${currentUser.uid}/${Date.now()}_${fotoFile.name}`);
      const snap = await uploadBytes(storageRef, fotoFile);
      fotoURL = await getDownloadURL(snap.ref);
    }

    // Guardar en Firestore
    await addDoc(collection(db, 'propiedades'), {
      lat: selectedLat,
      lng: selectedLng,
      tipo,
      plan,
      precio: Number(precio),
      tipoProp,
      descripcion,
      telefono,
      fotoURL,
      uid: currentUser.uid,
      userName: currentUser.displayName,
      userEmail: currentUser.email,
      userPhoto: currentUser.photoURL,
      creadoEn: new Date()
    });

    if (plan === 'gratis') userPubCount++;
    map.setView([selectedLat, selectedLng], 14);
    cerrarModal();
    actualizarContador();
    mostrarToast('🏡 ¡Propiedad publicada! Ya es visible para todos.');

  } catch (err) {
    console.error(err);
    mostrarToast('❌ Error al publicar: ' + err.message);
  } finally {
    btn.innerHTML = 'Publicar propiedad <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>';
    btn.disabled = false;
  }
};

// ── Contador ───────────────────────────────────────────────
function actualizarContador() {
  document.getElementById('num').textContent = Object.keys(marcadores).length;
}

// ── Toast ──────────────────────────────────────────────────
function mostrarToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}
