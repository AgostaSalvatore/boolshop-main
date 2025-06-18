import React from 'react'
import { NavLink } from 'react-router-dom'
import Cart from './Cart'
import Searchbar from './Searchbar'
// import { useState } from 'react'

const Header = () => {

    return (
        <>
            <header>
                <div className="container">
                    <div className="d-flex align-items-center justify-content-between">
                        {/* Logo sulla sinistra */}
                        <NavLink to="/">
                            <img className="logo img-fluid" src="/img/boolshop-logo-3.png" alt="Logo" />
                        </NavLink>

                        {/* Search bar al centro */}
                        <Searchbar />

                        {/* Pulsanti sulla destra */}
                        <div className="d-flex">
                            <button className="btn btn-outline-primary me-3">
                                <i className="bi bi-heart">Wishlist</i>
                            </button>
                            <NavLink to="/cart" className="btn btn-outline-primary">
                                <i className="bi bi-cart me-1"></i> Carrello
                            </NavLink>
                        </div>
                    </div>
                </div>
            </header >
        </>
    )
}

export default Header