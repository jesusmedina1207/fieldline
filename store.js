// Datos compartidos entre index.html (cliente) y admin.html (administración)
const KEY = 'tienda_fieldline_v2';
const CATS = { sudadera: 'Sudaderas', playera: 'Playeras', zapato: 'Zapatos' };
const DEFAULTS = {
  config: {
    nombre: 'FIELDLINE',
    eslogan: 'Streetwear · Sudaderas · Playeras · Zapatos',
    anuncio: 'Info por DM o WhatsApp · Envíos a todo México',
    whatsapp: '5214420000000',
    instagram: 'fieldline_2',
    color: '#ece8da'
  },
  slides: [
    { id: 1, titulo: 'Nuevo drop', subtitulo: 'Sudaderas con zipper y capucha', imagen: '', boton: 'Ver sudaderas', categoria: 'sudadera' },
    { id: 2, titulo: 'Playeras oversize', subtitulo: 'Cortes holgados, colores que se notan', imagen: '', boton: 'Ver playeras', categoria: 'playera' },
    { id: 3, titulo: 'Camina diferente', subtitulo: 'Zapatos para todos los días', imagen: '', boton: 'Ver zapatos', categoria: 'zapato' }
  ],
  productos: [
    { id: 11, categoria: 'sudadera', nombre: 'Hoodie Zip Negro', precio: 0, descripcion: 'Info por DM.', imagen: '' },
    { id: 12, categoria: 'sudadera', nombre: 'Hoodie Zip Azul', precio: 0, descripcion: 'Info por DM.', imagen: '' },
    { id: 13, categoria: 'playera', nombre: 'Playera Oversize Negra', precio: 0, descripcion: 'Info por DM.', imagen: '' },
    { id: 14, categoria: 'playera', nombre: 'Playera Oversize Blanca', precio: 0, descripcion: 'Info por DM.', imagen: '' },
    { id: 15, categoria: 'zapato', nombre: 'Tenis Urbanos', precio: 0, descripcion: 'Info por DM.', imagen: '' }
  ]
};
function cargar() {
  try { const d = JSON.parse(localStorage.getItem(KEY)); if (d && d.config) return d; } catch (e) {}
  return JSON.parse(JSON.stringify(DEFAULTS));
}
function guardar(d) { localStorage.setItem(KEY, JSON.stringify(d)); }
// Tienda pública: lee datos.json (lo que subes a GitHub). Si no existe, usa el borrador local.
async function cargarPublico() {
  try {
    const r = await fetch('datos.json?v=' + Date.now(), { cache: 'no-store' });
    if (r.ok) { const d = await r.json(); if (d && d.config) return d; }
  } catch (e) {}
  return cargar();
}
// Admin: usa tu borrador guardado; si no hay, lo publicado en datos.json.
async function cargarAdmin() {
  try { const d = JSON.parse(localStorage.getItem(KEY)); if (d && d.config) return d; } catch (e) {}
  return cargarPublico();
}
const GRADS = [
  'linear-gradient(135deg,#0d0d0f,#3a3a40)',
  'linear-gradient(135deg,#0f2a6b,#2f6bff)',
  'linear-gradient(135deg,#6e0f0f,#ff4a3a)',
  'linear-gradient(135deg,#1c1c1f,#7a7a84)'
];
function fondo(img, i) {
  return img ? `background-image:url("${img}");background-size:cover;background-position:center`
             : `background:${GRADS[i % GRADS.length]}`;
}
function esc(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
