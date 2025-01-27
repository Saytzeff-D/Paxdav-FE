import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path={'/about'} element={<AboutUs />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
