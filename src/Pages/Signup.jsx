import React from 'react'

const Signup = () => {
  return (
    <div className="signup-cont">

        <div className="firstname-cont">
            <input type="text" className="firstname" placeholder='First Name' />
        </div>

        <div className="lastname-cont">
            <input type="text" className="lastname" placeholder='Last Name' />
        </div>

        <div className="email-cont">
            <input type="text" className="email" placeholder='EMAIL' />
        </div>

        <div className="password-cont">
            <input type="text" className="password" placeholder='Password' />
        </div>

        <div className="password-repeat-cont">
            <input type="text" className="password-repeat" placeholder='Retype Password' />
        </div>

    </div>
  )
}

export default Signup