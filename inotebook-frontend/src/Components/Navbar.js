import React from 'react'
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';
import { Switch } from '@mui/material';
// import NoteContext from '../Context/NoteContext'
import { useNavigate } from 'react-router-dom'





const Navbar = (props) => {
    let location = useLocation()
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }


    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark" >
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><span style={{ color: '#f54242', fontSize: '20px', fontWeight: '900' }}>C </span>Notebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/"> Home </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/notes" ? "active" : ""}`} to="/notes">Your Notes </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About </Link>
                        </li>

                    </ul>
                    <Switch onClick={props.toggleMode}>

                    </Switch>

                    {
                        localStorage.getItem('token') ?
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search Your Notes Here.........." aria-label="Search" />
                                <Button className='mx-1' variant="contained" type="submit">Search</Button>
                                <Button className='mx-1' variant="contained" color="success" onClick={handleLogout}>Logout </Button>
                            </form>
                            :
                            <div>
                                <Link to='/login' style={{ color: 'inherit', textDecoration: 'none' }}><Button className='mx-1' variant="outlined" color="success" type="submit">Sign In </Button></Link>
                                <Link to='/register' style={{ color: 'inherit', textDecoration: 'none' }}><Button className='mx-1' variant="contained" color="success" type="submit">Register </Button></Link>
                            </div>
                    }

                </div>
            </div>
        </nav>
    )
}

export default Navbar
