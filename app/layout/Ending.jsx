import React from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import { BellCheck, FlipHorizontal2, HeartHandshake } from 'lucide-react';
import Wrapper from '../components/ui/Wrapper';
import Button from '../components/ui/Button';

const ENDING_LIST = [
  {
    icon: BellCheck,
    label: 'como gerar mais clientes',
  },
  {
    icon: FlipHorizontal2,
    label: 'onde você perde oportunidades',
  },
  {
    icon: HeartHandshake,
    label: 'o que precisa ajustar pra crescer',
  },
];

const Ending = () => {
  return (
    <footer className="s-ending bg-gank-shades-100" id="s-ending">
      <SectionHeader
        badgeIcon="stars"
        badgeLabel="Não perca tempo"
        title="Solicite uma análise do seu negócio"
        label="Negócio que depende de indicação, não cresce com controle, entre em contato e vamos te mostrar"
        className="mx-auto text-center lg:max-w-5/12 pt-20 lg:mb-0 px-4"
      />
      <Wrapper className="lg:flex-col items-center gap-10">
        <div className="lg:flex gap-10 mx-auto">
          {ENDING_LIST.map(({ icon: IconComponent, label }, index) => {
            return (
              <div
                key={index}
                className={`bg-gank-shades-200/50 border border-gank-p-200/20 lg:w-4/12 lg:max-w-4/12 p-10 rounded-lg lg:min-h-60 lg:flex flex-col justify-end mb-5 lg:mb-0`}
              >
                <div className="mb-5">
                  <IconComponent
                    strokeWidth={1.5}
                    size={24}
                    className="text-gank-p-100"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-2xl! text-gank-p-200 lg:max-w-50">{label}</p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col items-center gap-2 lg:items-start lg:gap-4">
          <Button>Quero mais clientes</Button>
          <small className="text-gank-p-200">
            Tenha a previsibilidade que seu negócio precisa
          </small>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Ending;
