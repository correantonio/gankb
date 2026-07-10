import React from 'react';
import { cn } from '@/lib/utils'; // Utilitário de classes (padrão do shadcn/Tailwind)

export default function NotchDivider({ className, topColorClass, bottomColorClass }) {
  return (
    // O container (fundo) recebe a cor da seção de BAIXO
    <div className={cn('w-full overflow-hidden leading-none block -mb-[1px]', bottomColorClass, className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 157"
        fill="none"
        preserveAspectRatio="none"
        // O SVG (preenchimento sólido) recebe a cor da seção de CIMA
        // A altura foi mapeada para ser responsiva, chegando aos 157px originais no Desktop
        className={cn('w-full h-[60px] md:h-[100px] lg:h-[157px] fill-current', topColorClass)}
        aria-hidden="true"
      >
        {/* O Path exato extraído do Atomik */}
        <path color='var(--color-gank-shades-100)'
          d="M0.0184922 0C0.0184922 0 0.000316113 82.5895 0 156.458C0 156.458 1052.72 155.824 1209.65 155.825C1366.58 155.824 1920 156.458 1920 156.458C1920 82.5895 1919.98 0 1919.98 0H1613.13C1598.25 0 1583.99 5.79175 1573.48 16.1006L1522.02 66.5445C1506.36 81.956 1494.86 81.956 1483.32 81.956C1462.85 81.956 1382.4 81.9585 1381.61 81.9585V81.956H443.816C432.271 81.956 420.772 81.956 405.108 66.5445L353.657 16.1006C343.138 5.79175 328.878 0 313.998 0H0.0184922Z" 
        />
      </svg>
    </div>
  );
}