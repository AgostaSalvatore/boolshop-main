import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <header>
                <div className="container">
                    <div className="d-flex align-items-center justify-content-between">
                        {/* Logo sulla sinistra */}
                        <img className="logo img-fluid" src="/img/boolshop-logo-3.png" alt="Logo" />

                        {/* Search bar al centro */}
                        <form className="d-flex w-50" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search..."
                                aria-label="Search"
                            />
                            <button className="btn btn-primary" type="submit">Search</button>
                        </form>

                        {/* Pulsanti sulla destra */}
                        <div className="d-flex">
                            <button className="btn btn-outline-primary me-2">
                                <i className="bi bi-cart"></i> {/* Icona carrello */}
                            </button>
                            <button className="btn btn-outline-primary">
                                <i className="bi bi-heart"></i> {/* Icona wishlist */}
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header