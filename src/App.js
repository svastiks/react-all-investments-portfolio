
import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './Components/navbar'
import Home from './Pages/Home'
import Itemcard from './Pages/Itemcard'
import TrackerList from './Pages/TrackerList'

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route to='/' element={<Home />} />
        <Route path="/coin/:id" element={<Itemcard />} />
        <Route path="/trackerlist" element={<TrackerList />}/>
        <Route path=
      </Routes>


    </BrowserRouter>
  );
}

export default App;
