'use client';

import { propertyTypes } from '@/lib/mockData';
import Input from '@/components/ui/Input';

export default function PropertyFilters({ filters, setFilters }) {
  return (
    <div className="grid gap-4 rounded-2xl border border-black/10 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5 md:grid-cols-3">
      <Input
        type="text"
        placeholder="Ubicación"
        value={filters.location}
        onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
      />
      <select
        className="w-full rounded-2xl border border-black/10 bg-white/90 px-4 py-3 text-sm text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white"
        value={filters.type}
        onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value }))}
      >
        <option value="">Tipo de propiedad</option>
        {propertyTypes.map((type) => (
          <option key={type} value={type}>{type[0].toUpperCase() + type.slice(1)}</option>
        ))}
      </select>
      <Input
        type="number"
        placeholder="Precio máximo"
        value={filters.maxPrice}
        onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))}
      />
    </div>
  );
}
