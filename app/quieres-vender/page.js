'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';

export default function SellPage() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(true);
    event.currentTarget.reset();
  };

  return (
    <section className="section-shell grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <h1 className="font-serif text-4xl font-semibold">¿Quieres vender tu propiedad?</h1>
        <p className="text-slate-700 dark:text-white/75">
          Completa este formulario y te contactaré con una estrategia personalizada de posicionamiento, valorización y cierre.
        </p>
        <a href="https://wa.me/15555555555" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-luxury-gold px-4 py-2 text-luxury-gold">
          <MessageCircle size={16} /> Prefiero hablar por WhatsApp
        </a>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-black/10 bg-white/80 p-6 dark:border-white/10 dark:bg-white/5">
        <Input placeholder="Nombre" required />
        <Input placeholder="Teléfono" required />
        <Input type="email" placeholder="Email" required />
        <select className="w-full rounded-2xl border border-black/10 bg-white/90 px-4 py-3 text-sm text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white" required>
          <option value="">Tipo de propiedad</option>
          <option>Casa</option>
          <option>Apartamento</option>
          <option>Terreno</option>
          <option>Bodega</option>
        </select>
        <textarea className="h-32 w-full rounded-2xl border border-black/10 bg-white/90 p-3 text-sm text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white" placeholder="Descripción" required />
        <Button type="submit" className="w-full">Enviar solicitud</Button>
      </form>
      <Modal open={open} onClose={() => setOpen(false)} title="Solicitud recibida">
        <p className="text-white/80">Gracias por confiar en Norvin García. Tu solicitud quedó registrada y será contactada pronto. Este formulario está listo para conectarse con Firebase/Email.</p>
      </Modal>
    </section>
  );
}
