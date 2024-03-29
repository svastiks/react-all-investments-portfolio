import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

export default function Home() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [success, setSuccess] = useState('')
    const [fail, setFail] = useState(true);

    async function registerUser(event) {
        event.preventDefault();

        const res = await fetch(`http://localhost:1337/api/register`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            })
        })

        const data = await res.json();
        //console.log(data);

        if (data.status === 'error') {
            // alert('An account with this email already exists!!')
        }

        let successLocal = data.status !== 'error';
        setSuccess(successLocal)
        setFail(successLocal)
    }

    return (

        <div className="signup-cont">
            <h1 className="signup-header">Register (Sign up might take long as this project is using free hosting services)</h1>
            <form onSubmit={registerUser}>
                <input className="signup-name" value={name} type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}></input> <br></br>

                <input className="signup-email" value={email} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input> <br></br>

                <input className="signup-password" value={password} type="password" placeholder="Password" onChange={(e) => (setPassword(e.target.value))}></input> <br></br>

                <input className="signup-btn" type="submit" value="Register"></input>

                <div className='after-signup'>

                    {fail ? null : <h5 className='error-create'>An account with this email already exists.</h5>}

                    {success ? <h3 className='success-create'>Account was created successfully.</h3> : null}
                    {success ? <Link className='sucess-links' to='/login'>LOGIN INTO YOUR ACCOUNT</Link> : null}
                    {success ? <div>or</div> : null}
                    {success ? <Link className='sucess-links' to='/'>EXPLORE CRYPTO</Link> : null}

                </div>
            </form>
        </div>

    )
}
