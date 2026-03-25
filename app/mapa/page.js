import dynamic from 'next/dynamic';
import { mockProperties } from '@/lib/mockData';

const PropertiesMap = dynamic(() => import('@/components/ui/PropertiesMap'), { ssr: false });

export default function MapPage() {
  return (
    <section className="section-shell space-y-6">
      <h1 className="font-serif text-4xl font-semibold">Mapa interactivo de propiedades</h1>
      <p className="max-w-2xl text-slate-700 dark:text-white/70">
        Explora las propiedades por ubicación, visualiza su valor de mercado y entra al detalle de cada activo.
      </p>
      <PropertiesMap properties={mockProperties} />
    </section>
  );
}
