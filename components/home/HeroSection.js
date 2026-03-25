import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(2,6,23,0.65), rgba(2,6,23,0.8)), url('https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=2400&q=80')"
        }}
      />
      <div className="section-shell relative z-10 flex min-h-[80vh] flex-col justify-center gap-6">
        <p className="text-sm uppercase tracking-[0.35em] text-luxury-gold">Portal inmobiliario premium</p>
        <h1 className="max-w-4xl font-serif text-4xl leading-tight text-white md:text-6xl">
          Norvin García - <span className="gold-gradient">Asesor Inmobiliario</span>
        </h1>
        <p className="max-w-2xl text-white/85">
          Marca personal, estrategia comercial y propiedades exclusivas en un solo lugar para compradores, inversionistas y propietarios.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Button as={Link} href="/propiedades">Ver Propiedades</Button>
          <Button as="a" href="https://wa.me/15555555555" target="_blank" rel="noreferrer" variant="outline" className="text-white">
            <MessageCircle className="mr-2" size={16} /> Contactar por WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
