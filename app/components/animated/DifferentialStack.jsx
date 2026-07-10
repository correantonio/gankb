'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DifferentialStack({ list }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.differential-panel');
      const cards = gsap.utils.toArray('.differential-card');

      panels.forEach((panel, i) => {
        // 1. Fixa (Pin) o painel atual quando ele chega ao topo
        ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          endTrigger: containerRef.current,
          end: 'bottom bottom',
          pin: true,
          pinSpacing: false,
        });

        // 2. Aplica a escala cumulativa e sobe os painéis anteriores
        if (i > 0) {
          cards.slice(0, i).forEach((prevCard, j) => {
            gsap.to(prevCard, {
              scale: () => {
                const reducePx = window.innerWidth < 768 ? 16 : 40;
                const diff = i - j; // Quantos cards estão por cima
                // Calcula a escala exata para encolher -40px na largura
                return 1 - ((diff * reducePx) / prevCard.offsetWidth);
              },
              y: () => {
                const reducePx = window.innerWidth < 768 ? 16 : 40;
                const diff = i - j;
                // Empurra o card anterior para cima para expor a borda superior
                return -(diff * reducePx);
              },
              // opacity: () => {
              //   const diff = i - j;
              //   return 1 - (diff * 0.15); // Escurece levemente o fundo para dar profundidade
              // },
              transformOrigin: 'top center',
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: panel,
                start: 'top bottom', // Inicia quando o NOVO painel aparece na tela
                end: 'top top',      // Termina quando o NOVO painel trava no topo
                scrub: true,
                invalidateOnRefresh: true, // Refaz as contas de -40px se virar o celular
              },
            });
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // O padding-bottom extra garante que a última seção pare no topo tempo suficiente para o usuário ler.
    <div ref={containerRef} className="relative w-full pb-[100vh]">
      {list.map(({ icon, label }, index) => (
        <section
          key={index}
          className="differential-panel flex h-screen w-full items-center justify-center p-4 lg:p-8"
        >
          <div className="differential-card flex h-[80vh] w-full max-w-7xl flex-col items-start justify-end rounded-3xl border border-gank-p-200/20 bg-gank-shades-200 p-8 shadow-2xl lg:h-[60vh] lg:p-14">
            <div className="mb-8 size-20 flex justify-center items-center bg-gank-600__main rounded-2xl p-4">
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