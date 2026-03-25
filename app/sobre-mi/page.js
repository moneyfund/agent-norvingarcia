import Image from 'next/image';
import { Facebook, Instagram, MessageCircle, Music2 } from 'lucide-react';
import { mockProfile } from '@/lib/mockData';

export default function AboutPage() {
  return (
    <section className="section-shell grid gap-8 md:grid-cols-[320px,1fr]">
      <div className="relative h-[420px] overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
        <Image src={mockProfile.foto} alt={mockProfile.nombre} fill className="object-cover" />
      </div>
      <div className="space-y-5">
        <h1 className="font-serif text-4xl font-semibold">{mockProfile.nombre}</h1>
        <p className="text-slate-700 dark:text-white/80">{mockProfile.descripcion}</p>
        <p className="text-slate-600 dark:text-white/70">{mockProfile.experiencia}</p>
        <div>
          <h2 className="mb-2 text-xl font-semibold">Especialización</h2>
          <ul className="grid gap-2 text-slate-700 dark:text-white/80 md:grid-cols-2">
            {mockProfile.especialidades.map((item) => <li key={item}>• {item}</li>)}
          </ul>
        </div>
        <div className="flex gap-3">
          <a href={mockProfile.redes.whatsapp} target="_blank" rel="noreferrer" className="rounded-full border border-black/20 p-3 dark:border-white/20"><MessageCircle size={18} /></a>
          <a href={mockProfile.redes.facebook} target="_blank" rel="noreferrer" className="rounded-full border border-black/20 p-3 dark:border-white/20"><Facebook size={18} /></a>
          <a href={mockProfile.redes.instagram} target="_blank" rel="noreferrer" className="rounded-full border border-black/20 p-3 dark:border-white/20"><Instagram size={18} /></a>
          <a href={mockProfile.redes.tiktok} target="_blank" rel="noreferrer" className="rounded-full border border-black/20 p-3 dark:border-white/20"><Music2 size={18} /></a>
        </div>
      </div>
    </section>
  );
}
