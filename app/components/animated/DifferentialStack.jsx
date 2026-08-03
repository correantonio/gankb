// components/DifferentialStack.jsx
'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';


// O registro na raiz ainda é necessário, mas a manipulação de árvore ocorrerá estritamente via useGSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function DifferentialStack({ list }) {
  const containerRef = useRef(null);

  // useGSAP engloba o gsap.context nativamente e executa o ctx.revert() automaticamente
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    
    if (prefersReducedMotion) return;

    // O scope no useGSAP substitui a necessidade de passar o containerRef no toArray
    const panels = gsap.utils.toArray('.differential-panel');
    const cards = gsap.utils.toArray('.differential-card');

    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: 'top top',
        endTrigger: containerRef.current,
        end: 'bottom bottom',
        pin: true,
        pinSpacing: false,
      });

      if (i > 0) {
        cards.slice(0, i).forEach((prevCard, j) => {
          gsap.to(prevCard, {
            scale: () => {
              const reducePx = window.innerWidth < 768 ? 16 : 40;
              const diff = i - j;
              return 1 - (diff * reducePx) / prevCard.offsetWidth;
            },
            y: () => {
              const reducePx = window.innerWidth < 768 ? 16 : 40;
              const diff = i - j;
              return -(diff * reducePx);
            },
            transformOrigin: 'top center',
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: panel,
              start: 'top bottom',
              end: 'top top',
              scrub: true,
              invalidateOnRefresh: true, // Garante recálculo no redimensionamento da janela
            },
          });
        });
      }
    });
  }, { scope: containerRef }); // Delimita a atuação restrita a este contêiner

  return (
    <div ref={containerRef} className="relative w-full pb-[100vh]">
      {list.map(({ icon, label }, index) => (
        <section
          key={index}
          className="differential-panel relative flex h-screen w-full items-center justify-center p-4 lg:p-8"
        >
          <div className="differential-card relative flex h-[80vh] w-full max-w-7xl flex-col items-start justify-end overflow-hidden rounded-3xl border border-gank-p-200/20 bg-gank-shades-200 p-8 lg:h-[60vh] lg:max-h-[620px] lg:p-14">
            <div className="mb-8 flex size-20 items-center justify-center rounded-2xl bg-gank-600__main p-4">
              {icon}
            </div>
            {/* Sintaxe Tailwind corrigida para !text-5xl */}
            <p className="font-medium text-gank-p-200 text-5xl! md:text-4xl lg:text-5xl">
              {label}
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}