import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://agenciagank.com.br/gankb'),
  title: 'Gank | Estrutura de Marketing e Vendas Previsíveis',
  description: 'Pare de depender de indicações. A Gank estrutura seu marketing para crescimento real. +200 negócios atendidos e +R$12M gerados. Solicite uma análise.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Gank | Estrutura de Marketing e Vendas Previsíveis',
    description: 'Pare de depender de indicações. A Gank estrutura seu marketing para crescimento real. +200 negócios atendidos e +R$12M gerados em vendas.',
    url: 'https://agenciagank.com.br/gankb',
    siteName: 'Gank',
    type: 'website',
    locale: 'pt_BR',
    images: [
      {
        url: '../public/SEO-equipe-gank.avif',
        width: 1200,
        height: 630,
        alt: 'Estrutura de aquisição de clientes da Gank com foco em previsibilidade',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gank | Estrutura de Marketing e Vendas Previsíveis',
    description: 'Pare de depender de indicações. A Gank estrutura seu marketing para crescimento real. +200 negócios atendidos e +R$12M gerados em vendas.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gank-shades-200">{children}</body>
    </html>
  );
}
