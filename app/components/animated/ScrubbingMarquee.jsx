'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Slash } from 'lucide-react';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const LIST_ITEMS = [
  'Desenvolvimento',
  'Metodologia',
  'Resultados',
  'Estrutura',
  'Conhecimento',
  'Performance',
];

function MarqueeItem({ text, isClone }) {
  return (
    <div className={cn("flex items-center", isClone && "marquee-clone")}>
      <span className="whitespace-nowrap text-gank-p-100/20 uppercase px-4 text-7xl lg:text-9xl">
        {text}
      </span>
      {/* Centralizei os ícones verticalmente usando items-center e justify-center */}
      <span className='size-5 flex items-center justify-center text-gank-p-100/25 mx-2'>
        <Slash aria-hidden="true" />
        <Slash aria-hidden="true" />
      </span>
    </div>
  );
}

export default function ScrubbingMarquee() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        // A MAGIA ESTÁ AQUI:
        // Deslocamos a trilha apenas em 120% da largura da tela do usuário.
        // Isso dita uma velocidade fixa, lenta e perfeitamente legível, 
        // ignorando o fato de que a trilha tem 5 cópias gigantes.
        x: () => -(window.innerWidth * 1.2),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          // O scrub numérico adiciona inércia. Quanto maior, mais "amanteigado" o deslize.
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      // py-4 para dar um leve respiro vertical
      className="flex w-full select-none overflow-hidden py-4 bg-gank-shades-200"
      aria-label="Nossos pilares de serviço"
    >
      {/* A classe 'will-change-transform' transfere a renderização do texto para a Placa de Vídeo (GPU), 
          evitando trepidações (stuttering) de repintura durante o scroll */}
      <div ref={trackRef} className="flex w-max items-center will-change-transform">
        {Array.from({ length: 5 }).map((_, setIndex) => (
          <div 
            key={setIndex} 
            className="flex items-center" 
            aria-hidden={setIndex !== 0 ? "true" : undefined}
          >
            {LIST_ITEMS.map((item, i) => (
              <MarqueeItem 
                key={`item-${setIndex}-${i}`} 
                text={item} 
                isClone={setIndex !== 0} 
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}