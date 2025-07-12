
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Itemcard from './Pages/Itemcard'
import TrackerList from './Pages/TrackerList'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import ProfitCalculatorPage from './Pages/ProfitCalculatorPage'
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const lastPing = localStorage.getItem('lastPing');
    const now = Date.now();
    const TEN_MINUTES = 10 * 60 * 1000;
    if (!lastPing || now - parseInt(lastPing, 10) > TEN_MINUTES) {
      fetch(`${process.env.REACT_APP_API_URL}/ping`).catch(() => {});
      localStorage.setItem('lastPing', now.toString());
      console.log('Backend ping sent to /ping');
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<Itemcard />} />
        <Route path="/trackerlist" element={<TrackerList />} />
        <Route path="/calculator" element={<ProfitCalculatorPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
