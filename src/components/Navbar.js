import React from 'react'
import PaxDav from '../assets/PaxDav.png'
import { Link } from 'react-router-dom'

const Navbar = ()=>{
    return (
        <div className='pax-nav'>            
            <nav data-aos="fade-down" className="navbar navbar-expand-lg bg-body-white text-white">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={PaxDav} className='img-fluid ps-5' />
                    </a>
                    <button className="navbar-toggler text-white bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarText">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item pe-md-4">
                            <Link to={'/'} className='nav-link text-white' aria-current="page" href="#">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item px-md-4">
                            <Link to={'/services'} className='nav-link text-white' href="#publications">
                                Services
                            </Link>
                        </li>
                        <li className="nav-item px-md-4">
                            <Link to={'/portfolio'} className='nav-link text-white' href="#impacts">
                                Portfolio
                            </Link>
                        </li>
                        <li className="nav-item px-md-4">
                            <Link to={'/about'} className='nav-link text-white' href="#services">
                                About Us
                            </Link>
                        </li>                        
                    </ul>                    
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar