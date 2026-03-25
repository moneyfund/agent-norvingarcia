import Image from 'next/image';
import Link from 'next/link';
import { BedDouble, Car, MapPin, Ruler, ShowerHead } from 'lucide-react';
import { formatCurrency } from '@/lib/format';

export default function PropertyCard({ property }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-black/10 bg-white/80 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5">
      <div className="relative h-56 overflow-hidden">
        <Image src={property.imagenes[0]} alt={property.titulo} fill className="object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
      </div>
      <div className="space-y-3 p-5">
        <h3 className="text-xl font-semibold">{property.titulo}</h3>
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-white/70">
          <MapPin size={16} /> {property.ubicacion}
        </div>
        <div className="grid grid-cols-4 gap-2 text-xs text-slate-600 dark:text-white/70">
          <span className="inline-flex items-center gap-1"><BedDouble size={14} /> {property.habitaciones || '-'}</span>
          <span className="inline-flex items-center gap-1"><ShowerHead size={14} /> {property.banos || '-'}</span>
          <span className="inline-flex items-center gap-1"><Car size={14} /> {property.parqueos || '-'}</span>
          <span className="inline-flex items-center gap-1"><Ruler size={14} /> {property.area}m²</span>
        </div>
        <div className="flex items-center justify-between pt-2">
          <p className="text-lg font-bold text-luxury-gold">{formatCurrency(property.precio)}</p>
          <Link href={`/propiedad/${property.id}`} className="rounded-xl border border-luxury-gold/50 px-3 py-1 text-sm text-luxury-gold">
            Ver más
          </Link>
        </div>
      </div>
    </article>
  );
}
