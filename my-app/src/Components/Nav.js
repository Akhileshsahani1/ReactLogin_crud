import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Nav = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate()

const handleLogin=()=>{
  
    navigate('/')
}
const handleLogout=()=>{
    localStorage.clear();
    navigate("/logout")
}
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <NavLink className="navbar-brand" href="#">
                    Navbar
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                       
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dashboard">
                                Dashboard
                            </NavLink>
                        </li>
                    </ul>

                    <ul className="navbar-nav ms-auto  ">
                  
                        {
                            !token ? (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/register">
                                        Register
                                    </NavLink>
                                </li>
                            ) :null
                        }

                        {
                            !token ? (
                                <li className="nav-item">
                                    <li onClick={handleLogin}   className="nav-link" >
                                        Login
                                    </li>
                                </li>
                            ):null
                        }

                        {
                            token ? (
                                <li className="nav-item">
                                    <li onClick={handleLogout}   className="nav-link" >
                                        logout
                                    </li>
                                </li>
                            ):null
                        }


                    </ul>

                </div>
            </nav>

        </div>
    );
};

export default Nav;