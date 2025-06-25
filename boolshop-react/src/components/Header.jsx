import React from 'react'
import { NavLink } from 'react-router-dom'
import Cart from './Cart'
import Searchbar from './Searchbar'
import { useCart } from '../context/CartContext'

const Header = () => {
    // Utilizzo il hook useCart per accedere ai dati del carrello
    const { cartItems } = useCart();

    // Calcolo il numero totale di prodotti nel carrello (somma delle quantità)
    const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            <header className="py-3">
                <div className="container">
                    <div className="d-flex align-items-center justify-content-between">
                        {/* Logo sulla sinistra */}
                        <NavLink to="/">
                            <img className="logo img-fluid" src="/img/boolshop-logo-5.png" alt="Logo" />
                        </NavLink>

                        {/* Search bar al centro */}
                        <div className="searchbar-container flex-grow-1 mx-4">
                            <Searchbar />
                        </div>

                        {/* Pulsanti sulla destra */}
                        <div className="btn-container">
                            {/* Catalogo Giochi */}
                            <NavLink to="/catalog" className="text-decoration-none">
                                <button className="btn btn-outline-primary">
                                    <i className="bi bi-collection"></i>
                                    <span className="d-none d-md-inline">Catalogo</span>
                                </button>
                            </NavLink>

                            {/* Wishlist */}
                            <NavLink to={"/wishlist"} className="text-decoration-none">
                                <button className="btn btn-outline-primary">
                                    <i className="bi bi-heart"></i>
                                    <span className="d-none d-md-inline">Wishlist</span>
                                </button>
                            </NavLink>

                            {/* Carrello */}
                            <NavLink to="/cart" className="text-decoration-none position-relative">
                                <button className="btn btn-outline-primary">
                                    <i className="bi bi-cart"></i>
                                    <span className="d-none d-md-inline">Carrello</span>
                                </button>
                                {cartItemsCount > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {cartItemsCount}
                                        <span className="visually-hidden">prodotti nel carrello</span>
                                    </span>
                                )}
                            </NavLink>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header