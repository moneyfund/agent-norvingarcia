import { mockProfile } from '@/lib/mockData';

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="section-shell flex flex-col gap-3 py-8 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Norvin Garcia. Todos los derechos reservados.</p>
        <p className="text-luxury-gold">{mockProfile.experiencia}</p>
      </div>
    </footer>
  );
}
