import React from 'react';
import Wrapper from '../components/ui/Wrapper';
import SectionHeader from '../components/ui/SectionHeader';
import ListItem from '../components/ui/ListItem';
import Image from 'next/image';

const list = {
  error: [
    'Sem previsibilidade',
    'Movimento irregular',
    'Baixo volume de pedidos',
  ],
  success: [
    'Campanhas focadas em conversão',
    'Criativos direcionados',
    'Ajuste de oferta',
  ],
};

import megustaLogo from '../assets/04-case/megusta-logo.png'
import bestResult from '../assets/04-case/img-best-result.avif'
import lowerResult from '../assets/04-case/img-lower-result.avif'

const Case = () => {
  return (
    <article className="s-case bg-gank-shades-200" id="s-case">
      <Wrapper as="section" className="lg:flex-col">
        <SectionHeader
          badgeIcon="star"
          badgeLabel="Um case real"
          title="Veja a transformação deste cliente"
          label="Conheça o Delivery que dependia de indicação"
        />

        <div className="w-full lg:flex gap-10">
          <div className="flex items-end lg:max-w-1/2 lg:w-1/2 text-gank-mutted-100 p-5 rounded-2xl border border-gank-p-100/5 min-h-[400px] mb-10 lg:mb-0 relative overflow-hidden z-10 lg:max-h-[400px]">
            <ul className='z-10'>
              {list.error.map((item, i) => (
                <ListItem
                  key={i}
                  text={item}
                  status="error"
                  className="mb-5 text-gank-p-100/50"
                />
              ))}
            </ul>
            <div className='absolute w-full h-3/4 left-0 bottom-0 bg-linear-180 from-gank-shades-100/0 to-gank-shades-100 ' />
            <Image src={lowerResult} width={620} alt='A Gank traz transformação através do anúncio e marketing de sucesso' className='absolute size-full object-cover left-0 bottom-0 -z-10'/>
          </div>
          <div className="lg:max-w-1/2 lg:w-1/2">
            <div className="z-10 flex items-end p-5 rounded-2xl border border-gank-p-100/5 min-h-[400px] bg-gank-shades-100 relative overflow-hidden shadow-2xl lg:max-h-[400px]">
            <Image src={megustaLogo} width={128} alt='logotipo Me Gusta la Brasa Hamburgueria, um case de sucesso com a Gank' className='absolute top-5 left-5 z-10 shadow-2xl shadow-gank-shades-100 rounded' />
              <ul className='z-10'>
                {list.success.map((item, i) => (
                  <ListItem
                    key={i}
                    text={item}
                    status="success"
                    className="mb-5 text-gank-p-100"
                  />
                ))}
              </ul>
              <Image  src={bestResult} alt='The best result gank' width={620} height={400} className='absolute size-full object-cover top-0 left-0'/>
              <div className='absolute w-full h-3/4 left-0 bottom-0 bg-linear-180 from-gank-shades-100/0 to-gank-shades-100 ' />
            </div>
            <p className="mt-4">
              aumento consistente de pedidos e previsibilidade no faturamento
            </p>
          </div>
        </div>
      </Wrapper>
    </article>
  );
};

export default Case;
