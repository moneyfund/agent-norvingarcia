import Link from 'next/link';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.75)), url('https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=2000&q=80')"
        }}
      />
      <div className="section-shell relative z-10 flex min-h-[70vh] flex-col justify-center gap-6">
        <p className="text-sm uppercase tracking-[0.3em] text-luxury-gold">Inmobiliaria de lujo</p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
          Encuentra propiedades exclusivas con asesoría <span className="gold-gradient">premium</span>
        </h1>
        <p className="max-w-2xl text-white/80">
          Conecta con Norvin Garcia y accede a oportunidades inmobiliarias de alto valor en el mercado actual.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/contacto" className="rounded-full bg-luxury-gold px-6 py-3 font-medium text-black">
            Solicitar asesoría
          </Link>
          <div className="flex items-center gap-3 text-white/90">
            <a href="https://instagram.com/norvingarcia" target="_blank" rel="noreferrer">
              <Instagram />
            </a>
            <a href="https://facebook.com/norvingarcia" target="_blank" rel="noreferrer">
              <Facebook />
            </a>
            <a href="https://wa.me/15555555555" target="_blank" rel="noreferrer">
              <MessageCircle />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
