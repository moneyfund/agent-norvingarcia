import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BedDouble, Car, MapPin, MessageCircle, Ruler, ShowerHead } from 'lucide-react';
import PropertyGallery from '@/components/propiedades/PropertyGallery';
import { mockProfile, mockProperties } from '@/lib/mockData';
import { formatCurrency } from '@/lib/format';

const PropertiesMap = dynamic(() => import('@/components/ui/PropertiesMap'), {
  ssr: false
});

export default function PropertyDetailPage({ params }) {
  const property = mockProperties.find((item) => item.id === params.id);

  if (!property) notFound();

  return (
    <section className="section-shell space-y-8">
      <h1 className="font-serif text-4xl font-semibold">{property.titulo}</h1>
      <PropertyGallery images={property.imagenes} title={property.titulo} />

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <p className="text-3xl font-bold text-luxury-gold">{formatCurrency(property.precio)}</p>
          <p className="text-slate-700 dark:text-white/80">{property.descripcion}</p>
          <p className="inline-flex items-center gap-2"><MapPin size={18} /> {property.ubicacion}</p>
          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-black/10 p-4 text-sm dark:border-white/10">
            <p className="inline-flex items-center gap-2"><BedDouble size={16} /> {property.habitaciones} Habitaciones</p>
            <p className="inline-flex items-center gap-2"><ShowerHead size={16} /> {property.banos} Baños</p>
            <p className="inline-flex items-center gap-2"><Car size={16} /> {property.parqueos} Parqueos</p>
            <p className="inline-flex items-center gap-2"><Ruler size={16} /> {property.area} m²</p>
          </div>
          <Link href={mockProfile.redes.whatsapp} target="_blank" className="inline-flex items-center gap-2 rounded-2xl bg-luxury-gold px-5 py-3 font-semibold text-black">
            <MessageCircle size={18} /> Contactar por WhatsApp
          </Link>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white/70 p-6 dark:border-white/10 dark:bg-white/5">
          <h2 className="mb-3 text-xl font-semibold">Asesor asignado</h2>
          <p>{mockProfile.nombre}</p>
          <p className="mt-2 text-slate-600 dark:text-white/70">{mockProfile.experiencia}</p>
          <p className="mt-3">Email: {mockProfile.contacto.email}</p>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-semibold">Ubicación en mapa</h2>
        <PropertiesMap properties={[property]} />
      </div>
    </section>
  );
}
