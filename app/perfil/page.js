import Image from 'next/image';
import { mockProfile } from '@/lib/mockData';

export default function ProfilePage() {
  return (
    <section className="section-shell grid gap-8 md:grid-cols-[320px,1fr]">
      <div className="relative h-[420px] overflow-hidden rounded-2xl border border-white/10">
        <Image src={mockProfile.foto} alt={mockProfile.nombre} fill className="object-cover" />
      </div>
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold">{mockProfile.nombre}</h1>
        <p className="text-white/80">{mockProfile.descripcion}</p>
        <p className="text-white/70">{mockProfile.experiencia}</p>
        <div className="flex flex-wrap gap-3 pt-4">
          {Object.entries(mockProfile.redes).map(([network, url]) => (
            <a key={network} href={url} target="_blank" rel="noreferrer" className="rounded-full border border-luxury-gold/70 px-4 py-2 text-sm capitalize hover:bg-luxury-gold hover:text-black">
              {network}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
