import { useState } from 'react'

import { Link } from 'react-router-dom'

export default function Home() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [success, setSuccess] = useState('')
    const [fail, setFail] = useState(true);

    async function registerUser(event) {
        event.preventDefault();

        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
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
        <main className="auth-modern-bg">
            <div className="auth-card">
                <form onSubmit={registerUser} className="auth-form">
                    <h2 className="auth-title">Register</h2>
                    <input className="auth-input" value={name} type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                    <input className="auth-input" value={email} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input className="auth-input" value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button className="auth-btn" type="submit">Register</button>
                    <div className='after-signup'>
                        {fail ? null : <div className='auth-error'>An account with this email already exists.</div>}
                        {success ? <div className='auth-success'>Account was created successfully.</div> : null}
                        {success ? <Link className='auth-link' to='/login'>LOGIN INTO YOUR ACCOUNT</Link> : null}
                        {success ? <div className='auth-or'>or</div> : null}
                        {success ? <Link className='auth-link' to='/'>EXPLORE CRYPTO</Link> : null}
                    </div>
                </form>
            </div>
        </main>
    )
}
