import dynamic from 'next/dynamic';
import { mockProperties } from '@/lib/mockData';

const PropertiesMap = dynamic(() => import('@/components/ui/PropertiesMap'), {
  ssr: false
});

export const metadata = {
  title: 'Mapa de propiedades | Norvin Garcia'
};

export default function MapPage() {
  return (
    <section className="section-shell space-y-6">
      <h1 className="text-4xl font-semibold">Mapa interactivo</h1>
      <p className="max-w-2xl text-white/70">
        Explora todas las propiedades en un solo lugar. Haz clic en cada marcador para ver un resumen y navegar al detalle.
      </p>
      <PropertiesMap properties={mockProperties} />
    </section>
  );
}
