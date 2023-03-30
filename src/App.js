
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './Components/Navbar'

function App() {
  return (
    <Router>

      <Navbar />

      <Routes>

        <Route path="/" />
        <Route path="/expanded" />

      </Routes>


    </Router>
  );
}

export default App;
