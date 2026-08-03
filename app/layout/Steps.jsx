'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Badge from '../components/ui/Badge';
import TypeH2 from '../components/typography/TypeH2Wrapper';
import Wrapper from '../components/ui/Wrapper';
import SectionHeader from '../components/ui/SectionHeader';
import { HeartPulse, Blocks, ImageUp, SearchCheck } from 'lucide-react';

import gank from '@/app/assets/01-hero/Gank.svg';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STEP_LIST = [
  {
    Icon: HeartPulse,
    cardTitle: 'Diagnóstico do negócio',
    cardDescription: 'Entendemos seu público, oferta e momento',
  },
  {
    Icon: Blocks,
    cardTitle: 'Estrutura de aquisição',
    cardDescription: 'Criamos campanhas focadas em gerar clientes (não clique)',
  },
  {
    Icon: ImageUp,
    cardTitle: 'Criativos que cativam',
    cardDescription: 'Entendemos seu público, oferta e momento',
  },
  {
    Icon: SearchCheck,
    cardTitle: 'Otimização contínua',
    cardDescription: 'Ajustes semanais para melhorar resultado e reduzir custo',
  },
];

export default function Steps() {
  const articleRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        isMobile: '(max-width: 1023px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        let { isDesktop, isMobile, reduceMotion } = context.conditions;
        const cards = gsap.utils.toArray('.step-card');

        if (reduceMotion) {
          gsap.set(cards, { autoAlpha: 1 });
          return;
        }

        // ==========================================
        // LÓGICA DESKTOP
        // ==========================================
        if (isDesktop) {
          gsap.set(cards, { autoAlpha: 0 }); // Esconde todas as cartas inicialmente

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: articleRef.current,
              start: 'top top',
              end: '+=350%', // Espaço de scroll
              scrub: 1,
              pin: true,
            },
          });

          // 1. Aparição sequencial e escurecimento do anterior
          cards.forEach((card, i) => {
            tl.to(card, { autoAlpha: 1, duration: 1 }, `step${i}`);
            if (i > 0) {
              // Reduz a opacidade da carta anterior enquanto a atual entra
              tl.to(cards[i - 1], { opacity: 0.3, duration: 1 }, `step${i}`);
            }
          });

          // 2. Acende todas as cartas juntas
          tl.to(cards, { opacity: 1, duration: 1 }, '+=0.5');

          // Pausa extra para leitura das cartas acesas
          tl.to({}, { duration: 1 });

          // 3. Efeito de saída: Perde opacidade do último para o primeiro
          const reversedCards = cards.slice().reverse();
          reversedCards.forEach((card) => {
            tl.to(card, { opacity: 0, duration: 0.5 });
          });
        }

        // ==========================================
        // LÓGICA MOBILE (Deck de Cartas)
        // ==========================================
        if (isMobile) {
          // Prepara as cartas no mobile: escondidas e posicionadas abaixo
          gsap.set(cards, {
            autoAlpha: 0,
            y: window.innerHeight / 2,
            transformOrigin: 'bottom center', // Eixo de rotação na base da carta
          });

          const tlMobile = gsap.timeline({
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: 'top 10px', // Trava exatamente a 40px do topo, como solicitado
              end: '+=300%',
              scrub: 1,
              pin: true,
            },
          });

          cards.forEach((card, i) => {
            // A carta atual sobe e aparece
            tlMobile.to(
              card,
              { autoAlpha: 1, y: 0, duration: 1, zIndex: i + 1 },
              `m_step${i}`,
            );

            // A carta anterior rotaciona levemente
            if (i > 0) {
              // Lógica para alternar esquerda/direita:
              // i=1 (rotaciona card 0 p/ esquerda), i=2 (rotaciona card 1 p/ direita)...
              const rotationAngle = i % 2 !== 0 ? -6 : 6;
              tlMobile.to(
                cards[i - 1],
                { rotation: rotationAngle, duration: 1 },
                `m_step${i}`,
              );
            }
          });

          // Pausa extra para permitir a leitura da última carta antes de destravar
          tlMobile.to({}, { duration: 1 });
        }
      },
    );

    return () => {
      // O clearProps é essencial aqui. Se o usuário estiver no celular e virar
      // a tela deitado (acionando o breakpoint do desktop), ele limpa os z-index
      // absolutos e devolve as cartas ao layout do grid.
      gsap.set('.step-card', { clearProps: 'all' });
      mm.revert();
    };
  }, []);

  return (
    <article
      ref={articleRef}
      className="bg-gank-shades-100 min-h-screen pt-40 lg:pt-0 overflow-hidden"
      id="s-steps"
    >
      <Wrapper ref={wrapperRef} className="lg:flex-col">
        <SectionHeader
          badgeIcon="workflow"
          badgeLabel="Sua nova estrutura"
          title="Como a Gank estrutura seu crescimento"
          label="Aqui, o crescimento da sua empresa funciona com pilares lógicos"
          className="lg:max-w-1/2 flex-col mx-auto text-center mb-12 lg:mb-20"
        />

        {/* <header className="lg:max-w-1/2 flex-col mx-auto text-center mb-12 lg:mb-20">
          <Badge icon="workflow">Sua nova estrutura</Badge>
          <TypeH2 className="mb-2 text-center!">
            Como a{' '}
            <Image
              src={gank}
              alt="logo"
              width={80}
              className="inline-block mx-auto text-center"
            />{' '}
            estrutura seu crescimento
          </TypeH2>
          <p>Aqui, o crescimento da sua empresa funciona com pilares lógicos</p>
        </header> */}

        {/* No Desktop: Utiliza o Grid normal. 
          No Mobile: Ganha min-h-[350px] e relative para ser o palco onde as cartas absolutas vão se empilhar.
        */}
        <section className="relative w-full min-h-[350px] lg:min-h-0 lg:grid lg:grid-cols-4 lg:gap-10">
          {STEP_LIST.map((step, index) => (
            <div
              key={index}
              className="step-card absolute inset-0 lg:static flex flex-col items-center justify-center lg:block p-8 lg:p-0 bg-gank-shades-200 lg:bg-transparent border border-gank-p-200/20 lg:border-none rounded-2xl lg:rounded-none text-center shadow-2xl lg:shadow-none lg:mb-12"
            >
              <div className="flex h-16 w-16 items-center justify-center mb-6 mx-auto rounded-lg shadow-2xl bg-gank-shades-100 lg:bg-transparent lg:size-10">
                <step.Icon
                  width={40}
                  height={40}
                  className="text-white lg:text-gank-p-100"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-2xl lg:text-lg font-semibold mb-4 lg:mb-2 text-white">
                {step.cardTitle}
              </h3>
              <p className="text-base text-gank-p-200 lg:text-sm">
                {step.cardDescription}
              </p>
            </div>
          ))}
        </section>
      </Wrapper>
    </article>
  );
}
