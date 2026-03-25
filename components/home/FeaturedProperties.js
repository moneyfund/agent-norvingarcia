'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { mockProperties } from '@/lib/mockData';
import PropertyCard from '@/components/propiedades/PropertyCard';

export default function FeaturedProperties() {
  const featured = mockProperties.filter((property) => property.destacada);

  return (
    <section className="section-shell space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-3xl font-semibold">Propiedades destacadas</h2>
        <Link href="/propiedades" className="text-luxury-gold">
          Ver catálogo completo →
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {featured.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <PropertyCard property={property} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
