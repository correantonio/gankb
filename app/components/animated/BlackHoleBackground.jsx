'use client';

import React, { useEffect, useState } from 'react';

export default function BlackHoleBackground() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Gera 80 partículas de poeira estelar
    const generatedParticles = Array.from({ length: 80 }).map(() => {
      // X: Espalhado por toda a largura (-80vw a 80vw)
      const startX = (Math.random() - 0.5) * 160;
      
      // Y: FORÇADO A VIR DE CIMA (-100vh até 0vh)
      // Isso cria o efeito "chuva" sendo sugada para baixo/centro
      const startY = (Math.random() * -100) - 10; 

      return {
        x: `${startX}vw`,
        y: `${startY}vh`,
        // Tamanho minúsculo (0.5px a 1.5px) igual ao Reflect
        size: Math.random() * 1 + 0.5, 
        // Duração longa e assíncrona
        duration: Math.random() * 8 + 6, 
        delay: Math.random() * -15, 
        // Variação de opacidade para simular profundidade (estrelas mais longe e mais perto)
        opacity: Math.random() * 0.6 + 0.2 
      };
    });

    setParticles(generatedParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-gank-900">
      
      <style>{`
        @keyframes suck-in {
          0% { transform: translate(var(--startX), var(--startY)) scale(1); opacity: 0; }
          10% { opacity: var(--maxOpacity); }
          70% { opacity: var(--maxOpacity); }
          100% { transform: translate(0px, 0px) scale(0); opacity: 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .particle {
          animation: suck-in var(--duration) cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
          animation-delay: var(--delay);
        }
        .ring-spin { animation: spin-slow 30s linear infinite; }
        .ring-spin-fast { animation: spin-slow 20s linear infinite; }
        .ring-spin-reverse { animation: spin-reverse 25s linear infinite; }
      `}</style>

      {/* O container mestre que posiciona o Buraco Negro (Movido levemente para a direita) */}
      <div className="absolute top-1/2 left-1/2 lg:left-[70%] -translate-x-1/2 -translate-y-1/2 w-0 h-0">
        
        {/* 1. O GLOW (Clarão atmosférico de fundo) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] lg:size-[600px] bg-indigo-600/30 blur-[100px] lg:blur-[150px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[250px] bg-gank-600__main/20 blur-[80px] rounded-full" />

        {/* 2. As Partículas Sendo Sugadas */}
        {particles.map((p, i) => (
          <div
            key={i}
            className="particle absolute rounded-full bg-white shadow-[0_0_2px_#fff]"
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

        {/* 3. O Buraco Negro e Anéis Orbitais */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
          <svg viewBox="0 0 600 600" className="w-full h-full opacity-90">
            <defs>
              <radialGradient id="hole-edge" cx="50%" cy="50%" r="50%">
                <stop offset="75%" stopColor="var(--color-gank-400)" stopOpacity="1" />
                <stop offset="85%" stopColor="var(--color-gank-400)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--color-gank-800)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Borda brilhante imediata do horizonte de eventos */}
            <circle cx="300" cy="300" r="115" fill="url(#hole-edge)" />
            <circle cx="300" cy="300" r="200" opacity={.05} fill="url(#hole-edge)" />

            {/* Anel 1 (Interno pontilhado) */}
            <g className="ring-spin-fast transform-origin-center" style={{ transformOrigin: '300px 300px' }}>
              <circle cx="300" cy="300" r="150" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="2 6" />
              {/* Pontos brilhantes orbitando (planetas/detritos) */}
              <circle cx="150" cy="300" r="2.5" fill="#fff" />
              <circle cx="430" cy="230" r="1.5" fill="#a78bfa" />
            </g>

            {/* Anel 2 (Meio reverso) */}
            <g className="ring-spin-reverse transform-origin-center" style={{ transformOrigin: '300px 300px' }}>
              <circle cx="300" cy="300" r="210" fill="none" stroke="rgba(124, 58, 237, 0.2)" strokeWidth="1" strokeDasharray="4 12" />
              <circle cx="300" cy="90" r="2" fill="#fff" />
              <circle cx="480" cy="410" r="1.5" fill="#93c5fd" />
              <circle cx="120" cy="410" r="2" fill="#fff" />
            </g>

            {/* Anel 3 (Externo sutil) */}
            <g className="ring-spin transform-origin-center" style={{ transformOrigin: '300px 300px' }}>
              <circle cx="300" cy="300" r="280" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
              <circle cx="580" cy="300" r="1" fill="#fff" />
              <circle cx="100" cy="100" r="1.5" fill="#a78bfa" />
            </g>

            {/* O Abismo Absoluto (Preto Sólido cobrindo tudo no centro) */}
            <circle cx="300" cy="300" r="100" fill="var(--color-gank-900)" />
          </svg>
        </div>

      </div>
    </div>
  );
}