import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import PropertyGallery from '@/components/propiedades/PropertyGallery';
import { mockProfile, mockProperties } from '@/lib/mockData';
import { formatCurrency } from '@/lib/format';

const PropertiesMap = dynamic(() => import('@/components/ui/PropertiesMap'), {
  ssr: false
});

export default function PropertyDetailPage({ params }) {
  const property = mockProperties.find((item) => item.id === params.id);

  if (!property) {
    notFound();
  }

  return (
    <section className="section-shell space-y-8">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.2em] text-luxury-gold">Detalle de propiedad</p>
        <h1 className="text-4xl font-semibold">{property.titulo}</h1>
      </div>

      <PropertyGallery images={property.imagenes} title={property.titulo} />

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <p className="text-2xl font-bold text-luxury-gold">{formatCurrency(property.precio)}</p>
          <p className="text-white/80">{property.descripcion}</p>
          <p>
            <strong>Ubicación:</strong> {property.ubicacion}
          </p>
          <Link
            href={mockProfile.redes.whatsapp}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full bg-luxury-gold px-5 py-3 font-semibold text-black"
          >
            <MessageCircle size={18} /> Contactar por WhatsApp
          </Link>
        </div>
        <div className="rounded-2xl border border-white/10 p-6">
          <h2 className="mb-3 text-xl font-semibold">Agente asignado</h2>
          <p>{mockProfile.nombre}</p>
          <p className="mt-2 text-white/70">{mockProfile.experiencia}</p>
          <p className="mt-3 text-white/80">Email: admin@norvingarcia.com</p>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-semibold">Ubicación en mapa</h2>
        <PropertiesMap properties={[property]} />
      </div>
    </section>
  );
}
