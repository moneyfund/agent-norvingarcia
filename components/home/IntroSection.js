import { Building2, Handshake, ShieldCheck, TrendingUp } from 'lucide-react';
import { mockProfile, testimonials } from '@/lib/mockData';

const reasons = [
  { icon: ShieldCheck, title: 'Confianza total', text: 'Procesos transparentes y acompañamiento legal-comercial.' },
  { icon: TrendingUp, title: 'Visión de inversión', text: 'Análisis de rentabilidad y proyección de plusvalía.' },
  { icon: Handshake, title: 'Negociación experta', text: 'Defensa estratégica del valor de tu propiedad.' },
  { icon: Building2, title: 'Portafolio premium', text: 'Selección curada de activos residenciales y comerciales.' }
];

export default function IntroSection() {
  return (
    <section className="section-shell space-y-12">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-luxury-gold">¿Por qué elegirme?</p>
          <h2 className="font-serif text-3xl font-semibold">Experiencia inmobiliaria con resultados medibles</h2>
        </div>
        <p className="text-slate-700 dark:text-white/75">{mockProfile.descripcion}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {reasons.map(({ icon: Icon, title, text }) => (
          <article key={title} className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
            <Icon className="mb-3 text-luxury-gold" />
            <h3 className="mb-1 font-semibold">{title}</h3>
            <p className="text-sm text-slate-600 dark:text-white/70">{text}</p>
          </article>
        ))}
      </div>

      <div>
        <h3 className="mb-4 font-serif text-2xl">Testimonios</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote key={item.nombre} className="rounded-2xl border border-black/10 bg-white/70 p-5 italic dark:border-white/10 dark:bg-white/5">
              “{item.comentario}”
              <footer className="mt-3 not-italic font-semibold text-luxury-gold">— {item.nombre}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
