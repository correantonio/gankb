import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Wrapper from '../components/ui/Wrapper';
import TypeH1 from '../components/typography/TypeH1';
import BlackHoleBackground from '../components/animated/BlackHoleBackground';

import gank from '@/app/assets/01-hero/Gank.png';
import G from '@/app/assets/01-hero/G.svg';
import Image from 'next/image';

export default function Hero() {
  return (
    <>
      <article
        className="s-hero relative bg-gank-900 min-h-svh flex items-center overflow-hidden"
        id="s-hero"
      >
        {/* O Buraco Negro renderizado atrás de tudo */}
        <BlackHoleBackground />

        {/* Névoa leve à esquerda para garantir legibilidade do texto no desktop caso o glow invada muito */}
        <div className="absolute inset-0 bg-linear-to-r from-bg-gank-950 via-bg-gank-950/80 to-transparent pointer-events-none z-0" />

        <Wrapper as="section" className="relative z-10 pt-20 pb-20">
          <div className="lg:max-w-7/12 text-center lg:text-left">
            <div className="flex items-center gap-1 justify-center lg:justify-start">
              <Badge icon="trophy">
                Conquiste o mundo com a
                </Badge>
              <span className="px-4 py-2 rounded-full bg-gank-shades-100 border border-gank-p/25 mb-3">
                <Image src={gank} width={56} alt="logo" className="brightness-200" />
              </span>
            </div>

            <TypeH1 className="text-white mt-6 mb-6">
              <span className="bg-gank-600__main px-4 lg:inline-block">Pare de depender</span> de indicação para faturar no seu negócio
            </TypeH1>

            <p className="mb-8 text-gank-p-200 text-lg lg:text-xl">
              Se você quer mais clientes, mais constância e parar de ter meses
              bons e ruins, sua operação de marketing precisa de estrutura.
            </p>

            <div className="flex flex-col items-center gap-2 lg:items-start lg:gap-4">
              <Button>Quero mais clientes</Button>
              <small className="text-gank-p-200">Tenha a previsibilidade que seu negócio precisa</small>
            </div>
          </div>
        </Wrapper>
      </article>
    </>
  );
}
