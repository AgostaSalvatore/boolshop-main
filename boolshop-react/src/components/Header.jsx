import React from 'react'
import { NavLink } from 'react-router-dom'
import Cart from './Cart'
import Searchbar from './Searchbar'
// import { useState } from 'react'

const Header = () => {

    return (
        <>
            <header className="py-3 d-flex align-items-center justify-content-between">
                {/* Logo sulla sinistra */}
                <NavLink to="/">
                    <img className="logo img-fluid" src="/img/boolshop-logo-5.png" alt="Logo" />
                </NavLink>

                {/* Search bar al centro */}
                <Searchbar />

                {/* Pulsanti sulla destra */}
                <div className="btn-container">
                    {/* Catalogo Giochi */}
                    <NavLink to="/catalog">
                        <button className="btn btn-outline-primary">
                            <i className="bi bi-collection"></i>
                            <span className="d-none d-md-inline">Catalogo</span>
                        </button>
                    </NavLink>

                    {/* Wishlist */}
                    <NavLink to={"/wishlist"}>
                        <button className="btn btn-outline-primary">
                            <i className="bi bi-heart"></i>
                            <span className="d-none d-md-inline">Wishlist</span>
                        </button>
                    </NavLink>

                    {/* Carrello */}
                    <NavLink to="/cart">
                        <button className="btn btn-outline-primary">
                            <i className="bi bi-cart"></i>
                            <span className="d-none d-md-inline">Carrello</span>
                        </button>
                    </NavLink>
                </div>
            </header >
        </>
    )
}

export default Header