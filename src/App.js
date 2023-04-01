
import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './Components/navbar'
import Home from './Pages/Home'
import Itemcard from './Pages/Itemcard'

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route index element={<Home />} />
        <Route path="/:id" element={<Itemcard />} />
        <Route path="/trackerlist" />

      </Routes>


    </BrowserRouter>
  );
}

export default App;
