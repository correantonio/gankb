import Script from 'next/script';
import ScrubbingMarqueeWrapper from './components/animated/ScrubbingMarqueeWrapper';
import Case from './layout/Case';
// import Diagnostics from './layout/Diagnostics';
import Diagnostics from './layout/DiagnosticsWrapper';
import Differential from './layout/Differential';
import Ending from './layout/Ending';
import Hero from './layout/Hero';
import Public from './layout/Public';
// import Steps from './layout/Steps';
import Steps from './layout/StepsWrapper';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        "@type": "ProfessionalService",
        "@id": "https://agenciagank.com.br/#organization",
        "name": "AGENCIA GANK MARKETING E PERFORMANCE DIGITAL LTDA",
        "taxID": "47.138.969/0001-97",
        "url": "https://agenciagank.com.br/",
        "telephone": "+5511976277922",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Rua Angelo Santoni, 385 - Centro",
          "addressLocality": "Bom Jesus dos Perdões",
          "addressRegion": "SP",
          "postalCode": "12955-000",
          "addressCountry": "BR"
        }
      },
      {
        '@type': 'WebPage',
        '@id': 'https://agenciagank.com.br/',
        url: 'https://agenciagank.com.br/gankb',
        name: 'Gank | Estrutura de Marketing e Vendas Previsíveis',
        about: {
          '@id': 'https://agenciagank.com.br/gankb',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://agenciagank.com.br/gankb/#s-diagnostics',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Para quem é o serviço de estruturação de marketing da Gank?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "O projeto da Gank é exclusivo para negócios que já faturam pelo menos R$ 70 mil por mês, desejam crescer com previsibilidade de caixa e querem parar de depender exclusivamente de indicações ou do 'movimento' natural.",
            },
          },
          {
            '@type': 'Question',
            name: 'Como a Gank estrutura a aquisição de clientes?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A Gank atua em quatro etapas práticas: diagnóstico detalhado do negócio e oferta, criação de estrutura de aquisição focada em gerar clientes, desenvolvimento de criativos em vídeo e imagem, e otimização semanal para melhorar resultados e reduzir custos.',
            },
          },
          {
            '@type': 'Question',
            name: 'Por que a Gank é diferente de outras agências de tráfego?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "A Gank não foca em curtidas ou na prática de 'postar e torcer'. A estratégia é integralmente baseada em gerar clientes e resultados reais. Além disso, o empresário tem contato direto com o profissional que executa a estratégia.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id="schema-gank"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-gank-shades-200 h-lvw">
        <Hero />
        <ScrubbingMarqueeWrapper />
        <Diagnostics />
        <Steps />
        <Case />
        <Differential />
        <Public />
        <Ending />
      </main>
    </>
  );
}
