export const mockProfile = {
  nombre: 'Norvin Garcia',
  foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80',
  descripcion:
    'Asesor inmobiliario especializado en propiedades de alto valor. Acompaño a mis clientes con estrategia, transparencia y resultados.',
  experiencia:
    'Más de 10 años en el sector de bienes raíces premium, enfocado en inversiones residenciales y comerciales.',
  redes: {
    instagram: 'https://instagram.com/norvingarcia',
    facebook: 'https://facebook.com/norvingarcia',
    whatsapp: 'https://wa.me/15555555555',
    linkedin: 'https://linkedin.com/in/norvingarcia'
  }
};

export const mockProperties = [
  {
    id: 'prop-001',
    titulo: 'Penthouse Panorámico en Downtown',
    descripcion:
      'Penthouse de lujo con vistas 360°, acabados italianos y terraza privada con jacuzzi.',
    precio: 1250000,
    ubicacion: 'Miami, FL',
    latitud: 25.7617,
    longitud: -80.1918,
    imagenes: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=80'
    ],
    tipo: 'apartamento',
    fecha: '2026-01-18'
  },
  {
    id: 'prop-002',
    titulo: 'Villa Moderna Frente al Lago',
    descripcion:
      'Villa contemporánea con 5 habitaciones, piscina climatizada, y muelle privado.',
    precio: 2150000,
    ubicacion: 'Orlando, FL',
    latitud: 28.5383,
    longitud: -81.3792,
    imagenes: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80'
    ],
    tipo: 'casa',
    fecha: '2026-02-03'
  },
  {
    id: 'prop-003',
    titulo: 'Terreno Premium para Desarrollo',
    descripcion:
      'Lote estratégico de alta plusvalía, ideal para proyecto residencial o mixto.',
    precio: 680000,
    ubicacion: 'Tampa, FL',
    latitud: 27.9506,
    longitud: -82.4572,
    imagenes: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80'
    ],
    tipo: 'terreno',
    fecha: '2026-02-20'
  }
];
