import React from 'react';
import Wrapper from '../components/ui/Wrapper';
import StatsGrid from '../components/ui/StatsGrid';
import ListItem from '../components/ui/ListItem';
import Badge from '../components/ui/Badge';
import TypeH2 from '../components/typography/TypeH2Wrapper';
import NotchDivider from './NotchDivider';

const list = {
  error: [
    'Busca solução barata',
    'Não investe em marketing',
    'Não quer estruturar o negócio',
  ],
  success: [
    'Você já fatura pelo menos R$70 mil/mês',
    'Quer crescer com previsibilidade',
    'Quer parar de depender de indicação',
  ],
};

const Public = () => {
  return (
    <>
    <article className="s-diagnostics bg-gank-shades-200" id="s-diagnostics">
      <Wrapper className="lg:flex-col" as="section">
        <div className="lg:flex gap-10 justify-center items-center bg-gank-shades-100 p-5 rounded-2xl mb-5">
          <section className="lg:max-w-1/2 border border-gank-p-100/10 bg-gank-shades-200/20 p-5 rounded-2xl ">
            <Badge icon="question">Para quem é?</Badge>
            <TypeH2 className="mb-2">Esse projeto é para você que</TypeH2>
            <p className="mb-5">
              Já sabe que o marketing digital e uma boa gestão de mídias podem fazer por sua empresa, então se:
            </p>
            <ul>
              {list.success.map((item, i) => (
                <div key={i} className="mb-5">
                  <ListItem text={item} status="success" className="text-gank-p-100" />
                </div>
              ))}
            </ul>
          </section>
          <section className="lg:max-w-1/2 text-gank-mutted-100 p-5 rounded-2xl">
            <TypeH2 className="mb-2">Não é para você que</TypeH2>
            <ul>
              {list.error.map((item, i) => (
                <div key={i} className="mb-5">
                  <ListItem text={item} status="error" />
                </div>
              ))}
            </ul>
          </section>
        </div>
        <StatsGrid />
      </Wrapper>
    </article>
    <NotchDivider/>
    </>
  );
};

export default Public;
