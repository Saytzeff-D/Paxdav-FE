import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AboutUs from './pages/AboutUs';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import Home from './pages/Home';
import AdminChat from './pages/AdminChat';
import RequestQuote from './pages/RequestQuote';
import CustomerChat from './pages/CustomerChat';

function App() {
  const location = useLocation()
  const uri = 'http://localhost:1000/'
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
        <Route path='/chat-room/:id' element={<CustomerChat uri={uri} />} />
        <Route path='/request-quote' element={<RequestQuote uri={uri} />} />
      </Routes>
    </div>
  );
}

export default App;
