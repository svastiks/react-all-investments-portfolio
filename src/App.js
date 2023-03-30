
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './Components/navbar'
import { Trackerlist } from './Components/trackerlist'
import { Login } from './Components/login'
import { Signup } from './Components/signup'
import { Search } from './Components/search'
import { Cards } from './Components/itemcard'
import { useState } from 'react' 

function App() {
  return (
    <Router>

      <Navbar />
      <Search />

      <Cards />

      <Routes>

        <Route path="/" />
        
        <Route path="/trackerlist" />
        <Route path="/expanded" />

      </Routes>


    </Router>
  );
}

export default App;
