import { useState, useEffect } from 'react'
// const jwt = require('jsonwebtoken')
// import jwt from 'jsonwebtoken'
// import crypto from 'crypto'

const Buffer = require('buffer').Buffer;


export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch(`http://localhost:1337/api/login`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await response.json()

    const token = data.user;
    const payload = token.split('.')[1];

    // Base64 URL decode and convert to string
    const decodedPayload = Buffer.from(payload, 'base64').toString('utf8');

    // Parse the JSON payload
    const jsonPayload = JSON.parse(decodedPayload);

    sessionStorage.setItem('name', jsonPayload.name)

    if (data.user) {
      alert('Login successful')

      sessionStorage.setItem('Login', 'LoggedIn');

      setTimeout(() => {
        window.location.href = '/'
      }, 1000)

    }
    else {
      alert('Please check your username and password')
    }

  }

  return (

    <div className='login-body'>

      <form onSubmit={loginUser}>
        <div className="login-cont">
          <img className='login-logo' src='Images/logo.png' alt='logo'></img>

          {/* <h1 className="login-heading">Login</h1> */}
          <input className="email" value={email} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input> <br></br>

          <input className="password" value={password} type="password" placeholder="Password" onChange={(e) => (setPassword(e.target.value))}></input> <br></br>

          <input className="login-btn" type="submit" value="Login"></input>
        </div>
      </form>

    </div >

  )
}
