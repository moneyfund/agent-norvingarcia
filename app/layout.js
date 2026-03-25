import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display' });

export const metadata = {
  title: 'Norvin García | Asesor Inmobiliario Premium',
  description:
    'Portal inmobiliario premium de Norvin García: propiedades exclusivas, asesoría personalizada y captación profesional para vender con éxito.',
  keywords: ['Norvin García', 'agente inmobiliario', 'propiedades de lujo', 'bienes raíces', 'Florida'],
  openGraph: {
    title: 'Norvin García | Asesor Inmobiliario',
    description: 'Marca personal y catálogo premium de propiedades exclusivas.',
    type: 'website'
  }
};

const themeScript = `
(() => {
  const stored = localStorage.getItem('norvin-theme');
  const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = stored || preferred;
})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <div className="relative min-h-screen overflow-x-hidden">
          <Navbar />
          <main className="pt-24">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
