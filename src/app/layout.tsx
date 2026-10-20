import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
const space=localFont({src:[{path:'../../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-400-normal.woff2',weight:'400'},{path:'../../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-500-normal.woff2',weight:'500'}],variable:'--font-space',display:'swap'});
const inter=localFont({src:[{path:'../../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2',weight:'400'},{path:'../../node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2',weight:'500'}],variable:'--font-inter',display:'swap',preload:false});
const mono=localFont({src:'../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2',variable:'--font-jetbrains',display:'swap',preload:false});
import './globals.css';
import './experience-v2.css';
export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://cybersecurity-grupo4.vercel.app'),
  title: 'THE INVISIBLE THREAT — Grupo 4',
  description: 'Cibersegurança no Desenvolvimento de Sistemas. Uma experiência interativa do Grupo 4 — FIEB, 1º ano do Técnico em Informática.',
  openGraph: { title: 'THE INVISIBLE THREAT', description: 'A ameaça é invisível. A proteção é essencial.', type: 'website', locale: 'pt_BR', images: [{url:'/og.png',width:1200,height:630}] },
  robots: {index:true,follow:true},
};
export const viewport: Viewport = { themeColor:'#05070D', width:'device-width', initialScale:1 };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="pt-BR" className={`${space.variable} ${inter.variable} ${mono.variable}`}><body>{children}</body></html>; }
