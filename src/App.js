import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AboutUs from './pages/AboutUs';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path={'/about'} element={<AboutUs />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/services' element={<Services />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
