import { Facebook, Instagram, MessageCircle, Music2 } from 'lucide-react';
import { mockProfile } from '@/lib/mockData';

export default function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/10">
      <div className="section-shell flex flex-col gap-6 py-8 text-sm text-slate-600 dark:text-white/70 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">© {new Date().getFullYear()} Norvin García</p>
          <p>{mockProfile.experiencia}</p>
        </div>
        <div className="flex items-center gap-4">
          <a href={mockProfile.redes.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={18} /></a>
          <a href={mockProfile.redes.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
          <a href={mockProfile.redes.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
          <a href={mockProfile.redes.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok"><Music2 size={18} /></a>
        </div>
      </div>
    </footer>
  );
}
