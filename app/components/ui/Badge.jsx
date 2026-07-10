import { Sparkles, Workflow, Star, Trophy, MessageCircleQuestion } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assume a existência do utilitário padrão tailwind-merge/clsx

const ICON_MAP = {
  stars: Sparkles,
  workflow: Workflow,
  star: Star,
  trophy: Trophy,
  question: MessageCircleQuestion,
};

export default function Badge({ children, icon, className }) {
  const IconComponent = ICON_MAP[icon];

  return (
    <>
      {/* Injeção local de keyframes para garantir portabilidade sem alterar o tailwind.config.js */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .animate-bg-shift {
            animation: gradient-shift 5s ease-in-out infinite;
          }
        }
      `}} />

      <span
        className={cn(
          "relative inline-flex select-none overflow-hidden rounded-full p-[1px] mb-4",
          className
        )}
      >
        {/* Efeito performático de Animated Border Shine (via conic-gradient rotativo) */}
        <div
          className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,#E59CFF_100%)] motion-reduce:hidden"
          aria-hidden="true"
        />

        {/* Contêiner interno do Badge (cobre o centro, revelando apenas 1px do shine acima) */}
        <div className="relative flex items-center gap-2 rounded-full bg-[#20182E] px-4 py-1.5">
          
          {/* Background do gradiente com 24% de opacidade (animado, isolado em absolute) */}
          <div
            className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,rgba(229,156,255,0.24),rgba(186,156,255,0.24),rgba(156,178,255,0.24),rgba(229,156,255,0.24))] bg-[length:300%_100%] animate-bg-shift pointer-events-none"
            aria-hidden="true"
          />

          {/* Ícone dinâmico (com cor estática do início do gradiente para evitar conflitos de renderização de clip-text em SVGs no Safari) */}
          {IconComponent && (
            <IconComponent 
              className="relative z-10 h-4 w-4 shrink-0 text-[#E59CFF]" 
              aria-hidden="true"
              width={16}
              height={16}
            />
          )}

          {/* Texto com Gradiente 100% animado em sincronia com o background */}
          <span className="relative z-10 bg-[linear-gradient(90deg,#E59CFF,#BA9CFF,#9CB2FF,#E59CFF)] bg-[length:300%_100%] bg-clip-text text-sm font-medium tracking-wide text-transparent animate-bg-shift truncate max-w-[300px]">
            {children}
          </span>
        </div>
      </span>
    </>
  );
}