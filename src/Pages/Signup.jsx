import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'

const Signup = () => {

    const history = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {

            await axios.post("http://localhost:3000/signup", {
                email, password
            })
                .then(res => {
                    if (res.data.includes('Exist')) {
                        alert('User already exists!')
                    }
                    else if (res.data.includes('Does not')) {
                        history("/", { state: { id: email } })
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

            <h1>SIGN UP HERE</h1>

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
                <Link to='/login'>Login here if you already have an accoun!!</Link>
            </div>

        </div>
    )
}

export default Signup