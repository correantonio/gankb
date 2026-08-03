'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// O registro na raiz ainda é necessário
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function DifferentialStack({ list }) {
  const containerRef = useRef(null);

  // useGSAP soluciona o "falso cache" desmontando os pin-spacers corretamente no Fast Refresh do Next.js
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    
    if (prefersReducedMotion) return;

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
            immediateRender: false, // Vital: Garante que a animação só ocorra quando o painel atingir o start
            scrollTrigger: {
              trigger: panel,
              start: 'top bottom',
              end: 'top top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        });
      }
    });
  }, { scope: containerRef });

  return (
    // A substituição de vh por dvh (Dynamic Viewport Height) nas 3 instâncias abaixo é mandatória
    <div ref={containerRef} className="relative w-full pb-[100dvh]">
      {list.map(({ icon, label }, index) => (
        <section
          key={index}
          className="differential-panel relative flex h-dvh w-full items-center justify-center p-4 lg:p-8"
        >
          <div className="differential-card relative flex h-[80dvh] w-full max-w-7xl flex-col items-start justify-end overflow-hidden rounded-3xl border border-gank-p-200/20 bg-gank-shades-200 p-8 lg:h-[60dvh] lg:max-h-[620px] lg:p-14">
            <div className="mb-8 flex size-20 items-center justify-center rounded-2xl bg-gank-600__main p-4">
              {icon}
            </div>
            <p className="text-5xl! font-medium text-gank-p-200 md:text-4xl lg:text-5xl">
              {label}
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}