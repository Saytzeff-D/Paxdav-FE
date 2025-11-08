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
import PaymentPage from './pages/PaymentPage';
import PaymentStatus from './pages/PaymentStatus';

function App() {
  const location = useLocation()
  const uri = process.env.REACT_APP_BASEURL
  // const uri = "http://localhost:1000/"
  return (
    <div>
      {
        location.pathname.includes('/admin-chat')
        ?      
        console.log()
        :
        location.pathname.includes('/chat-room')
        ?
        console.log()
        :
        location.pathname.includes('/payment')
        ?
        console.log()
        :
        <Navbar />
      }
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path={'/about'} element={<AboutUs />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/services' element={<Services />} />
        <Route path='/admin-chat' element={<AdminChat uri={uri} />} />
        <Route path='/chat-room/:id' element={<CustomerChat uri={uri} />} />
        <Route path='/request-quote' element={<RequestQuote uri={uri} />} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path='/payment-status' element={<PaymentStatus uri={uri} />} />
      </Routes>
      {
        location.pathname == '/admin-chat'
        ?      
        console.log()
        :
        location.pathname.includes('/chat-room')
        ?
        console.log()
        :
        location.pathname.includes('/payment')
        ?
        console.log()
        :
        <Footer uri={uri} />
      }
    </div>
  );
}

export default App;
