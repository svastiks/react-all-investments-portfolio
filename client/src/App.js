
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Itemcard from './Pages/Itemcard'
import TrackerList from './Pages/TrackerList'
import Login from './Pages/Login'
import Signup from './Pages/Signup'


function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<Itemcard />} />
        <Route path="/trackerlist" element={<TrackerList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />

      </Routes>


    </BrowserRouter>
  );
}

export default App;
