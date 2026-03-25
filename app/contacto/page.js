export default function ContactPage() {
  return (
    <section className="section-shell grid gap-8 md:grid-cols-2">
      <div>
        <h1 className="mb-4 text-4xl font-semibold">Contacto</h1>
        <p className="text-white/70">
          Cuéntame qué tipo de propiedad buscas y diseñaré una estrategia personalizada para ti.
        </p>
        <div className="mt-6 space-y-2 text-sm text-white/70">
          <a className="block" href="mailto:admin@norvingarcia.com">
            Email: admin@norvingarcia.com
          </a>
          <a className="block" href="https://wa.me/15555555555" target="_blank" rel="noreferrer">
            WhatsApp directo
          </a>
        </div>
      </div>
      <form className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
        <input className="w-full rounded-lg bg-black/30 p-3" placeholder="Nombre" required />
        <input className="w-full rounded-lg bg-black/30 p-3" type="email" placeholder="Email" required />
        <textarea className="h-32 w-full rounded-lg bg-black/30 p-3" placeholder="Mensaje" required />
        <button className="rounded-full bg-luxury-gold px-6 py-3 font-semibold text-black">Enviar</button>
      </form>
    </section>
  );
}
