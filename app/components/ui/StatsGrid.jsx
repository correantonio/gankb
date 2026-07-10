'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ChartLine,
  BriefcaseBusiness,
  BadgeDollarSign,
  FlagTriangleRight,
} from 'lucide-react';

const STATS_ITEMS = [
  { id: 1, text: 'Operações estruturadas para crescimento', Icon: ChartLine },
  { id: 2, text: '+200 negócios atendidos', Icon: BriefcaseBusiness },
  { id: 3, text: '+R$12M gerados em vendas', Icon: BadgeDollarSign },
  {
    id: 4,
    text: 'A agência que dá resultados para você',
    Icon: FlagTriangleRight,
  },
];

export default function StatsGrid() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div
        ref={containerRef}
        className="grid w-full grid-cols-2 grid-rows-2 gap-[10px] rounded-lg bg-gank-shades-100 p-[10px] lg:w-11/12 lg:max-w-none lg:flex lg:flex-row lg:items-stretch mx-auto mb-5"
      >
        {STATS_ITEMS.map((item, index) => {
          const { id, text, Icon } = item;
          const isLast = index === STATS_ITEMS.length - 1;

          return (
            <div
              key={id}
              className={`
                flex flex-1 lg:items-center flex-col lg:flex-row items-start justify-center gap-5 rounded-lg p-[10px] transition-all duration-700 ease-out
                ${isLast ? 'bg-transparent' : 'bg-gank-shades-200'}
                ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}
                motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none
              `}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gank-100 text-gank-600__main"
                aria-hidden="true"
              >
                <Icon size={20} strokeWidth={2} width={24} height={24} />
              </div>

              <p className="text-xs font-medium leading-snug text-white md:text-sm">
                {text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
