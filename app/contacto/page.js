import dynamic from 'next/dynamic';
import { Facebook, Instagram, MessageCircle, Music2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { mockProfile, mockProperties } from '@/lib/mockData';

const PropertiesMap = dynamic(() => import('@/components/ui/PropertiesMap'), { ssr: false });

export default function ContactPage() {
  return (
    <section className="section-shell space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h1 className="mb-4 font-serif text-4xl font-semibold">Contacto</h1>
          <p className="text-slate-700 dark:text-white/70">Cuéntame qué necesitas y diseñaré una ruta inmobiliaria estratégica para ti.</p>
          <div className="mt-6 space-y-2 text-sm">
            <a className="block" href={`mailto:${mockProfile.contacto.email}`}>Email: {mockProfile.contacto.email}</a>
            <a className="block" href={mockProfile.redes.whatsapp} target="_blank" rel="noreferrer">WhatsApp: {mockProfile.contacto.whatsapp}</a>
            <div className="mt-4 flex gap-3">
              <a href={mockProfile.redes.whatsapp} target="_blank" rel="noreferrer"><MessageCircle /></a>
              <a href={mockProfile.redes.facebook} target="_blank" rel="noreferrer"><Facebook /></a>
              <a href={mockProfile.redes.instagram} target="_blank" rel="noreferrer"><Instagram /></a>
              <a href={mockProfile.redes.tiktok} target="_blank" rel="noreferrer"><Music2 /></a>
            </div>
          </div>
        </div>
        <form className="space-y-4 rounded-2xl border border-black/10 bg-white/80 p-6 dark:border-white/10 dark:bg-white/5">
          <Input placeholder="Nombre" required />
          <Input type="email" placeholder="Email" required />
          <Input placeholder="Teléfono" />
          <textarea className="h-32 w-full rounded-2xl border border-black/10 bg-white/90 p-3 text-sm text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white" placeholder="Mensaje" required />
          <Button className="w-full">Enviar mensaje</Button>
        </form>
      </div>
      <div>
        <h2 className="mb-4 text-2xl font-semibold">Ubicación general</h2>
        <PropertiesMap properties={mockProperties.slice(0, 3)} />
      </div>
    </section>
  );
}
