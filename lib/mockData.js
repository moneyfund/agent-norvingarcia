export const mockProfile = {
  nombre: 'Norvin García',
  titulo: 'Asesor Inmobiliario',
  foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80',
  descripcion:
    'Ayudo a compradores, vendedores e inversionistas a tomar decisiones inmobiliarias de alto impacto con análisis de mercado, negociación estratégica y acompañamiento integral de principio a fin.',
  experiencia:
    'Más de 12 años liderando operaciones residenciales y comerciales en Florida con enfoque premium.',
  especialidades: ['Viviendas de lujo', 'Inversión patrimonial', 'Propiedades comerciales', 'Captación de alto valor'],
  contacto: {
    whatsapp: '+1 (555) 555-5555',
    email: 'contacto@norvingarcia.com'
  },
  redes: {
    whatsapp: 'https://wa.me/15555555555',
    facebook: 'https://facebook.com/norvingarcia',
    instagram: 'https://instagram.com/norvingarcia',
    tiktok: 'https://tiktok.com/@norvingarcia'
  }
};

export const propertyTypes = ['casa', 'apartamento', 'terreno', 'bodega'];

export const mockProperties = [
  {
    id: 'prop-001',
    titulo: 'Penthouse Panorámico con Terraza Privada',
    descripcion:
      'Residencia exclusiva con ventanales de piso a techo, acabados importados, domótica integral y área social para eventos privados.',
    precio: 1250000,
    ubicacion: 'Miami, FL',
    latitud: 25.7617,
    longitud: -80.1918,
    tipo: 'apartamento',
    habitaciones: 4,
    banos: 4,
    parqueos: 2,
    area: 340,
    destacada: true,
    imagenes: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=80'
    ]
  },
  {
    id: 'prop-002',
    titulo: 'Villa Moderna Frente al Lago',
    descripcion:
      'Propiedad de arquitectura contemporánea con piscina climatizada, muelle privado y jardín tropical de bajo mantenimiento.',
    precio: 2150000,
    ubicacion: 'Orlando, FL',
    latitud: 28.5383,
    longitud: -81.3792,
    tipo: 'casa',
    habitaciones: 5,
    banos: 6,
    parqueos: 4,
    area: 520,
    destacada: true,
    imagenes: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80'
    ]
  },
  {
    id: 'prop-003',
    titulo: 'Terreno Premium para Desarrollo Mixto',
    descripcion:
      'Lote de alta plusvalía ideal para proyecto residencial o comercial. Zona en crecimiento con excelentes accesos viales.',
    precio: 680000,
    ubicacion: 'Tampa, FL',
    latitud: 27.9506,
    longitud: -82.4572,
    tipo: 'terreno',
    habitaciones: 0,
    banos: 0,
    parqueos: 0,
    area: 1200,
    destacada: true,
    imagenes: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80'
    ]
  },
  {
    id: 'prop-004',
    titulo: 'Bodega Logística de Alta Capacidad',
    descripcion:
      'Bodega estratégica cerca de corredor industrial, con oficinas administrativas, muelle de carga y vigilancia 24/7.',
    precio: 990000,
    ubicacion: 'Jacksonville, FL',
    latitud: 30.3322,
    longitud: -81.6557,
    tipo: 'bodega',
    habitaciones: 6,
    banos: 4,
    parqueos: 10,
    area: 1800,
    destacada: false,
    imagenes: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80'
    ]
  }
];

export const testimonials = [
  {
    nombre: 'María López',
    comentario: 'Norvin vendió mi propiedad en menos de 30 días y negoció por encima del precio esperado.'
  },
  {
    nombre: 'Carlos Méndez',
    comentario: 'Excelente asesoría para inversión. Todo el proceso fue claro, profesional y muy rentable.'
  },
  {
    nombre: 'Ana Torres',
    comentario: 'Me sentí acompañada en cada paso. Recomiendo a Norvin por su transparencia y enfoque humano.'
  }
];
