import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'

const Login = (props) => {
    const container = {
        borderRadius: '12px',
        width: '50vw'
    }
    const signinHead = {
        color: 'white',
        textAlign: 'center',
        marginTop: '80px',
        paddingTop: '40px',
        fontWeight: '900',
    }

    const formStyle = {
        textAlign: 'center',
        marginTop: '40px'
    }

    const inputStyle = {
        width: '70%',
        height: '40px',
        marginTop: '50px',
        borderRadius: '12px',
        outline: 'none',
        border: 'none',
        paddingLeft: '20px',
        fontWeight: '900'
    }

    let navigate = useNavigate()

    const [credential, setCredential] = useState({ email: '', password: '' })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:9090/api/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: credential.email, password: credential.password })
                })

            const json = await response.json()
            // console.log(json)
            if (json.Success) {
                localStorage.setItem('token', json.token)
                navigate('/notes')
                props.showAlert("Logged in Succesfully", "success")
            }
            else {
                // alert('Invalid Credential')
                props.showAlert("Invalid Credential", "danger")
            }

            // if (response.status === 401) {
            //     alert("incorrect credentials")
            // } else {
            //     alert("login success");
            //     // history.push('/dashboard')
            // }
        } catch (error) {
            console.log(error)
        }
    }


    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }


    return (
        <>
            <div>
                <div className='container bg-dark ' style={container}>
                    <h2 className='signinHead ' style={signinHead}>Sign in</h2>
                    <form onSubmit={handleSubmit} style={formStyle} >
                        <input style={inputStyle} type='email' placeholder='email' name='email' value={credential.email} onChange={onChange}></input><br />
                        <input style={inputStyle} type='password' placeholder='password' name='password' value={credential.password} onChange={onChange}></input>
                        <br />
                        <Link style={{ cursor: 'pointer', color: 'white', textDecoration: 'none' }} to='#'><p style={{ marginTop: '90px' }}>forgot password ?</p></Link>
                        <Button className='my-2' variant="contained" color="success" onClick={handleSubmit} type='submit'>Sign in</Button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Login
