'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Wrapper from '../components/ui/Wrapper';
import StatsGrid from '../components/ui/StatsGrid';
import ListItem from '../components/ui/ListItem';
import TypeH2 from '../components/typography/TypeH2Wrapper'; 
import NotchDivider from './NotchDivider';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const list = {
  error: [
    'Tem semanas boas… e outras paradas',
    'Depende de indicação ou “movimento”',
    'Não consegue manter um fluxo de clientes',
    'Já tentou tráfego, mas não teve consistência',
  ],
  success: [
    'Uma oferta bem definida',
    'Um processo de captação',
    'Criativos que chamam atenção',
    'Estrutura mínima de conversão',
  ],
};

export default function DiagnosticsClient() {
  const articleRef = useRef(null);
  const wrapperRef = useRef(null);
  const mainDivRef = useRef(null);
  const sec1Ref = useRef(null);
  const sec2Ref = useRef(null);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 1024px)', 
        isMobile: '(max-width: 1023px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        let { isDesktop, isMobile, reduceMotion } = context.conditions;

        if (reduceMotion) return; 

        // ==========================================
        // DESKTOP: Exatamente o seu código original
        // ==========================================
        if (isDesktop) {
          gsap.set(sec2Ref.current, { autoAlpha: 0 }); 
          gsap.set('.stats-grid-wrapper', { autoAlpha: 0, y: -30 }); 
          gsap.set('.stagger-1', { autoAlpha: 0, y: 20 });
          gsap.set('.stagger-2', { autoAlpha: 0, y: 20 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: articleRef.current,
              start: 'top top',
              end: '+=250%', 
              scrub: 1, 
              pin: true,
              invalidateOnRefresh: true, 
            },
          });

          tl.to('.stagger-1', { autoAlpha: 1, y: 0, stagger: 0.3, duration: 1 });

          tl.add('swap', '+=0.5')
            .to(sec1Ref.current, {
                x: () => sec2Ref.current.offsetLeft - sec1Ref.current.offsetLeft,
                opacity: 0.3,
                duration: 2,
                ease: 'power2.inOut',
              }, 'swap')
            .to(sec2Ref.current, {
                x: () => -(sec2Ref.current.offsetLeft - sec1Ref.current.offsetLeft),
                autoAlpha: 1,
                duration: 2,
                ease: 'power2.inOut',
              }, 'swap')
            .to('.stats-grid-wrapper', {
                autoAlpha: 1,
                y: 0,
                duration: 2,
                ease: 'power2.out',
              }, 'swap'); 

          tl.to('.stagger-2', { autoAlpha: 1, y: 0, stagger: 0.3, duration: 1 }, '+=0.5');
        }

        // ==========================================
        // MOBILE: Animação de Fluxo e Empilhamento
        // ==========================================
        if (isMobile) {
          // 1. Preparação: StatsGrid fica com altura 0 (invisível e não ocupa espaço)
          // Isso garante que o mainDivRef suba no layout nativamente.
          gsap.set('.stats-grid-wrapper', { height: 0, opacity: 0, overflow: 'hidden' });
          
          // 2. Transforma Sec2 em um elemento flutuante sobre a Sec1
          gsap.set(sec2Ref.current, { 
            position: 'absolute', 
            top: 0, left: 0, width: '100%',
            autoAlpha: 0, 
            y: 50 // Inicia levemente abaixo para o efeito "vem de baixo"
          });
          
          // Garante que o card cinza não murche caso a Sec2 seja mais alta que a Sec1
          const maxH = Math.max(sec1Ref.current.offsetHeight, sec2Ref.current.offsetHeight);
          gsap.set(mainDivRef.current, { minHeight: maxH });

          gsap.set('.stagger-1', { autoAlpha: 0, y: 20 });
          gsap.set('.stagger-2', { autoAlpha: 0, y: 20 });

          // 3. A Timeline principal do Mobile
          const tlMobile = gsap.timeline({
            scrollTrigger: {
              trigger: mainDivRef.current, // O Gatilho é a caixa principal
              start: 'top 16px',           // Trava exatamente quando a caixa bate 16px do topo
              end: '+=400%',               // Bastante espaço de scroll para garantir a leitura calma
              scrub: 1,
              pin: wrapperRef.current,     // Fixamos o Wrapper inteiro para poder mover o conteúdo dentro dele livremente
              invalidateOnRefresh: true,
            }
          });

          // Espaço de leitura segura da tela
          const availableHeight = window.innerHeight - 32; // 16px top + 16px margem inferior

          // FASE 1: Renderiza os itens da Sec 1
          tlMobile.to('.stagger-1', { autoAlpha: 1, y: 0, stagger: 0.2, duration: 1 });

          // FASE 2: Leitura Dinâmica (Scroll automático atrelado ao dedo do usuário)
          const h1 = sec1Ref.current.offsetHeight;
          if (h1 > availableHeight) {
            const overflow1 = h1 - availableHeight;
            // Se o conteúdo vazar, deslizamos a caixa principal para cima para o usuário ler o final
            tlMobile.to(mainDivRef.current, { y: -overflow1, duration: overflow1 / 100, ease: 'none' }, "+=0.2");
          }

          // FASE 3: A Troca (Swap)
          tlMobile.add('swap', '+=0.5')
            .to(mainDivRef.current, { y: 0, duration: 1, ease: 'power2.inOut' }, 'swap') // Retorna a caixa ao topo para a troca
            .to(sec1Ref.current, { opacity: 0.2, duration: 1, scale: .9, }, 'swap') // Sec1 perde foco
            .to(sec2Ref.current, { autoAlpha: 1, y: '16px', x: '16px', duration: 1, ease: 'power2.out', width: 'calc(100% - 32px)',  }, 'swap'); // Sec2 surge de baixo para cima

          // FASE 4: Renderiza os itens da Sec 2
          tlMobile.to('.stagger-2', { autoAlpha: 1, y: 0, stagger: 0.2, duration: 1 });

          // FASE 5: Leitura Dinâmica Sec 2
          const h2 = sec2Ref.current.offsetHeight;
          if (h2 > availableHeight) {
            const overflow2 = h2 - availableHeight;
            tlMobile.to(mainDivRef.current, { y: -overflow2, duration: overflow2 / 100, ease: 'none' }, "+=0.2");
          }

          // FASE 6: Aparição do StatsGrid (O Empurrão)
          tlMobile.add('stats', '+=0.5')
            .to(mainDivRef.current, { y: 0, duration: 1, ease: 'power2.inOut' }, 'stats') // Centraliza a caixa
            // Como o StatsGrid está fisicamente acima no DOM, abrir sua altura ('auto') empurra naturalmente a caixa para baixo.
            .to('.stats-grid-wrapper', { height: 'auto', autoAlpha: 1, duration: 1, ease: 'power2.out' }, 'stats');
        }
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <>
    <article ref={articleRef} className="s-diagnostics bg-gank-shades-200 min-h-screen pt-20 pb-20" id="s-diagnostics">
      
      <Wrapper ref={wrapperRef} className="lg:flex-col gap-10" as="section">
        
        
        <div className="stats-grid-wrapper w-full">
          <StatsGrid />
        </div>

        
        <div ref={mainDivRef} className="lg:flex lg:gap-10 bg-gank-shades-100 p-5 rounded-2xl relative w-full"> 
          
          <section ref={sec1Ref} className="lg:max-w-1/2 text-gank-mutted-100 p-5 rounded-2xl mb-5 lg:mb-0">
            <div className="stagger-1">
              <TypeH2 className="mb-2">Seu negócio se parece com isso?</TypeH2>
            </div>
            <p className="mb-5 stagger-1">
              Se sua empresa está em algum destes pontos, não é falta de cliente, é sistema.
            </p>
            <ul>
              {list.error.map((item, i) => ( 
                <ListItem key={i} text={item} status="error" className="mb-5 stagger-1" />
              ))}
            </ul>
          </section>

          <section ref={sec2Ref} className="lg:max-w-1/2 border border-gank-p-100/10 bg-gank-shades-200 p-5 rounded-2xl shadow-2xl shadow-gank-shades-100">
            <div className="stagger-2">
              <TypeH2 className="mb-2">Tráfego sozinho não resolve</TypeH2>
            </div>
            <p className="mb-5 stagger-2">
              Quando você não tem estrutura, anúncios não sustentam resultado, você precisa de:
            </p>
            <ul>
              {list.success.map((item, i) => (
                <ListItem key={i} text={item} status="success" className="mb-5 text-gank-p-100 stagger-2" />
              ))}
            </ul>
          </section>

        </div>
      </Wrapper>
    </article>
    <NotchDivider/>
    </>
  );
}