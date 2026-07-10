import React from 'react';
import Wrapper from '../components/ui/Wrapper';
import SectionHeader from '../components/ui/SectionHeader';
import ListItem from '../components/ui/ListItem';

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
          <div className="flex items-end lg:max-w-1/2 lg:w-1/2 text-gank-mutted-100 p-5 rounded-2xl border border-gank-p-100/5 min-h-[400px] mb-10 lg:mb-0">
            <ul>
              {list.error.map((item, i) => (
                <ListItem
                  key={i}
                  text={item}
                  status="error"
                  className="mb-5 text-gank-mutted-100"
                />
              ))}
            </ul>
          </div>
          <div className="lg:max-w-1/2 lg:w-1/2">
            <div className="flex items-end p-5 rounded-2xl border border-gank-p-100/5 min-h-[400px] bg-gank-shades-100 shadow-2xl">
              <ul>
                {list.success.map((item, i) => (
                  <ListItem
                    key={i}
                    text={item}
                    status="success"
                    className="mb-5 text-gank-p-100"
                  />
                ))}
              </ul>
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
