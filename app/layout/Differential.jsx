import React from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import {
  HeartHandshake,
  MousePointerClick,
  Megaphone,
  Clover,
} from 'lucide-react';
import Wrapper from '../components/ui/Wrapper';
import ScrubbingMarqueeWrapper from '../components/animated/ScrubbingMarqueeWrapper';

// Importe o novo componente dinâmico de empilhamento
import DifferentialStack from '../components/animated/DifferentialStackWrapper';

const DIFFERENTIAL_LIST = [
  {
    icon: <HeartHandshake size={40} color={'#f9e2ff'}/>,
    label: 'Não focamos em curtida, focamos em cliente',
  },
  {
    icon: <MousePointerClick size={40} color={'#f9e2ff'}/>,
    label: 'Estratégia baseada em resultado real',
  },
  {
    icon: <Megaphone size={40} color={'#f9e2ff'}/>,
    label: 'Você fala com quem executa',
  },
  {
    icon: <Clover size={40} color={'#f9e2ff'}/>,
    label: 'Nada de “postar e torcer”',
  },
];

export default function Differential() {
  return (
    <article
      className="overflow-hidden bg-gank-shades-100 pt-20"
      id="s-differential"
    >
      <SectionHeader
        badgeIcon="trophy"
        badgeLabel="Nosso diferencial"
        title="Porque escolher a Gank, e como somos diferentes"
        label="É por isso que entregamos resultado do inicio ao fim."
        className="mx-auto text-center lg:max-w-7/12"
      />

      {/* Substituímos o grid fixo pelo novo componente que gerencia o empilhamento */}
      <Wrapper className="mx-auto w-full pt-10 lg:pt-20">
        <DifferentialStack list={DIFFERENTIAL_LIST} />
      </Wrapper>

      <ScrubbingMarqueeWrapper />
    </article>
  );
}