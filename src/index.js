import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


function Header(){
  return(
  <div>Investment Tracker</div>)
}


ReactDOM.createRoot(document.getElementById('root')).render(<Header />)
