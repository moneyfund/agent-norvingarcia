'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import PropertyCard from '@/components/propiedades/PropertyCard';
import PropertyFilters from '@/components/propiedades/PropertyFilters';
import { mockProperties } from '@/lib/mockData';

export default function PropertiesPage() {
  const [filters, setFilters] = useState({ location: '', type: '', maxPrice: '' });

  const filtered = useMemo(
    () =>
      mockProperties.filter((property) => {
        const locationOk = property.ubicacion.toLowerCase().includes(filters.location.toLowerCase());
        const typeOk = filters.type ? property.tipo === filters.type : true;
        const priceOk = filters.maxPrice ? property.precio <= Number(filters.maxPrice) : true;
        return locationOk && typeOk && priceOk;
      }),
    [filters]
  );

  return (
    <section className="section-shell space-y-8">
      <h1 className="font-serif text-4xl font-semibold">Propiedades premium</h1>
      <PropertyFilters filters={filters} setFilters={setFilters} />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((property, index) => (
          <motion.div key={property.id} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: index * 0.08 }}>
            <PropertyCard property={property} />
          </motion.div>
        ))}
      </div>
      {filtered.length === 0 && <p>No se encontraron propiedades con esos filtros.</p>}
    </section>
  );
}
