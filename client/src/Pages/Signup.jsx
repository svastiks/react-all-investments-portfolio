import { useState, useEffect } from 'react'

export default function Home() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
            alert('An account with this email already exists!!')
        }
        else {
            window.location.href = '/login'
        }
    }

    return (

        <div className="signup-cont">
            <h1 className="signup-header">Register</h1>
            <form onSubmit={registerUser}>
                <input className="signup-name" value={name} type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}></input> <br></br>

                <input className="signup-email" value={email} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input> <br></br>

                <input className="signup-password" value={password} type="password" placeholder="Password" onChange={(e) => (setPassword(e.target.value))}></input> <br></br>

                <input className="signup-btn" type="submit" value="Register"></input>
            </form>
        </div>

    )
}
