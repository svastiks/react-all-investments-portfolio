
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './Components/navbar'
import Home from './Pages/Home'
import Itemcard from './Pages/Itemcard'
import TrackerList from './Pages/TrackerList'
import Trending from './Components/Trending'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path='/trending' element={<Trending />} />
        <Route path="/coin/:id" element={<Itemcard />} />
        <Route path="/trackerlist" element={<TrackerList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
      </Routes>


    </BrowserRouter>
  );
}

export default App;
