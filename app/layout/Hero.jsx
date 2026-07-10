import Badge from '../components/ui/Badge'; 
import Button from '../components/ui/Button'; 
import Wrapper from '../components/ui/Wrapper'; 
import TypeH1 from '../components/typography/TypeH1'; 
import BlackHoleBackground from '../components/animated/BlackHoleBackground';

export default function Hero() { 
  return ( 
    <>
    <article className="s-hero relative bg-gank-900 min-h-screen flex items-center overflow-hidden" id="s-hero"> 
      
      {/* O Buraco Negro renderizado atrás de tudo */}
      <BlackHoleBackground />

      {/* Névoa leve à esquerda para garantir legibilidade do texto no desktop caso o glow invada muito */}
      <div className="absolute inset-0 bg-linear-to-r from-bg-gank-950 via-bg-gank-950/80 to-transparent pointer-events-none z-0" />

      <Wrapper as="section" className="relative z-10 pt-32 pb-20"> 
        <div className='lg:max-w-7/12'> 
          <Badge icon="trophy" className="bg-white/10 text-white border-white/20">
            Conquiste o mundo
          </Badge> 
          
          <TypeH1 className="text-white mt-6 mb-6"> 
            Pare de depender de indicação para faturar no seu negócio 
          </TypeH1> 
          
          <p className="mb-8 text-gank-p-200 text-lg lg:text-xl"> 
            Se você quer mais clientes, mais constância e parar de ter meses 
            bons e ruins, sua operação de marketing precisa de estrutura. 
          </p> 
          
          <Button>
            Quero mais clientes com previsibilidade
          </Button> 
        </div> 
      </Wrapper>
    </article>
    </>
  ); 
}