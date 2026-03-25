'use client';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import Link from 'next/link';
import { formatCurrency } from '@/lib/format';

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

export default function PropertiesMap({ properties }) {
  return (
    <div className="h-[520px] w-full overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
      <MapContainer center={[27.9944, -81.7603]} zoom={7} scrollWheelZoom className="h-full w-full">
        <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {properties.map((property) => (
          <Marker key={property.id} position={[property.latitud, property.longitud]} icon={markerIcon}>
            <Popup>
              <strong>{property.titulo}</strong>
              <br />
              {property.ubicacion}
              <br />
              {formatCurrency(property.precio)}
              <br />
              <Link href={`/propiedad/${property.id}`}>Ver detalle</Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
