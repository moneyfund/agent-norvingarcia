import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Norvin Garcia | Agente Inmobiliario Premium',
  description:
    'Propiedades exclusivas, asesoría personalizada y oportunidades inmobiliarias de lujo con Norvin Garcia.',
  keywords: ['agente inmobiliario', 'propiedades', 'lujo', 'Norvin Garcia', 'bienes raíces']
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-luxury-black text-luxury-white`}>
        <div className="relative min-h-screen overflow-x-hidden">
          <Navbar />
          <main className="pt-24">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
