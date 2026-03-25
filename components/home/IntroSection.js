import { mockProfile } from '@/lib/mockData';

export default function IntroSection() {
  return (
    <section className="section-shell grid gap-8 md:grid-cols-2">
      <div>
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-luxury-gold">Sobre Norvin</p>
        <h2 className="mb-4 text-3xl font-semibold">Experiencia inmobiliaria con visión estratégica</h2>
      </div>
      <div className="space-y-4 text-white/75">
        <p>{mockProfile.descripcion}</p>
        <p>{mockProfile.experiencia}</p>
      </div>
    </section>
  );
}
