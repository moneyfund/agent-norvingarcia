'use client';

export default function ProfileForm({ profile, onSave }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());

    onSave({
      nombre: data.nombre,
      foto: data.foto,
      descripcion: data.descripcion,
      experiencia: data.experiencia,
      redes: {
        instagram: data.instagram,
        facebook: data.facebook,
        whatsapp: data.whatsapp,
        linkedin: data.linkedin
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border border-white/10 p-4">
      <h3 className="text-lg font-semibold">Perfil y redes</h3>
      <input name="nombre" defaultValue={profile.nombre} className="w-full rounded bg-black/40 p-2" />
      <input name="foto" defaultValue={profile.foto} className="w-full rounded bg-black/40 p-2" />
      <textarea name="descripcion" defaultValue={profile.descripcion} className="w-full rounded bg-black/40 p-2" />
      <textarea name="experiencia" defaultValue={profile.experiencia} className="w-full rounded bg-black/40 p-2" />
      <input name="instagram" defaultValue={profile.redes.instagram} className="w-full rounded bg-black/40 p-2" />
      <input name="facebook" defaultValue={profile.redes.facebook} className="w-full rounded bg-black/40 p-2" />
      <input name="whatsapp" defaultValue={profile.redes.whatsapp} className="w-full rounded bg-black/40 p-2" />
      <input name="linkedin" defaultValue={profile.redes.linkedin} className="w-full rounded bg-black/40 p-2" />
      <button type="submit" className="rounded bg-luxury-gold px-4 py-2 font-semibold text-black">
        Guardar perfil
      </button>
    </form>
  );
}
