'use client';

import { useEffect, useState, useRef } from 'react';

const generateParticles = () => {
  return Array.from({ length: 80 }).map(() => ({
    x: `${(Math.random() - 0.5) * 160}vw`,
    y: `${(Math.random() * -100) - 10}vh`,
    size: Math.random() * 1 + 0.5,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * -15,
    opacity: Math.random() * 0.6 + 0.2
  }));
};

export default function BlackHoleBackground() {
  const [particles, setParticles] = useState([]);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const generated = generateParticles();
      
      if (isMounted.current) {
        setParticles(generated);
      }
    }

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-gank-900">
      
      <div className="absolute top-1/2 left-1/2 lg:left-[70%] -translate-x-1/2 -translate-y-1/2 w-0 h-0">
        
        {/* Clarão atmosférico de fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] lg:size-[600px] bg-indigo-600/30 blur-[100px] lg:blur-[150px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[250px] bg-gank-600__main/20 blur-[80px] rounded-full" />

        {/* Partículas Sendo Sugadas */}
        {particles.map((p, i) => (
          <div
            key={i}
            className="animate-suck-in absolute rounded-full bg-white shadow-[0_0_2px_#fff]"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              '--startX': p.x,
              '--startY': p.y,
              '--duration': `${p.duration}s`,
              '--delay': `${p.delay}s`,
              '--maxOpacity': p.opacity,
            }}
          />
        ))}

        {/* Horizonte de eventos (Estático) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-90">
          <svg viewBox="0 0 600 600" className="w-full h-full">
            <defs>
              <radialGradient id="hole-edge" cx="50%" cy="50%" r="50%">
                <stop offset="75%" stopColor="var(--color-gank-400)" stopOpacity="1" />
                <stop offset="85%" stopColor="var(--color-gank-400)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--color-gank-800)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="300" cy="300" r="115" fill="url(#hole-edge)" />
            <circle cx="300" cy="300" r="200" opacity={0.05} fill="url(#hole-edge)" />
          </svg>
        </div>

        {/* Anel 1 - Animado via DIV externa */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-90 animate-ring-spin-fast">
          <svg viewBox="0 0 600 600" className="w-full h-full">
            <circle cx="300" cy="300" r="150" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="2 6" />
            <circle cx="150" cy="300" r="2.5" fill="#fff" />
            <circle cx="430" cy="230" r="1.5" fill="#a78bfa" />
          </svg>
        </div>

        {/* Anel 2 - Reverso Animado via DIV externa */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-90 animate-ring-spin-reverse">
          <svg viewBox="0 0 600 600" className="w-full h-full">
            <circle cx="300" cy="300" r="210" fill="none" stroke="rgba(124, 58, 237, 0.2)" strokeWidth="1" strokeDasharray="4 12" />
            <circle cx="300" cy="90" r="2" fill="#fff" />
            <circle cx="480" cy="410" r="1.5" fill="#93c5fd" />
            <circle cx="120" cy="410" r="2" fill="#fff" />
          </svg>
        </div>

        {/* Anel 3 - Externo Animado via DIV externa */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-90 animate-ring-spin">
          <svg viewBox="0 0 600 600" className="w-full h-full">
            <circle cx="300" cy="300" r="280" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
            <circle cx="580" cy="300" r="1" fill="#fff" />
            <circle cx="100" cy="100" r="1.5" fill="#a78bfa" />
          </svg>
        </div>

        {/* Abismo Absoluto (Estático) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-90">
          <svg viewBox="0 0 600 600" className="w-full h-full">
            <circle cx="300" cy="300" r="100" fill="var(--color-gank-900)" />
          </svg>
        </div>

      </div>
    </div>
  );
}