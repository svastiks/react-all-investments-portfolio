import { useState, useEffect } from 'react'
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

    <div className='login-body'>

      <form onSubmit={loginUser}>
        <div className="login-cont">
          <img className='login-logo' src='Images/logo.png' alt='logo'></img>

          {/* <h1 className="login-heading">Login</h1> */}
          <input className="email" value={email} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input> <br></br>

          <input className="password" value={password} type="password" placeholder="Password" onChange={(e) => (setPassword(e.target.value))}></input> <br></br>

          <input className="login-btn" type="submit" value="Login"></input>

          {login ? null : <h4 className="login-unsuccessful">Email or password entered is incorrect. <br></br>Please try again.</h4>}
          {loginDone ? <h2 className='login-successful'>LOGIN SUCCESSFUL!</h2> : null}

          <Link className='no-account' to='/register'>Don't have an account? Sign up here</Link>
        </div>
      </form>

    </div >

  )
}
