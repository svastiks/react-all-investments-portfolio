import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import MainNavbar from '../components/MainNavbar'
import HeaderText from '../components/Body'
import FooterText from '../components/Footer'
// import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
 


createRoot(document.getElementById("navbar-render")).render(<MainNavbar />)

createRoot(document.getElementById("body-content")).render(<HeaderText />)

createRoot(document.getElementById("footer")).render(<FooterText />)



export default App
