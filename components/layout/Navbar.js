'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/propiedades', label: 'Propiedades' },
  { href: '/mapa', label: 'Mapa' },
  { href: '/sobre-mi', label: 'Sobre mí' },
  { href: '/quieres-vender', label: '¿Quieres vender?' },
  { href: '/contacto', label: 'Contacto' }
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <motion.header initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed inset-x-0 top-0 z-50">
      <nav className="section-shell py-4">
        <div className="glass rounded-2xl px-4 py-3 md:px-6">
          <div className="flex items-center justify-between gap-3">
            <Link href="/" className="font-serif text-lg font-semibold tracking-[0.2em] text-luxury-gold">
              NORVIN GARCÍA
            </Link>
            <div className="hidden items-center gap-2 md:flex">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3 py-2 text-sm transition ${
                    pathname === link.href
                      ? 'bg-black/10 text-luxury-gold dark:bg-white/10'
                      : 'text-slate-700 hover:text-luxury-gold dark:text-white/80'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <ThemeToggle />
            </div>
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button onClick={() => setOpen((v) => !v)} className="rounded-xl border border-black/10 p-2 dark:border-white/15" type="button">
                <Menu size={18} />
              </button>
            </div>
          </div>

          {open && (
            <div className="mt-4 flex flex-col gap-2 md:hidden">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10" onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </motion.header>
  );
}
