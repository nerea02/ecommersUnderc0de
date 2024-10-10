import ButtonHeader from './components/ButtonHeader.jsx';
import TopHeader from './components/TopHeader.jsx'; 
import Hero from './components/Hero.jsx'; 
import Chip from './components/Chip.jsx'; 
import Footer from './components/Footer.jsx'; 
import Card from './components/Card.jsx'; 


function App() {
  return (
    <>
      <TopHeader />
      <ButtonHeader />
      <Hero />
      <Chip />
      <Card 
       image="./remeraUnder.jpg" 
       name="Remera Underc0de" 
       price="30.000" 
      />

      <Card 
       image="./tazaUnder.jpg" 
       name="Taza Underc0de" 
       price="8.000" 
      />
      <Footer />
    </>
  );
}

export default App;
