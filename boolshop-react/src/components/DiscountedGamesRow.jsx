import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import CartSideBar from './CartSideBar';

const DiscountedGamesRow = ({ games, }) => {
    const { addToCart } = useCart();
    const [showPopup, setShowPopup] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)

    const handleAddToCart = (game) => {
        addToCart(game) // Aggiunge il prodotto al carrello
        setShowPopup(true) //Attiva il metodo
        setIsCartOpen(true)

        setTimeout(() => setShowPopup(false), 2000);  // dopo 2 secondi nasconde il popup
    };


    return (<>
        {showPopup && (
            <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
                <div className="toast show align-items-center text-white bg-success border-0">
                    <div className="d-flex">
                        <div className="toast-body">
                            ✅ Articolo aggiunto al carrello!
                        </div>
                        <button
                            type="button"
                            className="btn-close btn-close-white me-2 m-auto"
                            onClick={() => setShowPopup(false)}
                        ></button>
                    </div>
                </div>
            </div>
        )}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4 mb-5">
            {games.slice(0, 5).map((game) => ( // Genera solo 5 card randomiche
                <div key={game.id} className="col">
                    <div className="card h-100 shadow-sm">
                        <div className="card-img-container" style={{ height: '200px', overflow: 'hidden' }}>
                            <img
                                src={game.image}
                                className="card-img-top"
                                alt={game.title || game.name}
                                style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                            />
                        </div>
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title text-truncate" title={game.title || game.name}>{game.title || game.name}</h5>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="card-text fw-bold text-primary mb-0">€{game.price}</p>
                                <span className="badge bg-danger">-{game.discount}%</span>
                            </div>
                            <div className="mt-auto d-grid gap-2 pt-3">
                                <Link to={`/${game.slug}`} className="btn btn-outline-primary">Dettagli</Link>
                                <button
                                    onClick={() => { handleAddToCart(game) }}
                                    type="button"
                                    className="btn btn-danger"
                                >
                                    Aggiungi al carrello
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <CartSideBar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    </>
    );
};

export default DiscountedGamesRow