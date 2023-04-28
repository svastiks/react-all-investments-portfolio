
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './Components/navbar'
import Home from './Pages/Home'
import Itemcard from './Pages/Itemcard'
import TrackerList from './Pages/TrackerList'
import Trending from './Components/Trending'

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path='/trending' element={<Trending />} />
        <Route path="/coin/:id" element={<Itemcard />} />
        <Route path="/trackerlist" element={<TrackerList />} />
        
      </Routes>


    </BrowserRouter>
  );
}

export default App;
