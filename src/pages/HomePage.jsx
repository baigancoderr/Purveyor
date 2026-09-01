import Hero           from '../components/Hero';
import About          from '../components/About';
import UseCases       from '../components/UseCases';
import Roadmap        from '../components/Roadmap';
import Ecosystem      from '../components/Ecosystem';
import Tokenomics     from '../components/Tokenomics';
import ContractAddress from '../components/ContractAddress';
import FAQ            from '../components/FAQ';
import FinalCTA       from '../components/FinalCTA';

const HomePage = () => (
  <main>
    <Hero />
    <About />
    <UseCases />
    <Roadmap />
    <Ecosystem />
    <Tokenomics />
    <ContractAddress />
    <FAQ />
    <FinalCTA />
  </main>
);

export default HomePage;
