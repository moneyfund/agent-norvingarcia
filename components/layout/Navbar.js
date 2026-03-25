'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/propiedades', label: 'Propiedades' },
  { href: '/mapa', label: 'Mapa' },
  { href: '/perfil', label: 'Perfil' },
  { href: '/contacto', label: 'Contacto' },
  { href: '/admin/login', label: 'Admin' }
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav className="section-shell py-4">
        <div className="glass flex items-center justify-between rounded-2xl px-4 py-3 md:px-6">
          <Link href="/" className="text-lg font-semibold tracking-[0.2em] text-luxury-gold">
            NORVIN GARCIA
          </Link>
          <ul className="hidden gap-4 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-full px-3 py-2 text-sm transition hover:text-luxury-gold ${
                    pathname === link.href ? 'text-luxury-gold' : 'text-luxury-white/80'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </motion.header>
  );
}
