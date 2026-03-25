'use client';

const emptyProperty = {
  id: '',
  titulo: '',
  descripcion: '',
  precio: '',
  ubicacion: '',
  latitud: '',
  longitud: '',
  imagenes: '',
  tipo: 'casa',
  fecha: new Date().toISOString().slice(0, 10)
};

export default function PropertyForm({ onSave, current, onCancel }) {
  const property = current ?? emptyProperty;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    onSave({
      ...payload,
      precio: Number(payload.precio),
      latitud: Number(payload.latitud),
      longitud: Number(payload.longitud),
      imagenes: payload.imagenes.split(',').map((img) => img.trim())
    });

    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border border-white/10 p-4">
      <h3 className="text-lg font-semibold">{current ? 'Editar propiedad' : 'Nueva propiedad'}</h3>
      <input name="id" defaultValue={property.id} required placeholder="ID" className="w-full rounded bg-black/40 p-2" />
      <input
        name="titulo"
        defaultValue={property.titulo}
        required
        placeholder="Título"
        className="w-full rounded bg-black/40 p-2"
      />
      <textarea
        name="descripcion"
        defaultValue={property.descripcion}
        required
        placeholder="Descripción"
        className="w-full rounded bg-black/40 p-2"
      />
      <input name="precio" type="number" defaultValue={property.precio} required placeholder="Precio" className="w-full rounded bg-black/40 p-2" />
      <input
        name="ubicacion"
        defaultValue={property.ubicacion}
        required
        placeholder="Ubicación"
        className="w-full rounded bg-black/40 p-2"
      />
      <div className="grid grid-cols-2 gap-2">
        <input name="latitud" type="number" step="any" defaultValue={property.latitud} required placeholder="Latitud" className="w-full rounded bg-black/40 p-2" />
        <input
          name="longitud"
          type="number"
          step="any"
          defaultValue={property.longitud}
          required
          placeholder="Longitud"
          className="w-full rounded bg-black/40 p-2"
        />
      </div>
      <input
        name="imagenes"
        defaultValue={Array.isArray(property.imagenes) ? property.imagenes.join(', ') : property.imagenes}
        required
        placeholder="Imágenes (URLs separadas por coma)"
        className="w-full rounded bg-black/40 p-2"
      />
      <select name="tipo" defaultValue={property.tipo} className="w-full rounded bg-black/40 p-2">
        <option value="casa">Casa</option>
        <option value="apartamento">Apartamento</option>
        <option value="terreno">Terreno</option>
      </select>
      <input name="fecha" type="date" defaultValue={property.fecha} required className="w-full rounded bg-black/40 p-2" />
      <div className="flex gap-2">
        <button type="submit" className="rounded bg-luxury-gold px-4 py-2 font-semibold text-black">
          Guardar
        </button>
        {current && (
          <button type="button" onClick={onCancel} className="rounded border border-white/20 px-4 py-2">
            Cancelar edición
          </button>
        )}
      </div>
    </form>
  );
}
