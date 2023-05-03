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
        console.log(data);

        if (data.status === 'error') {
            alert('An account with this email already exists!!')
        }
    }

    return (

        <div>
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <input value={name} type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}></input> <br></br>

                <input value={email} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input> <br></br>

                <input value={password} type="password" placeholder="Password" onChange={(e) => (setPassword(e.target.value))}></input> <br></br>

                <input type="submit" value="Register"></input>
            </form>
        </div>

    )
}
