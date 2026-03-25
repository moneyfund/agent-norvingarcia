'use client';

export default function PropertyFilters({ filters, setFilters }) {
  return (
    <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-3">
      <input
        type="text"
        placeholder="Ubicación"
        className="rounded-lg border border-white/10 bg-black/30 px-4 py-2"
        value={filters.location}
        onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
      />
      <select
        className="rounded-lg border border-white/10 bg-black/30 px-4 py-2"
        value={filters.type}
        onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value }))}
      >
        <option value="">Tipo de propiedad</option>
        <option value="casa">Casa</option>
        <option value="apartamento">Apartamento</option>
        <option value="terreno">Terreno</option>
      </select>
      <input
        type="number"
        placeholder="Precio máximo"
        className="rounded-lg border border-white/10 bg-black/30 px-4 py-2"
        value={filters.maxPrice}
        onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))}
      />
    </div>
  );
}
