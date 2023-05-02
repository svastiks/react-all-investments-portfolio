import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'

const Login = () => {

  const history = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {

      await axios.post(`http://localhost:3000/login`, {
        email, password
      })
        .then(res => {
          if (res.data === 'Exist') {
            history("/", { state: { id: email } })
          }
          else if (res.data === 'Does not exist') {
            alert('This user has not signed up yet!!')
          }
        })
        .catch(e => {
          alert("Email or password are wrong")
          console.log(e);
        })

    }
    catch (e) {

      console.log(e);

    }
  }

  return (
    <div className="login-cont">

      <h1>LOGIN HERE</h1>

      <form action="POST">

        <div className="email-cont">
          <input type="email" className="email" onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' />
        </div>

        <div className="password-cont">
          <input type="password" className="password" onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' />
        </div>

        <div className="submit">
          <input type="submit" className="submit-input" onClick={submit} />
        </div>

      </form>

      <div className="create-accout">
        <Link to='/signup'>Create an account</Link>
      </div>

    </div>
  )
}

export default Login