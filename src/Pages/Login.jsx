import React from 'react'

const Login = () => {
  return (
    <div className="login-cont">

        <div className="username-cont">
            <input type="text" className="username" placeholder='Username'/>
        </div>

        <div className="password-cont">
            <input type="text" className="password" placeholder='Password'/>
        </div>

        <div className="create-accout">
            Create an account
        </div>

    </div>
  )
}

export default Login