import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot }from 'react-dom/client'
import Navbar from '../components/Navbar'
import HeaderText from '../components/Body'
import FooterText from '../components/Footer'


createRoot(document.getElementById("navbar-render")).render(<Navbar />)

createRoot(document.getElementById("body-content")).render(<HeaderText />)

createRoot(document.getElementById("footer")).render(<FooterText />)



export default App
