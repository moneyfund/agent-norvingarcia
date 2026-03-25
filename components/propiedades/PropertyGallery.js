'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function PropertyGallery({ images, title }) {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="space-y-4">
      <div className="relative h-96 overflow-hidden rounded-2xl">
        <Image src={active} alt={title} fill className="object-cover" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {images.map((img) => (
          <button key={img} className="relative h-28 overflow-hidden rounded-lg" onClick={() => setActive(img)}>
            <Image src={img} alt={`${title} miniatura`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
