import type { Metadata, Viewport } from 'next';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/jetbrains-mono/400.css';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:4173'),
  title: 'THE INVISIBLE THREAT — Grupo 4',
  description: 'Cibersegurança no Desenvolvimento de Sistemas. Uma experiência interativa do Grupo 4 — FIEB, 1º ano do Técnico em Informática.',
  openGraph: { title: 'THE INVISIBLE THREAT', description: 'A ameaça é invisível. A proteção é essencial.', type: 'website', locale: 'pt_BR', images: [{url:'/og.png',width:1200,height:630}] },
  robots: {index:false,follow:false},
};
export const viewport: Viewport = { themeColor:'#05070D', width:'device-width', initialScale:1 };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="pt-BR"><body>{children}</body></html>; }
