import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const DiscountedGamesRow = ({ games, }) => {
    const { addToCart } = useCart();
    const [showPopup, setShowPopup] = useState(false)

    const handleAddToCart = (game) => {
        addToCart(game) // Aggiunge il prodotto al carrello
        setShowPopup(true) //Attiva il metodo

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
        <div className="discounted-games-container d-flex justify-content-center">
            {games.slice(0, 5).map((game) => ( // Genera solo 5 card randomiche
                <div key={game.id} className="card me-3" style={{ width: '200px' }}>
                    <Link to={`/${game.id}`}>
                        <img src={game.image} className="card-img-top" alt={game.title} />
                    </Link>
                    <div className="card-body">
                        <h5 className="card-title">{game.title}</h5>
                        <p className="card-text">Prezzo: €{game.price}</p>
                        <p className="card-text text-danger">Sconto: {game.discount}%</p>
                        <button onClick={() => { handleAddToCart(game) }} type="button" className="btn btn-danger">Aggiungi al carrello</button>
                    </div>
                </div>
            ))}
        </div>
    </>
    );
};

export default DiscountedGamesRow