import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AboutUs from './pages/AboutUs';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import Home from './pages/Home';
import AdminChat from './pages/AdminChat';

function App() {
  const location = useLocation()
  return (
    <div>
      {
        location.pathname !== '/admin-chat'
        &&
        <Navbar />
      }
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path={'/about'} element={<AboutUs />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/services' element={<Services />} />
        <Route path='/admin-chat' element={<AdminChat />} />
      </Routes>
      {
        location.pathname !== '/admin-chat'
        &&
        <Footer />
      }
    </div>
  );
}

export default App;
