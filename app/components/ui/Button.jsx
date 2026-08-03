'use client';

import { ArrowUpRight } from 'lucide-react';
import React, { useRef } from 'react';

export default function Button({ children = 'Quero mais clientes com previsibilidade', href = '#oferta' }) {
  const buttonRef = useRef(null);

  const handlePointerMove = (e) => {
    if (!buttonRef.current) return;
    
    // Obtenção da posição local do cursor de forma síncrona e leve
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Razão de 0 a 1 para gerenciar as opacidades dos glows externos
    const xPct = Math.min(Math.max(x / rect.width, 0), 1);

    // Injeção direta e isolada sem forçar reflow
    buttonRef.current.style.setProperty('--mouse-x', `${x}px`);
    buttonRef.current.style.setProperty('--mouse-y', `${y}px`);
    buttonRef.current.style.setProperty('--mouse-x-pct', xPct);
  };

  const handlePointerLeave = () => {
    if (!buttonRef.current) return;
    // Reseta suavemente o glow para o centro quando o mouse sai
    buttonRef.current.style.setProperty('--mouse-x-pct', '0.5');
  };

  return (
    <a
      ref={buttonRef}
      href={href}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="group relative inline-flex w-fit items-center justify-center outline-none rounded-full [touch-action:manipulation] focus-visible:ring-2 focus-visible:ring-gank-600__main focus-visible:ring-offset-2 focus-visible:ring-offset-gank-900"
      style={{
        '--mouse-x-pct': '0.5',
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      }}
    >
      {/* ========================================== */}
      {/* 1. GLOWS EXTERNOS (Desativados no Mobile) */}
      {/* ========================================== */}
      {/* A classe -inset-10 expande o contêiner limitador e evita o corte (clipping) do blur pelo compositor gráfico */}
      <div className="absolute -inset-10 z-0 hidden md:block pointer-events-none">
        
        {/* Glow Esquerdo (Roxo) */}
        <div
          className="absolute top-0 bottom-0 left-10 right-1/2 rounded-full blur-2xl transition-[opacity,transform] duration-300"
          style={{
            background: 'var(--color-gank-700)',
            opacity: 'calc(1 - var(--mouse-x-pct))',
            transform: 'scale(calc(1 + ((1 - var(--mouse-x-pct)) * 0.2)))'
          }}
        />
        
        {/* Glow Direito */}
        <div
          className="absolute top-0 bottom-0 left-1/2 right-10 rounded-full blur-2xl transition-[opacity,transform] duration-300"
          style={{
            background: 'var(--color-gank-600__main)',
            opacity: 'var(--mouse-x-pct)',
            transform: 'scale(calc(1 + (var(--mouse-x-pct) * 0.2)))'
          }}
        />
      </div>

      {/* ========================================== */}
      {/* 2. BOTÃO PRINCIPAL */}
      {/* ========================================== */}
      <div
        className="relative z-10 flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-linear-to-r from-gank-600__main to-gank-600__main/25 px-8 py-4 text-white shadow-xl transition-transform duration-300 group-hover:scale-[1.02] group-hover:border-white/30"
      >
        {/* A LUZ INTERNA (Flashlight) ancorada via CSS puro nas variáveis globais do botão */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100 hidden md:block"
          style={{
            background: 'radial-gradient(120px circle at var(--mouse-x) var(--mouse-y), var(--color-gank-500), transparent 100%)',
          }}
        />

        <span className="relative z-20 text-lg tracking-wide flex gap-2 items-center">
          {children}
          <ArrowUpRight aria-hidden="true" size={20} />
        </span>
      </div>
    </a>
  );
}