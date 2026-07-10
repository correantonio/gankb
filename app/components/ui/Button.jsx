'use client';

import React, { useRef, useEffect } from 'react';

export default function Button({ children = 'Quero mais clientes com previsibilidade', href = '#oferta' }) {
  const wrapperRef = useRef(null);
  const btnRef = useRef(null);
  
  // Usamos Refs para os IDs de animação/timeout para não causar re-render
  const rafId = useRef(null);
  const timeoutId = useRef(null);

  const handleMouseMove = (e) => {
    if (!wrapperRef.current || !btnRef.current) return;
    
    // Evita o empilhamento de eventos de mouse, garantindo 60fps cravados
    if (rafId.current !== null) return;

    rafId.current = requestAnimationFrame(() => {
      clearTimeout(timeoutId.current);
      btnRef.current.classList.add('ativo');

      // 1. Cálculos do Wrapper (Brilhos Externos)
      const wr = wrapperRef.current.getBoundingClientRect();
      const xW = e.clientX - wr.left;
      const ratio = Math.min(Math.max(xW / wr.width, 0), 1); // Garante que o valor fique entre 0 e 1

      wrapperRef.current.style.setProperty('--R4h', ratio.toFixed(2));
      wrapperRef.current.style.setProperty('--K9y', (1 - ratio).toFixed(2));
      wrapperRef.current.style.setProperty('--dg2', (ratio * 0.2).toFixed(2));
      wrapperRef.current.style.setProperty('--dg1', ((1 - ratio) * 0.2).toFixed(2));

      // 2. Cálculos do Botão Interno (Flashlight)
      const br = btnRef.current.getBoundingClientRect();
      const xB = e.clientX - br.left;
      const pct = (xB / br.width) * 100 - 100; // Vai de -100% a 0%
      btnRef.current.style.setProperty('--J7p', pct + '%');

      rafId.current = null;
    });
  };

  const handleMouseLeave = () => {
    // Cancela qualquer frame pendente
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }

    if (btnRef.current) {
      btnRef.current.classList.remove('ativo');
    }

    // Delay de 1 segundo para resetar as variáveis, copiando o script original
    timeoutId.current = setTimeout(() => {
      if (!wrapperRef.current || !btnRef.current) return;
      wrapperRef.current.style.setProperty('--R4h', '1');
      wrapperRef.current.style.setProperty('--K9y', '0');
      wrapperRef.current.style.setProperty('--dg2', '0.2');
      wrapperRef.current.style.setProperty('--dg1', '0');
      btnRef.current.style.setProperty('--J7p', '10%');
    }, 1000);
  };

  // Limpa os timeouts se o componente for destruído
  useEffect(() => {
    return () => clearTimeout(timeoutId.current);
  }, []);

  return (
    <a
      ref={wrapperRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative inline-flex w-fit items-center justify-center outline-none"
      style={{
        '--R4h': '1',
        '--K9y': '0',
        '--dg2': '0.2',
        '--dg1': '0',
      }}
    >
      {/* ========================================== */}
      {/* 1. GLOWS EXTERNOS (Desativados no Mobile) */}
      {/* ========================================== */}
      {/* O hidden md:block replica a sua regra de media query (max-width: 767px) { display: none } */}
      <div className="absolute inset-0 z-0 hidden md:block">
        
        {/* Glow Esquerdo (Roxo) */}
        <div
          className="absolute top-0 bottom-0 left-2 right-1/2 rounded-full blur-2xl transition-all duration-200"
          style={{
            background: 'var(--color-gank-700)',
            opacity: 'var(--K9y)', // Opacidade 100% quando o mouse está na esquerda
            transform: 'scale(calc(1 + var(--dg1)))'
          }}
        />
        
        {/* Glow Direito */}
        <div
          className="absolute top-0 bottom-0 left-1/2 right-2 rounded-full blur-2xl transition-all duration-200"
          style={{
            background: 'var(--color-gank-600__main)',
            opacity: 'var(--R4h)', // Opacidade 100% quando o mouse está na direita
            transform: 'scale(calc(1 + var(--dg2)))'
          }}
        />
      </div>

      {/* ========================================== */}
      {/* 2. BOTÃO PRINCIPAL */}
      {/* ========================================== */}
      <div
        ref={btnRef}
        // Design Premium: Borda sutil de vidro, fundo escuro e transição na escala (pulo leve) no hover
        className="relative z-10 flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-linear-90 to-gank-600__main/25 from-gank-600__main px-8 py-4 text-white shadow-xl transition-all duration-300 group-hover:scale-[1.02] group-hover:border-white/30"
        style={{ '--J7p': '10%' }}
      >
        
        {/* A LUZ INTERNA (Flashlight) que acompanha o mouse */}
        <div
          className="absolute top-1/2 size-[200px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hidden md:block"
          style={{
            left: 'calc(100% + var(--J7p))',
            background: 'radial-gradient(circle, var(--color-gank-500), transparent 60%)',
          }}
        />

        {/* O Texto do Botão */}
        <span className="relative z-20 text-lg tracking-wide">
          {children}
        </span>
      </div>
    </a>
  );
}