import { useState } from 'react'
// const jwt = require('jsonwebtoken')
// import jwt from 'jsonwebtoken'
// import crypto from 'crypto'
import { Link } from 'react-router-dom'

const Buffer = require('buffer').Buffer;

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState(true)
  const [loginDone, setLoginDone] = useState(false)


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
    console.log(data)

    if (data.status !== 'error') {
      setLoginDone(true)
      sessionStorage.setItem('Login', 'LoggedIn');
      setTimeout(() => {
        window.location.href = '/'
      }, 700)
      setLogin(true)
    }
    else {
      setLogin(false)
      setLoginDone(false)
    }

    const token = data.user;
    const payload = token.split('.')[1];

    // Base64 URL decode and convert to string
    const decodedPayload = Buffer.from(payload, 'base64').toString('utf8');

    // Parse the JSON payload
    const jsonPayload = JSON.parse(decodedPayload);

    sessionStorage.setItem('name', jsonPayload.name)

  }

  return (
    <main className="auth-modern-bg">
      <div className="auth-card">
        <form onSubmit={loginUser} className="auth-form">
          <div className="auth-logo-wrap">
            <img className='auth-logo' src='Images/logo.png' alt='logo' />
          </div>
          <h2 className="auth-title">Login</h2>
          <input className="auth-input" value={email} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input className="auth-input" value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button className="auth-btn" type="submit">Login</button>
          {login ? null : <div className="auth-error">Email or password entered is incorrect. Please try again.</div>}
          {loginDone ? <div className='auth-success'>LOGIN SUCCESSFUL!</div> : null}
          <Link className='auth-link' to='/register'>Don't have an account? Sign up here</Link>
        </form>
      </div>
    </main>
  )
}
