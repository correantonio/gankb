// Typeh2.jsx
'use client';
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText'; // Nota: SplitText é um plugin premium do Club GSAP

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

const TypeH1 = ({ className, children }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(textRef.current, {
        type: 'words,lines',
        mask: 'words',
      });

      // yPercent: 105 garante que letras com descendentes (p, g, y) fiquem totalmente escondidas sob a máscara
      gsap.from(split.words, {
        yPercent: 105,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 85%',
        },
      });
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <h1 ref={textRef} className={cn('', className)}>
      {children}
    </h1>
  );
};

export default TypeH1;