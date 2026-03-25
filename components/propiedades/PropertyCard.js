import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { formatCurrency } from '@/lib/format';

export default function PropertyCard({ property }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-luxury-muted">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={property.imagenes[0]}
          alt={property.titulo}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="space-y-3 p-5">
        <h3 className="text-xl font-semibold">{property.titulo}</h3>
        <p className="text-sm text-white/70">{property.descripcion}</p>
        <div className="flex items-center gap-2 text-sm text-white/70">
          <MapPin size={16} /> {property.ubicacion}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-luxury-gold">{formatCurrency(property.precio)}</p>
          <Link href={`/propiedades/${property.id}`} className="text-sm text-luxury-gold">
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  );
}
