import React, { useState } from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'


const Register = (props) => {
    const container = {
        borderRadius: '12px',
        width: '50vw',
    }
    const signinHead = {
        color: 'white',
        textAlign: 'center',
        marginTop: '20px',
        marginButtom: '10px',
        paddingTop: '40px',
        fontWeight: '900'

    }

    const formStyle = {
        textAlign: 'center',
        marginTop: '40px'
    }

    const btn = {
        marginButtom: '50px',
    }
    
    const inputStyle = {
        width: '70%',
        height: '40px',
        marginTop: '30px',
        marginButtom: '50px',
        borderRadius: '12px',
        outline: 'none',
        border: 'none',
        paddingLeft: '20px',
        paddingRight: '20px',
        fontWeight: '900'
    }

    const [credential, setCredential] = useState({ name: '', email: '', phone: '', password: '', cpassword: '' })
    let navigate = useNavigate()


    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const {name, email, phone, password, cpassword} = credential
        try {
            const response = await fetch('http://localhost:9090/api/auth/registration',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name, email, phone, password, cpassword})
                })

            const json = await response.json()
            console.log(json)
            if (json.Success) {
                localStorage.setItem('token', json.token)
                navigate('/notes')
                props.showAlert("Account Created Succesfully", "success")
            }
            else {
                props.showAlert("Invalid Credential", "danger")
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <div className='container bg-dark' style={container} >
                <h2 className='signinHead ' style={signinHead}>Register Here</h2>
                <form style={formStyle} onSubmit={handleSubmit}>
                    <input style={inputStyle} type='text' placeholder='Name' name='name' value={credential.name} onChange={onChange}></input><br />
                    <input style={inputStyle} type='email' placeholder='Email' name='email' value={credential.email} onChange={onChange}></input><br />
                    <input style={inputStyle} type='text' placeholder='Mobile No.' name='phone' value={credential.phone} onChange={onChange}></input><br />
                    <input style={inputStyle} type='password' placeholder='Password' name='password' value={credential.password} onChange={onChange}></input>
                    <input style={inputStyle} type='password' placeholder='Confirm Password' name='cpassword' value={credential.cpassword} onChange={onChange}></input>
                    <br />
                    <Button  style={btn}  variant="contained" color="success" type='submit'>Register</Button>
                </form>
            </div>
        </div>
    )
}

export default Register
