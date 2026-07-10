import ScrubbingMarqueeWrapper from './components/animated/ScrubbingMarqueeWrapper';
import Case from './layout/Case';
// import Diagnostics from './layout/Diagnostics';
import Diagnostics from './layout/DiagnosticsWrapper';
import Differential from './layout/Differential';
import Ending from './layout/Ending';
import Hero from './layout/Hero';
import Public from './layout/Public';
// import Steps from './layout/Steps';
import Steps from './layout/StepsWrapper';

export default function Home() {
  return (
    <main className="bg-gank-shades-200 h-lvw">
      <Hero />
      <ScrubbingMarqueeWrapper />
      <Diagnostics />
      <Steps />
      <Case />
      <Differential/>
      <Public/>
      <Ending/>
    </main>
  );
}
